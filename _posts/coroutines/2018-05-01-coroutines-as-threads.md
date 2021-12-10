---
permalink: coroutines-as-threads
---

This post is part of the blogpost series explaining coroutines, how they implemented in various programming languages and how they can make your life better:
1. 👉 [coroutines as threads]({% post_url coroutines/2018-05-01-coroutines-as-threads %}) 👈
2. [yielding generators]({% post_url coroutines/2018-05-02-yielding-generators %})
3. [async await]({% post_url coroutines/2018-05-03-async-await %})
4. [call with current continuation]({% post_url coroutines/2018-05-06-call-with-current-continuation %})

<!--preview-post-from-here-->

The main motivation for these blogposts is that, probably like many other developers, I heard about coroutines, continuations, yield/async/await and even used them to some extent, but I never got to really understand what they mean from computational point of view, how they work and how concepts like continuations relate to coroutines. This is an attempt to clarify coroutines for myself and anyone else interested in the subject.

The classification of coroutines as threads, `yield/async/await` and `call/cc` is my own attempt to identify commonalities between languages. To draw analogy with [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern), quite a few [behavioural patterns](https://en.wikipedia.org/wiki/Behavioral_pattern) are at their core based on [dynamic dispatch](https://en.wikipedia.org/wiki/Dynamic_dispatch). Each pattern adds more details on top of dynamic dispatch to solve a particular problem but fundamentally they all rely on dynamic dispatch. Similarly, coroutines have implementation specific details but they all could be explained with the same core idea of saving current stack and execution pointer and later using this information to continue execution from suspension point.

#### Why use coroutines?

There are multiple reasons you might want to use coroutines.
They will be explained in more details in later posts but here is a quick description of few main use-cases: 

1. **Concurrency in single-threaded environment.** 
Some programming languages/environments have only a single thread. This might be done by design (e.g. in Lua and JavaScript) because it simplifies a lot of things in the language. In other languages like Python, you can have multiple threads but because of [global interpreter lock](https://wiki.python.org/moin/GlobalInterpreterLock) they cannot be used concurrently. Another example is an embedded device running an OS without threads. In all these cases, if you need concurrency, coroutines are your only choice.

2. **To simplify code.** It can be done by using `yield` keyword to write lazy iterables, by using `async/await` to "flatten" asynchronous code avoiding [callback hell](http://callbackhell.com) or by writing asynchronous code in imperative style (and staying away from converting all the code into pure functional style, e.g. see this [blog post](http://blog.paralleluniverse.co/2015/08/07/scoped-continuations/)).

3. **Efficient use of OS resources and hardware.** If the design of your application requires a lot of threads, then you can benefit from coroutines by saving on memory allocation, time it takes to do context switching and ultimately benefit from using hardware more efficiently. For example, if each "business object" in your application is assigned a thread, then by using coroutines you will need less memory and will benefit from faster context switching between coroutines. Another example is using non-blocking IO with many concurrent users. Because in general, threads are more expensive than sockets, you will run out of available OS threads faster than sockets. To avoid this problem you can use non-blocking IO with coroutines.


#### Brief history

There is nothing new about coroutines from computer science point of view. [According to wikipedia](https://en.wikipedia.org/wiki/Coroutine) coroutines were known as early as 1958. There were implemented in high-level programming languages starting with [Simula 67](https://en.wikipedia.org/wiki/Simula) and [Scheme](https://en.wikipedia.org/wiki/Scheme_%28programming_language%29) in 1972. Coroutines were so old news by the 90s that [John Reynolds](https://en.wikipedia.org/wiki/John_C._Reynolds) wrote [The Discoveries of Continuations paper](http://www.cs.ru.nl/%7Efreek/courses/tt-2011/papers/cps/histcont.pdf) in 1993 describing the rediscoveries of continuations. Until about the 80s there were no threads easily available in operating systems so if you needed any concurrent behaviour you would have to use coroutines or something similar. Later on, when threads became widespread, it seems that everyone forgot about coroutines for a while. Until recently, when coroutines came back into the mainstream.


#### Coroutine definition

A coroutine is a function which:
 - can **suspend** its execution (the expression where it suspends is called **suspension point**);
 - can be **resumed** from **suspension point**  (keeping its original arguments and local variables).

This is an informal definition because there seems to be no consensus about what exactly "coroutine" means. 
There are few ways in which coroutines are implemented in programming languages. The most widespread implementations are coroutines as threads, yield/async/await and "call/cc" (which stands for "call with current continuation"). Under the hood they all use the same idea, so it might be useful to think about them as design patterns which use the same underlying mechanism to solve different problems.


## Coroutines as threads

[Lua](https://www.lua.org/about.html) is a scripting programming language designed to be used as an embedded language in large applications (thinking about it as "javascript for interacting with C" might be a fair analogy). In case you never encountered Lua, it is the most used scripting language in the gaming industry and definitely falls into the category of industrial strength enterprise languages.

Lua is good for the purpose because it has quite typical implementation of coroutines as threads and has straightforward syntax which should be readable for most people.

#### Notation
<a name="notation"/>

In order to illustrate coroutines, I will use the following graphical notation: 
![](/assets/images/coroutines/coroutines-as-threads/0-subfunction.png)

In this notation, rectangles represent functions as a sequence of instructions executed from the top to the bottom. Solid lines represent threads with arrows showing direction in which the thread executes instructions. For example, in the diagram above a thread starts executing program's `main` function, at some point it calls `function`, executes it, returns back to the execution point in `main`, finishes `main` and terminates the whole program (`main` here represents program's entry point named after ["main" function in C](https://en.wikipedia.org/wiki/Entry_point#C_and_C++)). 

An equivalent code in Lua which prints `hello`, executes sub-function to print `from`, then returns to `main` and prints `Lua`, looks like this: 

<lua>
function sub_routine()
	print("from ")
end

print("hello ")
sub_routine()
print("Lua")
</lua>

#### Basic coroutine

Now here is a diagram representing execution of a basic coroutine: 
![](/assets/images/coroutines/coroutines-as-threads/1-coroutine.png)

In the diagram some thread enters `main`, executes a bit of code and invokes the coroutine. Coroutine executes few instructions until it reaches **suspension point** which saves current **stack and instruction pointer** somewhere in memory. (In this context "stack" and "instruction pointer" are used in an abstract way and don't necessarily imply any particular implementation. They are used as a convenient way to think about what's going on.) After the suspension point the coroutine returns back to `main` just like a normal sub-function. Some time later, after executing a bit of code, `main` calls the coroutine again. Coroutine starts executing from the last suspension point, i.e. effectively it restores saved stack and jumps back to the saved instruction pointer. After executing a few more commands the coroutine reaches another suspension point which saves the current stack and instruction pointer again and returns back to `main`. After this `main` executes a few more commands and the whole program terminates. (As you have probably noticed, the coroutine didn't fully finish execution before finishing `main`.)

Below is the equivalent code in Lua: 
<lua>
c = coroutine.create(function()
	print(2)
	coroutine.yield()
	print(4)
	coroutine.yield()
	print("🙈")
end)

-- error: attempt to yield from outside a coroutine
--coroutine.yield()

print(1)
coroutine.resume(c)
print(3)
coroutine.resume(c)
print(5)
</lua>

First of all, we define coroutine with the `coroutine.create` [library function](https://www.lua.org/pil/9.1.html) by passing an anonymous function as an argument. After assigning the coroutine to variable `c`, `main` prints `1` and starts the coroutine with the `coroutine.resume` function. The coroutine prints `2` and calls another library function `coroutine.yield` which acts as a suspension point, i.e. saves stack and instruction pointer of the coroutine and returns to `main`. After this `main` prints `3`, resumes coroutine again which prints `4` and yields back to `main` one more time. Overall, the program prints `12345` and never reaches the line to print monkey (similar to the diagram above which never finishes execution of coroutine). Note that we can only call `coroutine.yield` from the coroutine body. If we attempt to do it from the `main`, the code will fail at runtime with "attempt to yield from outside a coroutine" error.

#### Coroutine status

Similar to threads, coroutines can have status. In the example below we create a coroutine but instead of printing numbers we print the result of `coroutine.status(c)` which, as you can guess, returns the status of coroutine `c`. This example will print status `suspended` when invoked in `main` and `running` when in coroutine `c`. After the coroutine executes all the commands, it ends up with the `dead` status. This mimics the status of threads given that they can only be executed one at a time. (In case you were wondering, in Lua `..` is a string concatenation operator similar to `+` in most C-like languages.) 
<lua>
c = coroutine.create(function()
	print("c is: " .. coroutine.status(c)) -- c is: running
	coroutine.yield()
	print("c is: " .. coroutine.status(c)) -- c is: running
end)

print("c is: " .. coroutine.status(c)) -- c is: suspended
coroutine.resume(c)
print("c is: " .. coroutine.status(c)) -- c is: suspended
coroutine.resume(c)
print("c is: " .. coroutine.status(c)) -- c is: dead
</lua>

#### Send/receive values from coroutines

Coroutines in Lua can send/receive values at suspension points (admittedly, in this case analogy with threads doesn't work that well).
<lua>
c = coroutine.create(function(n)
	print("c received: " .. n)
	n = coroutine.yield(2)
	print("c received: " .. n)
	n = coroutine.yield(4)
	print("c received: " .. n)
end)

_, m = coroutine.resume(c, 1)
print("main received: " .. tostring(m))
_, m = coroutine.resume(c, 3)
print("main received: " .. tostring(m))
_, m = coroutine.resume(c, 5)

</lua>
In the code above we create coroutine as usual with `coroutine.create` function but unlike the previous examples we pass one more argument to `coroutine.resume`. Initially, we pass `1` so when the coroutine starts, `n` has a value of `1`. Coroutine prints `1` and yields it's execution returning `2`. In the `main` the expression `coroutine.resume(c, 1)` evaluates as `2` by getting yielded value from the coroutine and assigns it to variable `m` (in this example `_` is part of multi-assignment and can contain an error message). Overall, the program will print the following:
```
c received: 1
main received: 2
c received: 3
main received: 4
c received: 5 
```

#### All functions as coroutines

In the diagram below, if you ignore entry and exit points into the `main` function, then the whole invocation sequence looks quite symmetric. There seems to be no big difference between `main` and `coroutine` as if they are just two threads switching execution between each other.
![](/assets/images/coroutines/coroutines-as-threads/2-symmetry1.png)

So we could rename `main` and `coroutine` to `coroutine 1` and `coroutine 2`. 
![](/assets/images/coroutines/coroutines-as-threads/2-symmetry2.png)

And, in fact, there is a way to write code with the same functionality using two coroutines. In the following example `main` function resumes coroutine `c1` which resumes coroutine `c2`, and then coroutines switch between each other similar to the diagram above.
<lua>
c2 = coroutine.create(function()
	print(2)
	coroutine.yield()
	print(4)
	coroutine.yield()
end)

c1 = coroutine.create(function()
	print(1)
	coroutine.resume(c2)
	print(3)
	coroutine.resume(c2)
	print(5)
end)

coroutine.resume(c1)
</lua>
This is the most basic example of how to achieve concurrency in a single-threaded environment by using [cooperative multitasking](https://en.wikipedia.org/wiki/Cooperative_multitasking) which is one of the main reasons to use coroutines as mentioned in the beginning of this blogpost. If you imagine that `coroutine.yield` and `coroutine.resume` are automatically sprinkled over the coroutines by some other program which we could call "scheduler", then we no longer control context switching between coroutines and it becomes [preemptive multitasking](https://en.wikipedia.org/wiki/Preemption_(computing)#Preemptive_multitasking). Arguably, this is the point when we can no longer say that we are dealing with coroutines.

#### Stackful vs stackless coroutines

The final thing worth mentioning in the context of coroutines as threads, is the ability of coroutines to yield execution from sub-functions. For example, in the diagram below `main` invokes `coroutine` which in its turn invokes a `sub-function`. (The dotted lines in the diagram have the same meaning as solid lines. The only reason for dotted lines is to make the diagram less cluttered.)

![](/assets/images/coroutines/coroutines-as-threads/3-sub-yield.png)

When `sub-function` reaches the suspension point, it returns back all the way into the `main` function. After that, `main` executes some more code and resumes the `coroutine`. When resumed, the `coroutine` continues execution directly from the suspension point in `sub-function`, which when finished returns normally to the `coroutine` and to `main`. If you think about `main` as one thread and `coroutine` with `sub-function` as another thread, then this is a perfectly reasonable behaviour because when threads switch execution between each other it doesn't matter if one of the threads is currently in the middle of some sub-function. 

Coroutines implementations which are capable of yielding from sub-functions are called **stackful**, i.e. they can remember the whole invocation stack. Other implementations of coroutines, which can only yield execution from the top level of coroutine function, are **stackless**. Lua implementation of coroutines is stackful so we can write code like in the example below, which outputs `1234567`.  
<lua>
function sub_function()
	print(3)
	coroutine.yield()
	print(5)
end

c = coroutine.create(function(n)
	print(2)
	sub_function()
	print(6)
end)

print(1)
coroutine.resume(c)
print(4)
coroutine.resume(c)
print(7) 
</lua>

### Summary
There are few terms related to the idea of coroutines being used as threads: 
[fibers](https://en.wikipedia.org/wiki/Fiber_(computer_science)), 
[green threads](https://en.wikipedia.org/wiki/Green_threads), 
[protothreads](https://en.wikipedia.org/wiki/Protothreads) and 
[goroutines](https://en.wikipedia.org/wiki/Go_(programming_language)#Concurrency:_goroutines_and_channels).
They all mean similar things but the encompassing theme is to not use OS threads for concurrency or multitasking. The reason might be that the OS or programming environment doesn't support threads at all or that it's more efficient to use custom context switching mechanism. There is no specific requirement, however, that there is only one OS thread or CPU executing coroutines and particular implementation can be using multiple threads, but this is implementation details.

Overall, thinking about coroutines as lightweight threads is the most intuitive and the most high-level metaphor for coroutines. Compared to actual threads the biggest conceptual difference is the lack of scheduler (all context switching must be done by the program) and the fact that coroutine implementations can be stackless.

Read next: [yielding generators]({% post_url coroutines/2018-05-02-yielding-generators %}).   