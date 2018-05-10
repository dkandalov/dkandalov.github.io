---
draft: true
---

This is the second blog in a series of blogposts explaining coroutines, how they implemented in various programming languages and how they can make your life better. 
There are currently four blogposts
[coroutines as threads]({% post_url 2018-05-01-coroutines-as-threads %}),
[yielding generators]({% post_url 2018-05-02-yielding-generators %}),
[async await]({% post_url 2018-05-03-async-await %}) and
[call with current continuation]({% post_url 2018-05-06-call-with-current-continuation %}).
You can read them in any order but they probably make more sense when read sequentially.

In the [previous blogpost]({% post_url 2018-05-01-coroutines-as-threads %}) we looked at coroutines implementation as threads which is the most intuitive usage for coroutines. However, the most widespread coroutines implementation seems to be the one based on yield/async/await keywords (it's implemented in Python, C#, JavaScript and there is proposal for C++). There are two parts to it: generators and async/await. In the following code examples I will use JavaScript. It seems to be a good choice because JavaScript coroutines implementation is quite typical, JavaScript is dynamically typed so it should be easier to understand examples without paying too much attention to types, plus JavaScript has C-like syntax so should be readable for most programmers.

#### Generators as threads

The first part of yield/async/await implementation is generators created using `yield` keyword. Below is a diagram showing coroutines as threads followed by diagram showing a generator. As you can see they are pretty much identical. The main difference is that generators are predominantly used to return values back into calling function. In a way it's like a design pattern which uses coroutines for a particular purpose.

![](/assets/images/coroutines/yield/0-coroutine.png)
![](/assets/images/coroutines/yield/1-generator.png)

Here is an example of JavaScript generator which works similar to the first diagram. In the code we define function `createGenerator`. This is similar to `coroutine.create` in Lua code. Note that `createGenerator` has `*` after `function` keyword. This tells JavaScript that this function is a coroutine, so just like in Lua where we couldn't use `coroutine.yield()` outside of coroutine, we can't use `yield` outside functions which are not generators, i.e. not marked with `*`. After creating generator, we assign to `c` and can use `next()` function to start/resume execution of the coroutine. Overall, the program resumes coroutine, which yields back to `main`. It prints `12345` never reaching the line which prints the monkey. 
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

#### Generator state

Similar to threads, generators have state. In the example below, we create a generator which yields twice and resume it three times printing result value of both `next()` and `yield`. The program prints:
```
{ value: undefined, done: false }
undefined
{ value: undefined, done: false }
undefined
{ value: undefined, done: true }
```
Each call of `next()` returns an object with `value` and `done` attributes where `done` is similar to the state of a thread. That is after generator finished executing all instructions it ends up in the `done: true` state. All the values returned by `next()` are `undefined` because we don't yield any values. The two `undefined` lines are printed by `console.log(yield)`, it's `undefined` because we don't pass any values in to the `next()` call. 
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
As mentioned before the whole point of generator is to return some values, so the example above is a bit pointless (although it helps to illustrate the analogy between coroutines as threads and coroutines as generators). To make it a bit more useful we `yield` values from generator back into the main function. In the example below we create generator which yields dog and pig. In the `main` function we resume the generator passing values to it. Note that unlike Lua the first value passed into generator is lost and the next two values evaluated as a result of `yield` expression. So overall the output is:
```
{ value: '🐶', done: false }
B
{ value: '🐷', done: false }
C
{ value: undefined, done: true }
```
<javascript>
function* createGenerator() {
	console.log(yield "🐶");
	console.log(yield "🐷");
} 
const c = createGenerator();
console.log(c.next("will be lost"));
console.log(c.next("B"));
console.log(c.next("C"));
</javascript>

#### Stackless yield

Unlike Lua coroutines which are stackful, JavaScript coroutines implementation is stackless (this also applies to most other languages using yield/async/await coroutines implementation). In particular, this means that we cannot `yield` from sub-function, even if it's an anonymous function. In the example below, we create generator which yields a dog and then calls `forEach` on an array which takes an anonymous function `it => { ... }`. Because JavaScript generators are stackless and anonymous function cannot be marked as generator, we cannot `yield` from inside it. So the code below just crashes.
 
<javascript>
function* createGenerator() {
	console.log(yield "🐶");
	[1, 2, 3].forEach(it => {
		console.log(yield it);
	});
} 
const c = createGenerator();
console.log(c.next("A"));
console.log(c.next("B"));
console.log(c.next("C"));
</javascript>

There is an easy to fix the code in this particular case by using syntax for iterating arrays which doesn't require anonymous functions. The code below will work as expected and will print:
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
Obviously, the two previous examples functionally equivalent so JavaScript must know how to handle `for` loop containing `yield`. It's not the only control structure which can be used transparently with `yield`. In the example below you can see that `yield` works fine with `try/catch/finally`. In this example, we create a generator and resume it with `c.next()`. The generator will run to the `yield "🐶"` expression which will yield execution back to the main function (this happens before evaluating `yield` so `value` is not assigned anything at this point). In the main function we log the result of the `c.next()` and then call `c.next("🚀")`. This continues generator execution evaluating `yield "🐶"` to `"🚀"` and assigning it to the `value` variable. Because `value` is equal to the rocket, we throw the rocket and end up in the `catch` block which logs "catch" and yields an explosion. The `"💥"` is returned to the main function and logged as a result of evaluating `c.next("🚀")`. Main function resumes generator one more time so generator continues from `yield "💥"` in the `catch` and executes `finally`. The main point here is that `yield` can return from generator multiple times without executing code in the `finally`. This is not something you can achieve with normal `return`s.
 
<javascript>
function* createGenerator() {
	try {
		let value = yield "🐶";
		if (value === "🚀") throw value;
		yield "🙈";
	} catch (e) {
		console.log("catch");
		yield "💥";
	} finally {
		console.log("finally");
	}
} 
const c = createGenerator();
console.log(c.next());
console.log(c.next("🚀"));
console.log(c.next());
</javascript>

The previous examples had generators which yielded predefined amount of values. It doesn't have to the case though. In the next example we return factorial values in an infinite loop. In a way this is a lazily evaluated function returning infinite amount of values. Of course, it can be rewritten as some kind of iterable object but sometimes using generators can result in a simpler and more readable code. 
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
To make the above example a bit more complicated, here is factorial generator which takes an argument indicating how many results to skip before yielding a value.
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
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next(10));
</javascript>
The previous examples might look a little bit too magical. To dispel the magic we can look at how the same functionality can be done in JavaScript versions without support for `yield` keyword. Luckily this is easy to do using [BabelJS](https://babeljs.io) which can transpile modern JavaScript (ES2018) to code runnable in the old ES5 language version. The code below is transpiled version of the skipping factorial generator. Note that at the bottom of the example you can see that `console.log(f.next())` code didn't change at all. Also `factorial()` function signature didn't change although its code was transformed. There are some implementation details we can't see in `regeneratorRuntime.wrap()` function but the main point here is that `factorial` code is transformed into a state machine. There is a `switch` statement which switches on the current state of the state machine. For example, initially the state is `0` so we match `case 0` and initialise `n`, `result` and `skip` variables. Then we fall though into `case 3` where `if (!true)` and `if (skip)` evaluate to false and won't be executed. The next state is set to `7` in `_context.next = 7` and the generator returns current result. When main function calls `f.next()` generator will continue execution from `case 7`. So as you can see there is no particular magic going on here. It might not a trivial code transformation going on in the compiler but after all the code becomes just a state machine.

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

### Summary
Generators and `yield` keyword is probably the most useful and the most common implementation of coroutines. In terms of modern languages it existed in Python since 2001 and C# since 2005 so there was a lot of time to try it out. As you can see `yield` is quite similar to coroutines as threads. I like to think about it as a particular design pattern.
