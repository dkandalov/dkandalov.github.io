---
permalink: type-variance-of-an-assignment
---

Type variance is one of the most difficult and confusing subjects when it comes to statically typed programming languages. 
It is often explained as somewhat convoluted rules about container classes and how they can be substituted based on type arguments. 
This blog is an attempt to explain type variance using much simpler things like variable assignment and functions! 

The code examples are written in [Kotlin](https://kotlinlang.org).
If you're not familiar with it, you should be ok after skimming 
[creating instances of classes](https://kotlinlang.org/docs/reference/classes.html#creating-instances-of-classes), 
[variable assignment](https://kotlinlang.org/docs/reference/basic-syntax.html#defining-variables) and
[functions](https://kotlinlang.org/docs/reference/basic-syntax.html#defining-functions)
sections of documentation. 


### Setup

Here is a simple hierarchy where class `B` inherits from class `A`:
<kotlin>
open class A
open class B: A() {
    fun foo() {}
}
</kotlin>
Classes `A` and `B` correspond to **types** with the same names.
Type `B` is a subtype of `A` because class `B` inherits from `A`. 
From a practical point of view, this means that we can replace `A` objects with `B` objects and the program will still compile. 
For example, given:
<kotlin>
A()
B().foo()
</kotlin>
Replacing `A` with `B` is ok but replacing `B` with `A` is not:
<kotlin>
<s>A()</s>B() // ok
<s>B()</s>A().foo() // compilation error because A doesn't have foo() method
</kotlin>

This is pretty much the definition of subtyping:
 
|              | replaced with A | replaced with B |
| ------------ | --------------- | --------------- |
| **object A** | ✅ | ✅ |
| **object B** | ❌ | ✅ |
{:.post-table}


### Variable assignment

Let's assign `A` and `B` objects to some variables:
<kotlin>
val x1: A = A()
val x2: B = B()
</kotlin>

Just like in the previous example replacing **object** `A` with `B` is ok, but not the other way round
(note that this is not the same as replacing characters "A" and "B"):
<kotlin>
val x1: A = <s>A()</s>B() // ok
val x2: B = <s>B()</s>A() // compilation error
</kotlin>

It becomes a bit more interesting when we try to replace variable **types** `A` and `B`:
<kotlin>
val x1:<s> A</s> B = A() // compilation error
val x2:<s> B</s> A = B() // ok
</kotlin>

The interesting thing here is that unlike examples before replacing `A` with `B` failed to compile but replacing `B` with `A` was ok.
In other words, replacing `A` and `B` in **object** constructors has different effect compared to replacing `A` and `B` in **variable types**.
 
This also shows that if `B` is a subtype of `A`, we cannot just replace all "A" symbols with "B" everywhere and expect the code to compile.

This is summarised in the table below:
 
|                | replaced with A   | replaced with B   |
| -------------- | ----------------- | ----------------- |
| **object A**   | ✅ | ✅ |
| **object B**   | ❌ | ✅ |
|                |**replaced with A**|**replaced with B**|
| **val type A** | ✅ | ❌ |
| **val type B** | ✅ | ✅ |
{:.post-table}
 

### Covariance of read

Following the previous example, we can extract object constructors into `readA()` and `readB()` functions:
<kotlin>
fun readA(): A = A()
fun readB(): B = B()
val x1: A = readA()
val x2: B = readB()
</kotlin>

Similarly, we can try replacing `readA` with `readB` and vice versa.
Because `read` functions directly call object constructors,
it's not surprising that the result is the same as when we were replacing `A` and `B` objects.
<kotlin>
val x1: A = <s>readA()</s>readB() // ok
val x2: B = <s>readB()</s>readA() // compilation error
</kotlin>

The difference compared to using objects directly is that `readA` and `readB` functions have their own types:
<kotlin>
val x1: () -> A = <s>::readA</s> ::readB // ok
val x2: () -> B = <s>::readB</s> ::readA // compilation error
</kotlin>

|           | replaced with readA | replaced with readB |
| --------- | ------------------- | ------------------- |
| **readA** | ✅ | ✅ |
| **readB** | ❌ | ✅ |
{:.post-table}

The table results look identical to the one we've seen when replacing `A` and `B` objects.
Since `B` is a subtype of `A`, we can conclude that a function with type `() -> B` is a subtype of `() -> A`. 
Graphically:
<plain-text>
A    () -> A
⬆      ⬆
B    () -> B
</plain-text>
The fat arrows which show subtyping are pointing in the same direction, 
so the `read` functions are said to be **covariant**.


### Contravariance of write

We can modify the assignment example in another way by extracting assignments into functions
(there is no need for `x1` and `x2` variables, they are left only to illustrate the transformation):
<kotlin>
fun writeA(a: A) { val x1: A = a } 
fun writeB(b: B) { val x2: B = b }
writeA(A())
writeB(B())
</kotlin>

When replacing `writeA` with `writeB` and vice versa, we get the following output 
which matches the results of replacing `A` and `B` variable **types**:
<kotlin>
<s>writeA</s> writeB(A()) // compilation error
<s>writeB</s> writeA(B()) // ok
</kotlin>

The same can be expressed by replacing `writeA` and `writeB` references:   
<kotlin>
val x1: (A) -> Unit = <s>::writeA</s> ::writeB // compilation error
val x2: (B) -> Unit = <s>::writeB</s> ::writeA // ok 
</kotlin> 

|            | replaced with writeA | replaced with writeB |
| ---------- | ------------------- | ------------------- |
| **writeA** | ✅ | ❌ |
| **writeB** | ✅ | ✅ |
{:.post-table}

If we swap rows and columns in the table above, then the results will match the summary table for `A` and `B` objects.
But also `writeA` and `writeB` labels will swap places with each other, so we can conclude that the type `(A) -> Unit` is a subtype of `(B) -> Unit`. 
Graphically:
<plain-text>
A    (A) -> Unit
⬆        ⬇
B    (B) -> Unit
</plain-text>
The fat arrows which show subtyping are pointing in different directions, so the `write` functions are said to be **contravariant**.


### Summary

The results of replacing objects and types in an assignment:

|                | replaced with A   | replaced with B   |
| -------------- | ----------------- | ----------------- |
| **object A**   | ✅ | ✅ |
| **object B**   | ❌ | ✅ |
|                |**replaced with A**|**replaced with B**|
| **val type A** | ✅ | ❌ |
| **val type B** | ✅ | ✅ |
{:.post-table}

The results of replacing `read` and `write` functions:

|            | replaced with readA    | replaced with readB    |
| ---------- | ---------------------- | ---------------------- |
| **readA**  | ✅ | ✅ |
| **readB**  | ❌ | ✅ |
|            |**replaced with writeA**|**replaced with writeB**|
| **writeA** | ✅ | ❌ |
| **writeB** | ✅ | ✅ |
{:.post-table}
 


It is possible to rewrite `read` and `write` in a more generic way using type parameters. The rewritten functions will keep all the properties described above.
<kotlin>
fun &lt;T&gt; read(): T = error("👻")
fun &lt;T&gt; write(value: T) {}
val x: B = <s>read&lt;B&gt;</s>read&lt;A&gt;() // compilation error
<s>write&lt;A&gt;</s>write&lt;B&gt;(A()) // compilation error
</kotlin>

Variance depends on the argument position in function signature.
For example, given a generic function which consumes values of type `T1` and `T2`, and returns value of type `U`,
the function will be covariant in its return type `U` and contravariant in `T1` and `T2`: 
<kotlin>
&nbsp;                    contravariant
                       👇      👇
fun &lt;T1, T2, U&gt; foobar(t1: T1, t2: T2): U = error("👻")
                                        👆
                                     covariant
</kotlin>

Overall, the main message here is that covariance and contravariance rules are not arbitrary
but a logical conclusion from type substitution and variable assignment.
