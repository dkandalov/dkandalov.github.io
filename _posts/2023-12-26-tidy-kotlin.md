---
draft: true
permalink: tidy-kotlin
---

<i>==== This is work-in-progress. Feel free to share the link but be aware that the content will change. Feedback is welcome via email or social media. ====</i>

This blog post is intended to be a catalog of Kotlin tidyings based on my experience of writing server-side Kotlin. The term "tidying" is inspired by the ["Tidy First?" book](https://www.oreilly.com/library/view/tidy-first/9781098151232) and essentially means a small refactoring. Some of them are specific to Kotlin, while others are applicable to any programming language.

These are not rules but more of a set of suggestions on how to improve the code. Each tyding mentions reasons bihind it. Let me know if some reasons are missing or if you disagree with them. Be aware that depending on the context it might be better to avoid or delay tidying.

I plan to keep this list updated so it might naturally evolve over time.

### Contents
1. [High-level abstractions first](#high-level-abstractions-first)
2. [Maximum privacy](#maximum-privacy)
3. [Keep variables close to their usages](#keep-variables-close-to-their-usages)
4. [Inline variables with single usage](#inline-variables-with-single-usage)
5. [Put parameters on one or separate lines](#put-parameters-on-one-or-separate-lines)
6. [Stop the CONSTANT SHOUTING](#stop-constant-shouting)
7. ...


### High-level abstractions first

The main motivation for this tidying is to improve the navigability of the codebase.

Let's assume we're mostly familiar with the codebase and would like to remind ourselves what `FruitStore` interface looks like. 
We open `FruitStore.kt` containing the following code. We have to skim the file from points 1️⃣ to 4️⃣ until we finally get to the `FruitStore` interface at points 5️⃣&nbsp;and&nbsp;6️⃣.

<kotlin>
sealed interface Fruit {...} 1️⃣ 👀

data class Apple(...) : Fruit {...} 2️⃣ 👀

data class Banana(...) : Fruit {...} 3️⃣ 👀

data class StorageId(...) {...} 4️⃣ 👀

interface FruitStore {
    fun store(apples: List&lt;Apple&gt;): Result&lt;StorageId&gt; 5️⃣ 👀
    fun store(bananas: List&lt;Banana&gt;): Result&lt;StorageId&gt; 6️⃣ 👀
}

class FruitStoreInTheCloud : FruitStore {
    override fun store(apples: List&lt;Apple&gt;): Result&lt;StorageId&gt; {...}
    override fun store(bananas: List&lt;Banana&gt;): Result&lt;StorageId&gt; {...}
}
</kotlin>

Real-world APIs can be much bigger and might have intermediate interfaces, so we can't just stop skimming at the first interface. We also can't start scrolling bottom-up (as if reading bottom-up was normal) in case there are implementation(s) of the interface.

The best solution is to put the most important thing in the `FruitStore.kt`, i.e. `FruitStore` interface at the top of the file. After opening the file, we can go straight to `FruitStore` at points 1️⃣ and 2️⃣. 
<kotlin>
interface FruitStore {
    fun store(apples: List&lt;Apple&gt;): Result&lt;StorageId&gt; 1️⃣ 👀
    fun store(bananas: List&lt;Banana&gt;): Result&lt;StorageId&gt; 2️⃣ 👀
}

sealed interface Fruit {...}

data class Apple(...) : Fruit {...}

data class Banana(...) : Fruit {...}

data class StorageId(...) {...}

class FruitStoreInTheCloud : FruitStore {
    override fun store(apples: List&lt;Apple&gt;): Result&lt;StorageId&gt; {...}
    override fun store(bananas: List&lt;Banana&gt;): Result&lt;StorageId&gt; {...}
}
</kotlin>

In this example, putting higher-level abstraction first saved us from skimming four other classes, which you might argue is not that much. This is a fair point. One problem is that the cost can be higher in a real code and it tends to grow as the codebase grows. Another is that small issues (as well as improvements) can have a cumulative effect. Ignoring the navigation issue in one place is ok, ignoring it across the whole codebase is much worse.


### Maximum privacy

The idea of maximum privacy is to keep values, functions and classes as private as possible.
There are a few reasons for that:
 - Private declaration is easier to understand because the context in which it's used is limited and it's likely to have fewer usages to analyse.
 - Because it's easier to understand, it's easier to modify (or delete). With fewer usages, there are fewer things that can go wrong when we change the function/class.
 - It's also easier for the compiler/IDE/editor to type check or analyse the code because there are fewer places to check.
 - Reduced coupling. As the codebase evolves private code is less likely to be used and pull the design of the function/class in various directions, so there is less design tension.
 - Namespace pollution. Unnecessarily public functions/classes show up in auto-completion making it harder to choose the right function/class.
 - Specific to Kotlin support in IntelliJ, when searching for short public names and fields of data classes can be really (unusably) slow, so you'll have to resort to pure text search.

Imagine we open a file with the code below and try to understand what it's doing. The `FruitStoreInTheCloud` class somewhat makes sense. It stores apples/bananas and returns an ID on success. The `handle()` function is a bit of a mystery though. The name is too generic, its type signature is not particularly revealing and its implementation ([collapsed](https://www.jetbrains.com/help/rider/Code_Folding.html) in the code below) makes us wonder if it's mostly redundant. We try `Find Usages`, but the name is too generic and the IDE search doesn't finish in a reasonable time. We get bored wondering if the search will ever finish. Text search finishes quickly with too many results to be sure they all match the same `handle()` function. We try the final trick of leaning on the compiler. We make the function `private` and compile the project. Luckily, it just works meaning that the `handle()` function is not used anywhere else, so running `FruitStoreInTheCloudTests` should be enough to validate our tidying if we choose to go ahead with it. We could've saved some time and a few WTFs if only the function was `private` in the first place.

<kotlin>
class FruitStoreInTheCloud : FruitStore {
    override fun store(apples: List&lt;Apple&gt;): Result&lt;StorageId&gt; {...}
    override fun store(bananas: List&lt;Banana&gt;): Result&lt;StorageId&gt; {...}
}

fun handle(fruit: Fruit, f: (Fruit) -&gt; Unit): Fruit {...} 👀 😕
</kotlin>

There is a question if fields in test classes need to be as `private` as possible. All the reasons above still apply and it's good to have fewer special cases by using the same rules for production and test code, so this would be my preference. The main argument against it is that test classes rarely share their fields so adding the `private` keyword for each field and function is unnecessarily verbose. This is a valid reason and interestingly earlier versions of  Kotlin had `internal` as a default visibility (see [this blog post](https://blog.jetbrains.com/kotlin/2015/09/kotlin-m13-is-out/#visibilities)). If you go down this path, you might want to reconfigure IntelliJ to apply inspection which suggests making the field/function `private` only to tests.
 
Looking at this tidying from the [code as data](https://en.wikipedia.org/wiki/Code_as_data) point of view, this is a form of [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)). This might be a reasonable analogy considering the code base and people involved in software development as a [sociotechnical system](https://en.wikipedia.org/wiki/Sociotechnical_system).


### Keep variables close to their usages

Keep variables (both `val`s and `var`s) close to where you use them. This is a simple way of saying to declare variables in the innermost scope and within the minimum amount of lines/statements from usages. The main goal of this tidying is higher code cohesion. More specifically the benefits are:
- Reduced cognitive load while reading code. With fewer things to remember, you can focus on other aspects of the code.
- Discover/communicate that variables are only related to a specific scope. Since a smaller scope can provide a higher privacy level, you also get the benefits of [Maximum privacy](#maximum-privacy).
- Discover/communicate dependencies. As soon as you try moving a variable, it will "pull" on all the variables/functions that are using it. You might find that they can all be moved into a smaller scope. This is a way to organise code into "clusters".
- Cohesive code can lead to other tidyings like inline single usage, or extract function.

[Scopes in Kotlin](https://kotlinlang.org/spec/scopes-and-identifiers.html) have a specific well-defined meaning but the for purpose of this tidying it might be useful to think of "scope" in a more vague way as "an area of code which makes sense as a whole". For example, paragraphs can be cohesive enough to make sense on their own (sure, there is a question if they should be extracted into functions, but we don't know yet if it's possible before doing the tidying).

To illustrate the distance between variable declaration and its usage(s) imagine we come across a function with the following code. There are two lines between point 1️⃣ and the only usage of `apple`, and four lines between point 2️⃣ and the only usage of `banana`. This creates coupling between the paragraphs of code, or "tension" which we could overall quantify as 2 + 4 = 6.
<kotlin>
val apple = Apple(...)    1️⃣ 👀
val banana = Banana(...)  │  2️⃣ 👀
                          │  │
process(apple)          ◄─┘  │
doSomething()                │
                             │
process(banana)         ◄────┘
doSomethingElse()
</kotlin>
After the tidying, the code might look like in the snippet below.
<kotlin>
val apple = Apple(...)    1️⃣ 👀
process(apple)          ◄─┘
doSomething()

val banana = Banana(...)  2️⃣ 👀
process(banana)         ◄─┘
doSomethingElse()
</kotlin>

It now has only two paragraphs and the tension between `apple`/`banana` and their usages is zero (this makes us wonder if they should be inlined). Sure declaraing variable in the paragraph does not guarantee it can't be used somewhere else, but it still makes it easier to skim the code especially once we have done a few of these tidyings and can trust the codebase. What the compiler does enforce though is that `banana` cannot be used above point 2️⃣ (we did reduce its scope after all).

To illustrate reduced variable scope imagine we look at the following function. The `type` is declared in the scope of the whole function but is only used within `forEach`.
<kotlin>                                 
val type = Blended                   ─┐ 👀
fruits.forEach { fruit ->             │
    process(fruit, type)              │
    log("Processed $fruit as $type")  │
}                                     │
doSomething()                         │
doSomethingElse()                    ─┘
</kotlin>
After the tidy up the code looks like this:
<kotlin>
fruits.forEach { fruit ->
    val type = Blended               ─┐ 👀
    process(fruit, type)              │
    log("Processed $fruit as $type") ─┘
}
doSomething()
doSomethingElse()
</kotlin>
The amount of lines where `type` can be used has reduced from 6 to 2 lines. Now when `type` usages are all within the same paragraph, we might wonder if `type` can be inlined. It's not ideal to duplicate `Blended` in two places, so maybe we don't need to log the `type`? Or maybe we do, and then the question might be why the `process()` function won't log it for us. These questions are examples of how simple tidying can help us explore/discover software design.

Interestingly, this tidying implies that, for example, a single usage of a magic value in a function might be better off extracted into a local variable rather than a constant.

Moving variables close to their usages is often a good idea but it's not a fixed rule. Sometimes it might be worth moving all/most declarations to some outer scope and see if it reveals a better structure of the code. It is an exploration.

Similar to a few other tidyings this one is fractal. While the examples above discuss low-level abstractions, it's possible to apply the same principles at the class/file/module/service/application/architectural level.


### Inline variables with single usage
...

### Put parameters on one or separate lines
...


### Stop the CONSTANT SHOUTING

Constants should be lowercase following the same convention as `val`s and `var`s. I realise this tidying contradicts [Kotlin coding conventions](https://kotlinlang.org/docs/coding-conventions.html#property-names) but there are NO GOOD REASONS for constant names to be uppercase other than history. 

As a short summary of the [Stop the Constant Shouting](https://accu.org/journals/overload/22/121/wakely_1923) article by Jonathan Wakely (which heavily inspired this tidying), in the C programming language it's common to use macros in cases when we would use a constant in Kotlin. This is because initially constants were not part of the language and even now they have limitations. Using uppercase for macros makes sense because they're not normal code and it was good for macros to STAND_OUT_IN_THE_CODE, especially at the time when clever code editors/IDEs didn't exist. The coding style for constants (actually macros) was copied from C to C++, to Java, and then to Kotlin.

As you might have noticed in the text above, uppercase text REALLY draws our attention. At the same time constants are one of the most boring parts of the code. They don't change and don't have any important side-effects, unlike, for example, `System.exit(1)`. Yet we use the most expressive text style for constant names. There is an argument that the uppercase convention is too widespread to ignore. But I'm not convinced that familiarity outweighs the harm done by unnecessary screaming uppercase. The accidental code style for constants needs to be fixed and the sooner the easier it will be.

Instead of SHOUTING CONSTANTS:
<kotlin>
companion object {
    private const val INITIAL_BUFFER_SIZE = 8192
}
private val buffer = ByteArray(INITIAL_BUFFER_SIZE)
</kotlin>
you can use lowercase:
<kotlin>
companion object {
    private const val initialBufferSize = 8192
}
private val buffer = ByteArray(initialBufferSize)
</kotlin>

As a side note, in the example above it would be good to [inline single usage constant](#inline-variables-with-single-usage) and explain the reasons for choosing number 8192 (no particular reason is still useful information). Often extracting a magic number into a constant doesn't make the number less magic.