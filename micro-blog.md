---
layout: post
permalink: /micro-blog/
---

#### 2023/10/29
To be clear, I suggest projectional editor for #Kotlin/#Java not just for formatting, but for overall code layout and how we experience working with codebases. For example, "navigation" could show functions next to each other, or maybe hide private fields or some "obvious" types.

#### 2023/10/27
Since it's nearly impossible to "win" any code style/formatting argument, could we have a projectional editor for #Kotlin/#Java, e.g. as an IntelliJ plugin please. It has to be clever though to project into the "current code style" in text format 🧐

#### 2023/10/26
I wonder how much code layout (let’s say just within a file) affects how we think about programs. Is there any research? 🤔🔬 What if changing the layout could shift overall project design to be less data centric for example?

#### 2023/10/25
Thinking about details first/last in #Kotlin classes, the default style is neither. It seems to be guided by object initialisation and execution order (init fields, invoke constructor, public/private functions). As a reader you're supposed to play the role of a computer I guess 🤷

#### 2023/10/24
Timeless question: define details first or last? In particular, in a #Kotlin file should data classes used in an interface be defined before or after the interface? If details last, then shouldn't all fields/properties be at the bottom of the class? Do you, should you care?

=== Reply from [Jordan Stewart](https://twitter.com/damaged) ===

Most important thing first. Probably not quite right, I like to _think_ of it as similar to writing’s "inverted pyramid" —
[https://en.m.wikipedia.org/wiki/Inverted_pyramid_(journalism)](https://en.m.wikipedia.org/wiki/Inverted_pyramid_(journalism))

=== The hill I'm happy to join [Chris Oldwood](https://twitter.com/chrisoldwood) on ===

![](../assets/images/micro-blog/2023-10-24.png)

#### 2023/10/23
This is a somewhat obvious thing to say but if you use randomly generated objects in tests, you really need to have a seed. Otherwise, it's a lot of fun with not very reproducible failures and builds. Also don't assume that two random values are not equal 🙈

#### 2023/10/22
Thinking about namespace pollution in #Kotlin via extension functions, is `fun Iterable<T>.foldResult() {...}` a good idea? The problem is that `foldResult` will appear in the auto-completion list for any Iterable even if it's not using Result type 🤔 [https://github.com/fork-handles/...iterables.kt](https://github.com/fork-handles/forkhandles/blob/d3dae418025d737cf91ae589e284c6ae48ea9e0c/result4k/core/src/main/kotlin/dev/forkhandles/result4k/iterables.kt#L30)

#### 2023/10/20
In #kotest tests are just functions. So they can be extracted into other extension functions like this:
<kotlin>
fun FunSpec.someTests() {
    test("1") {...}
    test("2") {...}
}
</kotlin>

Clever but the problem is that you can't run just one test from IDE 😒 Use abstract class instead? #UXfail

#### 2023/10/19
Back to #kotest rants. Because kotest has “built in coroutine support at every level” when an assertion fails, you can’t navigate to the matcher source code from the stack trace (Kotlin coroutines are stackless). So good luck if the error message is not very clear.

#### 2023/10/18
Random #IntelliJ tip. You can select multiple items in lists/trees and apply action to all of them. E.g. select files in project view, press enter and all selected files will be open. The same works with find/show usages. Or abstract function can be implemented on all classes by using "select all" via ctrl/cmd+A, then "enter" 👌
![](../assets/images/micro-blog/2023-10-18.png)

#### 2023/10/17
The reason lambda flavours in #Kotlin could be useful (e.g. with different/combined background colour in IDE) is that the meaning of indentation is diluted by "boring" let/apply/..., parameters on separate lines, nested functions, etc. Also .map() on collections vs Result type 😵

#### 2023/10/16
I wonder if #Kotlin contracts could capture lambda flavours and maybe visualise them in IDE 🤔 E.g. `let` runs lambda once, `?.let` maybe once, `forEach` many times, `executor.submit{}` runs on a different thread later. (Also haven't heard much about contracts for a while.)

#### 2023/10/15
To be fair, with `?:` extracted into a function and using `let` with reference is an interesting alternative to if/else. Thanks to [@natpryce](https://mastodon.social/@natpryce) for suggestion.

<kotlin>
fun Int?.toJson(): JsonNode =
    this?.let(::IntNode).orNullNode()

fun JsonNode?.orNullNode(): JsonNode =
    this ?: NullNode.instance
</kotlin>

=== Reply from [@natpryce](https://mastodon.social/@natpryce) ===

Nice. And to avoid duplicating logic, you could define:

<kotlin>
fun &lt;T : Any&gt; T?.toJson(toNode: (T) -&gt; JsonNode): JsonNode =
    this?.let(toNode).orNullNode()
</kotlin>

And then define:
<kotlin>
fun Int?.toJson() = toJson(::IntNode)
… etc …
</kotlin>

#### 2023/10/14
Which of these Kotlin one-liners do you prefer?
<kotlin>
fun Int?.toJson() = if (this != null) IntNode(this) else NullNode.instance
</kotlin>
or
<kotlin>
fun Int?.toJson() = this?.let { IntNode(it) } ?: NullNode.instance
</kotlin>

I'm in favour of if/else, `?.let` is overrated and can be against the "grain" of Kotlin 😬🙈

#### 2023/10/13
In case you haven't seen it yet, here is a perfect Friday video content: [The Art of Code](https://www.youtube.com/watch?v=6avJHaC3C2U) by [Dylan Beattie](https://mastodon.social/@dylanbeattie@hachyderm.io) (the classic recording at [NDC London](https://ndclondon.com)).


#### 2023/10/12
This is your regular reminder that pull requests are a waste in a typical company environment. PRs make you cosplay continuous integration instead of actually doing it. See this blog post by [Benji Weber](https://mastodon.social/@benjiweber) for details [https://benjiweber.co.uk/blog/2020/02](https://benjiweber.co.uk/blog/2020/02).

#### 2023/10/11
Would you rather have a feature/tool which depends on some non-public API (and can break in the future without notice) or not have the feature/tool at all? I'd choose the first option. Also in my experience some public APIs end up as volatile as internal ones 🤷🤔

#### 2023/10/10
#IntelliJ tip for #Kotlin. You can search for class default constructor (instead of class usages) by positioning cursor before the paren "(". Like this `class Foo|(val n: Int)` and invoke "Show Usages" action. I found it by chance. Wish it was more discoverable though 🧐

#### 2023/10/07
What about namespace "pollution" by extension functions in #Kotlin? E.g. a library with `fun Any?.print()` (yes, it's a #kotest #rant again) will add `print()` to code completion popup for all objects. Sure, IDE can deprioritise it, but maybe don't do it in the first place?

#### 2023/10/06
More #kotest #rants... `shouldHaveSize()` is helpful enough to print the whole (actual) list when sizes don't match. Good idea unless the list contains large data classes. Good luck scrolling around Gradle output for the failure message. OTOH, it could be symptom of a bad test 🤔

#### 2023/10/05
Another #kotest #rant is that most of its matchers don’t show diff window in IntelliJ with JUnit5 runner. It tries but most matchers throw `AssertionError` (no diff) and some `AssertionFailedError` (has diff) 🤷😒 Makes you wonder if kotest authors actually use it via IntelliJ.

#### 2023/10/04
Kotest has `eventually()` function which retries lambda until it succeeds or times out. Not the best idea to use it across all tests in the first place, but in addition kotest prints stack trace from the first and the last failure, so you end up scrolling down 🤦‍ #kotest #rant

#### 2023/10/03
Thinking about comments I'm definitely in the camp of avoiding comments in the code unless it's really necessary. It's better to have a good variable/function name or a test case to explain a subtle detail. This includes test case names which look like wordy comments 🙈

#### 2023/10/02
If you care about how the source code is formatted, how variables/functions/etc. are named, then it might be worth caring as much about comments. Re-read them after writing, use spell checker and maybe start comments with a capital letter (as if it was a sentence because it is)?

#### 2023/10/01
Another interesting idea is to have stack traces with granularity down to expression/statement instead of just line number. They might need to be aware of the testing library to trace creation of matchers, etc. Not easy to implement for #Kotlin on the JVM and even harder for Kotlin multiplatform 🙈

#### 2023/09/30
In many environments where we run tests (locally, CI pipelines) we have access to the source code. When a test fails, why not use it to show code of the failed line/paragraph before the failure message? 🤔

As couple people have pointed out there is [https://github.com/laech/java-stacksrc](https://github.com/laech/java-stacksrc). I haven't tried it yet, but it looks promising.

#### 2023/09/29
The History of Cursor Keys [https://www.youtube.com/watch?v=BytowtVycc0](https://www.youtube.com/watch?v=BytowtVycc0) 
Fun to see all the crazy cursor keys layouts from the past. 
Although for software development I really prefer alt+IJKL, 
see [https://github.com/dkandalov/ijkl-shortcuts-plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin) 
Everything else is suboptimal! 🙈

#### 2023/09/28
Most assertion libraries (in #Kotlin and other languages) reimplement language features (not, or, and, equals etc) 
and standard library (contains, isEmpty, etc). I wish there was more effort to make tools like 
[https://github.com/bnorm/kotlin-power-assert](https://github.com/bnorm/kotlin-power-assert) work really well.

#### 2023/09/27
To be fair, the previous example could use matcher composition where beSuccess() is not an expression 
(it will be type-safe with #Kotlin contracts). Thanks to [@sf105](https://mastodon.social/@sf105@mastodonapp.uk) for pointing that out.
<kotlin>
val items = listOf(...)
storage.upload(items) should beSuccess()
storage.listAll() should (beSuccess() and equalTo(items))
</kotlin>

#### 2023/09/26
A better example of `Result.expectSuccess()` used as an expression. 
If Result is treated like checked exception, it should be ok to handle it in any part of the test 🤔
<kotlin>
val items = listOf(...)
storage.upload(items).expectSuccess()
storage.listAll().expectSuccess() shouldEqual items
</kotlin>

#### 2023/09/25
Thinking about the example with `Result.expectSuccess()` a bit more complete test might look like this:
<kotlin>
val expected = random&lt;Foo&gt;()
val actual = Foo.parse(expected.toJson()).expectSuccess()
actual equalTo expected
</kotlin>
Which pushes one of the assertions into the "when" step 🤔

#### 2023/09/24
I wish more #Kotlin assertion libraries had assertion functions as expressions so that they could be chained. For example:
<kotlin>
result.expectSuccess() equalTo 123
httpResponse.expectStatus(OK).body.equalTo("{some json}")
</kotlin>

#### 2023/09/23
This is your regular reminder that pull requests is a waste when working with people you know and trust (e.g. same company). Here is a more detailed reasoning by [@d_stepanovic](https://mastodon.social/@d_stepanovic) [https://vimeo.com/842233600](https://vimeo.com/842233600) (thanks to [@quii](https://mastodon.social/@quii@mastodon.cloud) for the link) #pullrequest #programming #softwareengineering #coding

#### 2023/09/22
You might have noticed that most meetings and conferences follow the same pattern of one person talking and everyone else listening. (Ok, maybe enterprise "agile" made standups and retros more widespread.) But is it the only way for a group of people to collaborate or share information? Not at all! Welcome Liberating Structures 👉 [https://www.liberatingstructures.com/ls-me](https://www.liberatingstructures.com/ls-me)

#### 2023/09/21
Random #IntelliJ tip. There is "Show Gradle Daemons" action which shows daemons with pid, status, etc. and lets you stop them. It's not in any menu, but you can invoke it via "Find Action" (cmd+shift+A or ctrl+shift+A). As with most tips it's probably a UX failure... I mean an opportunity for improvement 🙈

#### 2023/09/20
Here is another basic function I wish was in #Kotlin stdlib
<kotlin>
inline fun &lt;T : Any, R&gt; T?.ifNotNull(f: (T) -> R): R? = this?.let(f)
</kotlin>

This is really just `?.let` but I think `ifNotNull` follows the Kotlin way by being more explicit.

#### 2023/09/19
Not many people consider this but CONSTANTS DON'T NEED TO BE UPPERCASE. They're not the most important thing in the code and don't need the emphasis (e.g. unlike mutable global variables). The convention dates back to the early days of C and the need to distinguish symbolic constants defined as macros from variables 👉 [https://accu.org/journals/overload/22/121/wakely_1923](https://accu.org/journals/overload/22/121/wakely_1923) It's never too late to stop the cargo cult! Can we have it in #Kotlin 2.0 please? 😅

#### 2023/09/18
One of the basic functions I wish was in #Kotlin stdlib (originally by Duncan McGregor)
<kotlin>
fun &lt;T&gt; T.printed(): T = apply { println(this) }
</kotlin>

So you can do `foo.update().printed()` without extracting a variable and using a separate line for println().

#### 2023/09/17
Rick Beato has a great [YouTube channel](https://www.youtube.com/@RickBeato). In particular, "What Makes This Song Great?" videos, e.g. [Metallica - “Master of Puppets” Breakdown](https://www.youtube.com/watch?v=5EOHKfoDyrI). I'm wondering if there is something similar for #software analysing/appreciating/criticising well-known projects. Should John Carmack or Dave Farley do it? 😅

#### 2023/09/16
Does the "Small advice" in [this talk](https://www.youtube.com/watch?v=eRWoTgYbUqM&t=1498s) mean that explicitly specifying return type for public functions will noticeably improve compiler/IDE speed? If yes, it sounds like an inspection 🤔 #Kotlin #IntelliJ 

There is "Public API declaration with implicit return type" inspection in "Kotlin->Other problems" disabled in the default profile. If it's really going to make difference and is recommended in general, should it be enabled then?

#### 2023/09/15
I'm pretty sure I read a few years ago that #Mastodon (social network) was named after Mastodon (a metal band). However, most articles I can find now are saying Mastodon (social network) was named after the animal. Does anyone know more of the backstory? [https://www.youtube.com/watch?v=s6WGNd8QR-](https://www.youtube.com/watch?v=s6WGNd8QR-)

#### 2023/09/14
Videos from JVM Language Summit 2023 [https://www.youtube.com/playlist?list=PLX8CzqL3ArzW90jKUCf4H6xCKpStxsOzp](https://www.youtube.com/playlist?list=PLX8CzqL3ArzW90jKUCf4H6xCKpStxsOzp) I enjoyed ["The Challenges of Introducing Virtual Threads to the Java Platform"](https://www.youtube.com/watch?v=WsCJYQDPrrE) 🙂

#### 2023/09/13
It might be the "old man yells at cloud" problem but many tools which are supposed to empower developers are achieving the opposite. More levels of indirection, more configs, slow pipelines, etc. instead of faster feedback loops (on faster modern hardware). There is a joke that k8s is a conspiracy by big tech to slow down the rest of the industry 😳

#### 2023/09/12
Here is the simplest way to implement any interface in #Kotlin 🙈 Aka mocking library in four lines of code. (I didn't come up with it though so can't take the credit.)

<kotlin>
class MyList&lt;T&gt; : List&lt;T&gt; by strictMock()

inline fun &lt;reified T&gt; strictMock(): T =
    java.lang.reflect.Proxy.newProxyInstance(
        T::class.java.classLoader,
        arrayOf(T::class.java)
    ) { _, _, _ -> throw NotImplementedError() } as T
</kotlin>

#### 2023/09/11
If you're interested in #Kotlin, [KotlinConf](https://kotlinconf.com) on May 23-24 next year will be a good excuse to visit Copenhagen. It's the same venue as in 2019 which was quite nice. And don't forget the best way to get the ticket is by submitting a talk [https://sessionize.com/kotlinconf-2024](https://sessionize.com/kotlinconf-2024) 🙈 (As always, you don't really need to be an expert in the field to do a good talk!)

#### 2023/09/10
Super slow search for #Kotlin data class components in IntelliJ is a massive contributor for me not enjoying Kotlin as much as I could. It feels that problems like this one are too fundamental to not be fixed on day one 😐 Unreliable/slow search defeats the whole point of IDEs.

