---
draft: true
---

Another type of coroutine implementation is "call with current continuation" (abbreviated as `callcc`). It's not as widespread as `async/await` and less intuitive than coroutines as threads implementation. However, it seems be quite influential probably because it the most generic implementation and it existed in Scheme programming language since 70s. Because these coroutines implementation originates in Scheme the examples are also in Scheme.

Before diving into `calcc`, it's worth understanding what is **continuation** or rather what people might mean when they say "continuation". There are several meanings.
1. A callback passed into function. In other words if a function takes another function as an argument, the function passed as an argument is sometimes called "continuation". 
2. A function representing the rest of a program. This is a bit more computer-sciency definition in which "the rest of the program" means that if we transform program so that all the code after current expression is extracted in some function, this function will be continuation for the current expression.
3. Compiler support for call/cc or similar transformation (like generators and async functions).  
4. Representation of a continuation in a particular programming language (e.g. a class or an interface).


### Continuation-passing style

Continuation-passing style (abbreviated as CPS; not to be confused with CSP) is a way to write programs by passing continuation to each function as an argument. For example, here is hello world program in Scheme which uses built-in `display` function to print messages to stdout.
```
(define (main args)
  (display "hello ")
  (display "world")
)
```
And here is the same program but with custom `display-cps` function which takes `continuation` as an additional argument and calls it after printing `message`. The `(lambda () ... )` is Scheme syntax for defining anonymous function which takes no arguments (the second lambda doesn't need to do anything so it returns false because it cannot have empty body `(lambda () #f)`).
```
(define (display-cps message continuation)
  (display message)
  (continuation)
)

(define (main args)
  (display-cps "hello " (lambda ()
    (display-cps "world" (lambda () #f))
  ))
)
```
To have a slightly more complicated example, here is a program which calculates and prints factorial:
```
(define (factorial n)
	(if (= n 0) 1
	(* n (factorial (- n 1))))
)

(define (main args)
	(display (factorial 5))
)
```
To convert it into continuation passing style we add one more argument to the `factorial` function and use almost like a `return` statement, i.e. you can think about `(continuation 1)` as `return 1` in C-like programming language. However, we cannot do `(continuation (factorial (- n 1)))` because `factorial` result is only accessible in its callback. Similarly, in the `main` function we display `result` by providing continuation.
```
(define (factorial n continuation)
	(if (= n 0) (continuation 1)
	(factorial (- n 1) (lambda (result)
		(continuation (* n result))
	)))
)

(define (main args)
	(factorial 5 (lambda (result)
		(display result)
	))
)
```
Here is another example of CPS in which we read file from web sever, save it into a file and open the file (to be fair this example could be broken down further by writing `string-append` in CPS). Hopefully, this can convince you that any program can be rewritten in continuation-passing style. There are certain advantages of explicitly passing continuations, however as you can see the `main` function quickly becomes very nested. This is sometimes referred to as "callback hell". And this is when `callcc` can be really useful.
```
(use http-client)

(define (read-from-url url continuation)
	(continuation (with-input-from-request url #f read-string))
)

(define (save-to-file path data continuation)
	(with-output-to-file path (lambda () (display data)))
	(continuation path)
)

(define (open-file path continuation)
	(system (string-append "open " path))
	(continuation path)
)

(define (main args)
	(read-from-url "http://i.pinimg.com/736x/35/f7/83/35f783f18d40b7d41fae5c51a25709d1.jpg" (lambda (data)
		(save-to-file "src/3-coroutines-as-callcc/0-cps/scheme/no-cat.jpg" data (lambda (path)
			(open-file path (lambda (path)
				(display (string-append "Opened: " path))
			))
		))
	))
)
```
Below is a basic example of using `call/cc` (here `/` is part of the function name just like any other character). This program prints "1" and then invokes `call/cc` which takes lambda as an argument. The lambda is evaluated straight away so it will print "2". Then `(continuation 3)` is called and this is where things become more interesting because calling `continuation` will finish executing code in the lambda (so the monkey will never be printed) and will evaluate the `call/cc` expression to the value we passed to `continuation`. In the example below it's equivalent to replacing `(print (call/cc ... ))` with `(print 3)`. As in the examples above when `continuation` represents the rest of our program except that here we didn't have to make any effort to write code in continuation-passing style. With `call/cc` we can get current continuation without changing our code.
```
(define (print message)
    (display message)
    (newline)
)

(define (main args)
    (print 1)
    (print (call/cc (lambda (continuation)
        (print 2)
        (continuation 3)
        (print "🙈")
    )))
    (print 4)
) 
```
In the example above we use continuation immediately inside the callback. But there are other options like saving it somewhere in memory and using it later and may be even several times. This is exactly what's going on the following example. We define `count` variable and assign `0` to it. Then we call `+` adding `100` and the result of evaluating `call/cc`. The interesting bit here is that we save `continuation` into a global variable `saved-continuation`. Then we "return" from the callback with `(continuation 100)` so the program will do `(print (+ 100 100))`. Later on we within the `if` expression we increment the `count` with `(set! count (+ 1 count))`, print rocket and invoke `saved-continuation`. When calling `saved-continuation` the program jumps back to the place where `call/cc` was invoked and substitutes `call/cc` with current value of `count`. Effectively we're jumping right into the middle of `+` expression (not something you can do in most programming languages). Overall, the program will print:
```
200
🚀
101
🚀
102
🚀
103
```
```
(define (print message)
    (display message)
    (newline)
)

(define (main args)
    (define count 0)

    (print (+ 100 (call/cc (lambda (continuation)
        (set! saved-continuation continuation)
        (continuation 100)
        (print "🙈")
    ))))

    (if (< count 3) (begin
        (set! count (+ 1 count))
        (print "🚀")
        (saved-continuation count)
    ))
)
```
The following diagram illustrates the example above. The interesting part of this is that you can think of continuation as saving current stack and instruction pointer somewhere in memory. This is the analogy we used when looking at coroutines as threads and as `yield/async/await`. And this is how coroutines and continuations are related to each other.

![](/assets/images/coroutines/callcc/0-callcc.png) 

Having access to continuations is a more fundamental concept than yielding control to another coroutine. Therefore, we can use continuations to implement yield/resume and even other control structures such as exceptions. In the example below is the minimal version of implementing `yeild/resume` with `call/cc`. The exact details are not that important. The main idea is still the same as in the previous example, it is to save current continuation into a variable to use it later (in this case `yield-point` and `jump-out`). The example below uses global variables but they could be defined within some "object" with `yield` and `resume` functions so overall it'll look similar to the coroutines as threads example.

```
(define (print message)
    (display message)
    (newline)
)

(define (make-generator callback)
    (define (yield)
        (call/cc (lambda (continuation)
            (set! yield-point continuation)
            (jump-out #f)
        )))
    (define (resume)
        (call/cc (lambda (continuation)
            (set! jump-out continuation)
            (yield-point #f)
        )))
    (define yield-point #f)
    (set! yield-point (lambda (_)
        (callback yield)
        (jump-out #f)
    ))
    resume
)

(define (f yield)
    (print 2)
    (yield)
    (print 4)
    (yield)
    (print 6)
)

(define (main args)
    (print 1)
    (define resume (make-generator f))
    (resume)
    (print 3)
    (resume)
    (print 5)
    (resume)
    (print 7)
)
```
It might seem that continuations support is some kind of compiler hack which does some code transformation to save current continuation (or even current stack and instruction pointer). There is more to it though than just a compiler feature. Continuations are more fundamental and come up in computer science every now and then. For example, in the Definitional Interpreters for Higher-Order Programming Languages paper by John Reynholds. In my free interpretation of the paper it is about writing interpreters for programming languages. If you write an interpreter in pass-by-value programming language, then your target programming language becomes pass-by-value. If you write and interpreter in pass-by-name programming language, then your target programming language becomes also pass-by-name. And the way to overcome this is by using continuations. (You can see more detailed explanation of the by paper by Philip Wadler at Papers We Love meetup video.)
