---
draft: true
---

The second part of `yield/async/await` implementation of coroutines is `async/await`. As you can see in the diagram below, it is a bit more involved than `yield` but fundamentally it is still the same idea of suspending execution of a function at some point and then continuing from the same execution point some time later. 
What is different between `yield` and `async/await` is the motivation. In particular `yield` is useful for lazily producing values. Imagine that your process reads data from upstream source, does some processing and sends data to downstream system. If the downstream system is constantly overloaded, there is no point getting more data from upstream. This can thought of as having too much data from upstream. This is where a generator can be useful so that data is read from upstream only when asked.

There is another possible problem that even though downstream system is not overloaded, it takes it a really long time to respond. Waiting for response will block threads in our system (and potentially will make it run out of threads). Assuming there is some non-blocking IO available, this problem can be solved with `async/await`. The idea is that as soon as the current thread sends data to downstream system, it suspends execution of sending function and continues doing other things, i.e. serving more upstream requests. Some time later this (or another) thread can observe via non-blocking IO that downstream system has processed the original request and will continue execution from the suspension point. This way we can process as much upstream data as possible and send it all downstream maximising usage of threads.

In the diagram below a thread starts executing `main` and calls async function. Few instructions later the async function starts some potentially long-running task and instead of waiting for it to finish it wraps the result into `promise` and yields execution back to `main`. (Here `promise` means an object which holds the result of computation which might finish some time in the future. There are other terms for `promise`, for example, `future` or `task`.) The `promise` will be also automatically chained to executed the rest of the async function after the promisr has been completed. This is essentially the same as restoring stack and instruction pointer. Note that `main` also receives `overall promise` which will be completed when the whole async function is completed. After returning from async function, thread will run the rest of the `main` and can potentially chain some code to be executed after the `overall promise` is completed. Some time later another thread observes that the long running task has finished and so it completes the `promise`. The promise will make the thread "jump" back into the middle of the async function. Few instructions later the second thread starts another long-running task, creates another promise and yields execution to whatever the thread was doing before completing the first `promise`. Some time later yet another thread observes that the second task has finished so it completes the second `promise` and resumes execution of async function from the last suspension point. This time the thread finishes execution of the whole async function, so it completes `overall promise` and runs all callbacks associated with it. There were three threads in this description but in reality it could be even one thread. Coroutines don't mandate any particular threading model, they're only about concurrency.

![](/assets/images/coroutines/async-await/0-async-await.png)

One of the most confusing things about `async/await` is that `await` doesn't really make the current thread wait for anything. Instead it saved current stack and instruction pointer and yields execution back to calling function just like in the previous examples with coroutines as threads and `yield`. The confusion happens because we usually think about code sequentially from the point of view of a computer, or rather CPU or a thread. So when we see a function, call like `sleep(2)` we think of it as current thread being stopped for two seconds (or milliseconds). The `async/await` implementation of coroutines breaks this implicit expectation because `await` is not about current thread anymore. I guess it was an attempt to make developer think about code in terms of the task itself ignoring how runtime execution is being done. Because all abstractions are leaky I'm not convinced it was the best choice. To summarise, `await` doesn't wait for anything, it chains the rest of async function to run after promise is completed and **yields** execution.

The following JavaScript code shows `async/await` execution similar to the diagram above. Similar to generators with `yield` where we had function marked with `*`, here we declare `c` function which is marked with `async` keyword which tells the compiler that this is a coroutine. In the `main` function we invoke `c()` which starts executing to the point when it reaches `await promise1` and yields execution back to `main`. Here `promise1` signifies some task which takes a long time to finish (in this particular example it will be resolved after 2 second timeout). After yielding back to `main` we get `overallPromise` on which we set callback to print "done" when the whole async function finishes. About 2 seconds later `promise1` is completed and execution continues from `await promise1` expression until it reaches `await promise2` which yields again. In 3 seconds `promise2` is completed so the whole coroutine is completed so the callback defined in `main` prints "done" (both promises are created almost at the same time so the delay for second promise completion is about 5 - 2 = 3 seconds). Overall, the output of the code below is:
```
1
2
3
4
5
done
```
Note again that the `main` function finishes execution before async function `c` so in spite of what you could expect from the `await` keyword.  
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
let overallPromise = c();
overallPromise.then(_ => console.log("done"));
console.log(3); 
```

Hopefully, the example above helps with understanding execution flow of `async` functions. However, it's a bit pointless because promises don't return any values at all. So below is essentially the same example but with promises returning some values. Here `promise1` returns a dog and `promise2` return a pig. The `async` function sequentially waits for each promise to complete and then concatenates and returns their output. Note that even though the async function returns a string, the actual object returned from it is a promise (this is because it has `async` modifier so the compiler knows it should do some code transformations). In the `main` function we register callback on `overallPromise` to concatenate "!" to the result and print it to the console. Overall, after 5 second delay the program prints `🐶🐷!`.
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
overallPromise.then(it => console.log(it + "!"));
```

Considering the previous two examples it might look like `async/await` transforms code between `await` keywords into promises and chains the promises together. This is not correct though. The example below illustrates that similar to generators, `async` functions work with `try/catch/finally` blocks. In this example `promise1` returns a dog, and `promise2` throws an explosion 💥. So in the async function `await promise1` after a timeout will be evaluated to a dog and assigned to `value1`. However, `await promise2` will complete by throwing an explosion and will continue by executing `catch` and `finally` blocks (the code which logs monkey to console and returns concatenated values will never run). Note even though `async` function yields execution twice, the `finally` block is run only once when the whole function is finished. Because `catch/finally` don't return any values `overallPromise` result will be `undefined`. The whole program prints:
```
catch 💥
finally
undefined
```  
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
overallPromise.then(it => console.log(it));
```

Just like with generators, it might seem that `async/await` is some complicated compiler magic. It's not that magical though. Using babel.js we can transform the code for older JS versions which don't support `async/await` keywords. You don't need to understand the code below (and some parts of it are defined in babel library) but similar to generators `async` function is transformed into a state machine. You might also notice `_asyncToGenerator()` function which hints that under the hood `async` functions are implemented as generators, i.e. fundamentally async functions are not that different from generators. 
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
overallPromise.then(function (it) {
	return console.log(it);
});
```
