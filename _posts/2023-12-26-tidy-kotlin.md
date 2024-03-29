---
permalink: tidy-kotlin
---

This blog post is a catalog of Kotlin tidyings based on my experience of writing server-side Kotlin. The term "tidying" is inspired by the ["Tidy First?" book](https://www.oreilly.com/library/view/tidy-first/9781098151232) and essentially means a small refactoring. Some of them are specific to Kotlin, while others are applicable to any programming language. I plan to keep this catalog updated so it might naturally evolve over time.

Be aware these are not rules but suggestions on how to improve the code. It's also not a comprehensive list, so there are other forces affecting the design not mentioned here. These forces can be technical, for example, objects' lifetime or [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and non-technical, for example,   code style preferences of other people or priorities of the project. Depending on the context it might be better to avoid or delay tidying.

Many of these tidyings are about code style and formatting, which are sometimes regarded as cursory issues. While it's true that projects always have more significant issues, and it's possible to read and navigate the code presented in any sensible way, the main premise of the tidyings is that fixing small things does matter. One reason is that small fixes are more likely to happen than bigger ones because they normally require a limited amount of effort and it's easier to see the end state. Instead of planning a large-scale improvement at some point later, which might never happen, we can benefit from small improvements of code ergonomics now, which will accumulate over time. Another reason to fix small and seemingly insignificant code issues is that the interaction with the code via tydings gives us more of a tactile experience of the code, which can help us discover better design, and really understand the code and its changeability constraints. Finally, some of the issues are bigger than they seem to be or they act as gatekeepers for bigger refactorings. By tidying we can unlock a bigger area of improvement or get an insight to ask the right question.

<i>==== This is work-in-progress. Feel free to share the link but be aware that the content will change. Feedback is welcome via email or social media. ====</i>

### Contents
1. [High-level declarations first](#high-level-declarations-first)
2. [Maximum privacy](#maximum-privacy)
3. [Keep variables close to their usages](#keep-variables-close-to-their-usages)
4. [Inline variables with single usage](#inline-variables-with-single-usage)
5. [Remove argument names when their types are distinct](#remove-argument-names-when-their-types-are-distinct)
6. [Add argument names when types are the same or generic](#add-argument-names-when-types-are-the-same-or-generic)
7. [Pass named arguments in the order of parameter declaration](#pass-named-arguments-in-the-order-of-parameter-declaration)
8. [Put parameters on one line](#put-parameters-on-one-line)
9. [Put arguments on one line](#put-arguments-on-one-line)
10. [Put parameters on separate lines](#put-parameters-on-separate-lines)
11. [Stop the CONSTANT SHOUTING](#stop-the-constant-shouting)
12. [Consider using tiny types](#consider-using-tiny-types)
13. ...


### High-level declarations first

Declare high-level interfaces, classes, functions, or properties before implementation details. A more formal way to think about it is by presenting code as a directed graph, where nodes are declarations and edges point from the declaration to its usages. The code should be ordered so that all edges point to the beginning of the file (unless there are circular dependencies). With the edges pointing up, declarations at the top of the file will be visually higher, matching the "high/low-level" metaphor.

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

class FruitStoreInTheCloud(...) : FruitStore {
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

Make values, functions and classes as private as possible.
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

Keep variables (both `val`s and `var`s) close to where you use them. This is a simple way of saying to declare variables in the innermost scope and within the minimum amount of lines/statements from usages. The main goal of this tidying is higher code cohesion or more specifically:
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
After the tidy-up the code looks like this:
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

Similar to a few other tidyings this one is fractal. While the examples above discuss low-level abstractions, it's possible to apply the same principles at the class, file, module, service, application, or architectural level.


### Inline variables with single usage

Variables (both `val`s and `var`s) with single usage are often better off inlined. You might think of it as an extreme version of [keeping variables close to their usages](#keep-variables-close-to-their-usages), so some of the motivations overlap. The reasons to inline single usage are:
- Inlined variables are obviously not used elsewhere in the code, so we save time and effort by not checking if there are other usages.
- To communicate the structure of nested objects or function calls.
- The order of variable initialisation doesn't dictate how variables are ordered in the code, so it's easier to have [high-level declarations first](#high-level-declarations-first).
- Extracting a single usage variable made sense in Java to give the argument a name. Kotlin has named arguments that have the same expressiveness (unless you want to have a name different from the parameter).

To illustrate how inlining variables can help, imagine we are trying to figure out how exactly `FruitStoreInTheCloud()` is constructed. We search for the usages of the constructor (by invoking "Show Usages" before the first "(") and end up in the following code at point 1️⃣. We would like to see how the constructor arguments are created, so we navigate to `uri` declaration which takes us to point 2️⃣. URI construction looks ok, but it's not clear if `uri` might be used elsewhere in the function. We search for `uri` usages. There is only one usage, so we end up back at point 1️⃣. We repeat the same process for `credentials` navigating to point 3️⃣ and back to 1️⃣ (it's the only usage). Navigation is a bit more tricky with `config` because we first go to point 4️⃣, then to `connectionTimeout` 5️⃣ and back, then to `retryAttempts` 6️⃣ and back. This is a lot of non-linear navigation for the construction of two nested objects!

To be fair, we could've been more efficient by using the "Highlight Usages in File" action on all variables and visually checking the editor scrollbar area if there are any matches outside of visible code. It's still not worth it though considering that all usages can be inlined.

<kotlin>
val uri = Uri("https://fruit.cloud")                       2️⃣
val credentials = Credentials(...)                         3️⃣
val connectionTimeout = 10.seconds                         5️⃣
val retryAttempts = 3                                      6️⃣
val config = Config(connectionTimeout, retryAttempts)      4️⃣
val store = FruitStoreInTheCloud(uri, credentials, config) 1️⃣ 👀 😵‍💫

doSomething()
doSomethingElse()
...
</kotlin>
After inlining variable usages, we can follow the constructor arguments points 1️⃣ to 6️⃣ in a linear way. We don't need to guess if the variables are used elsewhere. And it's nice that indentation at points 5️⃣ and 6️⃣ communicates the nested structure of objects.
<kotlin>
val store = FruitStoreInTheCloud(       1️⃣ 👀 
    uri = Uri("https://fruit.cloud"),   2️⃣
    credentials = Credentials(...),     3️⃣
    config = Config(                    4️⃣
        connectionTimeout = 10.seconds, 5️⃣
        retryAttempts = 3               6️⃣
    )
)
doSomething()
doSomethingElse()
...
</kotlin>

As a side note, the `FruitStoreInTheCloud()` constructor in the example above has arguments with distinct types, so it might be ok to [remove argument names](#remove-argument-names-when-all-types-are-distinct).

What if some of the arguments have multiple usages (for example, if `uri` was passed to a function), is it still worth inlining variables with single usage? I would argue that it's almost always worth trying. Reduced scope is likely to pay off the inconsistency of declaring arguments both in place and as variables.


### Remove argument names when their types are distinct
When all arguments have distinct incompatible types, named arguments might be redundant and can be removed. Named arguments can help with accidentally passing value to the wrong parameter when types are the same. But if all types are different, this is not a problem as it will be checked by the compiler. Assuming that argument values have descriptive names, named arguments don't bring any benefits to justify verbosity. This is more likely to be the case when using [tiny types](#use-tiny-types).

For example, given that `uri`, `credentials`, and `config` all have different types, argument names can be removed in the code below. Once removed, we end up with one argument per line and can [put them on one line](#put-arguments-on-one-line).
<kotlin>
val store = FruitStoreInTheCloud(
    uri = uri,
    credentials = credentials,
    config = config
)
...
</kotlin>
The code after tidying:
<kotlin>
val store = FruitStoreInTheCloud(uri, credentials, config)
...
</kotlin>

Note that in IntelliJ there is a "Remove all argument names" intention, which can be invoked via the `Alt+Enter` popup menu or assigned its own shortcut.


### Add argument names when types are the same or generic
When arguments have the same or generic types, add argument names to make them distinct and clarify their meaning. One reason is that it can take some effort to tell the difference between the arguments of the same type. This is error-prone because we can pass values in the wrong order or introduce a bug while reordering parameters. Another reason is that generic types don't communicate the meaning of the value, so it's harder to understand the code without IDE/editor help, which is also an invitation for subtle bugs.

IntelliJ can help us by showing names as [inlay hints](https://www.jetbrains.com/help/idea/inlay-hints.html) or [parameter information](https://www.jetbrains.com/help/idea/viewing-reference-information.html#view-parameter-info) at the cursor. The inlay hints are useful, but they don't provide the guarantees of the compiler. And because you can't know if the reader of the code will have hints enabled, it's safer to assume nothing. Parameter information is displayed in a popup window, so we might end up checking every argument while the popup is visible or try remembering the order. Either way, it's a bit too much effort. 

For example, given the following constructor, the meaning of empty strings and numbers `10` and `3` is not very clear without looking up the `FruitStoreInTheCloud` declaration or using IDE support.
<kotlin>
val store = FruitStoreInTheCloud("https://fruit.cloud", "", "", 10, 3)
...
</kotlin>

The code after tidying makes the meaning of the arguments more obvious.

<kotlin>
val store = FruitStoreInTheCloud(
    url = "https://fruit.cloud",
    user = "", 
    password = "",
    connectionTimeout = 10,
    retryAttempts = 3
)
...
</kotlin>

Argument names have increased the length of the line to the point that we had to [put parameters on separate line](#put-parameters-on-separate-lines). So while the argument names made the code less error-prone and more understandable, they did it at the cost of verbosity. It's up to us to decide if it was worth it or if there is another avenue for tidying, e.g. introducing [tiny types](#consider-using-tiny-types).

Note that in IntelliJ there is an "Add names to call arguments" intention, which can be invoked via the `Alt+Enter` popup menu or assigned its own shortcut.


### Pass named arguments in the order of parameter declaration
Pass named arguments in function/constructor invocations in the same order as parameter declaration. The reason is that if parameters are declared in a meaningful order, then arguments can only benefit from following it. Consistent ordering can also be useful when comparing multiple function/constructor invocations by doing a visual comparison or textual diff. Finally, because the "Change signature" refactoring automatically reorders arguments to be in the order of parameters even on an unrelated change, it is beneficial to have arguments in this order so that the refactoring is not mixed with the argument reordering.

For example, given the following invocations of the `Config` constructor, it's not obvious what the differences are between them.
<kotlin>
val config = Config(
    retryAttempts = 10,
    callTimeout = INFINITE,
    connectionTimeout = 3.seconds
)
...
val anotherConfig = Config(
    connectionTimeout = 10.seconds,
    retryAttempts = 3, 
    callTimeout = 5.minutes
)
</kotlin>

With the arguments arranged in the same order, it's easier to notice the differences (and maybe ask ourselves why these differences exist).
<kotlin>
val config = Config(
    connectionTimeout = 3.seconds,
    callTimeout = INFINITE,
    retryAttempts = 10
)                                  
...                                
val anotherConfig = Config(
    connectionTimeout = 10.seconds,
    callTimeout = 5.minutes,
    retryAttempts = 3
)
</kotlin>


### Put parameters on one line

When a function or class constructor declaration has only a few parameters, put them on one line. How few is enough to justify the tidying is subjective and depends on the length of parameter names, the length and complexity of parameter types, the length of the default values, the surrounding code, readers' attention span, etc. The motivation is to have "optimal" information density on the screen.

With one or two parameters per line, the information density per line is a bit low, so we might end up scrolling the source code up and down a lot, reading it almost as a single column.
<kotlin>
data class Password(
    val value: String
)

data class Credentials(
    val user: String,
    val password: Password
)
</kotlin>

Putting class or function parameters on a single line will increase the information density and can make it easier to skim. 
<kotlin>
data class Password(val value: String)

data class Credentials(val user: String, val password: Password)
</kotlin>

Note that in IntelliJ there is a "Put parameters on one line" intention, which can be invoked via the `Alt+Enter` popup menu or assigned its own shortcut.


### Put arguments on one line
When a function or constructor invocation has only a few arguments, put them on one line. How few is enough to justify the tidying is subjective and depends on the length of argument names (especially with named arguments), the surrounding code, readers' attention span, etc. The motivation is to have "optimal" information density on the screen.

One or two arguments on separate lines are often a good opportunity for the tidy-up. You might notice in the example below that arguments are vertically misaligned with constructors, so we have to read the code from right to left. Sometimes this is inevitable, but in this case, it's easy to fix by putting arguments on one line.
<kotlin>
val password = Password( ↙️ 👀
    "********"     
)
val credentials = Credentials( ↙️ 👀
    user = "Bob",
    password = password
)
</kotlin>
The code after tidying:
<kotlin>
val password = Password("********")
val credentials = Credentials(user = "Bob", password = password)
</kotlin>
The next tidying might be to [inline single usage](#inline-variables-with-single-usage) of `password` or to [remove argument names](#remove-argument-names-when-all-types-are-distinct).

Note that in IntelliJ there is a "Put arguments on one line" intention, which can be invoked via the `Alt+Enter` popup menu or assigned its own shortcut.


### Put parameters on separate lines
When a function or class constructor declaration has too many parameters, put them on separate lines. How many is too many is subjective and depends on the length of parameter names, the length and complexity of parameter types, the length of the default values, the surrounding code, etc. Too many parameters can also be a good point to ask ourselves if some of them should be extracted into a separate class.

For example, having five constructor parameters might be too much for a single line.
<kotlin>
class FruitStoreInTheCloud(val uri: Uri, val user: String, val password: Password, val connectionTimeout: Duration, val retryAttempts: Int = 5)
</kotlin>

So we can try putting them on separate lines.
<kotlin>
class FruitStoreInTheCloud(
    val uri: Uri,
    val user: String,
    val password: Password,
    val connectionTimeout: Duration,
    val retryAttempts: Int = 5
)
</kotlin>

Since some of the parameters are related, we might be tempted to group them.
<kotlin>
class FruitStoreInTheCloud(
    val uri: Uri,
    val user: String, val password: Password,
    val connectionTimeout: Duration, val retryAttempts: Int = 5
)
</kotlin>

The problem with this layout is that it is more irregular than one parameter per line. What we really mean by grouping the parameters is that there is cohesion and each group could be expressed as a separate class.
<kotlin>
class FruitStoreInTheCloud(
    val uri: Uri,
    val credentials: Credentials,
    val config: Config
)
</kotlin>
And with only three parameters in the constructor, we might consider [putting them on one line](#put-parameters-on-one-line) (never mind the irony).

Note that in IntelliJ there is a “Put parameters on separate lines” intention, which can be invoked via the `Alt+Enter` popup menu or assigned its own shortcut.


### Stop the CONSTANT SHOUTING

Constants should be lowercase following the same convention as `val`s and `var`s. I realise this tidying contradicts [Kotlin coding conventions](https://kotlinlang.org/docs/coding-conventions.html#property-names) but there are NO GOOD REASONS for constant names to be uppercase other than history. 

As a short summary of the [Stop the Constant Shouting](https://accu.org/journals/overload/22/121/wakely_1923) article by Jonathan Wakely (which heavily inspired this tidying), in the C programming language it's common to use macros in cases when we would use a constant in Kotlin. This is because initially constants were not part of the language and even now they still have limitations. Using uppercase for macros made sense because they're not normal code so it wasn't a bad idea for macros to STAND_OUT_IN_THE_CODE, especially at the time when smart code editors and IDEs didn't exist. The coding style for constants (actually macros) was copied from C to C++, to Java, and then to Kotlin.

As you might have noticed, uppercase text REALLY DRAWS OUR ATTENTION. At the same time constants are one of the most boring parts of the code. They don't change and don't have any important side-effects (unlike, for example, `System.exit(1)`). Yet we use the most expressive text style for constants. There is an argument that the uppercase convention is too widespread to ignore. I'm not convinced though that familiarity outweighs the harm done by unnecessary screaming uppercase. The accidental code style for constants needs to be fixed and the sooner the easier it will be.

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

Once constants follow the same naming convention as variables, it's easier to change constants to variables and the other way round because we don't need to update all usages.


### Consider using tiny types

...

