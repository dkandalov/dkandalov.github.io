---
layout: post
permalink: /micro-blog/
---

#### 2024/03/08
I like the idea (can't remember the source) that not all tech decisions need to have economical rational behind them. For example, it might be worth tidying up the code not because it will make us more productive in the future but because we enjoy a better working environment.

=== Reply from [Vladimir Dolzhenko](https://twitter.com/dolzhenko) ===

<https://plugins.jetbrains.com/plugin/8575-nyan-progress-bar> right?

=== My reply ===

Yes, I guess overall it's about doing something because you feel like it, not because there is a convincing case for it to be useful or monetisable. The Nyan progress bar is on the artistic/performance meme side of it 🌈

=== Reply from [Ivan Moore](https://twitter.com/ivanrmoore) ===

I think there is economic rationale behind this though. Better working environment = higher morale = better motivated people = more productive.

=== My reply ===

I agree. I guess the point is that it doesn't need to have an economic rationale. People having meaningful lives is valuable on its own regardless of the productivity 🤔

#### 2024/03/07
I like the idea from the [Happy Path Programming podcast](https://podcasters.spotify.com/pod/show/happypathprogramming) (yes, it's a recommendation 😉) that creating a major build tool is so hard that people never do it again, and the knowledge is lost. But maybe someone should do it, so we finally get a perfect build tool for the JVM. An idea for Amper? 🙈

#### 2024/03/05
Looking recently into OAuth/OpenID, I'm tempted to create a diagram explaining the interactions, even though it's "yet another monad tutorial" territory. The reason is that I found most diagrams incomplete or confusing. Not a good thing from a security point of view 🤔

#### 2024/03/04
"Yet another emoji support" is one of my favourite #IntelliJ plugins <https://github.com/shiraji/yet-another-emoji-support> 😅 It adds emoji auto-complete similar to Slack which I wish was the default everywhere. Not sure if the plugin works in the latest IJ though, I have a local fork 😱🙈

#### 2024/03/01
Great talk by [Clare Sudbery](https://mastodon.social/@claresudbery) "Continuous Integration: That’s Not What They Meant" <https://www.youtube.com/watch?v=Ms3J6_-6-fk> 🤩 And this is your regular reminder that pull requests are a waste.

#### 2024/02/29
Here is my daily bread and butter 🍞🧈 being taken away in the form of #IntelliJ not finding #Kotlin property usages in the constructor unless it's a named argument :( #whybacklog <https://youtrack.jetbrains.com/issue/KTIJ-11262>

#### 2024/02/28
Not sure what The Internet thinks about it, but I prefer named arguments in #Kotlin to be passed in the order of parameter declaration. If you disagree, please make sure I know about it 🙈 <https://dmitrykandalov.com/tidy-kotlin#pass-named-arguments-in-the-order-of-parameter-declaration>

#### 2024/02/27
It's good that build tools care about build reproducibility, but unless you rebuild artifacts at some point later and compare checksums, you cannot assume that the build is actually reproducible (because the environment, pipelines, etc. do change over time).

#### 2024/02/26
Thinking of too many #Gradle downloads (because of many minor versions), the most appealing solution is to make core Gradle smaller and "finish" it, so it will naturally need fewer releases. And, hopefully, less API churn, so the build scripts from five years ago are valid today.

#### 2024/02/25
Another #Gradle rant is the amount of Gradle versions I end up downloading. It seems like each project has a slightly different version in gradle-wrapper. I have 16 Gradle versions on a relatively new laptop. Does it have to be this way?

=== Reply from [joschi](https://twitter.com/joschi83) ===

That's the whole point of the Gradle wrapper (and Maven wrapper if you're using it), allowing for completely reproducible builds.
Even better if you're using Gradle and Maven toolchains to download and use a specific JDK.

Also, are you working on a Raspberry Pi 1 or something? Disk space is cheap. 😅

=== My reply ===

Yes, reproducible builds are non-negotiable. The question is if the experience could be better :) I agree about disk space, although it's funny downloading +100Mb to compile a few classes. It's the download time (opening an old project on a train), IntelliJ indexing, etc.

#### 2024/02/23
Random #IntelliJ/#Gradle tip to balance out the rants. You can assign a keyboard shortcut to the "Execute Gradle Task" action (I have it as cmd+shift+G, G for Gradle). The action has auto-completion and hints for all Gradle tasks and flags! 😌

=== Reply from [Михаило Љевћенко](https://twitter.com/TheMishkun) ===

Even better it has "Run anything" dialog where if you type "gradle" you ll also get autocomplete, but you can also run "run cofigurations" and other things from it.

Pro tip: hold shift to run with debugger

=== My reply ===

I somehow never got into the "Run anything" dialog even though it's definitely a more explorable UX 🤔 For Gradle, I'd rather use a shortcut than type "gradel" and misspell it 🙃 The same for run configs. Or maybe these are excuses and I just find double ctrl a bit awkward.

#### 2024/02/22
Unpopular opinion, but I'm still not convinced by #Kotlin in #Gradle builds. It's slower. IntelliJ occasionally makes the whole script red. Build scripts are more verifiable with Kotlin but not more comprehensible. It's still a matter of copying random snippets from the Internet 😬🙈

=== Reply from [Martin Bonnin](https://twitter.com/martinbonnin) ===

I started using none of the generated accessors lately => no magic.
Now I just wish IDEA/Gradle could determine the buildscript classpath without the build.gradle.kts and that would fix the chicken and egg red underlines forever.

#### 2024/02/21
Another #Gradle/#IntelliJ rant is the console output. When running tests, why do I need to see all the "> Task..." and the classic "Deprecated Gradle features were used..." but can't see the command used to run the tests? 🤨

=== Reply from [Chris James](https://twitter.com/quii) ===

Oh god this drives me mad too

*Tries to teach TDD*

1. Write the failing test
2. Run it
3. Scroll past the bullshit to see the actual output you're interested in
4. Write enough code to make it pass
5. Run test again
6. Scroll past the bullshit to see the actual output you're interested in

=== My reply ===

+1 To clarify I’d rather not see any Gradle output in tests output but if it’s already there, I wish it included the command.

#### 2024/02/20
It feels that running code/tests was faster 10+ years ago via #IntelliJ built-in runners than it is today via #Gradle. Not sure if it's IntelliJ or Gradle itself or both. I wonder if it's worth digging out an old version of IntelliJ to prove the point 🧐 (or be embarrassed)

#### 2024/02/16
Similar to having code coverage turned on by default when running tests, maybe the performance profiler should be enabled by default when running code locally (and maybe some other environments). I'm sure I heard that idea at LJC unconference year ago 🤔

#### 2024/02/15
Thinking about code coverage, maybe instead of a separate feature, it should be the default behaviour when running tests (definitely during the development cycle) 🧐 There will be performance overhead, but it might be ok for many projects since the build is already super-slow 🙈

=== Reply from [Eugen Martynov](https://twitter.com/jack_martynov) (redacted) ===

So the case is about teams that collect coverage only. Frankly speaking, I know tons of people who write tests after code, so for them it is kinda obvious. As another reminder to write tests, maybe. Recently, I saw rare cases for projects without tests. Pet projects have tests.

=== My reply (redacted) ===

I would say not collecting but actually seeing in IDE which lines have coverage. This can be useful for both test-first and test-after.
Yes, sometimes it feels obvious which lines are executed and then the reality surprises me 😵‍💫

I never found collecting code coverage super-useful, but maybe I haven't seen it used right.

While I remember, here is an old video by [@sandromancuso](https://twitter.com/sandromancuso) showing how code coverage can be used during development <https://www.youtube.com/watch?v=_NnElPO5BU0>.


#### 2024/02/14
#IntelliJ has a popup window with recent run/debug "configurations" (alt+shift+F9 or F10). This is really cool and makes at least part of the top panel obsolete once you know the shortcuts. But there seems to be nothing similar for running with code coverage and profiler 🤨

#### 2024/02/13
Another idea is to bring the auto-completion of "object." from class-oriented to functional code. For example, when using http4k if I type `Request(` maybe #IntelliJ could show a dropdown with the values of the Method enum because it's the only possible first parameter 🤔 #Kotlin

#### 2024/02/12
I wonder if it might be a useful feature to have import "affinity" so that if there are few imports in a file from a particular package, more things are auto-imported from the package. Or maybe it already exists? (Please don't suggest auto-import exclusions in #IntelliJ 🙃)

#### 2024/02/11
I wrote a couple more sections in the Tidy #Kotlin about putting parameters/arguments on one/separate lines <https://dmitrykandalov.com/tidy-kotlin>

#### 2024/02/09
One of the coolest features in #IntelliJ 2024 for me are the charts 💪📈 I guess they work on any "data" content, but CSV file support is the killer feature because they are so easy to produce in a few lines of code.

<img src="../assets/images/micro-blog/2024-02-09.png" width="80%" height="80%"/>

#### 2024/02/08
Turns out #Kotlin get/set operators can have multiple parameters of any type 🧐 For example:
<kotlin>
operator fun &lt;T&gt; List&lt;T&gt;.get(i: Int, f: () -&gt; Int): List&lt;T&gt; = ...
operator fun &lt;T&gt; List&lt;T&gt;.get(vararg indices: Int): List&lt;T&gt; = ...
</kotlin>

Which can be used like this:
<kotlin>
list[0, { 123 }]
list[0, 2, 4]
</kotlin>

#### 2024/02/07
The missing #IntelliJ intention to generate named arguments in Kotlin is a feature that I wanted for years but never even bothered looking up on YouTrack. Makes me wonder if the votes on issues skew toward the most irritating or shiny but not necessarily the most useful ones 🤔

#### 2024/02/06
One of the #Kotlin plugin features that I'd expect from day one is an intention to generate named arguments for function/constructor invocations. Seems like a good ratio between the effort to implement and productivity impact. But it's in the backlog <https://youtrack.jetbrains.com/issue/KTIJ-16676> 😕

#### 2024/02/05
On the topic of browsers, I use Firefox as a default browser (configured to clear cookies and other data on restart) and Chrome when I need to be logged in. Firefox Focus on iOS. Quite happy with it. Chrome is the new IE 🙈

#### 2024/02/04
For the first time in ages, I'm happy to accept a cookie 😋 And it was a really tasty one!<br/> Thank you, Firefox! #fosdem

<img src="../assets/images/micro-blog/2024-02-04.jpg" width="80%" height="80%"/>

#### 2024/02/03
Interesting talk by Alan Bateman about virtual threads limitations and future plans <https://fosdem.org/2024/schedule/event/fosdem-2024-3255-virtual-thread-s-next-steps> #fosdem

#### 2024/02/02
A bit of a boring topic, but it seems there is a tendency to extract a CONSTANT whenever there is a "special" value in the code. I would prefer a local variable just because it's in line with making definitions as private as possible. I wonder if there is a CONSTANT_CARGO_CULT? 🧐

#### 2024/02/01
As an example of build script testing in Gradle, it could be a task to unit test isolated parts of the build script (pure functions, simple tasks) or to sanity check output/artefacts (size, basic structure of artefact, actual dependencies, etc.) of more complex tasks.

#### 2024/01/31
I will be in Brussels at [@fosdem](https://mastodon.social/@fosdem@fosstodon.org) for the next couple of days. Happy to meet if you're also there and maybe do a code kata or chat about #Kotlin 🙂

#### 2024/01/30
Given the complexity of build scripts, how is it, not a thing to write automated tests for the build itself 🤷‍

#### 2024/01/29
I doubt it's a new idea, but why not make #Twitter features into Internet standards (instead of another social network)? For example, a tweet could be content with URI, reply - a relation to another URL, following - something similar to RSS, likes - a generic rating system, etc.

#### 2024/01/27
One lesson I learned from the Twitter takeover is that if I care about the content I publish on social networks, I shouldn't rely on them to keep it or make it available. Everything I wrote on Twitter/Mastodon/LinkedIn in the last couple of months is also available in my blog <https://dmitrykandalov.com/micro-blog>.

#### 2024/01/26
Having approval/snapshot tests for calculated cells in notebooks could be really useful. The hardest part is to show meaningful diffs for complex and visual data. Maybe a feature for [@KotlinForData](https://twitter.com/KotlinForData) one day :) (I found <https://github.com/ploomber/nbsnapshot>, but it's not quite what I'd expect.)

#### 2024/01/25
If #Java/#Kotlin libraries, ideally, shouldn't have global side effects (e.g., print to stdout or create a global thread pool), then maybe they should also avoid logging via global API. And instead, configure logger as a function (or object) explicitly passed into library API 🤔

#### 2024/01/24
Random #IntelliJ tip. If you see a yellow/red notification panel at the top of the editor with some actions as links, instead of using the mouse to click the links, you can trigger the actions via the alt+enter popup window. For example, "Setup SDK" in the screenshot below.

<img src="../assets/images/micro-blog/2024-01-24.png" width="80%" height="80%"/>

#### 2024/01/23
I've seen people doing this in #Java and #Kotlin:
<kotlin>
if (list.isNotEmpty()) {
    list.forEach { ... }
}
</kotlin>
Premature optimisation or prudent code avoiding `Iterator` allocation?

=== Reply from [Brian Ziman](https://mastodon.social/@BrianZiman) ===

Definitely a premature optimization. ArrayList doesn't allocate an iterator at all, nor does Guava's ImmutableList. I would guess most "good" classes have a pretty optimized forEach() method. If you're relying on the default implementation of Iterable.forEach() in some other less performant type, then this trivial optimization probably doesn't buy you anything at all, but costs you readability.

#### 2024/01/22
Pedantic alert 🤓🚨 Are there any docs saying that #Kotlin `val` actually means "value"? It's "local property" in [the language spec](https://kotlinlang.org/spec/declarations.html#local-property-declaration). "Property" in [the grammar](https://kotlinlang.org/docs/reference/grammar.html#propertyDeclaration). And "read-only local variable" in [the documentation](https://kotlinlang.org/docs/basic-syntax.html#variables).

#### 2024/01/20
I did the NO_SCREAMING_SNAKE_CONSTANTS lightning talk at the last XTC meetup. An interesting observation is that with the same style, it's easier to change `val`s to `const`s or back without updating all usages. And a suggestion to try uppercase for vars and mutable data instead 😯

#### 2024/01/19
Programming language terminology is a mess. People say "variable" meaning unmodifiable reference to immutable data, e.g. String `val` in #Kotlin. 🙈 Or it can be a modifiable reference to mutable data. How new joiners are supposed to make sense of this? 🤷‍ We need better terms!

#### 2024/01/18
I did a small write up suggesting to inline all single usage “variables” in #Kotlin <https://dmitrykandalov.com/tidy-kotlin#inline-variables-with-single-usage> because there are pretty much no downsides to that (except if it needs a better name or object requires longer lifetime obviously).

#### 2024/01/17
I wish there was an #IntelliJ feature to search files and class names in git (or VCS) history. And maybe code history text search as well (e.g. based on 'git log -S')?

#### 2024/01/15
<kotlin>
object Foo

val Foo.bar: String get() = "str"

fun main() {
    Foo.bar // Alt+enter "Add import" intention does nothing
}
</kotlin>
<https://youtrack.jetbrains.com/issue/KTIJ-18028> #Kotlin #backlog 😔

#### 2024/01/14
Another interesting historical speculation is that the camelCase naming style became popular because of the lack of an underscore key on some of the old keyboards <http://exampler.com/blog/2012/05/15/speculation-about-the-origin-of-camelcase>. Surprisingly, there aren't many studies to know if camelCase is better or worse for reading identifiers <https://en.wikipedia.org/wiki/Camel_case#Readability_studies>.

#### 2024/01/13
I did a small write-up on my favourite topic of SHOUTING_CONSTANTS <https://dmitrykandalov.com/tidy-kotlin#stop-the-constant-shouting>. TLDR there are no good reasons for uppercase constants other than history.

#### 2024/01/12
If you are in London next Tuesday (16th January), come say hi at eXtreme Tuesday Club (XTC). It's a great #openspace meetup! Will be hosted for the first time in East London hipsterlands 👉 <https://www.meetup.com/extreme-tuesday-club-xtc/events/297787737>

#### 2024/01/11
I wonder if making variables/functions/classes/etc. as private as possible is considered to be a form of encapsulation. Or “encapsulation” is too specific to OO and something like “information hiding” is better for non-OO code?

=== Reply from [Orchun Kolcu](https://mastodon.social/@orchun@hachyderm.io) ===

I don't think encapsulation is OO specific (and although people will argue otherwise, information hiding is just what you achieve by encapsulating decisions), but there needs to be a capsule/abstraction you can point to as the end result.

So maybe outside that context, it's just minimizing visibility or "hidden by default".


#### 2024/01/10
I drafted a couple of Kotlin "tidyings" <https://dmitrykandalov.com/tidy-kotlin>. I think it might be good to get some feedback before writing more. What could go wrong with posting a draft on social media... 😑

#### 2024/01/09
Library to make Data-Oriented programming in Kotlin easier by extracting typed values from dynamic data structures such as Maps <https://github.com/fork-handles/forkhandles/blob/trunk/data4k/README.md> 👈 Looks interesting and reminds me of <https://github.com/uberto/kondor-json>

#### 2024/01/08
Following analogy between websites and codebases: compiler bug => can't render a valid web page; IDE navigation bug => can't follow a valid URL. From this point of view, navigation issues are fundamental and should have one of the highest priorities 🧐

#### 2024/01/07
I find "code smell" as a metaphor quite descriptive. Like smells, it's often an immediate uncontrolled reaction, and I can be rigid about preferences. I wish though I could be more flexible and absorb the context in which the code was written. Maybe another metaphor could help? 🤔

#### 2024/01/05
[KT-17206](https://youtrack.jetbrains.com/issue/KT-17206) NoSuchMethodError happens with dependencies SomeTest->SomeClass->Util, where Util from test shadows Util from main. The same issue exists in Java, but in #Kotlin it's easier to forget that files are always classes. And it's compounded by tools not showing classpath 😔 This must be even more confusing for #Kotlin multiplatform when not targeting JVM #leakyabstraction

#### 2024/01/04
To be specific about [KT-17206](https://youtrack.jetbrains.com/issue/KT-17206), extract a couple of test functions into Util.kt. #IntelliJ is happy. #Kotlin compiles the code. But when running tests, they fail with NoSuchMethodError. The reason is that there is already UtilKt class in the main code. See <https://github.com/dkandalov/hello-KT-17206/blob/main/src/test/kotlin/test/SomeTest.kt>

#### 2024/01/02
It's one of those days when after making a trivial change, I get a baffling NoSuchMethodError. Luckily, by now I have an intuition to remember this #Kotlin issue <https://youtrack.jetbrains.com/issue/KT-17206> so it doesn't take hours to fix. Good to see it's being rediscovered years later for #KMP <https://youtrack.jetbrains.com/issue/KT-63940> 🙈

#### 2024/01/01
If you need a podcast recommendation, Oddly Influenced by [@marick](https://mastodon.social/@marick@mstdn.social) is an excellent one <https://podcast.oddly-influenced.dev> "A podcast about how people have applied ideas from outside software to software." Makes you realise the software world doesn't exist in isolation.

#### 2023/12/31
Not a new idea, but I wonder if the web (similar to how we browse code) could be more about structured data and less about styles. It might be too late for HTML, but what if browsers rendered markdown 🤔 This also solves the light/dark mode "problem" with local rendering.

#### 2023/12/30
Similar to how we might see ads on websites, maybe we could have "ads" in codebases showing links to related code or well-known bugs/pitfalls/etc related to the code on the screen. Like inspections in #IntelliJ but less focused on the specific line of code 🧐

#### 2023/12/28
To be clear, when I suggest tracking user navigation on codebases, it's not just about improving the IDE/editor experience, but about improving the code (or how we think about it) in the context of the current project and people. Or at least learning about it based on data.

#### 2023/12/27
It would be great to have use cases for tracking user navigation on codebases. If you're using #IntelliJ-based IDE on a project big enough to benefit from usage/navigation tracking, please let me know, and I might tweak this plugin <https://github.com/dkandalov/activity-tracker> so that it works well for your project.

#### 2023/12/26
Another application of web browsing to codebases might be to track user navigation. If you know the most viewed areas, common navigation patterns, etc., then you can improve the areas that matter. Or maybe discover that some people have tacit knowledge that's worth sharing.

#### 2023/12/24
Given browsing is like a code navigation analogy, browsers could also borrow a few things from IDEs/editors. For example, the old idea of a website map, i.e. a tree structure for navigation. Or why we still can't bookmark any line on a website? 🤷

#### 2023/12/23
We browse websites with their original styling (ignoring Safari reader view and Opera local CSS since they're not too popular.) At the same time, codebases don't have any styling at all. What if they did, so we could see the code exactly the same way as authors?

#### 2023/12/22
Continuing with code navigation is similar to the web browsing analogy, all browsers have navigation history sorted by time, which you can also search and filter. Why is it not a norm for text editors/IDEs? 🧐

#### 2023/12/21
Discovered today a great talk by [@emeryberger](https://mastodon.social/@emeryberger@discuss.systems) "Performance Matters" <https://www.youtube.com/watch?v=r-TLSBdHe1A> TLDR it's easy to misattribute performance changes due to memory layout, etc. Profilers are not designed for concurrency. See <https://github.com/ccurtsinger/stabilizer> and <https://github.com/plasma-umass/coz>

#### 2023/12/20
I don't think there is an action in #IntelliJ to open a declaration in a new split on the right. Using macro (Edit Source, Move Tab Right) works but has too much visual noise. OTOH, there is an underrated (thinking about myself) "Show Type Definition" action that shows a popup.

#### 2023/12/19
Another application of "code navigation is like browsing" is for IDEs/editors and web browsers to learn from each other. For example, Arc browser on alt+click opens a link in a new right split. Unlike VS Code which on alt+cmd+click keeps only one right split. Why the difference?

#### 2023/12/18
If you agree with the analogy between navigating a codebase and browsing websites, then learning from web usability to apply it to software design would make sense. For example, "Don't Make Me Think" by Steve Krug is an old but good book on the topic <https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited>

#### 2023/12/17
I wonder if "reading" code is a good analogy for any large enough codebase (and, if not, it might be leading us in the wrong direction). Yes, we read words on the screen, but overall it's closer to browsing the Internet than reading a book 🤔 "Navigability" vs "readability"?

=== Reply from [Estrella Kowalski](https://twitter.com/kowalski17324) ===

I think it's a good analogy. Code is a form of written communication, and reading it is a way to understand it.

=== My reply ===

Yes, it's definitely reading because most programs are text-based. And it's also a different kind of reading, e.g. compared to books one difference is that it's not sequential. "I was reading the Internet" sounds odd, so maybe there could be a term for "reading" codebases.

=== Reply from [Estrella Kowalski](https://twitter.com/kowalski17324) ===

I think "navigating" is a good term for it.

#### 2023/12/14
It felt like I didn't do much refactoring during [Advent of Code 2023 in Kotlin Day 4 stream](https://www.youtube.com/watch?v=I0nCFMDkPNo) so I made an attempt at making a #refactoring golf based on the exercise <https://github.com/dkandalov/aoc-golf-day4-2023> Let me know if it's usable 🙈

#### 2023/12/10
I still regret I didn't make it to this gig by Alpha Male Tea Party in 2017 <https://www.youtube.com/watch?v=YwPta95y9_o> 😅 I had to prioritise and be at [@ACCUConf](https://mastodon.social/@ACCUConf) in Bristol instead. Similar to the band, it's not the most known conference (outside the C++ world) but highly recommended regardless of the programming language you use.

#### 2023/12/09
Good to see that #IntelliJ got a new "Lift function call out of 'when'" (refactoring) inspection since I did the Gilded Rose talk at KotlinConf <https://www.youtube.com/watch?v=AxxNHKCldzA> Thank you, [Toshiaki Kameyama](https://github.com/t-kameyama) 🙏

#### 2023/12/08
I don't have a cat to take a photo with the "Tidy First?" book #TidyCat But there is a TCR Bar in London 😅 To be clear, in this case, TCR stands for Tottenham Court Road, not "test && commit || revert". Are there any rich geeks to open TDD Bar in London, maybe in Shoreditch? 🧐 /cc [@kentbeck](https://mastodon.social/@kentbeck@hachyderm.io)

<img src="../assets/images/micro-blog/2023-12-08.png" width="80%" height="80%"/>

#### 2023/12/07
Thinking about copy-paste issues, #Microsoft is the winner. Formatting issues, broken shortcuts and copy-paste doing nothing at all. Unbelievable! It worked better 20 years ago. Should there be a consumer protection law, so that big companies are obligated to fix basic bugs? 🤔

#### 2023/12/06
(Summoning the power of social media 🪄🎅) When you copy text/code, and then paste it, you expect to see exactly the same code/text. Unfortunately, this is not the case when editing #Kotlin in #IntelliJ. Could this issue be moved out of the backlog (aka "never") please <https://youtrack.jetbrains.com/issue/KTIJ-10687/Copy-Paste-should-preserve-static-imports>

<img src="../assets/images/micro-blog/2023-12-06.png" width="30%" height="30%"/>

=== Update ===

It worked! The issue is going to be fixed in Intellij 2024.1 🥳

#### 2023/12/05
Why do you need a pull request to revert the last merged pull request (assuming nothing else was committed)? 😒 Not really asking the question but answers are welcome.

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
- <https://arrow-kt.io/learn/typed-errors/working-with-typed-errors>
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

