---
draft: true
---

The main motivation for this blog post is that I heard about coroutines, continuations, yield/async/await in various languages. And I even used them to some extent, but somehow I never got to really understand what they mean from computational point of view, how they work and how they relate to each other. Talking to other developers I think this is not just me. There is general not a lot of awareness in general. So this is an attempt to clarify coroutines.

### Brief History

There is nothing new about coroutines from computer science point of view. According to wikipedia coroutines were known as early as 1958. There were implemented in Simula 67 and in Scheme in 1972. They are so not new even by 90s that John Reynolds wrote The Discoveries of Continuations paper in 1993 describing the rediscoveries of continuations. Until about 80s there were no threads easily available in operating systems so if you needed any concurrent behaviour you would have to use coroutines or something similar. Later on when threads because widespread it seems that everyone forgot about coroutines for a while. Until recently when they came back into mainstream probably because some of the languages (like Python and JavaScript) don't have or can't use threads by design.

### Coroutine definition

A coroutine is a function which:
 - can *suspend* its execution (the expression where it suspends called *suspension point*)
 - can be *resumed* from *suspension point*  (keeping its original arguments and local variables).

This is not a textbook definition because I couldn't find one and there seems to be no consensus about what exactly "coroutine" means. This is quite simple definition but there is more to it.

### Why use coroutines?

There are multiple reasons you might want/need to use coroutines.

1. Cooperative multitasking in single-threaded environment. 
As mentioned before, some languages don't have threads. This can be by design like in Lua and JavaScript (because it can simplify a lot of things). Or like in Python which actually has threads but because of global lock they cannot be used concurrently. Or it might be an embedded device which has OS without thread support. In all these cases, if you need concurrency, coroutines might be your best option

2. Another use-case is simplifying code. E.g. using yield to write iterables in a simpler way, avoiding callback hell or writing asynchronous code in a simpler way avoiding falling in functional world.

3. If by design your applications requires a lot "threads" then you might benefit from coroutines because they are cheaper than OS threads.

4. In general, threads are more expensive than for example sockets. So you are more likely to run out of available threads than sockets. To avoid this problem you can use non-blocking IO with coroutines.

-----
There are few ways in which coroutines are implemented in programming languages. The most widespread implementations are coroutines as threads, yield/async/await and call/cc (aka "call with current continuation"). Under the hood they all use same ideas, so you might think of them as design patterns.


### Coroutines as threads

Lua has quite typical implementation of coroutines as threads and it has straightforward syntax which should be readable for most people. In case you never encountered Lua, it's quite big in gaming industry and definitely is a serious enterprise language (you might think of it as a scripting language for interacting with C).

In order to illustrate coroutines, I will use the following notation I came up with, where rectangles represent functions as sequence of code instruction (executed from top to the bottom), and arrow lines represent thread of execution. (Note this is not UML or any other formal notation.) For example, executing a normal function looks like in the following diagram. Some thread starts executing program's `main` function, at some point it calls `function`, executes it, returns back to the execution point in `main`, finishes main and the whole program (`main` here represents entry point in the whole program similar to "main" function in C). 

![](/assets/images/coroutines/coroutines-as-threads/0-subfunction.png)


This is what a similar function looks like in Lua. When executed it prints "hello", executes sub-function which prints "from", returns to `main` and prints "Lua".

<lua>
function sub_routine()
	print("from ")
end

print("hello ")
sub_routine()
print("Lua")
</lua>

Now here is a diagram representing execution of a coroutine. Similarly some thread enters `main`, executes a bit of code and invokes coroutine. Coroutine executes some instructions until it reaches **suspension point** which saves current **stack and instruction pointer** somewhere in memory. (Here "stack" and "instruction pointer" are used in an abstract way and don't mean any particular implementation details. It's just a convenient way to think about what's going on.) After this coroutine returns to `main` just like a normal sub-function. Some time later after executing a bit of code `main` calls coroutines again. Coroutine starts executing from the last suspension point, i.e. effectively it restores saved stack and jumps back to saved instruction pointer. After executing few more commands coroutines reaches another suspension point which saves current stack and instruction pointer again and returns to `main`. After this `main` executes few more commands and the whole program finishes. (As you can see we it didn't have to finish execution of the coroutine.)

![](/assets/images/coroutines/coroutines-as-threads/1-coroutine.png)

Below is Lua code which does similar thing. Initially `coroutine.create` (it's a library function in Lua) take anonymous function which defines coroutine code. After assigning coroutine to variable `c`, `main` prints "1" and invokes coroutine. Coroutine prints "2" and calls another library function `coroutine.yield()` which acts as a suspension point, i.e. saves stack and instruction pointer for the coroutine and returns to `main`. After this `main` prints "3", invokes coroutine which prints "4" and yields one more time. Overall the program prints "12345" but reaches the line to print monkey (similar to the diagram above). Note that we can only call `coroutine.yield()` from the coroutine. If we attempt to do it from the `main`, Lua will stop with "attempt to yield from outside a coroutine" error.

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

Similar to threads, coroutines have status. In the example below we create a coroutine but instead of printing numbers we print the result of invoking `coroutine.status(c)` which is a library function which as you can guess returns coroutine status. (In Lua `..` is string concatenation operator similar to `+` in most C-like languages.) This example will print status `suspended` in `main` and status `running` when in coroutine `c` until the coroutine executes all the command and ends up with `dead` status. In a way this mimics status of threads given that they can only be executed one at a time. Overall the code below will print:
```
main: suspended
c: running
main: suspended
c: running
main: suspended
c: running
main: dead
```

<lua>
c = coroutine.create(function()
	print("c: " .. coroutine.status(c))
	coroutine.yield()
	print("c: " .. coroutine.status(c))
	coroutine.yield()
	print("c: " .. coroutine.status(c))
end)

print("main: " .. coroutine.status(c))
coroutine.resume(c)
print("main: " .. coroutine.status(c))
coroutine.resume(c)
print("main: " .. coroutine.status(c))
coroutine.resume(c)
print("main: " .. coroutine.status(c))
</lua>

Unlike threads, coroutines in Lua can pass values from/to suspension points. In the code below we create coroutine as usual with the `coroutine.create` function but unlike the previous examples when on coroutine `resume` we pass one more argument. Initially, we pass `1` so when coroutine starts `n` has value of `1`. Coroutine prints "1" and yields it's execution returning `2`. In `main` the expression `coroutine.resume(c, 1)` receives `2` from the coroutine and assigns it to variable `m` (you can ignore `_,` in this example, this is multi-assignment of one more value which is not essential here). When executed, the code below will print:
```
c <- 1
main <- 2
c <- 3
main <- 4
c <- 5
```
 
<lua>
c = coroutine.create(function(n)
	print("c <- " .. n)
	n = coroutine.yield(2)
	print("c <- " .. n)
	n = coroutine.yield(4)
	print("c <- " .. n)
end)

_, m = coroutine.resume(c, 1)
print("main <- " .. tostring(m))
_, m = coroutine.resume(c, 3)
print("main <- " .. tostring(m))
_, m = coroutine.resume(c, 5)
</lua>

In the diagram below, if you ignore entry and exit points into the `main` function, then the whole invocation sequence looks quite symmetric. That is there seems to be no big difference between `main` and `coroutine` as if they are just two threads switching execution between each other.

![](/assets/images/coroutines/coroutines-as-threads/2-symmetry1.png)
![](/assets/images/coroutines/coroutines-as-threads/2-symmetry2.png)

And in fact there is a way to write the same code in Lua using two coroutines. In the example below `main` function resumes coroutine `c1` which resumes coroutine `c2` and then coroutines switch between each other similar to the diagram above. 
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

The final thing worth mentioning in the context of coroutines as threads is the ability of coroutines to yield execution from sub-functions. For example, in the diagram below `main` invokes coroutine which invokes sub-function. (There is no particular meaning of the dotted line in the diagram. The only reason for dotted line is to make the diagram a bit more readable.) When sub-function reaches suspension point, it returns back all the into the `main` function. After that `main` executes some more code and resume the coroutine. When resumed, coroutine continues execution directly from the sub-function which when finished returns normally to coroutine and to `main`. If you think about `main` as one thread and coroutine with sub-function as another function, this is perfectly reasonable behaviour because when execution is switched between threads it doesn't matter if one of the threads is currently in the middle of some sub-function. 

![](/assets/images/coroutines/coroutines-as-threads/3-sub-yield.png)

Coroutines implementations which are capable of yielding from sub-functions are called **stackful**. Other implementations of coroutines are **stackless**, i.e. they can only yield execution from top level of coroutine function. Lua implementation of coroutines is stackful so we write code like in the example below which outputs "1234567":  
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
There are few related terms to the idea of coroutines being used as threads: fibers, green threads, protothreads, goroutines. In particular, green threads mean threads which are not implemented on top of OS threads and, therefore, can be more lightweight and used by execution environment in more optimal way. Unlike coroutines though, context switch between green threads is done by scheduler and cannot be controlled by the program. This is how goroutines work except they're named with one-letter difference with coroutines what can be quite confusing.

Overall, thinking about coroutines as threads is probably the most intuitive and straightforward to understand them. The biggest difference is the lack of scheduler (all context switching must be done by the program) and the fact that coroutine implementations can be stackless.