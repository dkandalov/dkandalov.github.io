---
layout: post
permalink: /micro-blog/
---

#### 2023/12/04
[@sebi_io](https://twitter.com/sebi_io) and I will be pair programming #AdventOfCode day 4 in #Kotlin later today 👉 <https://www.youtube.com/watch?v=I0nCFMDkPNo> Come join us live! Nothing is scripted but hopefully, there will be some refactoring 🙃

#### 2023/12/02
Short-lived pull requests are fine from the CI point of view. But if they're so short, why bother with the PR bureaucracy? What about reviewing commits and fixing anything that's wrong? Maybe even talk to the author of the code 🙈

#### 2023/12/01
This is your regular reminder that long-lived pull requests are missing the whole point of CI. Great video by [@davefarley77](https://mastodon.social/@davefarley77@techhub.social) 👉 <https://www.youtube.com/watch?v=v4Ijkq6Myfc>

#### 2023/11/29
In case you missed it, there is a new book by [@kentbeck](https://mastodon.social/@kentbeck@hachyderm.io) [Tidy First?: A Personal Exercise in Empirical Software Design](https://www.ebooks.com/en-gb/book/211127822/tidy-first/kent-beck) 🥳

#### 2023/11/28
When using Result/Either type in #Kotlin, it can be tricky to make sure they are always handled. Could we please get annotations to mark types that cannot be ignored? AFAIK this functionality has been in #Rust for years! See <https://youtrack.jetbrains.com/issue/KT-12719>

#### 2023/11/26
Do you know any good resources (blogposts, tutorials, katas or videos) about using Result/Either types in #Kotlin?

<img src="../assets/images/micro-blog/2023-11-26.png" width="50%" height="50%"/>

=== Answers ===

- <https://arrow-kt.io/learn/typed-errors/either-and-ior>
- <https://arrow-kt.io/learn/typed-errors/working-with-typed-errors/>
- [Kotlin Design Patterns and Best Practices](https://www.amazon.co.uk/Kotlin-Design-Patterns-Best-Practices-dp-1801815720/dp/1801815720) but 3rd edition!
- In case I'm going to read this again, there are blog posts by Duncan McGregor here <http://www.oneeyedmen.com/failure-is-not-an-option-part-6.html>
- I should write one myself!

#### 2023/11/25
If you are/were at the #devfestberlin2023 today, you can find the slides and code from my talk here <https://github.com/dkandalov/gilded-rose>.

#### 2023/11/24
Fundamentally, #Kotlin coroutines is compiler transforming code into a state machine. They are in stdlib, e.g. Sequence builder. Nothing to do with async. And there are async coroutines in kotlinx.coroutines built on top. Both are "coroutines". Obviously, not so obvious.

<img src="../assets/images/micro-blog/2023-11-24.png" width="50%" height="50%"/>

#### 2023/11/22
I wish #Kotlin stdlib had Flow-like API with onStart/onComplete/catch/etc. for Sequence/Iterable. And maybe cancellation by making them AutoClosable (?) 🙈🤔 (I’m sure there are some good discussions on youtrack, slack and Kotlin forum.)

#### 2023/11/21
How wrong is it to use #Kotlin Flow with this? 😬

<kotlin>
fun runOnTheCurrentThread(block: suspend () -&gt; Unit) =
    block.startCoroutine(NoOp)

object NoOp : Continuation&lt;Unit&gt; {
    override val context = EmptyCoroutineContext
    override fun resumeWith(result: Result&lt;Unit&gt;) {}
}
</kotlin>

=== Reply from [Simon Vergauwen](https://twitter.com/vergauwen_simon) ===

Pretty bad, because context preservation breaks with EmptyCC.
Otherwise it'd be similar to `GlobalScope.launch(NonCancellable + Dipsatchers.Default) { }`.

#### 2023/11/20
Another idea is to have more terms than just "tech debt." For example, distinguish it from "tech underinvestment" as suggested by [@natpryce](https://mastodon.social/@natpryce). Maybe a separate term for code ageing, when code becomes obsolete because of programming language and technology changes.

#### 2023/11/19
It's unfortunate that "technical debt" is the only widespread term we have. Maybe "technical shortcuts" is a bit more descriptive and less metaphorical 🤔 I also like a bit more opinionated "unsuitable code" by [@lukesleeman](https://mastodon.social/@lukesleeman@aus.social).

#### 2023/11/18
Another deceitful metaphor is technical debt. The problem is that it implies the predictability of debt. In practice, it's often a trap with no clear way out (like piling up pieces in Tetris). Compounded by the sunken cost fallacy, the "debt" is even less likely to be untangled.

#### 2023/11/16
In case anyone needs a podcast recommendation, [Troubleshooting Agile](https://podcasts.apple.com/gb/podcast/troubleshooting-agile/id1327456890) is one of my all-time favourite and probably not very well-known podcasts. Thank you, [Jeffrey Fredrick](https://x.com/Jtf) and [Douglas Squirrel](https://x.com/douglassquirrel), for producing great content! See also <https://agileconversations.com>

#### 2023/11/15
Another annoyingly bad metaphor is #git blame. It doesn't explain how the tool works and suggests harmful behaviour. Even worse, the command itself is too surface-level and not good at finding commit with the actual change 🙄 (I mostly use "Show History for Selection" in #IntelliJ)

#### 2023/11/14
On the topic of wrong metaphors, I'm still annoyed that most #git projects used a tree-branching metaphor mixed with master/slave, and when there was a chance to change the "industry standard", most went for "main" (maybe related to pipes 🤷) instead of "trunk" 😒

#### 2023/11/12
In case you happen to be in Berlin in a couple of weeks, I'll be at [GDG DevFest](https://devfest.berlin) presenting the Gilded Rose [refactoring kata](https://github.com/dkandalov/gilded-rose). Come say hi. I'm also happy to pair on the kata and maybe record it (as I used to do pre-pandemic).

#### 2023/11/11
Old startup idea: "Twitter" for codebases where you could follow/like/reply to functions/classes/files/branches/people. A similar thing suggested by [Kent Beck](https://mastodon.social/@kentbeck@hachyderm.io): <https://tidyfirst.substack.com/p/idea-codefeed>. Does anyone want to do a proof-of-concept? Maybe in #Kotlin? KMP? 😱🙈

#### 2023/11/10
Somewhat surprisingly, the "unimportant implementation details" like using "eventually {...}" in tests can have a cascading effect via slow CI/deployment on software design, people behaviour, and organisation overall. Similarly, a slow compiler/IDE is never about time.

#### 2023/11/09
Another possible side effect of slow CI/deployment is over engineering. Some of it is a rational response to not being able to fix things quickly. Some, I suspect, is keeping yourself entertained which is then post-rationalised to be necessary.

#### 2023/11/07
Working in an environment with slow CI/deployment, it's not impossible to be upset when someone breaks deployed software and it takes hours to fix. So, if you're not careful, this creates peer pressure on the team, and maybe you get a bit of pressure from yourself.

#### 2023/11/06
Slow CI builds increase the time it takes to fix things after deployment. At the same time, larger code changes (encouraged by slow CI) are more likely to have problems. That creates a higher stake environment in which you really don't want to make a mistake 😓

#### 2023/11/05
The problem with slow CI is not just the time it takes but also the behaviours it encourages. Waiting a couple of hours for a minor change seems like a waste, so it's tempting to batch up a few changes or do something else in parallel, which increases work-in-progress.

#### 2023/11/04
Overall, `eventually {...}` in tests is a code smell, similar to `delay(5.seconds)` waiting for the clock to move forward. There are ways to avoid it, and it's ultimately your choice. Continuous integration is not supposed to be "continuous" because the build takes 24 hours.

#### 2023/11/03
To be fair to projects with `eventually {...}` in tests, it can be hard to control concurrency or change design with tech decisions made a while ago and the code tied to a framework that does its own thing. You just end up copy-pasting `eventually` in the name of consistency 😿

#### 2023/11/02
There is no magic avoiding `eventually {...}` in tests. The basic answer is to have control over concurrency (like controlling time with the Clock). If it's the code you can modify, then change its design. If it's an external technology, wrap it in a minimal API and use a fake.

#### 2023/11/01
Another problem with `eventually {...}` is that it’s easy to sprinkle tests with it but can be really hard to remove because the design won’t let you control concurrency and it’s hard to refactor with the build being slow and flaky. It’s a trap! 😒 #testing #rant

#### 2023/10/31
The reason why using `eventually {...}` in tests is not a good idea is that it will make your build slow and non-deterministic. Retries will slow down passing tests, timeouts will make failures even slower, and failure messages will read like "something didn't happen on time" 🤷

#### 2023/10/30
If you use something like `eventually {...}` function all over the tests (which retries with timeout the lambda until it succeeds), the chances are you're doing it wrong. Ideally, refactor concurrency you're waiting for out of the core logic and test concurrent things separately.

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
<https://en.m.wikipedia.org/wiki/Inverted_pyramid_(journalism)>

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
This is your regular reminder that pull requests are a waste in a typical company environment. PRs make you cosplay continuous integration instead of actually doing it. See this blog post by [Benji Weber](https://mastodon.social/@benjiweber) for details <https://benjiweber.co.uk/blog/2020/02>.

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

As couple people have pointed out there is <https://github.com/laech/java-stacksrc>. I haven't tried it yet, but it looks promising.

#### 2023/09/29
The History of Cursor Keys <https://www.youtube.com/watch?v=BytowtVycc0> 
Fun to see all the crazy cursor keys layouts from the past. 
Although for software development I really prefer alt+IJKL, 
see <https://github.com/dkandalov/ijkl-shortcuts-plugin> 
Everything else is suboptimal! 🙈

#### 2023/09/28
Most assertion libraries (in #Kotlin and other languages) reimplement language features (not, or, and, equals etc) 
and standard library (contains, isEmpty, etc). I wish there was more effort to make tools like 
<https://github.com/bnorm/kotlin-power-assert> work really well.

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
This is your regular reminder that pull requests is a waste when working with people you know and trust (e.g. same company). Here is a more detailed reasoning by [@d_stepanovic](https://mastodon.social/@d_stepanovic) <https://vimeo.com/842233600> (thanks to [@quii](https://mastodon.social/@quii@mastodon.cloud) for the link) #pullrequest #programming #softwareengineering #coding

#### 2023/09/22
You might have noticed that most meetings and conferences follow the same pattern of one person talking and everyone else listening. (Ok, maybe enterprise "agile" made standups and retros more widespread.) But is it the only way for a group of people to collaborate or share information? Not at all! Welcome Liberating Structures 👉 <https://www.liberatingstructures.com/ls-me>

#### 2023/09/21
Random #IntelliJ tip. There is "Show Gradle Daemons" action which shows daemons with pid, status, etc. and lets you stop them. It's not in any menu, but you can invoke it via "Find Action" (cmd+shift+A or ctrl+shift+A). As with most tips it's probably a UX failure... I mean an opportunity for improvement 🙈

#### 2023/09/20
Here is another basic function I wish was in #Kotlin stdlib
<kotlin>
inline fun &lt;T : Any, R&gt; T?.ifNotNull(f: (T) -> R): R? = this?.let(f)
</kotlin>

This is really just `?.let` but I think `ifNotNull` follows the Kotlin way by being more explicit.

#### 2023/09/19
Not many people consider this but CONSTANTS DON'T NEED TO BE UPPERCASE. They're not the most important thing in the code and don't need the emphasis (e.g. unlike mutable global variables). The convention dates back to the early days of C and the need to distinguish symbolic constants defined as macros from variables 👉 <https://accu.org/journals/overload/22/121/wakely_1923> It's never too late to stop the cargo cult! Can we have it in #Kotlin 2.0 please? 😅

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
I'm pretty sure I read a few years ago that #Mastodon (social network) was named after Mastodon (a metal band). However, most articles I can find now are saying Mastodon (social network) was named after the animal. Does anyone know more of the backstory? <https://www.youtube.com/watch?v=s6WGNd8QR->

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
If you're interested in #Kotlin, [KotlinConf](https://kotlinconf.com) on May 23-24 next year will be a good excuse to visit Copenhagen. It's the same venue as in 2019 which was quite nice. And don't forget the best way to get the ticket is by submitting a talk <https://sessionize.com/kotlinconf-2024> 🙈 (As always, you don't really need to be an expert in the field to do a good talk!)

#### 2023/09/10
Super slow search for #Kotlin data class components in IntelliJ is a massive contributor for me not enjoying Kotlin as much as I could. It feels that problems like this one are too fundamental to not be fixed on day one 😐 Unreliable/slow search defeats the whole point of IDEs.

