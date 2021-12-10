---
permalink: yielding-generators
---

This post is part of the blogpost series explaining coroutines, how they implemented in various programming languages and how they can make your life better:
1. [coroutines as threads]({% post_url coroutines/2018-05-01-coroutines-as-threads %})
2. 👉 [yielding generators]({% post_url coroutines/2018-05-02-yielding-generators %}) 👈
3. [async await]({% post_url coroutines/2018-05-03-async-await %})
4. [call with current continuation]({% post_url coroutines/2018-05-06-call-with-current-continuation %})

<!--preview-post-from-here-->

The previous blogpost was about coroutines as threads which is probably the most intuitive coroutines implementation to use. However, there is another widespread and time-tested implementation based on generators using `yield` keyword and composable promises using `async/await`. This blog is about generators. They have been part of Python [since 2001](https://www.python.org/download/releases/2.2), C# [since 2005](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)#Versions) and JavaScript [since 2015](http://www.ecma-international.org/ecma-262/6.0/index.html).

The following code examples will use JavaScript (to be precise [ECMAScript 2017](http://www.ecma-international.org/ecma-262/8.0/index.html)). There are few reasons: JavaScript coroutines implementation is quite typical; JavaScript is dynamically typed so it should be easier to understand examples without paying too much attention to types; JavaScript has C-like syntax so should look familiar for most developers.

#### Why use generators?
The main use-case for using generators is to define lazy computation with simpler syntax compared to writing an iterator manually (see [example below](#factorial-example)). Sometimes whether the computation is lazy or not doesn't matter, because it's just easier to express with generators. In other cases, you really want laziness. This is often related to constrained resources or performance. For example, instead of reading a huge database table into memory a system could load data lazily as it's being processed.

There are other uses for generators like simulating concurrency and using them as a base for implementing `async/await` but they are less common.

<a name="basic-generator"/>

#### The most basic generator
Here is an example of the most basic generator:
<javascript>
function* createGenerator() {
	yield 1;
	yield 2;
	yield 3;
	yield "🙈";
} 
const c = createGenerator();
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
</javascript>
In the code above we define a function called `createGenerator`. Note that `createGenerator` has `*` after the `function` keyword. This tells JavaScript that this function is a coroutine and we can use the `yield` keyword inside it. If function is not marked with `*`, then `yield` is illegal and will cause a runtime error in JavaScript or compilation error in compiled languages. Note the similarity to [the previous blogpost]({% post_url coroutines/2018-05-01-coroutines-as-threads %}) where we couldn't use Lua `coroutine.yield()` outside of coroutine created with `coroutine.create`. After creating the generator, we assign it to `c` and can use `next()` to start/resume execution of the coroutine. Each invocation of `next()` changes the state of the generator and returns an object which has a property called `value` through which we can access the data yielded by the generator. Overall, the program resumes coroutine three times and prints `123` never reaching the line with the monkey. To get the monkey printed we would need to add one more invocation of `c.next()`.

#### Generators as threads

This might not be the first thing that comes up when you start using generators but there are a couple similarities between generators and coroutines as threads. The diagram below illustrates coroutines as threads in which `coroutine` yields execution back to `main` (you can find description of the notation in [the previous blogpost]({% post_url coroutines/2018-05-01-coroutines-as-threads %}#notation)). 
![](/assets/images/coroutines/yield/0-coroutine.png)

And the diagram below shows a generator. As you can see they are pretty much identical. The main difference is that generators are predominantly used to return values back into the calling function. To be fair, coroutines as threads can also pass values to/from coroutine so technically there is not much difference. However, the difference is in the intent of the program. From this point of view it might be useful to think about different coroutine implementations as [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern).
![](/assets/images/coroutines/yield/1-generator.png)

The main point here is that because the underlying idea is the same, we can use generators to do context switching similar to coroutines as threads: 
<javascript>
function* createGenerator() {
	console.log("2");
	yield;
	console.log("4");
	yield;
	console.log("🙈");
} 
const c = createGenerator();
console.log("1");
c.next();
console.log("3");
c.next();
console.log("5");
</javascript>
Overall, the program keeps resuming coroutine `c`, which prints some value and yields execution back to `main`. It prints `12345` never reaching the line with the monkey. Note that we call `yield` without passing any value because in this example the main reason for using the generator is preemptive concurrency.

#### Generator state

Generators have a state which in JavaScript can be observed via an object returned by `c.next()`. In the example below, we create a generator which yields twice and in `main` we resume it three times printing the result of both `next()` and `yield`. 
<javascript> 
function* createGenerator() {
	console.log(yield);
	console.log(yield);
} 
const c = createGenerator();
console.log(c.next());
console.log(c.next());
console.log(c.next()); 
</javascript>
This program prints:
```
{ value: undefined, done: false }
undefined
{ value: undefined, done: false }
undefined
{ value: undefined, done: true }
```
Each call of `next()` returns an object with `value` and `done` attributes. While the generator hasn't reached the last instruction, `done` attribute is`false`. When all the code in the generator is executed it ends up in the `done: true` state (similar to the state of a thread). All the values returned by `next()` are `undefined` because the generator didn't send anything back to main. The two `undefined` lines are printed by `console.log(yield)`, i.e. `yield` is evaluated to `undefined` because no values were passed into the `c.next()`. 

As mentioned before one of the main reasons to use generators is to return some values as shown in the following example: 
<javascript>
function* createGenerator() {
	console.log(yield "🐶");
	console.log(yield "🐷");
} 
const c = createGenerator();
console.log(c.next("A is lost"));
console.log(c.next("B"));
console.log(c.next("C"));
</javascript>
This program prints:
```
{ value: '🐶', done: false }
B
{ value: '🐷', done: false }
C
{ value: undefined, done: true }
```
Here we create a generator which yields a dog and a pig. And in the `main` function we resume the generator by passing values to it. Note that the first value passed into `c.next()` is lost and the last value returned from generator when it finishes execution is `undefined`.

#### Stackless yield

JavaScript implementation of coroutines is **stackless** (this is also true for Python, C#, Kotlin). In particular, this means that coroutines cannot `yield` from sub-functions.

In the example below, we create a generator which yields a dog and then calls `forEach` on an array passing it an anonymous function `it => { ... }`. Since the anonymous function call still counts as a sub-function, we cannot `yield` from inside it. This example fails at runtime, but in a compiled language this would be a compilation error. 
<javascript>
function* createGenerator() {
	console.log(yield "🐶");
	[1, 2, 3].forEach(it => {
		console.log(yield it); // runtime error
	});
} 
const c = createGenerator();
console.log(c.next("A"));
console.log(c.next("B"));
console.log(c.next("C"));
</javascript>

You might attempt to extract the anonymous function into a named function and mark it with `*` to make JavaScript happy. However, this won't solve the problem because the new function will become a generator on its own and will not `yield` from the outer `createGenerator()` function.
```
function* f(it) {
	console.log(yield it);
} 
function* createGenerator() {
	console.log(yield "🐶");
	[1, 2, 3].forEach(it => f(it));
} 
const c = createGenerator();
console.log(c.next("A"));
console.log(c.next("B"));
console.log(c.next("C"));
```
This program doesn't fail at runtime but no numbers are printed:
```
{ value: '🐶', done: false }
B
{ value: undefined, done: true }
{ value: undefined, done: true }
```

In this particular case of yielding from `for` loop there is an easy way to fix the code by using array iteration syntax which doesn't require anonymous functions. Obviously, this works because JavaScript has some knowledge of how to handle `for` loops containing `yield` expressions.
<javascript>
function* createGenerator() {
	console.log(yield "🐶");
	for (let it of [1, 2, 3]) {
		console.log(yield it);
	}
} 
const c = createGenerator();
console.log(c.next("A"));
console.log(c.next("B"));
console.log(c.next("C"));
console.log(c.next("D"));
console.log(c.next("E"));
</javascript>
This works as expected and prints:
```
{ value: '🐶', done: false }
B
{ value: 1, done: false }
C
{ value: 2, done: false }
D
{ value: 3, done: false }
E
{ value: undefined, done: true }
```

<a name="try-catch"/>

#### Generators and try/catch/finally

In the previous example we've seen that JavaScript knows how to combine `for` loops and `yield`. It works just as well with `try/catch/finally`: 
<javascript>
function* createGenerator() {
	try {
		let value = yield "🐶";
		if (value === "🚀") throw value;
		yield "🙈";
	} catch (e) {
		console.log("catch");
		yield e + "💥";
	} finally {
		console.log("finally");
	}
} 
const c = createGenerator();
console.log(c.next());
console.log(c.next("🚀"));
console.log(c.next());
</javascript>
This program prints:
```
{ value: '🐶', done: false }
catch
{ value: '🚀💥', done: false }
finally
{ value: undefined, done: true }
``` 
In this somewhat convoluted example, the generator will evaluate `yield "🐶"` expression which yields execution back to the main function (note that yield happens before `yield "🐶"` evaluation is finished so the `value` variable is not yet assigned at this point). The `main` function will log the result of the `c.next()` and call `c.next("🚀")`. Generator will continue execution, finish evaluating `yield "🐶"` to `"🚀"` and assign it to the `value` variable. Because `value` is equal to the rocket, the rocket will be thrown. It will end up in the `catch` block which logs `"catch"` and yields `e + "💥"`. It's then returned to the `main` function and logged as the result of evaluating `c.next("🚀")`. After this `main` resumes generator one more time so generator continues from `yield e + "💥"` in the `catch` and executes `finally`. 

The main point here is that `yield` can return from generator multiple times without executing code in the `finally` clause (this can't be done with normal `return`s). It's also worth noticing that the generator can yield/resume execution from `catch` blocks remembering the exception it has caught previously. Just like with the `for` loops, this works because JavaScript knows how to handle `try/catch/finally` with `yield`s.
 
#### Infinite generators

Because generators represent lazily a evaluated stream of values, they don't have to contain a finite amount of values. The following example shows the [factorial](https://en.wikipedia.org/wiki/Factorial) generator which returns values in an infinite loop. In a way, this is a lazily evaluated list of all factorials. 
<a name="factorial-example"/>
<javascript>
function* factorial() {
	let n = 0;
	let result = 1;
	while (true) {
		yield result;
		n++;
		result = result * n;
	}
} 
const f = factorial();
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());
</javascript>
It prints as expected:
```
{ value: 1, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 6, done: false }
{ value: 24, done: false }
```

Any generator can be rewritten as an [iterator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) without special syntax like `*` and `yield` but it often results in more complicated, less intuitive code. In this particular example, iterator implementation is not too complicated but it would get really messy if we added some `for` loops and `try/catch/finally` clauses. 
<javascript>
function factorial() {
	let n = 0;
	let result = 1;
	return {
		next: function() {
			let value = result;
			n++;
			result = result * n;
			return {
				value: value,
				done: false
			}
		}
	};
} 
</javascript>

To show why passing values into a generator can be useful, here is a factorial generator which takes an argument indicating how many results to skip before yielding the next value.
<a name="skipping-factorial-example"/>
<javascript>
function* factorial() {
	let n = 0;
	let result = 1;
	let skip = 0;
	while (true) {
		if (!skip) {
			skip = yield result;
		} else {
			skip--;
		}
		n++;
		result = result * n;
	}
} 
const f = factorial();
console.log(f.next());
console.log(f.next(10));
</javascript>
This program prints:
```
{ value: 1, done: false }
{ value: 39916800, done: false }
```
(Of course, these factorial implementations are invalid. The problem is that factorial function grows quite fast and after few values the result can no longer be accurately represented by floating point [numbers in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates).)

<a name="state-machines"/>

#### Generators as state machines

So far we used `yield` keyword without any explanation about how it works under the hood. To dispel the magic we can look at how the same functionality can be implemented in JavaScript versions without `yield` keyword. Luckily, this can be easily done with [BabelJS](https://babeljs.io) which [transpiles](https://en.wikipedia.org/wiki/Source-to-source_compiler) modern JavaScript into the code runnable by older versions of the language. 

The code snippet below is the [skipping factorial generator](#skipping-factorial-example) transpiled to JavaScript without `yield` keyword. This code is not intended to be read by humans and there are some implementation details missing (e.g. we don't see source code of `regeneratorRuntime` object). The main point here is that `factorial` code is transformed into a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine). 
 
There is a `switch` statement which branches on the current state of the state machine. Initially, the state of the machine is `0` so we match `case 0` and initialise `n`, `result` and `skip` variables. Then we fall though into `case 3` where `if (!true)` and `if (skip)` evaluate to `false` and won't be executed. Then `_context.next = 7` sets the next state of the state machine to `7` and yields the current result. When the generator resumes execution again, it will start from `case 7`. As you can see, there is nothing particularly magical going on here. It's not a trivial code transformation but in the end the generator code is transformed into a somewhat understandable finite state machine.

Note that at the bottom there is `console.log(f.next())` code which didn't change at all. Also the `factorial()` function signature didn't change even though its code was transformed.

<javascript>
"use strict";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(factorial);

function factorial() {
	var n, result, skip;
	return regeneratorRuntime.wrap(function factorial$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					n = 0;
					result = 1;
					skip = 0;

				case 3:
					if (!true) {
						_context.next = 15;
						break;
					}

					if (skip) {
						_context.next = 10;
						break;
					}

					_context.next = 7;
					return result;

				case 7:
					skip = _context.sent;
					_context.next = 11;
					break;

				case 10:
					skip--;

				case 11:
					n++;
					result = result * n;
					_context.next = 3;
					break;

				case 15:
				case "end":
					return _context.stop();
			}
		}
	}, _marked, this);
}

var f = factorial();
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next(10));
</javascript>

It is worth mentioning that this particular transformation into a state machine is designed for stackless coroutines and represents capturing single a stackframe and its execution point. C# and Kotlin coroutines perform similar transformations.

### Summary
Generators with `yield` keyword is one of the most useful and most common implementations of coroutines. Hopefully, this blog helps understanding why and how to use generators and their relation to other coroutines implementations.

Read next: [async/await]({% post_url coroutines/2018-05-03-async-await %}).