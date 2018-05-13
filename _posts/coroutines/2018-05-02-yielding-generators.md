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

In [the previous blogpost]({% post_url 2018-05-01-coroutines-as-threads %}) we looked at coroutines as threads implementation which is probably the most intuitive usage for coroutines. However, the most widespread coroutines implementation seems to be the one based on yield/async/await keywords (it's implemented in Python, C#, JavaScript and there is proposal for C++). In the following code examples I will use JavaScript. There are few reasons: JavaScript coroutines implementation is quite typical; JavaScript is dynamically typed so it should be easier to understand examples without paying too much attention to types; JavaScript has C-like syntax so should be readable for most programmers.

#### Why use generators?
TODO

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
In the code above we define a function called `createGenerator`. Note that `createGenerator` has `*` after `function` keyword. This tells JavaScript that this function is a coroutine and we can use `yield` keyword inside it. Obviously, if function is not marked with `*`, then `yield` is illegal and will be cause runtime error in JavaScript or compilation error in compiled languages. (This is similar to [the previous blogpost]({% post_url 2018-05-01-coroutines-as-threads %}) where we couldn't use Lua `coroutine.yield()` outside of coroutine created with `coroutine.create`.) After creating the generator, we assign it to `c` and can use `next()` function to start/resume execution of the coroutine. Each invocation of `next()` changes state of the generator and returns an object which has a property called `value` through which we can access the data yielded by generator. Overall, the program resumes coroutine three times and prints `123` never reaching the line which yields the monkey. To get the monkey we can add one more invocation of `c.next()`.

#### Generators as threads

This might not be the first thing that comes up when you start using generators but there are couple similarities between generators and coroutines as threads. The diagram below illustrates coroutines as threads in which `coroutine` yields execution back to `main` (you can find description of the notation in [the previous blogpost]({% post_url 2018-05-01-coroutines-as-threads %})). 
![](/assets/images/coroutines/yield/0-coroutine.png)

And the diagram below shows a generator. As you can see they are pretty much identical. The main difference is that generators are predominantly used to return values back into calling function. To be fair, coroutines as threads can also pass values from/to coroutine so technically there is little difference, the difference is in the intent.
![](/assets/images/coroutines/yield/1-generator.png)

The point is that because the underlying idea is the same, we could use generators to do context switching similar to coroutines as threads: 
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
Overall, the program keeps resuming coroutine `c`, which prints some value and yields execution back to `main`. It prints `12345` never reaching the line with the monkey. Note that we call `yield` without any values because here the main reason for using coroutine is preemptive concurrency.

#### Generator state

Generators have state and in JavaScript it can be observed in the object returned by `c.next()` function. In the example below, we create a generator which yields twice and in `main` we resume it three times printing result value of both `next()` and `yield`. 
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
The program prints:
```
{ value: undefined, done: false }
undefined
{ value: undefined, done: false }
undefined
{ value: undefined, done: true }
```
Each call of `next()` returns an object with `value` and `done` attributes where `done` is similar to the state of a thread. That is after generator finished executing all instructions it ends up in the `done: true` state. All the values returned by `next()` are `undefined` because generator didn't `yield` anything. The two `undefined` lines are printed by `console.log(yield)`, i.e. `yield` evaluated to `undefined` and this is because we didn't pass any values into the `next()` call. 

As mentioned before the whole point of generators is to return some values. To make it a bit more useful we can `yield` values from generator back into the main function. In the example below we create a generator which yields dog and pig and in the `main` function we resume the generator passing values to it. Note that the first value passed into `c.next()` is lost and the next two values will be the result of evaluating `yield` expression. 
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
Overall the output is:
```
{ value: '🐶', done: false }
B
{ value: '🐷', done: false }
C
{ value: undefined, done: true }
```

#### Stackless yield

JavaScript implementation of coroutines is **stackless** (this is also true for implementations in Python, C#, Kotlin). In particular, this means that coroutines cannot `yield` from sub-functions. In the example below, we create generator which yields a dog and then calls `forEach` on an array which takes an anonymous function `it => { ... }`. Anonymous function here still counts as a sub-function, so we cannot `yield` from inside it (the example below fails at runtime, but in a compiled language it would be a compilation error). 
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
You might attempt to extract the anonymous function into a named function and mark with `*` to make JavaScript happy. However, this won't solve the problem because the new function will become a generator on its own and will not `yield` from the outer `createGenerator()` function.

In this particular case there is an easy way to fix the code by using array iteration syntax which doesn't require anonymous functions. Obviously, this works because JavaScript has some knowledge of how to handle `for` loops containing `yield` expressions.
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
The code works as expected and will print:
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

#### Generators and try/catch/finally

In the previous example we've seen that JavaScript knows how to combine `for` loops and `yield` but it's not the only control structure which can be used transparently with `yield`. In the example below you can see that `yield` works fine with `try/catch/finally`. 
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
It prints:
```
{ value: '🐶', done: false }
catch
{ value: '🚀💥', done: false }
finally
{ value: undefined, done: true }
``` 
In this example, we create a generator and resume it with `c.next()`. The generator will run to the `yield "🐶"` expression which will yield execution back to the main function (note that this happens before evaluating `yield "🐶"` so the `value` variable is not assigned at this point). In the main function we log the result of the `c.next()` and then call `c.next("🚀")`. This continues generator execution which will evaluate `yield "🐶"` to `"🚀"` and assign it to the `value` variable. Because `value` is equal to the rocket, we throw the rocket and end up in the `catch` block which logs `"catch"` and yields `e + "💥"` which is returned to the `main` function and logged as the result of evaluating `c.next("🚀")`. After this `main` resumes generator one more time so generator continues from `yield e + "💥"` in the `catch` and executes `finally`. 

The interesting thing here is that `yield` returns from the generator multiple times without executing code in the `finally` clause. This can't be done with normal `return`s because each `return` from `try/finally` will run code in `funally`. This example also shows that generator can yield/resume execution from `catch` blocks remembering the exception it has caught previously. 
 
#### Infinite generators

The previous examples of generators yielded predefined amount of values. It doesn't have to be the case. In the next example we return factorial values in an infinite loop. In a way this is a lazily evaluated function returning infinite amount of values. Of course, it can be rewritten as some kind of iterable object but sometimes using generators can result in a simpler and more readable code. 
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
(Of course, this is not a valid implementation of factorial. The problem is that factorial function grows quite fast and after few values can't be accurately represented by floating point numbers which JavaScript uses by default.)

#### Generators are state machines

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
