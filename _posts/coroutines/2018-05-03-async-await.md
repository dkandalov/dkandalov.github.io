---
draft: true
---

This post is part of the blogpost series explaining coroutines, how they implemented in various programming languages and how they can make your life better:
1. [coroutines as threads]({% post_url 2018-05-01-coroutines-as-threads %})
2. [yielding generators]({% post_url 2018-05-02-yielding-generators %})
3. 👉 [async await]({% post_url 2018-05-03-async-await %}) 👈
4. [call with current continuation]({% post_url 2018-05-06-call-with-current-continuation %})

This post is about `async/await` coroutines implementation which is a bit more complicated than `yield` but fundamentally, just like other coroutine implementations, uses the idea of suspending functions and continuing some time later from the same execution point (so the current thread doesn't really "await" for anything but rather suspends execution of async function).

#### Why use async/await?
 
The main use-case for `async/await` is to make it easier to write asynchronous code or, in general, any code which uses a lot of callbacks or [futures/promises](https://en.wikipedia.org/wiki/Futures_and_promises). In particular, `async/await` can help to avoid [callback hell](http://callbackhell.com) (aka [pyramid of doom](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))) by writing programs in imperative style. The goal is to restructure program so that it's easier for humans to write and maintain. Even though asynchronous programs is the most common use-case, `async/await` doesn't require code to be actually asynchronous or use non-blocking IO. Fundamentally, it's just about structural transformation of the program.

A typical example of using `async/await` is avoiding threads blocked on IO operations. Let's say there is a web server which on each request grabs a thread from a thread pool, requests data from back-end system and sends the result back to client. The web sever is under high load and profiling shows that most of its threads are not busy doing any work but blocked waiting for response from the back-end. It takes a while to receive response from back-end but overall back-end has enough capacity to handle more requests in parallel. Assuming that back-end response time cannot be improved, web server is the bottleneck because it doesn't have enough runnable threads to match the capacity of the back-end. To solve the issue, web server can use `async/await` with non-blocking IO so that threads don't block waiting for response from the back-end but instead handle more client requests.

#### Control flow of async/await

One of the simplest `async/await` examples is an async function without any return values which `await`s for two promises. (Here `promise` means an object which holds the result of a computation which might be computed and will become available some time in the future. There are [other terms](https://en.wikipedia.org/wiki/Futures_and_promises) for it, e.g. future, deferred or task). This is depicted in the following diagram (you can find description of the [notation in the previous blogpost]({% post_url 2018-05-01-coroutines-as-threads %}#notation)):

![](/assets/images/coroutines/async-await/0-async-await-no-return.png)

In the diagram a thread starts executing `main` and calls async function. Few instructions later async function reaches `await` which, assuming that `promise1` is not yet complete, suspends execution of async function and yields execution back to `main`. Note that there is no restriction on when and how the promise was created. The most common use-case would be to call from async function some long-running task which returns a promise but we could also create the promise some time before and pass into async function as an argument. After `await` yielded execution back to `main`, the thread executes the rest of the `main` and returns from it as usual.

Some time later another thread observes (e.g. via non-blocking IO) that the long-running task has finished and completes `promise1`. Completing `promise1` makes thread to "jump" back into the middle of the async function and continue from the **suspension point**. Few instructions later the thread reaches the second `await` which assuming that `promise2` is not yet complete, yields execution back to whatever the thread was doing before completing `promise1`. 

Some time later yet another thread observes that the second long-running task has finished so it completes `promise2` and resumes execution of async function from the last **suspension point**. This time the thread finishes execution of the whole async function. Even though there were three threads mentioned in this description, coroutines don't mandate any particular threading model, and in this example there could be any amount of threads between one and three.

One of the most confusing things is that `await` doesn't really make current thread wait for anything. If the promise is not yet completed, `await` chains execution of the rest of async function to run after the promise is completed (e.g. by saving current stack and instruction pointer at suspension point) and yields execution back to the calling function. If the promise is already completed, `await` extracts result from the promise and continues executing async function as usual. The confusion happens because it's usual to think about code from the point of view of a computer (CPU or a thread) sequentially executing instructions. When we see `sleep(2)`, we think of it as current thread sleeping for two seconds (or milliseconds). Unlike most of the normal code, `await` keyword means "waiting" from the point of view of the current task. 

The following JavaScript code shows `async/await` execution similar to the diagram above: 
```
let promise1 = new Promise(resolve => {
	setTimeout(() => resolve(), 2000);
});
let promise2 = new Promise(resolve => {
	setTimeout(() => resolve(), 5000);
});

async function c() {
	console.log(2);
	await promise1;
	console.log(4);
	await promise2;
	console.log(5);
}

console.log(1);
c();
console.log(3); 
```
Note that `function c()` is marked with `async` keyword which tells JS interpreter that this is a coroutine (similar to [generators]({% post_url 2018-05-02-yielding-generators %}#basic-generator) which in JS are marked with `*`). Both `promise1` and `promise2` signify some long-running tasks (in this example they are resolved 2 and 5 seconds after being created). It also might be a bit counter-intuitive that `main` finishes execution before async function `c` (as mentioned above this not what you would normally expect from something called "await"). As you probably expected, the program prints:
```
1
2
3
```
Waits for about 2 seconds and prints:
```
4
```
Waits for about (5 - 2) = 3 seconds and prints:
```
5
```

#### Returning async results

The goal of the previous example was to show execution flow of async functions. However, it was significantly simplified by having async function which ignored results of the promises and didn't return anything itself. This example adds more details about how async functions return values via [promises](https://en.wikipedia.org/wiki/Futures_and_promises). The following diagram shows async function which `await`s for two promises. After the first `await` async function returns `overall promise` to the `main` which can potentially chain more code to be executed once `overall promise` is completed. After both `promise1` and `promise2` are completed, the thread that completed `promise2` will execute the rest of async function and complete `overall promise`.

![](/assets/images/coroutines/async-await/1-async-await.png)

There are some details though which are hard to show on a diagram and are better illustrated with source code:
```
let promise1 = new Promise(resolve => {
	setTimeout(() => resolve("🐶"), 2000);
});
let promise2 = new Promise(resolve => {
	setTimeout(() => resolve("🐷"), 5000);
});

async function c() {
	let dog = await promise1;
	let pig = await promise2;
	return dog + pig;
}

let overallPromise = c();
overallPromise.then(result => console.log(result + "!"));
```
In this example, `promise1` returns `🐶` after 2 second delay and `promise2` returns `🐷` after 5 seconds. The async function sequentially `await`s for each promise to complete and returns concatenated output (after about 5 second delay). Note that even though the async function returns a string, actual object received by `main` is a promise (this happens because `function c()` has `async` modifier which tells JS it should do some code transformations). In the `main` function we register callback on `overallPromise` to append "!" to the `result` and print it to the console. As expected, the program runs for about 5 seconds and prints:
```
🐶🐷!
```

#### Composing async functions

It might be obvious, but it's still worth mentioning that async functions `await` on promises and return promises themselves. Because of this async functions can be easily composed. For example, in the diagram below async function sequentially invokes `asyncFunction1()`, `asyncFunction2()` and `await`s on their promises.
 
![](/assets/images/coroutines/async-await/2-async-await-composed.png)

Equivalent JS code might look something like this:
```
let promise1 = new Promise(resolve => {
	setTimeout(() => resolve("🐶"), 2000);
});
let promise2 = new Promise(resolve => {
	setTimeout(() => resolve("🐷"), 5000);
});

async function dog() {
	return await promise1 + "_";
}
async function pig() {
	return await promise2 + "_";
}
async function c() {
	return await dog() + await pig();
}

let overallPromise = c();
overallPromise.then(result => console.log(result + "!"));
```
The main point here is that `c()` awaits on the result of another async function which could also depend on other async functions. After about 5 second delay the program prints:
```
🐶_🐷_!
```

#### Async try/catch

Considering previous examples it might look like `async/await` transforms code between `await` keywords into promises and chains the promises together. This is not entirely true though. In the example below you can see that [similar to generators]({% post_url 2018-05-02-yielding-generators %}#try-catch), `async` functions work with `try/catch/finally` blocks.
```
let promise1 = new Promise(resolve => {
	setTimeout(() => resolve("🐶"), 200);
});
let promise2 = new Promise((resolve, reject) => {
	setTimeout(() => reject("💥"), 500);
});

async function c() {
	try {
		let value1 = await promise1;
		let value2 = await promise2;
		console.log("🙈");
		return value1 + value2;
	} catch (e) {
		console.log("catch " + e);
	} finally {
		console.log("finally");
	}
}

let overallPromise = c();
overallPromise.then(result => console.log(result));
```
In this example `promise1` returns `🐶`, and `promise2` throws `💥`. After a delay `promise1` will be evaluated in async function `c()` to `🐶` and assigned to `value1`. However, `await promise2` will complete by throwing `💥` and will continue by executing `catch` and `finally` blocks (the code which logs `🙈` to console and returns concatenated values will never run). Note that even though async function yields execution twice, the `finally` block is run only once when the whole async function is finished. Because `catch/finally` doesn't return any values `overallPromise` result will be `undefined`. Overall, the program prints:
```
catch 💥
finally
undefined
```  

#### Async/await as state machine

It might seem that `async/await` does some complicated compiler/interpreter magic. Even though it's not trivial there nothing magical about it. Using [BabelJS](https://babeljs.io) we can [transpile](https://en.wikipedia.org/wiki/Source-to-source_compiler) the code from previous example to be compatible with older JS versions without `async/await` support.

You don't need to understand all the code below (and parts of it are defined in BabelJS library anyway), the point here is that, [similar to generators]({% post_url 2018-05-02-yielding-generators %}#state-machines), async function is transformed into a state machine. The original code is split into snippets along `await`, `catch` and `finally` keywords. State matching does a `switch` on the current state, executes the appropriate snippet and moves to the next state. You might also notice `_asyncToGenerator()` function which hints that under the hood async functions are implemented as generators, i.e. fundamentally async functions can be expressed using generators.
```
"use strict"; 
var c = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var value1, value2;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return promise1;

					case 3:
						value1 = _context.sent;
						_context.next = 6;
						return promise2;

					case 6:
						value2 = _context.sent;

						console.log("🙈");
						return _context.abrupt("return", value1 + value2);

					case 11:
						_context.prev = 11;
						_context.t0 = _context["catch"](0);

						console.log("catch " + _context.t0);

					case 14:
						_context.prev = 14;

						console.log("finally");
						return _context.finish(14);

					case 17:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 11, 14, 17]]);
	}));

	return function c() {
		return _ref.apply(this, arguments);
	};
}();

function _asyncToGenerator(fn) { ... }

var promise1 = new Promise(function (resolve) {
	setTimeout(function () {
		return resolve("🐶");
	}, 100);
});
var promise2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		return reject("💥");
	}, 200);
});

var overallPromise = c();
overallPromise.then(function (result) {
	return console.log(result);
});
```

#### Summary

Coroutines based on `async/await` are probably the most complicated to use compared to other coroutine implementations. Fundamentally, `async/await` uses the same idea as other coroutines of saving current stack and executions pointer and later using this information to continue execution from suspension point. Unlike other coroutines, `async/await` adds quite a few things on top of this idea. It also doesn't help that `await` keyword doesn't make current thread wait but works more like [`yield` in generators]({% post_url 2018-05-02-yielding-generators %}#basic-generator).

Read next about [call with current continuation]({% post_url 2018-05-06-call-with-current-continuation %}).