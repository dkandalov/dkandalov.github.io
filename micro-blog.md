---
layout: post
permalink: /micro-blog/
---

#### 2025/07/25
I wish IntelliJ "Select in Project" action would say why it couldn't select the current file in the project view, so that I don't need to guess. For example, the file is in an excluded directory that is currently hidden. Details matter!

#### 2025/06/28
I find the hallucination metaphor in the context of LLMs very misleading (perhaps deliberately so). For humans, hallucination is an illusion in the absence of an external stimulus, i.e. malfunction. For LLMs, hallucination is all they can do. It just happens to be correct or wrong 🤷

#### 2025/06/27
One of the most annoyingly unnecessary things I've seen too many times recently (including projects using http4k) is passing around base URL and credentials for each function that makes an HTTP call 🙄 In http4k world you can just do `SetBaseUriFrom(...).then(MyAuth()).then(client)`.

#### 2025/06/26
[This is the recording](https://www.youtube.com/watch?v=SwNTpgp262o) of Duncan McGregor and me doing the "47 refactorings in 45 minutes" talk at #KotlinConf. Aka "47 refactorings in a week with PRs". (Note that it's missing slides, so the intro and outro might not make a lot of sense). 

#### 2025/06/13
Assuming systems are doing their job perfectly, if PRs are not about continuous integration (or code quality), they must have another function. What about PRs are about control (or rather an illusion of control)? And that could fundamentally be insecurity/anxiety. #noPRs

#### 2025/06/11
As Duncan McGregor speculated, we might be using the same part of the brain to track whether our hands are dirty and to track the size of code changes. So people with different hygiene standards and definitions of "dirty" will tend to disagree? How "clean" are two weeks of commits on a branch? 🤷‍

#### 2025/05/26
For anyone interested, I pushed the code from the "47 refactorings in 45 minutes" talk by Duncan McGregor and myself at #KotlinConf to [this branch](https://github.com/dmcg/gilded-rose-tdd/tree/47-refactorings-at-kotlin-conf?tab=readme-ov-file#47-refactorings-in-45-minutes-references) (including references and mini-plugins). And here is the [recorded video](https://www.youtube.com/watch?v=SwNTpgp262o).

#### 2025/05/23
"If you don't know what your organisation is optimising for, then it's probably control" TIL from #KotlinConf keynote by Diana Montalion.

#### 2025/05/22
If you happen to be at #KotlinConf today, come over to the Kotlin Foundation Booth at 13:45 where I will do a demo of LivePlugin.

#### 2025/05/21
I updated the [blog post](https://dmitrykandalov.com/intellij-settings) with the non-default IntelliJ settings I use for 2025.2 EAP. Please let me know if you disagree with them 😅

#### 2025/05/01
I wish IntelliJ could put a breakpoint in bytecode and step through it. (The actual problem being several versions of a class without attached source code namespaced by classloader while figuring out who sets empty "idea.plugins.compatible.build" on Kotlin embedded compiler.)

#### 2025/04/30
I miss the 'Convert to lazy property' Kotlin intention after moving to K2. (It looks like it [should be available in](https://github.com/JetBrains/intellij-community/blob/e8cf2732c373bc0309fe7d3edf10c39fcdf887f9/plugins/kotlin/code-insight/intentions-shared/src/org/jetbrains/kotlin/idea/codeInsight/intentions/shared/ConvertOrdinaryPropertyToLazyIntention.kt#L20) both K1 and K2, but I don't see it ☹️)

=== Reply in DMs ===

It's only available in IntelliJ 2025.2, but should be backported to 2025.1.2.

#### 2025/04/28
I wish the Kotlin 'Make private' intention was more like a refactoring and would only work if making var/function wouldn't break the code. Also, an inspection to make everything as private as possible would be great.

=== Reply from [Tom Anderson](https://twitter.com/tomwhoscontrary) ===

IntelliJ has some weird blind spots around access control. "Oh if i move this, it won't be accessible to this other method!". Well make it public then?!

#### 2025/04/27
I love how the `Shelve Silently` action in the latest IntelliJ comes up with the change description by default (using `shelveSilentlyTitleProvider` via AI Assistant plugin). The next thing is to make it default for commits, so we'll just be giving our approval to the generated text.

=== Reply from [Anton Keks](https://twitter.com/antonkeks) ===

Good commit message is "why", not "what"

=== My reply ===

Yes, we need an inspection that compares commit messages, comments, etc. with what LLM would generate and tells you off if they roughly match 🙃 Or more generally, maybe some kind of agent that detects LLM-like content and marks it as generated?

#### 2025/04/26
Random IntelliJ tip. You can compare any directories (including the content of files) by selecting two directories in the project view and invoking the 'Compare Directories' action (ctrl / cmd+D). You can then change the directories to any location outside the project 🧐

#### 2025/04/17
This is a niche rant, but how come the presentation assistant in IntelliJ shows shortcuts from the keymap instead of the keys that I press on the keyboard 🤷 It had one job! So here is my own assistant using LivePlugin <https://gist.github.com/dkandalov/54839566c1de9e6012c93bcb87309306>.

#### 2025/03/28
Software that "just works" long enough without any intervention, naturally becomes hard to build/release/support. OTOH software that breaks often enough, creates a sociotechnical system to support its existence. Should it be a deliberate practice though? 🤔

=== Reply from [@sleepyfox](https://mastodon.social/@sleepyfox@hachyderm.io) ===

So, what you're saying is that people should buy really unreliable cars that break down all the time (like in the early 1900's) so that we can build up our car maintenance skills, and encourage the growth of the garage industry?

=== My reply ===

I didn't think about it from the end-user point of view. This is interesting and, I guess will also keep the sociotechnical system functioning. Bringing the analogy back to software, this sounds a bit like Linux (with its ultimate "right to repair") 🙈

Clarifying the original post, the context was "enterprise" software that works well enough without any intervention for years to the point when nobody can build/release it anymore. So when something finally does go wrong, it's organisationally harder to fix it compared to software that needs more frequent interventions.

=== Reply from [@sleepyfox](https://mastodon.social/@sleepyfox@hachyderm.io) ===

Okay, what you're talking about is the decay and erosion in organisational process memory.
This is the reason that in Japan they dismantle and rebuild temples every 25 years.

#### 2025/03/27
The meetup looks a bit busy, but if you're in London and would like to see [Duncan McGregor](https://twitter.com/duncanmcg) and me pre-practicing our KotlinConf talk by doing 31 refactoring in 30 minutes, then I'm sure there will be a seat and a free M&S snack/drink <https://www.meetup.com/kotlin-london/events/306456259>

#### 2025/03/18
If you happen to be in London on Thursday 17th April, this is the event to attend <https://www.meetup.com/source-talks-on-kotlin/events/306722368> with two talks by the authors of http4k.

#### 2025/03/12
I wonder if asking (or begging) an LLM/coding agent to follow specific steps is fundamentally futile. It feels like there is missing configurability of steps and/or things that need to be checked, etc., and of the overall context so I can say "Look at that other project".

#### 2025/03/07
Instead of using LLMs to generate code documentation, maybe they could be used to determine what is NOT worth writing down. If something can be generated by LLM, it can be derived from the code and is not unique enough to keep it.

#### 2025/02/25
Should LLM-generated content be labeled similarly to programmatically generated files (at least what is pretty much a cache to save CPU cycles)? As a human consumer, I might want to use a different chatbot to summarise the content (e.g. commit messages) in my preferred way.

#### 2025/02/21
Similar to the null reference being a billion-dollar mistake, we need Linus or someone from GitHub to speak up and explain that pull requests are a trillion-dollar mistake.

#### 2025/02/20
Here is an example of how a small change trying to optimise Kotlin code with `inline` and then using imperative style with `return` can break things.

<img src="../assets/images/micro-blog/2025-02-20.webp" width="80%" height="80%"/>

#### 2025/02/11
Great talk by Anton Arhipov at the [Kotlin London meetup](https://www.meetup.com/kotlin-london/events/305589782) tonight. You can find the (recent enough) slides here <https://speakerdeck.com/antonarhipov>. My main takeaway is that Kotlin contracts could make DSL builder parameters mandatory (like function parameters?) 🤔 

#### 2025/02/08
If higher-level abstractions should be at the top of the file, then shouldn't all imports be listed at the bottom? 🙈

#### 2025/02/07
Awesome talk by [Andrei Pangin](https://twitter.com/AndreiPangin) ["A Simple Approach to the Advanced JVM Profiling"](https://www.youtube.com/watch?v=TDpbt4thECc). Lots of profiling on the JVM wisdom and reasons why [async-profiler](https://github.com/async-profiler/async-profiler) is the best tool in town (I just wish it had more regular releases 🙏)

#### 2025/02/04
Random idea: integrate LLM into a disassembler to make the code somewhat readable even if it was obfuscated. Or observe program behaviour at runtime and generate source code that could reproduce the behaviour 🤔

#### 2025/02/03
TIL there is a JITWatch4i plugin for IntelliJ to analyze/visualize JIT compiler activity, generated assembly, etc., and there are nice examples in its readme <https://github.com/JetBrains/jitwatch4i>.

#### 2025/01/29
It's fascinating how much the lack of a fast feedback loop contributes to the difficulty of a problem. And the "industry standard" infrastructure solutions only make it harder for the sake of scale that you can't have or don't need. I hope the era of "cloud mainframes" will end.

=== Reply from [Uberto Barbini](https://www.linkedin.com/in/uberto) ===

And still they insist about "just use PRs and build your branch remotely"

#### 2025/01/23
What if in addition to the type inference, there was parameter/variable name inference (e.g. lower camel case based on type and name clashes is an error)? This could encourage the use of tiny (aka micro) types 🤔

#### 2025/01/21
I'm not convinced about functional parameters called "block" given the ambiguity of "code block" and "to block". It's often obvious from context (until it's not), but then there is `async { block() }` in Kotlin where the block doesn't block.

#### 2025/01/20
Arguably, there is sometimes a trade-off between expressive code structure/formatting and its usability in debugging tools (e.g. stepping through functional code). Ideally, this is to be fixed by the tooling, but in practice, it is something to consider for libraries/frameworks.

#### 2025/01/19
TIL while iA Presenter is good at quickly creating reasonably looking slides from Markdown, you can pretty much get 80% there with the reveal.js Markdown plugin <https://revealjs.com/markdown>.

#### 2025/01/16
Maybe it's already a thing but why isn't there a tool (I mean an executable file) for GraalVM native image that could look at a project and using reasonable guesses just compile it into a binary? (Asking so that I can avoid modifying any Gradle scripts.)

#### 2025/01/15
One of my all-time favourite macOS feature is being able to zoom on any part of the screen. It's fast, zooms on tiny details, and basically just works. It's in System Settings -> Accessibility -> Zoom. I use it with control modifier, full screen style.

#### 2025/01/14
Here is an old message that not all progress is always progress: [The Real Reason Why Analog Recording Is Better](https://www.youtube.com/watch?v=Zq4BOSaKiYo). What would it mean for software? Labeling apps, UI or APIs as long-term-support and avoiding breaking changes for many years (assuming the company survives)?

#### 2025/01/10
Speed vs correctness is a false dichotomy (at least for creating software). It's more about making progress without too many negative consequences (broken software, wasted effort, bad design, etc.). And some problems can't be solved by "thinking harder", see [Cynefin framework](https://en.wikipedia.org/wiki/Cynefin_framework) #noPRs

#### 2025/01/09
From what I can see compiling a few Kotlin files in LivePlugin, the basic embedded Kotlin compiler seems faster (<1s) compared to Gradle builds (several seconds). I wonder if capturing Gradle configs and using embedded compiler can speed up builds 😅 See [EmbeddedCompiler.kt](https://github.com/dkandalov/live-plugin/blob/master/kotlin-compiler-wrapper/src/liveplugin/implementation/kotlin/EmbeddedCompiler.kt).

=== Reply from [Martin Bonnin](https://twitter.com/martinbonnin) ===

I'd be curious what the numbers are with Amper.

=== My reply ===

I'm using Amper on a pet project and it's a great setup with ~5 LOM (lines of yaml) but if anything, the build is even slower than Gradle, >2 seconds without any code changes. I'm becoming jealous of Maven build times 😱🙄

#### 2025/01/07
The speed (and complexity) of modern deployment pipelines make me really sad (add pull requests for more misery). It's been a few years since Darklang bragged about 50ms deployment https://blog.darklang.com/how-dark-deploys-code-in-50ms but I am not sure if it had an impact 😞

=== Reply from [Marc Reichelt](https://bsky.app/profile/mreichelt.bsky.social) ===

Absolutely. I've seen pipelines of 40-60 minutes and worse in the mobile world. There are positive examples as well (e.g. in a recent project the pipelines took ~4 minutes).
Do you have more concrete examples of what you were seeing?

=== My reply ===

Overall, my frustration is that the state of deployment is so bad that we accept ~4 minutes as a positive example. My experience is Kotlin/Java sever side. Concrete example: ~40 minutes to build a PR, wait for it to be approved, ~2 hours to deploy.

=== Reply from [Marc Reichelt](https://bsky.app/profile/mreichelt.bsky.social) ===

You're right - 4 minutes is still too long.
May I ask what parts of a PR take the longest time?

It's a tradeoff between correctness & speed. Sure, we could merge everything instantly, but that would be bad if things break.
But more often I feel that not many actually care enough to fix it.

=== My reply ===

I think it's the wrong question to ask 😅 The problem is async work, e.g. see <http://vimeo.com/842233600>

Answering your question, the slowest part of PRs depends on the project and can fluctuate. Using the concrete example, I think the build part is the slowest. It's also wasteful because you end up building/testing locally, on PR, and on the main branch (even if nothing has changed).


#### 2025/01/04
I'm sure it's too late to change it now, but I'm not entirely convinced about `kotlin.Metadata` and `kotlin.annotation.Target` annotations being imported by default in Kotlin. They are not used very often but the names are generic enough to have conflicts.

#### 2025/01/03
If you ever missed the feature to collapse Kotlin functions/constructors, don't give up just because the issue is in the backlog <https://youtrack.jetbrains.com/issue/KTIJ-14710>. Try LivePlugin with [this Gist](https://gist.github.com/dkandalov/82f37b0d3a6f8b3e4c6f1f2296a63e41) 😎 (Or hack you own!)

#### 2025/01/02
Here is an old idea. Instead of mocking libraries, use approval (aka snapshot) tests to verify object interactions. Maybe with some diagrams 🤔

#### 2024/12/31
The amount of actively used calendars is a good reminder that the "new year" is very much a social construct. There’s also Julian calendar (making all historical dates "wrong"). There are time zones with changing rules and borders. And of course leap seconds! 🙃

<img src="../assets/images/micro-blog/2024-12-31.webp" width="80%" height="80%"/>

=== Reply from [楊微粒](https://twitter.com/yx_weili) ===

There is a mistake in the image. While the year 2025 AD does roughly  correspond to the 4722nd year of the Huangdi Era, the Huangdi Era is calculated according to the Chinese calendar. January 29, 2025, is actually the first day of the first month  in the 4722nd year

=== My reply ===

Took me a while, but you're basically saying that it should've been 4721 on the map 🧐 Thank you for the correction! <https://en.wikipedia.org/wiki/Chinese_calendar_correspondence_table>

#### 2024/12/30
Sometimes, I use GitHub to look at projects that I have locally. Opening an editor/IDE feels too slow, e.g., IntelliJ indexing/downloading everything (ahem, Gradle) even though I only need two files to look at. This is a shame. I guess I'll set up Zed on the command line for now.

#### 2024/12/28
The flip side of object initialisation side effects is the clean-up on graceful shutdown or when object graph initialisation fails halfway through. Somehow, this and related topics of object ownership and lifetime are not that big on the JVM 🤔

#### 2024/12/27
It should be possible to construct classes without significant side effects. Otherwise, object graph wiring is coupled with its initialisation. And if you try making initialisation lazy with higher-order functions, they will propagate implementation dependencies.

=== Reply from [Tom Anderson](https://twitter.com/tomwhoscontrary) ===

I write apps (in Java) with main methods, which usually look like:

`wireUp(loadConfig()).forEach(Runnable::run);`

Then I write unit tests which call wireUp with various possible configs. This catches all sorts of mistakes. And exerts a lot of pressure to stay side-effect free!

#### 2024/12/26
Since there was a bit of noise about <https://minds.md/zakirullin/cognitive> recently... I really like the call for "something fundamental, something that can't be wrong" and cognitive load is a great choice. Except that without properly designed repeatable studies, "cognitive load" is just a new buzzword.

#### 2024/12/24
Since the advanced feature of committing to Git is not available in [Zed](https://zed.dev), I had a look to see if I could hack something. Interesting to find the editor implementation with 15K lines and 150 functions in Editor <https://github.com/zed-industries/zed/blob/7425d242bc91d054df3c05f2b88307cfb3e9132f/crates/editor/src/editor.rs#L1001> 😮 I don't imply big files are necessarily bad though.

#### 2024/12/22
I bet multiplatform is one of the reasons why navigation from #Kotlin enum (or String, Int, etc.) to its actual implementations on the JVM is tricky and still not done. OTOH, I always wanted IDE navigation from Java native methods (at least for OpenJDK) to C++ code. Because why not?

#### 2024/12/21
Enum classes in #Kotlin don't get enough IDE navigation :( For example, (unlike Java) I can't cmd+click on `valueOf()` to see the source code and docs. ([This YouTrack issue](https://youtrack.jetbrains.com/issue/KTIJ-16701) is probably related #backlog)

#### 2024/12/20
Is there a good write-up on #Kotlin `FunctionN`, etc.? I found [this document](https://github.com/JetBrains/kotlin/blob/15716a7a3c5e6df4b7520fd07ece62ac5db6debf/spec-docs/function-types.md#function0-function1--types) but not sure if it's up-to-date 🤔 (Also could IDE please navigate to `FunctionN` even it's "fake" source code if nothing else for educational reasons 🙏)

#### 2024/12/18
Random #IntelliJ tip. You can use the "Search Usages" action (which shows a popup with usages) recursively! It will figure out the outer scope of the selected usage (e.g., a function in which it's defined) and show another popup with usages. (It doesn't work in all languages though.)

<img src="../assets/images/micro-blog/2024-12-18.webp" width="100%" height="100%"/>

#### 2024/12/17
I like the idea of uniform navigation across #IntelliJ editors and tool windows as a grid (or should it be previous/next?). It needs experimenting with inactive/floating windows, but being able to forget tool window shortcuts is promising. (Inspired by this PR <https://github.com/dkandalov/tab-shifter/pull/43>.)

#### 2024/12/14
Another great video by [Duncan McGregor](https://twitter.com/duncanmcg) <https://www.youtube.com/watch?v=npxjzNvuH_c> in which he gets to the bottom of #IntelliJ test runners' timings. There are too many IDE UX WTFs to mention and sadly most of them come down to #Gradle integration 😢

#### 2024/12/13
Here is an #IntelliJ action to optimise imports (in the background!) in all project Kotlin files <https://gist.github.com/dkandalov/a48cae4ad5459b7036f3d52307d1afb4>. Admittedly, this is a hack (aka a "tactical workaround") that will make #IntelliJ log exceptions, but this is still better than modal dialogs blocking all IDE windows #LivePlugin

<img src="../assets/images/micro-blog/2024-12-13.webp" width="80%" height="80%"/>

#### 2024/12/12
How come "Optimise Imports" for multiple files/packages/modules in #IntelliJ is a modal operation that blocks all windows and projects 😭 As you can imagine, it's not very fast for large projects, and it stops you from doing literally anything else ☕️ #rant

#### 2024/12/11
The ideas in this talk by [Holly Cummins](https://bsky.app/profile/holly-cummins.bsky.social) feel just right to me <https://hollycummins.com/efficiency-goto> (I've only seen the slides though, because the video is behind paywall). TLDR JVM apps are too dynamic, we can reduce runtime waste by doing more at build time. Yes, please!

#### 2024/12/10
One of the big usability gaps for me when using #Kotlin extension and some scope functions is that IDE cannot highlight usages of `this` in the current scope. This is why I try to avoid `apply`, `with`, and nested scopes. (There must be an issue for this somewhere.)

#### 2024/12/09
Thinking about the actual tests duration reminded me of the custom #LivePlugin tweaks I did for the ["Refactoring from Spring to Kotlin" talk](https://www.youtube.com/watch?v=d_GHTBqI7YE). One interesting tweak was to make progress bar visible during Gradle build in the presentation mode, see <https://github.com/dkandalov/gilded-rose-service/blob/trunk/.live-plugins/actions/plugin.kts#L71C5-L71C24>.

#### 2024/12/08
Here is [a bit of code](https://gist.github.com/dkandalov/232dcfe2b328d6ea46c4b1ac48810a6e) for #LivePlugin to measure the duration of tests in #IntelliJ IDEs because test runners don't show the actual time. (To be precise, the code is also inaccurate because it relies on IDE callbacks. Screen recording would be better.)

#### 2024/12/07
Nice video by Duncan McGregor exploring test runners situation in IntelliJ and how they lie to us about the test duration <https://www.youtube.com/watch?v=tvCSZgN1g_w>. And thank you, Duncan, for the #LivePlugin ad at the end of the video!

#### 2024/12/06
When talking about AI to people outside the software realm, it's probably best summarised as "personalised horoscope based on web search" to avoid inflated expectations (although horoscopes is a dangerous territory).

#### 2024/12/05
Importing a class in #Kotin (or Java) is like a wildcard import of all its members. Top-level overloaded functions are all imported with a single import (a bit like wildcard). But wildcard imports from objects are not allowed 🤷 Confusing. Should wildcards be the default?

The best argument against wildcards is the name clashes introduced in imported packages (see <https://www.javadude.com/posts/20040522-import-on-demand-is-evil>), but is it a real problem, especially if you do incremental updates? I'm also aware that Android people will never say "yes" (e.g. see <https://github.com/android/kotlin-guides/issues/65>) 🙈

=== Reply from [David Denton](https://www.linkedin.com/in/denton-david) ===

Given that:
1. the IDE folds away all imports by default
2. The risk associated with name clashes
3. The inability to look at a piece of code with a wildcard and be able to see where a class came from

... I see absolutely zero reason to use wildcards. You can configure the editor config to ban them as well so the IDE will play ball on reformat

=== My reply ===

1. I think this is a neutral argument that works with any import code style.
2. Yes. The question I have is if this problem is real/frequent enough.
3. Not sure if this applies to IDEs/editors (because you can always navigate to the definition), but for reviewing code (or PRs) in a web browser this is a legitimate use case (with a caveat that plain text has other problems like no hints for inferred types).

I agree imports that specify the exact dependencies to be used by the compiler is a good thing because it reduces the scope for errors. My post was a bit provocative, and I'm not really trying to defend wildcards.

OTOH, if imports are a type of dependencies, then from the consistency point of view Gradle/Maven dependencies should not bring all packages (as a wildcard) by default. And with functional code style wildcards seem to improve developer experience by making importing every single function less painful. (I mean if IDEs did a better job this wouldn't/shouldn't be a good reason.)  

I also think Michele made a good point about cohesion, so if packages were more cohesive, it would make more sense to import everything by default 🤔🤷

=== Reply from [Michele Bertolino](https://www.linkedin.com/in/michele-bertolino-653346204/) ===

A class is a highly cohesive unit, so it doesn't make sense to me to use "part" of it. Maybe you are referring to static members, in that case it makes sense to use "import static Color.BLUE" if I only need the blue color

=== My reply ===

No, I did mean a class. I'm just picking on imports having different rules for different entities.

I agree that classes are cohesive units, so maybe the problem is that packages are not 🤔 Then I wonder why at some level of abstraction we give up and say "it's not cohesive any more".

#### 2024/12/04
Interestingly, copy-pasting code across projects in #Kotlin seems harder because of multiple classes/functions per file and extension functions. Copying a file takes unnecessary code that might not compile, and finding/copying extension functions from various places is tedious.

#### 2024/12/03
What about instead of "AI" trying to guess the code I want to type (and being bad at it because it's fundamentally a gamble), it would notice inconsistencies like this one: `val twoHoursAgo = now.minus(1, HOURS)`? And maybe similar problems with comments?

=== Reply from [Orchun Kolcu](https://mastodon.social/@orchun@hachyderm.io) ===

Someone had pointed out how Tesla's efforts would have been actually useful if the model was watching out in the background for danger, not trying to do a better job than you driving.

We either need a different architecture though, or figure out how to make local inference extremely performant.

#### 2024/12/02
Function with one-line expression is great. Class/interface with a single method is fine. A file with a single class is good. A file with a single function is a bit wrong. A package with a single file also feels wrong. I wonder why it's not uniform and what would make it so 🤔

#### 2024/12/01
Lots of good ideas here: [Why Can't We Make Simple Software?](https://www.youtube.com/watch?v=czzAVuVz7u4) by [Peter van Hardenberg](https://twitter.com/pvh) (I wish it mentioned <https://en.wikipedia.org/wiki/Cynefin_framework> in the beginning though.)

#### 2024/11/30
TIL there is "promote.suggested.refactoring.in.editor" in #IntelliJ Advanced Settings (see <https://youtrack.jetbrains.com/issue/IJPL-164043>). I'm not convinced by the visual design, but it is amazing UX from key presses point of view! Feels like there is an overlap with [Quick Fix](https://github.com/dkandalov/quick-fix) 🤔

<img src="../assets/images/micro-blog/2024-11-30.webp" width="80%" height="80%"/>

#### 2024/11/29
Here is an example of how #IntelliJ inspections/intentions (aka refactoring suggestions) can guide you to a better code and why I prefer "forEach" to "for" loops in #Kotlin. And don't get me started on the meaning of "retry" and [UPPERCASE CARGO CULT](https://dmitrykandalov.com/tidy-kotlin#stop-the-constant-shouting).

I realised after publishing that the code example would be better off with `if (f()) return` instead of just `f()`.

<img src="../assets/images/micro-blog/2024-11-29.webp" width="80%" height="80%"/>

#### 2024/11/27
"By far two of the worst things are PRs and microservices..." 👈 If you disagree, check the reasoning by [Anton Keks](https://twitter.com/antonkeks) <https://www.youtube.com/watch?v=4Hc1lEuyLng&t=1094s>.

#### 2024/11/26
I'm pretty sure I can see #IntelliJ "Run to Cursor" not working in #Kotlin (i.e. the debugger doesn't stop on the line) if I do it across a couple of coroutines and callbacks, but it works if I do it one coroutine boundary at a time. My expectation: it's a coroutine thing with a good reason why it's not working and/or a 7-year-old bug 😬 Should/can I be bothered debugging the debugger? (And, of course, starting a sentence with "pretty sure" is a big warning sign... It could be me getting it all wrong.)

=== Reply from [Vladimir Parfinenko](https://twitter.com/cypok) ===

Or it's "won't fix, works as intended". :)

Unfortunately, that's how it works by default for many years. You can find more details with comments from the original authors of IDEA's debugger here: <https://youtrack.jetbrains.com/issue/IDEA-101463/Run-to-Cursor-to-a-line-in-another-thread-doesnt-work-and-furthermore-makes-breakpoints-in-the-second-thread-to-stop-working>

Meanwhile, I prefer "suspend thread" breakpoints which don't have this binding to the single thread while stepping/run-to-cursor.

#### 2024/11/25
It's one of those freediving into #IntelliJ processing of key events days (trying to fix <https://github.com/dkandalov/ijkl-shortcuts-plugin>). If you wonder how much code it takes to handle a single key press, you might enjoy skimming [IdeKeyEventDispatcher#dispatchKeyEvent](https://github.com/JetBrains/intellij-community/blob/55a5cc91f5d13eb0df2cd12d74c677b9b6a2f6c6/platform/platform-impl/src/com/intellij/openapi/keymap/impl/IdeKeyEventDispatcher.kt#L211) and [IdeEventQueue#dispatchEvent](https://github.com/JetBrains/intellij-community/blob/839bf0cf90bf61633db7e56923ff9cb900538531/platform/platform-impl/src/com/intellij/ide/IdeEventQueue.kt#L241).

#### 2024/11/24
I updated the Gist for paragraph navigation in #IntelliJ so that it respects folded regions <https://gist.github.com/dkandalov/6bd16ac80ee69739f9b81b665bb93768> #LivePlugin (I'm not too happy with how the navigation feels, but it's better than the built-in paragraph navigation.) 

#### 2024/11/22
A random thought that maybe [sociotechnical systems](https://en.wikipedia.org/wiki/Sociotechnical_system) could be extended to people interactions outside the workplace including friends and immediate family. This would model the reality more closely.

#### 2024/11/21
This blog post by [Jon Ayre](https://bsky.app/profile/jonayre.uk) summarises so well everything you need to know about performance reviews, etc. <https://jonayre.uk/blog/2022/08/25/stop-managing-performance>. My TLDR would be "weaknesses are the flip side of strengths", "embrace diversity" and "reward teams rather than individuals" (not that it's easy or common).

#### 2024/11/20
I wish there were an IDE inspection for #Kotlin to detect default parameters that are never overwritten. For example, a class with `val clock: Clock = Clock.systemUTC()` as a constructor parameter should probably be passed a clock shared by the app at some point or passed fixed clock in tests.

#### 2024/11/19
I recently (re)discovered the "Previous/Next Occurrence of the Word at Caret" action in #IntelliJ. I'm still thinking how/if it can be useful for me, but it's funny that if you go to the previous word occurrence, then F3 ("Find Next / Move to Next Occurrence") goes backward 🤓 

=== Reply from [PattaFeuFeu](https://mastodon.social/@PattaFeuFeu@chaos.social) ===

I first thought "How do you _not_ use that three thousand times a day," but then I realised what you mean is not Next/Previous highlighted usage (⌃⌥ ↑ / ↓ for my keybinding).
I wonder if I could find any use for "Word at Caret" but cannot think of any.

=== My reply ===

Thank you :) This provides a good opportunity for another mini-rant 🙈 "Next/Previous Highlighted Usage" works well with the "Highlight on Caret Movement: Usages of element" option turned on. But it doesn't do anything after the "Highlight Usages in File" action. Maybe all these "next usage" actions should be unified into one.

#### 2024/11/16
The analogy between music and software isn't really fair but if I had to bet, I would bet on "AI" making software even more widespread and even lower quality than it is now, similar to what happened to the music industry, see the rant by Rick Beato ["The Real Reason Why Music Is Getting Worse"](https://www.youtube.com/watch?v=1bZ0OSEViyo).

#### 2024/11/15
Great "Understanding Gradle" video <https://www.youtube.com/watch?v=7AxDwkRVkuA> by [Duncan McGregor](https://www.youtube.com/@PairingWithDuncan). I have learned new things. (On this topic, can we please have a simpler and better building tool for #Kotlin 🙏 #amper)

#### 2024/11/14
Are there any good reasons why #Kotlin fun interfaces can't be passed to functions expecting function parameters? For example:

<kotlin>
fun interface Foo {
    fun foo(): Int
}
fun callFun(f: () -> Int) = f()

callFun(Foo()) ❌
</kotlin>

=== Reply from [Anton Arhipov](https://twitter.com/antonarhipov) ===

You can't do `Foo()`, but it would be something like `Foo { 1 }`.

It feels logical to do such mapping/conversion, but probably is related to how the types work. This looks like a structural typing / duck typing in Golang

=== My reply ===

Yes, not the most clear code example. I could make it work with: `fun Foo() = Foo { 123 }` 🙈

Here is a bit longer example to show the asymmetry:

<kotlin>
val f = { 1 }
val foo = Foo { 2 }

callFun { 123 }
callFunI { 123 }

callFun(f)
callFunI(f)

callFun(foo) ❌
callFunI(foo)
</kotlin>

Thinking about it a bit more, the whole point of fun interfaces is to look like functions (with shorter syntax) but still be a named type, i.e. not compatible with other types. Otherwise, it will be like a typealias. So everything works as it should!

#### 2024/11/12
Code style rant. Why shorten variable names, e.g. "req" instead of "request" (I thought modern code styles gravitate towards full words)? Why use names which don't match the type, e.g. "client" for a function which returns a client (I'm not asking for a "factory" though)?

=== Reply from [David Denton](https://www.linkedin.com/in/denton-david) ===

For variable names, I think there's a balance to be had to trade off around brevity - IMO "req" in the context of an HTTP call is clearly a request... whereas "r" is too terse and not clear (could be response).

In terms of functions, what happens with naming if you are returning an anonymous object which implements an behavioural interface - eg. Iterable? And what is the difference between that method and a "proper" constructor? Should the caller even know that it is a concrete type being returned?

In Kotlin, there are (at least) 6 different forms of writing a function... arguably being able to switch between them without the caller being aware of the implementation of that function is just another form of abstraction (albeit a meta one because it's about the language and not the functionality). Each of those forms is useful in a particular context and it's nice to be able to have that choice as long as it doesn't impact readability.

=== My reply ===

Yes, variable names should be on the shorter end (compared to functions and classes) but I would prefer not to go shorter than the words used in spoken language. For example, "app" for "application" is ok because people actually say "app". I haven't heard anyone saying "req" or "resp" though (maybe it's worth a try 😅).

I agree that names don't need to reflect implementation details, and I'm happy to use function as a wider concept in Kotlin. I meant that a function named "client" doesn't make it clear that it creates a new client. And If you extract a variable, what do you call it, a "client" again: "val client = client()" 🤷

=== Update ===

For some reason this post got a bit of attention (42K impressions, 145 comments) on LinkedIn. Mostly from the people who I don't know at all. I genuinely had no idea people actually read technical content on LinkedIn and care enough to reply. At least I don't. I read all the comments, and I'm not going to reply because I don't think there an expectation that I will, and it would take too much effort to have a meaningful conversation with everyone.

TODO
What I have learned by reading the comments:
 - Most of the focus was on "req" and "res". Likely, my second "question" about naming functions was not very clear.
 - Sarcastic comments. According to a chatbot aka "AI" (not to be trusted) my original post was "critical, frustrated, opinionated". So ignoring the content, emotionally these comments matched the post. I can only be sorry for the people who felt threatened in any way. It was not my intention. (The intention was to see what David Denton thinks 🙈)
 - There are more "silos" in software developers than I realised. For example, "req, res, cb, and many others, are conventional" and "`req` is basically a standard" gets a reply "WTF does "cb" mean?" 😂

#### 2024/11/11
The UI looks a bit wonky and there is no obvious keyboard shortcut for this diff popup (I tried hard in the past, let me know if it's there), but overall I really like the option to commit without ceremony! Could we also have "Commit without Dialog" action please 😬 #IntelliJ

<img src="../assets/images/micro-blog/2024-11-11.webp" width="60%" height="60%"/>

#### 2024/11/09
Is there something like [TLA+](https://lamport.azurewebsites.net/tla/tla.html) for hipsters that can run in a browser and maybe with JavaScript-like syntax? (I suspect the answer is "no", use CLI tla2tools.jar and Vim 🥸)

=== Reply from [Alejandro Serrano](https://twitter.com/@trupill) ===

Alloy does not run on the browser, but the syntax is much closer to JavaScript than TLA's

=== Reply from [Ray Myers](https://www.linkedin.com/in/cadrlife) ===

You might already be familiar with FizzBee? Kinda Python-like syntax. Personally I’d love something that integrates with Lean prover.

<https://fizzbee.io/>

#### 2024/11/08
Quote by [Dragan Stepanović](https://mastodon.social/@d_stepanovic/113126280939503982):
> If 100% utilization of a server CPU is called outage (due to system unresponsiveness), what do we call it when a team and its members are at 100% utilization?

I like the analogy, especially exploring what idle CPU means for teams. People being fully autonomous? Doing what feels right? Going for a walk? Also, what is busy-waiting CPU, organisational anxiety?

#### 2024/11/06
Since the Twitter exodus has accelerated today, a reminder that everything I post is on my website (you're here 😊 and it's the primary source). I also post on [Mastodon](https://mastodon.social/@dkandalov), [Bluesky](https://bsky.app/profile/dmitrykandalov.bsky.social) and [LinkedIn](https://www.linkedin.com/in/kandalov) (I had no idea people actually read it 🤨)

#### 2024/11/04
This is probably the longest #IntelliJ alt+enter menu I've seen in the wild! (At which point does it become too long? 🤷)

<img src="../assets/images/micro-blog/2024-11-04.webp" width="50%" height="50%"/>


#### 2024/11/01
I bet everyone knows this but anyway... there is a built-in calculator in #IntelliJ search <https://www.jetbrains.com/help/idea/searching-everywhere.html#calculator> (and in the spotlight search on macOS, and in many other places it seems 🙈)

#### 2024/10/30
I like to occasionally check what is going on in the #IntelliJ background tasks (and then hide the popup). While waiting for [IJPL-58948](https://youtrack.jetbrains.com/issue/IJPL-58948) to make it possible with built-in actions, here is a workaround in ~8 lines <https://gist.github.com/dkandalov/d326df86849a2a097d169b781ffbc0a4> #LivePlugin #Kotlin

<img src="../assets/images/micro-blog/2024-10-30.webp" width="80%" height="80%"/>

#### 2024/10/29
It only takes ~5 lines of code to remove editor notification panels in #IntelliJ <https://gist.github.com/dkandalov/3c3984ac39b51883920f019ff91f1351>. Because some panels can only be closed with the mouse (e.g. "Kotlin Scripting is in Beta"). Some cannot be closed at all (e.g. "Decompiled .class file") 🙄 #LivePlugin #Kotlin

<img src="../assets/images/micro-blog/2024-10-29.webp" width="80%" height="80%"/>

#### 2024/10/28
This is likely the oldest (years old) and the most used (by me) #IntelliJ action which I never published. It opens the "IDE Internal Errors" window, so you can move between errors and clear them <https://gist.github.com/dkandalov/0c3a0362d205abd369d363ac280f9d9c> #LivePlugin #Kotlin

<img src="../assets/images/micro-blog/2024-10-28.webp" width="80%" height="80%"/>

#### 2024/10/27
If you need inspiration to find names for your variables and functions, why not try random search results? (Some joke about AI is missing here.) This is the source code <https://github.com/dkandalov/live-plugin/wiki/Google-auto-complete>. Please shout if you can make this auto-complete always work 🙈 #LivePlugin #Kotlin 

<img src="../assets/images/micro-blog/2024-10-27.webp" width="80%" height="80%"/>

#### 2024/10/24
This is what Eclipse looks like on macOS these days 😵 I don't think it ever looked polished on Mac, but the 20+ year-old icons make me grateful for #IntelliJ UI evolution (even if it takes effort getting used to a new look and feel every couple of years).

<img src="../assets/images/micro-blog/2024-10-24.webp" width="80%" height="80%"/>

#### 2024/10/23
Fun fact about the Pomodoro plugin for #IntelliJ (which I've supported for nearly 15 years) is that it was originally written for me by a colleague. At the time, I experimented with Pomodoro at work for a few months. A productive day turned out to be ~8 Pomodoros (<4 hours) 😱

#### 2024/10/22
If you haven't heard about the pomodoro technique, it's basically: focus on the task till 25-minute timer stops; if distracted, restart the timer; take breaks. You can try it in #IntelliJ IDEs using [this plugin](https://github.com/dkandalov/pomodoro-tm) (just updated for the latest IDE versions).

=== Reply from [Martin Bonnin](https://twitter.com/martinbonnin) ===

Man, 25 minutes is the time it takes me to get in the zone 😅

=== My reply ===

You can do longer pomodoros! The point is to not be distracted by checking email and social media (during both pomodoro and breaks) 😉

#### 2024/10/18
There is a #Kotlin intention to convert from member to extension function but not the other way round <https://youtrack.jetbrains.com/issue/KTIJ-12496>. If you're desperate enough, I [hacked the intention](https://github.com/dmcg/gilded-rose-tdd/blob/537de53f9b56b7c173683db0ebb2729def92bcfb/.live-plugins/plugin.kts#L159) (not production quality) for the KotlinConf talk with #LivePlugin. (Also on this topic, why refactoring intentions are not in the refactoring menu? 🤷)

#### 2024/10/17
I updated my [blog post](https://dmitrykandalov.com/auto-revert) about auto-revert. It made me wonder if there are more fundamental reasons for making large code changes other than lack of skills. Maybe something along the lines of anxiety, imposter syndrome, or boredom.

=== Reply from [Peter Kofler](https://twitter.com/codecopkofler) ===

Broken focus e.g. distractions, interruptions, ADHD. Novelty maybe related to boredom yes

=== Reply from [Ivan "CLOVIS" Canet](https://twitter.com/ivcanet) ===

That sounds interesting. I wonder if the time should be reset by green tests too.

#### 2024/10/16
Another plugin is off the treadmill of deprecations that throw exceptions in the latest IDE versions 🙄 #IntelliJ plugin to limit your work-in-progress <https://github.com/dkandalov/limited-wip>. It comes with change size watchdog, auto-revert, and TCR mode.

#### 2024/10/15
For the benefit of anyone interested and as a reference for myself, [here are](https://dmitrykandalov.com/intellij-settings) some of the #IntelliJ and related macOS settings I normally use (updated today but not exhaustive). Should I write more about the reasons for all the settings?

#### 2024/10/14
One random takeaway from [SoCraTes Belgium](https://socratesbe.org) is to really try [Last Edit Location](https://www.jetbrains.com/help/idea/navigating-through-the-source-code.html#find_cursor_edit) (cmd+shift+backspace) for #IntelliJ navigation. Although there must be a maximum amount of actively used shortcuts before they take too much brain power and distract you from the actual problem.

=== Reply from [Ted M. Young](https://twitter.com/jitterted) ===

You can always learn one more shortcut! 😁

(Just don't ask me what they are, only my fingers know.)

Feel like it'd make a great game to see who knows the most shortcuts!

=== My reply ===

Yes, it's deciding at the moment which shortcut is better that can take energy. My sense is that there is a sweet spot between using *all* possible shortcuts for a particular activity (like navigation) and not knowing/using any.

Maybe as a loose analogy with music, you don't need to play all possible notes.

At the same time, how do you find the sweet spot? And learning new shortcuts until it's clearly too much then to dial down is probably a good strategy.

#### 2024/10/12
FizzBuzz after one hour of mob programming (aka ensemble) at [SoCraTes Belgium](https://socratesbe.org) directed by [Duncan McGregor](https://twitter.com/duncanmcg). Not sure if this would pass any kind of coding interview 🤣 About to try [Aider AI](https://github.com/Aider-AI/aider) thing with [Tim Schraepen](https://twitter.com/TimSchraepen).

<img src="../assets/images/micro-blog/2024-10-12.webp" width="80%" height="80%"/>

#### 2024/10/11
TIL about [Baba Is You](https://en.wikipedia.org/wiki/Baba_Is_You) (see also [Mastodon](https://mastodon.gamedev.place/@BabaIsYou)) - a cool indie puzzle video game in which you need to redefine the game rules to win. Thanks to the mobbing (aka ensemble) session at [SoCraTes Belgium](https://socratesbe.org) (a very interesting communication exercise without coding).

#### 2024/10/09
I wish I could report some useful "AI" features for coding, but they are still too bad at guessing what I'm trying to do. What about variable/function names and noticing name inconsistencies? Matching the code style of the project? Or some other not-too-fancy low-hanging fruit 🤔

#### 2024/10/07
I don't have a habit of using File Structure in #IntelliJ (maybe I need a better keyboard shortcut, sorry cmd/ctrl+F12 🙈), so I just noticed for #Kotlin it shows classes/functions/fields at the class level but only classes/functions and no vars at the function level. Asymmetry!

<img src="../assets/images/micro-blog/2024-10-07.webp" width="80%" height="80%"/>

#### 2024/10/03
Given that #IntelliJ can highlight #Kotlin code with partially invalid syntax or failing type checks, and given that parts of the compiler are used for highlighting, does it mean that partial compilation of Kotlin code is not too hard to implement (at least within IDE)? 🤔

=== Reply from [Martin Bonnin](https://mastodon.social/@mb@mbonnin.net) ===

what would partial compilation do?

=== My reply ===

Compile parts of the source code that can be compiled, and leave the rest to fail at runtime.

This could sometimes be useful during the development cycle. Eclipse Java compiler could do it to some degree. Although it felt a bit weird at the time and I might have shifted since then towards smaller steps to keep all the code compiling, so I can't really say I approve of the approach.

=== Reply from [Martin Bonnin](https://mastodon.social/@mb@mbonnin.net) ===

sounds a bit like JavaScript 😁

#### 2024/10/02
To be specific about #Kotlin fun interfaces missing usages, I was going to make this [Listener](https://github.com/dkandalov/limited-wip/blob/52871f3a11b1cd853713865e67b44023300e06e7/src/limitedwip/common/vcs/SuccessfulCheckin.kt#L28) `fun` but decided not to because I then won't be able to navigate to its usages, e.g. [here](https://github.com/dkandalov/limited-wip/blob/52871f3a11b1cd853713865e67b44023300e06e7/src/limitedwip/autorevert/components/AutorevertComponent.kt#L56). TLDR language features need properer IDE support.

#### 2024/10/01
Another unfinished #Kotlin feature is find usages of fun interfaces, so code navigation and refactorings suffer. It's 10 years old and in the backlog 😥 <https://youtrack.jetbrains.com/issue/KTIJ-2367>

<kotlin>
fun interface Foo {
    fun bar()
}
fun f(foo: Foo) = ...
f {...} // 👈 Not a usage
</kotlin>

#### 2024/09/30
One idea for the Activity Tracker plugin is to predict/assist with the next user action based on the project activity history, its current state, etc. Maybe this involves less guessing/variability than predicting the code I'm trying to write.

#### 2024/09/29
South Park Gnomes business plan: 1 - Collect underpants, 2 - ?, 3 - Profit. It was a nonsense joke in 1998 but is very real for some companies today. [Activity Tracker plugin](https://github.com/dkandalov/activity-tracker) (which I just updated to work with the latest #IntelliJ IDEs) is similar except that you own the data. Please help with phase 2!

<img src="../assets/images/micro-blog/2024-09-29.webp" width="80%" height="80%"/>

#### 2024/09/28
I wish there was an option in #IntelliJ to do a text search on the source code of the project libraries. It's already almost there... you can do the search, but you have to select a specific jar file in the project view "External Libraries".

=== Reply from [Anton Keks](https://twitter.com/antonkeks) ===

I think you can do it if you change the Scope in search dialog to Project and Libraries

=== My reply ===

Yes, thank you! Just choosing "Scope" in the "Find in Files" popup window defaults to "All places" which includes all libraries' source code. (It feels like I knew about this feature and discovering it for the third time 🙄)

#### 2024/09/27
Talking about one change at a time, I don't mean never to do large messy changes. There is a time and place, e.g. making yourself feel better (rationalised as "productive"). Or as an exploration and maybe part of the Mikado method. Just shelve the big change and do it again slowly.

#### 2024/09/26
If there is one piece of advice (aka opinion) I have for developers, it is: Do. One. Thing. At. A. Time. (I'm too bored of seeing code not compiling for a couple of hours and commits that change seemingly everything everywhere.)

=== Reply from [samir, jobless immigrant scum](https://mastodon.functional.computer/@samir) ===

I'd like to add something to this excellent advice.

If you can't do one thing at a time, fix that.

For example, if you can't do one thing at a time because the waiting time to merge is too long (perhaps because you're waiting for a review, or for your build to finish), that's your problem. Figure out how to make it faster until you no longer need to do two things at once.

Oh, it's always a people problem. The build isn't slow because of technology, it's slow because no one cares.

Similarly, you can't make people review in a more timely fashion with more code.

You can't code your way out of the deadline pressure on the engineering team.

Even purely technical solutions need organisational buy-in, or they'll just revert. You can add build caching if you want, but people will just find ways to make it slower.


#### 2024/09/24
With all the money spent on CI/CD tools, how is it that it's still not a common practice to continuously pull non-conflicting changes from upstream into your local code? Similarly, why not auto-push all local changes that passed all tests?

=== Reply from [Oliver Weiler](https://twitter.com/helpermethod) ===

You don't push local changes in the first place because the dev machine may be "tainted" (it works on my machine).

=== My reply ===

If you knew that the dev machine is extremely unlikely to be "tainted" (e.g. it's virtualised), would you continuously push? I suspect most people wouldn't because of deeper (probably behavioural) reasons.

=== Reply from [Oliver Weiler](https://twitter.com/helpermethod) ===

I would never trust a dev machine. I've seen tons of builds break on the CI system because the dev machine had config files / external config / build artifacts not present on the CI system. Impossible to prevent.

=== My reply ===

Sure, ultimately I would not trust any machine or any single build. I've seen build systems being non-deterministic, dirty cache problems, supply chain problems, file system being corrupted, etc. Not many people are being paranoid in this space though.

#### 2024/09/23
Overheard at a meetup last week: the top 10 programming languages list is as meaningful as the top 10 bands/artists.

#### 2024/09/16
There is an old idea to treat project file tree with usability in mind. Considering the most common usage patterns (once you know the project), do we really need build files, readme, gitignore, etc. at the project's root? Maybe there should be a convention to hide them a bit.

#### 2024/09/13
TIL that GitFlow is not recommended by its author <https://nvie.com/posts/a-successful-git-branching-model>. And if you consider local code changes a branch, then the recommended GitHub flow is basically: make a change, review, commit 🧐🤷 (This is your overdue reminder that pull requests are a waste.)

#### 2024/09/12
If you happen to be in London next Thursday (19th September), come say hi at the On #Kotlin meetup <https://www.meetup.com/source-talks-on-kotlin/events/302384401>. The format of six short talks is bound to be great, and it's near a couple of nice north London venues like Never For Ever and The Southampton Arms.

#### 2024/09/11
I occasionally see people coding in #IntelliJ and using Notepad++, VS Code or something else for notes. I wonder if that's because they're not aware of scratches, scratches have discoverability or usability issues, or they have a strong preference for another editor 🤔

#### 2024/09/10
It's one of those days when I'm once again disappointed by IDE not being able to find "implementations" of a typealias in #Kotlin (so I have to resort to find all usages). This is one of the reasons why I think typealiases should only be used within a limited scope (class/file).

#### 2024/09/08
TIL #IntelliJ has an unfinished "Highlight Only Current Declaration" feature (only available in the [internal mode](https://plugins.jetbrains.com/docs/intellij/enabling-internal.html)) which greys out code/text outside the current scope. Looks very cool to me 🤩 With suppressed inspections, it could be the true distraction-free mode. 

#### 2024/09/06
I know it's too late (and impossible) to fix the "stubs vs mocks vs fakes vs other things" terminology confusion, but I'm tired or stubs which fake an external service and mocks which return values without any checks (especially for data classes in #Kotlin).

#### 2024/09/05
Random #IntelliJ tip (and a reminder for myself). When IntelliJ starts using a lot of CPU and you are about to express your outrage, remember that you can try the "Activity Monitor..." action so the outrage can be expressed in the right direction (or a plugin).

#### 2024/09/02
Good old #Gradle integration in #IntelliJ showing error messages twice <https://youtrack.jetbrains.com/issue/IDEA-221469>. I've definitely seen it before, but I'm probably institutionalised enough to expect strange things from Gradle, and just silently suffered for years.

#### 2024/08/30
#Gradle: "There were failing tests. See report at: file://.../index.html". And of course, it's in the "clouds", so it's a click-ops task to get the file out of it, or the Docker image has been just deleted 🤬 Maybe printing a test summary to an HTML file is not a good default?

#### 2024/08/29
TIL about "disagreeable givers" (via [@TShootingAgile](https://twitter.com/TShootingAgile) <https://soundcloud.com/troubleshootingagile/disagreeable-givers>). So if you see me ranting about Kotlin or IntelliJ, you now know what it is :)

#### 2024/08/28
Great talk by [Brian Goetz](https://twitter.com/BrianGoetz) "Valhalla - Where Are We?" <https://www.youtube.com/watch?v=IF9l8fYfSnI> (thanks to [Uberto Barbini](https://twitter.com/ramtop) for mentioning it). TLDR after 10 years it's now just value classes and null restricted types 🤩 #JVMLS #OpenJDK

#### 2024/08/27
A modified Brian Kernighan quote for the AI hype wave. Debugging is twice as hard as writing a program in the first place. So if a chatbot generated some code for you that you would not be able to write, then how will you ever debug it? With a debugging bot?

#### 2024/08/25
It took me only a couple of days to figure out why #LivePlugin compilation stopped working in #Kotlin 1.9 🙈 Turns out it was a bug fix, and coincidentally I found a comprehensive list of #Kotlin [language features](https://github.com/JetBrains/kotlin/blob/3a1e8ade670bc33af6084042a0ca73e33e288412/compiler/util/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt#L267) (which could've saved me couple of days).

#### 2024/08/23
In case you would like to click subscribe and ring the bell (or whatever that messed up YouTube workflow is), [Duncan McGregor](https://twitter.com/duncanmcg) is rebranding his channel to "Pairing with Duncan" <https://www.youtube.com/watch?v=MccT-XORptQ>

#### 2024/08/22
I'm really sorry to be late to the party of people who discovered that Firefox shows expired cookies in the dev tools <https://stackoverflow.com/questions/60732831/firefox-still-shows-expired-cokies-in-debugging-screen>. (It can be really confusing considering that expiration time is in GMT, and I am in the BST time zone.)

#### 2024/08/21
Today's puzzler. #Kotlin plugin says smart cast won't work with `invoke` (and suggests a loop of "fixes") but it does. That's because the latest #Kotlin plugin doesn't understand Kotlin 2.0 without (beta) K2 mode 🙄 
<kotlin>
class Foo(val a: (() -&gt; Unit)?)
val foo = Foo {}
if (foo.a != null) foo.a()
</kotlin>

#### 2024/08/16
It seems widely recognised that software development is a team effort, but most focus is still on individual people. There are not many stories about software teams (unlike, for example, sports like football). Hiring a team is not really a thing.

#### 2024/08/15
Another example of `invoke()` navigation not fully supported in #Kotlin (including K2) 😿
<kotlin>
interface Foo : (Int) -&gt; String

class Bar : Foo {
    override fun invoke(i: Int) = ""
}

fun main() {
    val foo: Foo = Bar()
    foo(123) // No way to navigate to invoke implementation
}
</kotlin>

=== Reply from [Eduard-Cristian Boloș](https://mastodon.social/@EdyBolos@androiddev.social) ===

This one is so annoying, that I stoped using the invoke operator. I prefer being more vorbose, but have navigation working.

#### 2024/08/13
I wish there were editor/IDE extensions to detect conflicts with other branches or local changes of other developers in real time, i.e. as soon as you type the code. Maybe the lack of these extensions means that people want to be left alone more than doing actual CI 🤔

#### 2024/08/11
Random #IntelliJ tip. You can turn off native file chooser dialog (because IntelliJ dialog is just better) in IDE `Registry` with `ide.mac/win.file.chooser.native` property or in the latest versions in `Advanced Settings` with "Use native file chooser dialog on Windows/macOS" checkbox.

#### 2024/08/10
It's interesting to see more actions (refactoring, code transformations, and settings) in the #IntelliJ alt+enter popup window. Would it eventually include all available actions though? Maybe yes, and similar to the code completion, only with the most relevant actions at the top.

#### 2024/08/09
Random #IntelliJ tip. You can see version control history for selected text by doing alt+enter and choosing "Show history for selection" intention. The functionality existed for years, but I guess it's more discoverable this way and easier than remembering custom shortcuts.

#### 2024/08/08
One thing I'm currently exploring in the #IntelliJ QuickFix plugin is default reordering for intention/inspections. We care about the most relevant auto-completion results to be at the top, so why not have the same for context actions?

#### 2024/08/07
I just uploaded a new version of the QuickFix plugin for #IntelliJ that adds an action to apply the topmost intention/inspection because life is too short to press 'alt+enter, enter' all the time. See 👉 <https://github.com/dkandalov/quick-fix>

#### 2024/08/06
It's probably an unpopular opinion, but having #IntelliJ config files and all dependencies checked into version control was good enough for most projects. I wish there were better tools for downloading/updating dependencies and maybe a build tool (e.g. Amper) to build projects.

#### 2024/08/03
In case you never heard about it, there is [Coffee Compiler Club](https://www.youtube.com/watch?v=1DsAO5zQ1OM&list=PL05j31Knswhn7RLk-VKHZ6RI4e9D4d-6e&index=200) run by [Cliff Click](https://mastodon.social/@cliffc@hachyderm.io). I would describe it as an open-space online meetup related to programming languages and compiler things. Pretty much what Internet is supposed to be :)

#### 2024/08/02
["Beyond the Hype: A Realistic Look at Large Language Models"](https://www.youtube.com/watch?v=Pv0cfsastFs) is a nice talk about LLMs by [Jodie Burchell](https://mastodon.social/@t_redactyl@fosstodon.org). Especially, the "are LLMs intelligent" section which is also available here as blog post with more details <https://t-redactyl.io/blog/2024/07/are-llms-on-the-path-to-agi.html>.

#### 2024/08/01
Random #IntelliJ tip. There is copy/paste history (ctrl/cmd+shift+V), so you can copy two or more pieces of code from the source file(s), then navigate to the destination and paste from history one by one or several items at once (and it works with multiple cursors too!) 👌

=== Reply from [Oliver Weiler](https://twitter.com/helpermethod) ===

On Mac you can also use <https://maccy.app> to have this functionality everywhere, not only IntelliJ.

=== My reply ===

Thank you! Just tried maccy and it seems like it doesn't paste sometimes 🙈 Also £10 on App Store but free via brew, not sure what that means 🤔

I like the idea though and can only wonder why it's still not the default functionality of all OS.

BTW, to emphasise the point in IntelliJ you can do multi-select in the copy history and paste all selected items at the same time. For a single cursor, they are concatenated. For multiple, one item is pasted for each cursor.

#### 2024/07/31
#IntelliJ trivia: some shortcuts in the default keyboard layout most likely come from <https://en.wikipedia.org/wiki/File_manager#Orthodox_file_managers>, and were probably intended to be intuitive for the users at the time. For example: F4 - edit file, F5 - copy file, F6 - move file, shift+F6 - rename file.

#### 2024/07/28
Someone (maybe a company making software development tools, e.g. [JetBrains](https://twitter.com/jetbrains) 😉) should do research and design properly ergonomic keyboard shortcuts for code editors. It's tiring to see different and mostly "accidental" shortcuts everywhere.

=== Reply from [breadsmasher](https://mastodon.social/@breadsmasher@lemmy.world) ===

You can literally pick from a list of various different keyboard maps <https://www.jetbrains.com/help/idea/configuring-keyboard-and-mouse-shortcuts.html>. [Relevant XKDC](https://xkcd.com/927)

=== My reply ===

Yes, and AFAIK none of them are based on any research or actual design. The XKCD is really valid. Maybe it should be a coordinated attempt by couple popular text editors.

You can't standardise everything, but the basic most common actions could be. There is already a small subset which works across the majority of editors, ctrl/cmd+ZXCV for example.

=== Reply from [breadsmasher](https://mastodon.social/@breadsmasher@lemmy.world) ===

The entire QWERTY layout as far as I remember wasn't based on any design or research

=== Reply from [thisisnotgoingwell](https://mastodon.social/@thisisnotgoingwell@programming.dev) ===

That's wrong. Qwerty was eventually chosen by the inventor because it was the most efficient design. <https://interestingengineering.com/innovation/history-and-evolution-of-qwerty-keyboard>

#### 2024/07/25
I really like the "Unused symbol" inspection in #IntelliJ. Except when it's a bit too random and project-specific 🤷‍ #Kotlin
<kotlin>
val f = 1 // ok
val fo = 1 // unused
val foo = 1 // ok
val fooo = 1 // ok
val foooo = 1 // unused
</kotlin>
None of the above top-level vals are used in the project.

#### 2024/07/24
#Kotlin shows a "declaration has type inferred from a platform call" warning for top-level declarations like this one even though it's not nullable:
<kotlin>
val foo = java.time.Duration.ZERO
</kotlin>
Why not enhance platform types with external annotations (which could be bundled for JDK)?

#### 2024/07/23
It's interesting that some classes in #Kotlin have special treatment for platform types 🤔
<kotlin>
java.util.concurrent.atomic.AtomicReference&lt;Int&gt;().set(null) // ok
java.util.Hashtable&lt;Int, Int&gt;().put(null, null) // ok
java.util.ArrayList&lt;Int&gt;().add(null) // doesn't compile
</kotlin>

#### 2024/07/22
There is a nice feature in #IntelliJ to rename variable/function by changing its name and using alt+enter to invoke the 
rename refactoring <https://www.jetbrains.com/help/idea/rename-refactorings.html#inplace_rename>. But it only works on definitions, not usages 🤷‍ So I can't just forget about the rename refactoring shortcut.

#### 2024/07/19
I don't remember if I ever really needed it, but you can have higher-order extension functions in #Kotlin. For example:

<kotlin>
fun f(): Int.() -> Int =
    { this + 1 }

fun main() {
    val extF = f()
    require(42.extF() == 43)
}
</kotlin>

#### 2024/07/18
If there are extension functions/properties in #Kotlin, should there be extension classes and objects?

=== Reply from [Garth Gilmour](https://twitter.com/GarthGilmour) ===

Do you mean as in Ruby? Would that not require a lot of runtime magic, instead of just compiler sleight of hand?

=== My reply ===

Not like in Ruby because as you say it would be against the grain of Kotlin. But to be clear, I don't know what I mean exactly 🙃 I just take an existing language concept and try applying it more uniformly.

If you think about context parameters (ex "context receivers") as a generalisation of extension functions, then extension classes might be equivalent to context parameters for classes. And I just found an answer here <https://github.com/Kotlin/KEEP/blob/context-parameters/proposals/context-parameters.md#qa-about-design-decisions> TLDR it's too complex.

=== Reply from [Robert Chatley](https://twitter.com/rchatley) ===

Isn't that called inheritance?

=== My reply ===

I guess the main difference with inheritance is that there is no subtyping 🤔 The closest proposed feature for Kotlin is/was [contextual classes](https://github.com/Kotlin/KEEP/blob/context-parameters/proposals/context-receivers.md#contextual-classes-and-contextual-constructors) (And there might be terminology clash between "extends" keyword in Java and "extension" functions in Kotlin.) 

#### 2024/07/17
One of the interesting discussions at XTC yesterday was "Are backlogs bad?". I like the idea that increasing backlog size needs cost/benefit analysis. Is it about capturing knowledge (e.g. bugs) or is it trying to predict the future? Will it age quickly and become a distraction?

#### 2024/07/16
Interestingly, IntelliJ has an intention for #Kotlin to import object extension functions, but it doesn't work. Could it be a sign of a missing language feature rather than an IDE bug?

<kotlin>
object Foo
fun Foo.bar() = 1

fun main() {
    Foo.bar() // <-- "Add import" does nothing
}
</kotlin>

Just for reference I created <https://youtrack.jetbrains.com/issue/KT-69957> (I bet there is a duplicate issue which didn't manage to find)

#### 2024/07/15
If you happen to be in London tomorrow (16th July), come to the eXtreme Tuesday Club (XTC) London's oldest agile meetup. It will be hosted again in East London hipsterlands 🧐 <https://www.meetup.com/extreme-tuesday-club-xtc/events/301157888>

#### 2024/07/13
Similar to "stumbling on software design" there often is a gap between what software development seems to be when you start compared to what you end up doing. I bet it's a natural tendency for any discipline, but are there any studies?

#### 2024/07/12
I'm sure it has been posted in some other #Kotlin news already but "Data class copy function to have the same visibility as constructor" in K2 is worth mentioning again 🎉 <https://kotlinlang.org/docs/whatsnew-eap.html#data-class-copy-function-to-have-the-same-visibility-as-constructor>

#### 2024/07/11
There is a difference between what we think, what we say, what we do, how things work out, and how we interpret what happened (and all of these are probably interleaved). It seems that a lot of software design is based on what we say, so this could be an opportunity to improve 🤔

#### 2024/07/10
Random #IntelliJ tip: you can use extend and shrink selection actions (and the keyboard shortcuts) in UI trees, e.g. to select files in the project view!

#### 2024/07/08
There is a great book [Stumbling on Happiness](https://en.wikipedia.org/wiki/Stumbling_on_Happiness) by [Daniel Gilbert](https://twitter.com/DanTGilbert) describing how we fail to predict what will make us happy due to cognitive biases. It's tempting to draw an analogy with software development. Are we lacking observations of our actual experience and chasing the wrong goals?

#### 2024/07/07
You can also find an earlier version of the "Refactoring to Expressive Kotlin" talk here <https://youtube.com/watch?v=UwM3b5D4FjU> that covers more topics (for better or worse).

#### 2024/07/06
I wouldn't expect many people to notice that in the "Refactoring to Expressive Kotlin" talk <https://www.youtube.com/watch?v=p5WylVjtzBQ&t=2269s> I used a few intentions with the 🙈 emoji. These are custom intentions I wrote specifically for the talk. Wish #IntelliJ had them out-of-the-box though.

=== Reply from [Márton Braun](https://mastodon.social/@zsmb13@androiddev.social) ===

Do you have a list of these somewhere, are they perhaps open source?

=== My reply ===

It's convert apply to let, let to apply, convert secondary constructor to top level function, move extension function to class. The source code is here <https://github.com/dmcg/gilded-rose-tdd/blob/537de53f9b56b7c173683db0ebb2729def92bcfb/.live-plugins/plugin.kts#L35> (it's only a project-specific prototype, please don't judge :))

#### 2024/07/05
"Continuous Integration is not a Server. It is the integration of our minds." <https://blog.gypsydave5.com/posts/2024/7/5/continuous-integration-is-not-a-server/> by [David Wickes](https://twitter.com/gypsydave5).

#### 2024/07/04
As a reminder for myself that the "right" technology, writing tests first or some magic thing, doesn't guarantee a "good" design. Only making an actual code change later can prove how "good" the design was. Should we speculatively attempt the most likely changes from time to time?

#### 2024/07/02
Here is another attempt at paragraph navigation actions (this time mostly based on indentation) <https://gist.github.com/dkandalov/6bd16ac80ee69739f9b81b665bb93768>. Not a very well-factored code as it still doesn't feel right anyway.

#### 2024/07/01
Another random #IntelliJ tip: "Compare With..." action (ctrl/cmd+D) can compare and synchronize folders and compare archive files like .jar and .zip. BTW you can select two or more files with ctrl/cmd+click.

#### 2024/06/30
Random #IntelliJ tip: you can use the "Compare With..." action (ctrl/cmd+D) to compare any two or even three (!) selected files in the project view.

#### 2024/06/29
TIL #IntelliJ "Quick Documentation" action (F1 or ctrl+J) works in the project view and for files it shows file size, creation and modification time. I wish it worked on folders but very useful anyway.

#### 2024/06/28
It seems we are mostly editing code in files as a whole and arranging them in tabs. Could this be different/better? Do you know about any experiments? For example, a "tiled" editor space, where each tile is a projection to a text range corresponding to a field/function/class.

#### 2024/06/27
Following the spatial navigation metaphor in code editors, what should be the third dimension, i.e. moving into and out of the code? 🧐 My intuition is that moving into is like zooming into function/class definition(s), and out is finding usages, or should it be a folder view?

#### 2024/06/26
Another idea for vertical movement in code editors is to have an "infinite scroll" by showing the "previous" or "next" file, where the order might be the order of files in the project file tree of the editor/IDE.

#### 2024/06/25
Similar to code navigation to the previous/next word being really useful (it should be the default!), it feels like something is missing for moving vertically 🤔 Because going up/down one line is too slow, up/down method is too fast, up/down a page is too unstructured.

=== Reply from [Benji Weber](https://twitter.com/benjiweber) ===

Like intellij's `Move Caret Forward/Back a Paragraph` action?

=== My reply ===

Yes, something like that. The problem is that this action, and similar actions in other editors, are about moving to an empty line, not a paragraph (and I don't have a precise definition of what   "paragraph" might mean in the context of a programming language).
Probably some kind of mix with `Move Caret to Code Block End/Start` action could work. Need to experiment more with what feels right for me.

=== Reply from [Stylianos Gakis](https://twitter.com/GakisStylianos) ===

I sometimes use a shortcut to go up to the nearest opening bracket. Another thing I do in big classes is to press F12 I think? And get a list of functions inside the class I am in, and move with arrows to the one I wanna go to.

=== My reply ===

I never got used to navigation to the nearest opening/closing bracket. Probably worth another try! 🤔 Yes, file structure (cmd+F12 on mac) is an option and has good usages, but it's more high-level and "breaks" the flow with popup window.

Thinking about it as a uniform navigation in all dimensions (which might not be a good idea btw), I guess it's about finding the analogy for word boundaries and the start/end of the line with vertical navigation.

#### 2024/06/24
Arguably, for code navigation instead of left/right moving to the previous/next character, the default should be previous/next word instead. I have happily used it for years (with an alternative alt+ijkl layout). How is that not a thing in every talk about developer productivity?

=== Reply from [Ted M. Young](https://twitter.com/jitterted) ===

I dunno, but I've seen folks hold down the arrow key to get to the beginning/end of a line instead of using the home/end key (equivalent). I guess it was easier when there was a dedicated key, now maybe folks aren't even aware that there's such a shortcut?

#### 2024/06/23
Here is an updated #Kotlin version of paragraph navigation actions for #IntelliJ <https://gist.github.com/dkandalov/fc8638d21d4ba8b48aec5b25f565c726> (interesting amount of details like scroll to caret, etc.) It still doesn't match my intuition though. Maybe it should include indentation in some way 🤔 #LivePlugin

#### 2024/06/22
I wrote this #IntelliJ mini-plugin to navigate to the previous/next paragraph a while ago <https://gist.github.com/dkandalov/56482a6b1d5b00702d66545c7c303eb9> but for some reason, it didn't stick 🤔 It also needs some refactoring to improve the code and covert it Kotlin! #LivePlugin

#### 2024/06/21
Are there any good developer surveys about pull-request preferences? Something like the range between "I do PRs with myself" and "PRs is a waste" with breakdown by various attributes. (Asking to learn how much of a minority I am, or maybe not.)

=== Reply from [@sleepyfox](https://mastodon.social/@sleepyfox@hachyderm.io) ===

Last year there were a whole raft of "Pull requests are slowing your engineering department down!" articles.
My own take on how to make PRs useful: <https://gist.github.com/sleepyfox/53ce08ab81515cdc5494f1358f609401>

#### 2024/06/18
Code editors usually have actions to navigate up/down functions but what about "paragraphs"? Which could mean a bunch of statements without empty lines or braces between them. Or maybe big enough bulks of expressions? 🤔

#### 2024/06/17
I love this meme by [Jason Gorman](https://mastodon.social/@jasongorman@mastodon.cloud) 😂
<img src="../assets/images/micro-blog/2024-06-17.webp" width="80%" height="80%"/>

#### 2024/06/15
A good example of a web UI jitter is Google search. Search for "123", then search for "1234". Watch All/Images/Videos/... tabs flicker. If logged in, your avatar and Google apps will flicker. If not logged in, "Sign in" jumps left and right. Even in Chrome. Not impressive 🤷💰

#### 2024/06/14
Another problem with (mostly web) UIs is the jitter. Do we need a cultural shift to make it unacceptable? 🧐 For example, this issue 
<https://youtrack.jetbrains.com/issue/IJPL-133305/Lag-when-searching-for-file-class> (picking on #IntelliJ only because I use it a lot :)) Or pretty much any website, just watch the screen!

#### 2024/06/13
The dreadful experience of laggy corporate virtual desktops makes me question the rationale behind it. Cost "reduction" of the cloud? Security concerns? I wish a highly responsive environment was the norm. Maybe it needs lobbying. A law making it a health-and-safety concern? 🤔

=== Reply from [Peter Lawrey](https://twitter.com/PeterLawrey) ===

It's harder to measure the reduced productivity than the reduced cost of the equipment & support.

=== My reply ===

Also people who make the decision are not affected as much, so everything might look ok to them.

I agree this is probably what's happening, but it sounds like "it's harder to measure public health than profits, so we'll go with the profits" which is unlikely to change on its own.

=== Reply from [Uberto Barbini](https://twitter.com/ramtop) ===

TBF, when they works I find them great. Much better than a physical locked down laptop.

=== My reply ===

When every micro-interaction with UI depends on the network latency, it's unlikely to actually work (unless you have wired connection to the server). We won't be aware of every tiny lag but it affects the experience, our behaviour and probably wellbeing. Similar to air quality.

#### 2024/06/12
Quoting [zed.dev](https://zed.dev): "When you move the cursor or type a character, you should see pixels on the next refresh of your display—every time. Even sub-perceptual pauses add up over the course of a day to create unnecessary stress." Such a contrast to a typical fully remote and laggy corporate desktop environment.

#### 2024/06/11
TIL about <https://zed.dev> new code editor from the creators of Atom. It's early days, but I like the emphasis on the performance and collaborative editing. It would be interesting to see what extension development is like. (For context, I was just getting into Atom when MS bought it ⚰️)

#### 2024/06/09
I wonder if there is a good reason #Kotlin doesn't create a class for anonymous objects 🤔

<kotlin>
val config = object {
    val foo = 1
    val bar = 2
}
object Config {
    val foo = 1
    val bar = 2
}
config.foo // doesn't compile
Config.foo // compiles
</kotlin>

=== Reply from [Alejandro Serrano](https://twitter.com/trupill) ===

The problem here is that `config` needs to get a type, and given that the type of the `object` is anonymous, the compiler assigns `Any`. As a result, `foo` and `bar` are not accessible.

=== My reply ===

You're right, what I should've said is why Kotlin doesn't define a named class for top level anonymous objects but does it for local objects (as mentioned by
[pablisco](https://twitter.com/pablisc0)).

=== Reply from [pablisco](https://twitter.com/pablisc0) ===

In fact, given that reassigning a local object var is not supported, it could make sense to deprecate anonymous objects and support local object singletons instead 🤔 It may match expectations more closely, IMHO

<kotlin>
var test = object {
    val meh = ""
}
println(test.meh)

test = object { // Type mismatch. Required: ``. Found: ``.
    
}
</kotlin>

=== My reply ===

Ooh, I like the reassignment attempt 😀 I guess the reassignment of anonymous objects is basically a request for structural types 🤔

Not sure about deprecating anonymous objects though. They are like anonymous classes in Java and are used quite a lot.

To be fair to anonymous objects this works just fine:
<kotlin>
fun main() {
    fun foo() = object {
        val meh = ""
    }
    var test = foo()
    println(test.meh)

    test = foo()
}
</kotlin>

#### 2024/06/08
I like the "perfectionism is ego" idea regardless of whether it's true, partially true, or wrong because it hints at a bigger idea of questioning our "basic" narratives and patterns. Using a geek metaphor, it's like debugging our behaviour and going through its Git history.

#### 2024/06/07
"Perfectionist is a euphemism for having a massive ego... you don't like things that puncture your ego like being wrong" 👈 I really like this quote from the best non-Kotlin talk at #KotlinConf by [Dan North](https://twitter.com/tastapod) <https://www.youtube.com/watch?v=xW39RKtwolA&t=176s>

#### 2024/06/05
I like the recent optimisations in #IntelliJ (it feels faster). Not indexing external libraries could be done better though. When you open unindexed file and ask IDE to index it, the file is just closed. And there is no obvious way to turn off the feature I didn't ask for 🤷‍

#### 2024/06/03
If you happen to be in London next Thursday (6th June), come say "hi" and chat about KotlinConf at the #Kotlin meetup <https://www.meetup.com/kotlin-london/events/300882149> :)

#### 2024/06/02
Would you consider a bunch of value classes and pure functions that manipulate these classes an internal DSL? (Assuming the functions don't do anything fancy with nested lambdas etc.)

#### 2024/06/01
Not sure if this #KotlinConf talk inspired me to write Fleet plugins <https://youtube.com/live/G8pS1FzZlhk?t=4410s>. As if editor/IDE APIs and language AST weren't hard enough, why should I bother with transactional distributed database reactive queries and coroutines structured concurrency on top?

#### 2024/05/31
Overthinking power-assert a bit more, maybe it should deliberately limit the complexity of expressions it handles by default. Because tests are also about discovering the design and ways we think about the problem, and without matchers, we might be pushed into pure tech thinking.

#### 2024/05/30
Overthinking power-assert, there will always be expressions too convoluted for diagrams and objects too large or meaningless to render. One extreme could be to save a "debugger view" of relevant objects and show it in IDE on the assertion failure.

#### 2024/05/29
Another great (lightning) talk from #KotlinConf is "Kotlin + Power-Assert = ❤️" by [Brian Norman](https://mastodon.social/@bnorm@kotlin.social) <https://www.youtube.com/live/G8pS1FzZlhk?t=17597s>. I hope Power-Assert becoming a standard Kotlin plugin means it will get more attention, all the good features/fixes, and IDE integration 🙂

#### 2024/05/28
I'm watching the #KotlinConf talks I didn't attend, and here is a good one by [Martin Bonnin](https://twitter.com/martinbonnin) <https://www.youtube.com/watch?v=xW39RKtwolA&t=26267s>. Tiny correction, this is the right Result4k link <https://github.com/fork-handles/forkhandles/tree/trunk/result4k> (although [KT-68296](https://youtrack.jetbrains.com/issue/KT-68296) is likely to be the future anyway).

#### 2024/05/27
I haven't seen all the talks at #KotlinConf but this one is likely to be the best talk this year: "Revamping and Extending Kotlin's Type System" by [Ross Tate](https://twitter.com/rossetate) <https://www.youtube.com/watch?v=xW39RKtwolA&t=18183s> (I sat next to Ross during the keynote but had no idea who he was 🤦)

#### 2024/05/26
Since someone asked, this is the #LivePlugin I used to have a proper test progress bar in presentation mode at #KotlinConf <https://gist.github.com/dkandalov/765232732a0ef7d2937861fcb035b804> (a bit more code than you'd expect 🤷‍)

#### 2024/05/23
Thank you to all who came to the refactoring talk Duncan McGregor and I did today at #KotlinConf. You can find the resources we mentioned here <https://java-to-kotlin.dev/2024/05/23/kotlinconf-resources.html>. The video stream is available here <https://www.youtube.com/watch?v=YfiAkmJARe4&t=14861s>

#### 2024/05/21
This might be trivial, but here is one way to avoid Impl, Prod, and similar postfixes in class names in #Kotlin:
<kotlin>
interface Foo {
    fun foo(n: Int): Int
}
fun Foo(bar: Int) = object : Foo {
    override fun foo(n: Int) = bar + n
}
fun FakeFoo() = ...
</kotlin>

#### 2024/05/19
I'm not sure about the origins of the concept of long-term support releases in software, but I wish it was also applied to physical consumer products. For example, when I buy shoes, I'd like to know if I'll be able to purchase exactly the same pair in a couple of years.

#### 2024/05/18
Friday content you do need: "2022 - Non-Euclidean Doom: what happens to a game when pi is not 3.14159…" <https://www.youtube.com/watch?v=_ZSFRWJCUY4>

#### 2024/05/17
Friday content you don't need: "We need to talk about Gradle" <https://www.youtube.com/watch?v=lKIZA8PiQ3Y> by [Duncan McGregor](https://twitter.com/duncanmcg) #gradle #softwaresucks

#### 2024/05/16
I wonder what program structure could look like if files/packages followed the same rules as nested scopes and all definitions from "parent" files/packages were available by default 🧐 If that's a bad idea, why is it a good/ok idea at the function level?

#### 2024/05/15
This #Kotlin code compiles in file/object/function but doesn't compile in a class. It would be a more regular design if `{}` always had implicit access to the outer scope or classes couldn't access the outer scope by default 🤔

<kotlin>
val foo = 123
class Bar {
    fun bar() = foo
}
</kotlin>

#### 2024/05/13
If Java `static` existed in #Kotlin, an interesting way to think about it could be as a "context rejector" (opposed to context receivers).

=== Reply from [Marcin Szałomski](https://twitter.com/baldram) ===

Scala 3 has an annotation for that. There's an ongoing KEEP regarding statics in Kotlin.<br/>
<https://github.com/Kotlin/KEEP/pull/347>

=== My reply ===

Thank you! Just for the record, I'm not suggesting to add `static` keyword to Kotlin 🙃 I miss some of its usages in Java but answering the question if it's worth changing the language design to add `static` is a completely different endeavour.

#### 2024/05/12
I still miss Java `static` in #Kotlin to indicate that the function doesn't use class fields. Companion objects are a bit too indented, and moving the function out of the class distorts the "ownership." So I think I mostly just leave these functions in the class 🤔

=== Reply from [Șocâte Dīxit](https://twitter.com/SocateDixit) ===

Is it not the case that, strictly speaking, a function doesn't have an owner (unlike a method), but maybe a namespace ?

=== My reply ===

I don't think Java or Kotlin language specification has the concept of ownership (<https://docs.oracle.com/javase/specs/jls/se17/jls17.pdf>, <https://kotlinlang.org/spec/pdf/kotlin-spec.pdf>). So it's probably fair to say that I made this term up to explain how I think about the code 🤷‍

#### 2024/05/10
This is a good old reminder that actually talking to (or working with) people is better than pull requests <https://dragan-stepanovic.github.io/2020/11/16/pr-size-cannot-be-reduced.html> #noPRs

#### 2024/05/09
An old bugbear of mine is the Gradle test runner in #IntelliJ that doesn't run disabled tests. Classic JUnit runner can do it, so it looks like a regression bug to me (probably >10 years old). Things like that make me doubt Gradle should be the default way to build projects.

#### 2024/05/08
I thought that comments that duplicate what the code says were an artefact of the past (or would only be done by people new to programming). I guess [`ContinuationScope`](https://github.com/openjdk/jdk/blob/42b1d858d15fd06de9ce41b08b430b12724652e9/src/java.base/share/classes/jdk/internal/vm/ContinuationScope.java#L33) in the JDK proves me wrong 🙈

#### 2024/05/07
Of all modern testing libraries for #Kotlin <https://strikt.io> is the one I enjoyed using the most. It's sad to see it not under active development anymore <https://github.com/robfletcher/strikt/graphs/contributors>. Makes me wonder if there are good models to "give away" or let someone "inherit" the project.

=== Reply from [Anton Keks](https://twitter.com/antonkeks) ===

I like atrium: <https://github.com/robstoll/atrium><br/>
Recently it started getting more attention from the maintainer

#### 2024/05/05
Living in an information bubble as we all do, I wonder how many people heard of refactoring golf? 🧐

=== Reply from [David Denton](https://www.linkedin.com/in/denton-david) ===

You might need to find out how many people understand what refactoring is before we start talking about competitive refactoring...


#### 2024/05/03
There is an interesting analogy between #Kotlin scope functions and imports, for example `with(foo) {...}` is almost like a scoped version of `import foo.*`. I wish the analogy was closer though and nested `withs` disallowed resolution ambiguity, or you could define a package object.

=== Reply from [Ivan Canet](https://twitter.com/ivcanet) ===

What would a package object do? What would it be used for?

=== My reply ===

Everything objects/classes can do and packages cannot 🙈 Initialization, extending an interface, being used as an expression, reflection and probably other things.

#### 2024/05/02
When editing a file/class, I might not want to be distracted by its existing warnings. Here is an #IntelliJ plugin prototype to suppress inspections until the next commit 👉 <https://gist.github.com/dkandalov/590bdf339efe643a124e43082bed22d1> #LivePlugin (Maybe "Distraction Free" mode could do something like that 🙄)

<img src="../assets/images/micro-blog/2024-05-02.webp" width="80%" height="80%"/>

#### 2024/05/01
Short notice but if you happen to be in London on 2nd May and would like to see some pre-KotlinConf talks, this might be a good event <https://www.meetup.com/source-talks-on-kotlin/events/299930315>

#### 2024/04/30
I'm witnessing some Kotlin design hacks 🙈

<kotlin>
class Foo private constructor() {
    companion object {
        operator fun invoke(): Foo? = ... // 👈 nullable "constructor"
    }
}
</kotlin>
But the following doesn't compile 🤨
<kotlin>
@JvmName("bar")
fun Foo(): Foo? = null
</kotlin>


#### 2024/04/29
I understand that all people are different and there is neurodiversity, but I struggle to understand how people don't notice lots of (squiggly yellow) warnings in the editor. Or reversing the question, why am I so bothered by them? 🤔

=== Reply from [Görge](https://mastodon.social/@goerge@social.devteams.at) ===

I believe, that a lot of people are overwhelmed of the possibilities and visual clues of an IDE. So maybe it's just selective perception so that don't "see" the warnings. Maybe it's also a matter of education. "They" just don't know that the warnings are there to help.

To the reverse question: Same here. I did learn it the hard way. From the C/C++ Compiler warnings over the first hints in JBuilder and later eclipse to the rich code flow analysis based IDEA hint. It makes me a better programmer if I read and understand the warnings.
As we're taking care of our coworkers, we want them to learn, too.

#### 2024/04/27
It might be a false memory, but I think it was possible in #IntelliJ to configure the build so that it doesn't open a tool window every time compilation fails. I wonder what happened to it 🤔

=== Reply from [Ivan Canet](https://twitter.com/ivcanet) ===

Isn't that in the run configuration settings? IIRC you can decide whether the view opens or not

=== My reply ===

Yes, there is a setting in the run config, but that's for running, not building. So if there is a compilation error, #IntelliJ opens Build tool window regardless of the run config.

#### 2024/04/26
Me ranting about #Kotlin API design affected by IDE functionality might be a good example of code not existing on its own, but being a part of a sociotechnical system in which some people might want to use all IDE features. At the same time, it's always a trade-off, and if creating an API is impossible without a degraded experience for some users, then it might be worth it anyway. I wonder if it is (was) the case for C++ STL for example 🧐 

#### 2024/04/25
Yet another example of #Kotlin APIs interacting with IDE support is that you can't easily find subtypes of type aliases or function types. Not a massive deal on its own (unless you really need it), but these things can accumulate.
<kotlin>
typealias Foo = () -> Int
object MyFoo : Foo {...}
</kotlin>

=== Reply from [Uberto Barbini](https://twitter.com/ramtop) ===

this is big peeve of mine! I like typealiases but their usage are hard to find.
My #1 feature for IntelliJ would be a Hoogle-like api search engine where you can put a signature and get all functions with that signature (or places where they are needed)

#### 2024/04/24
Another example of #Kotlin APIs affected by IDE is type aliases support. In the code below, the "Specify return type explicitly" intention expands the alias instead of using `Foo` (it works with simple aliases though).
<kotlin>
typealias Foo = () -&gt; Int
fun bar(foo: Foo): () -&gt; Int = foo
</kotlin>

#### 2024/04/23
Another example of #Kotlin APIs affected by IDE is unusably slow "Find/Show Usages" on widely used functions (with short names maybe 🤔). I've seen it happening with `from()` and `invoke()`. Not great for classes extending function types. (Sorry, can't find the right YouTrack issue.)

#### 2024/04/22
One example of #Kotlin API usability affected by IDE is the navigation of the `invoke()` function. In the code below, you can only "Jump To Source" (or ctrl+click) on the last closing paren.

<kotlin>
class Foo: (Int) -&gt; Unit {
    override fun invoke(n: Int) {}
}
Foo()(n = 123)
</kotlin>

#### 2024/04/21
Another #LivePlugin making #Kotlin first in the new file popup <https://youtrack.jetbrains.com/issue/IDEA-171273> 🙄

<kotlin>
val newKotlinFile = actionManager.getAction("Kotlin.NewFile")
(actionManager.getAction(GROUP_NEW) as DefaultActionGroup).let {
    it.remove(newKotlinFile)
    it.add(newKotlinFile, FIRST)
}
</kotlin>

=== Reply from [Simon Vergauwen](https://twitter.com/vergauwen_simon) ===

You sold me on LivePlugin, going to take that for a spin.

Do you have a repo, or blog, or any reference where I can see some of your code, and utilities?

=== My reply ===

🥳 <https://github.com/dkandalov/live-plugin> The examples, might be out-of-date (because IntelliJ API changes) and might need to be updated to include the ones I actually use...

#### 2024/04/20
Here is a "one-liner" plugin for #IntelliJ I use before presentations (it needs #LivePlugin to run, but you get the idea 🙃):

<kotlin>
registerAction("Clear Editor History") {
    EditorHistoryManager.getInstance(it.project ?: return@registerAction)
        .removeAllFiles()
}
</kotlin>

#### 2024/04/19
In case you want to try an alternative JSON (de)serialization library for #Kotlin, Kondor <https://github.com/uberto/kondor-json> by
[@ramtop](https://twitter.com/ramtop) is great. No annotation magic, just functions explicitly defining the mapping. No external dependencies. As fast as Jackson.

=== Reply from [Nat Pryce](https://mastodon.social/@natpryce) ===

It's a great library and especially useful when you need to select a format dynamically, via HTTP content negotiation or version info within a file, for example. Which, given enough time, is always.

#### 2024/04/18
Code editors with AI assistance should be equipped with two pedals. "Less AI" pedal: I know what I'm doing, just let me type the code! "Moar AI" pedal: keep hallucinations coming, I have a blank page problem.

<img src="../assets/images/micro-blog/2024-04-18.webp" width="80%" height="80%"/>

#### 2024/04/16
Typical #IntelliJ dilemma. There are two identical entries in the auto-complete popup. Do I spend an hour (or more) investigating and reporting it on YouTrack to find that it's already fixed, or it's been a known bug for years? Or move on pretending nothing happened? 😬🙈

<img src="../assets/images/micro-blog/2024-04-16.webp" width="80%" height="80%"/>

#### 2024/04/15
One way to make `(Auto)Closable` in Java/Kotlin safer could be a compiler check that it's been closed. Something similar to `@Nullable`/`@NotNull` annotation or <https://youtrack.jetbrains.com/issue/KT-12719>. (To be fair, there is a Java inspection for `AutoClosable` in IntelliJ, but this is not generic enough.)

=== Reply from [Simon Vergauwen](https://twitter.com/vergauwen_simon) ===

How would that be possible to track? I use a DSL for that, I released it as a 1 file library in Arrow.
Hmm, KDoc missing from Dokka. <https://apidocs.arrow-kt.io/arrow-autoclose/arrow/-auto-close-scope/index.html>
1st party support would be cool though.

=== My reply ===

For Kotlin, the same (or similar) way IntelliJ finds unused `Deferred`. Just for reference `DeferredResultUnusedInspection` [source code](https://github.com/JetBrains/intellij-community/blob/b45abaca53c20b199c70365aad548150b6ea5e7a/plugins/kotlin/idea/src/org/jetbrains/kotlin/idea/inspections/coroutines/DeferredResultUnusedInspection.kt#L17) and `AbstractResultUnusedChecker` is easy to configure.

#### 2024/04/13
Why JDK has `(Auto)Closable` interfaces but nothing like `Disposable` (e.g. see <https://github.com/JetBrains/intellij-community/blob/idea/222.3739.54/platform/util/src/com/intellij/openapi/Disposable.java>; not to be confused with `IDisposable` in C#) or similar pattern to pass the parent resource owner as a parameter so that it's harder to forget to close the `Closable`? 🧐

#### 2024/04/12
On the topic of dark vs light editor themes, the correct answer is of course "it depends". They're all fine and at some point, I had auto-switching using <https://github.com/mikereedell/sunrisesunsetlib-java>. I wish there were responsive colour schemes so that OS could gradually shift colours through the day.

#### 2024/04/11
Are there good articles about tiny types (aka micro types)? Also, what does make a type "tiny"? I guess it's about narrow usage in the domain, e.g. Date or Money are not tiny even if they wrap a single primitive value 🤔

#### 2024/04/10
In case you need a #Kotlin client for Amazon S3, you might want to try <https://github.com/http4k/http4k-connect/tree/master/amazon/s3> 🙃 It's minimal but easy to extend/test, and you control the HTTP client it uses! #http4k

=== Reply from [Володимир Стельмащук](https://twitter.com/smallstells) ===

In case you need a #Kotlin client for S3 , just use the official one <https://docs.aws.amazon.com/sdk-for-kotlin/latest/developer-guide/kotlin_s3_code_examples.html>

=== My reply ===

Sure. Java client also works just fine. The difference is the amount/size of dependencies and testability. Also the official Kotlin SDK is all "suspend" which some people might not need/want 🤷

=== Reply from [dav1d d](https://twitter.com/tarkaTheRotter) ===

I haven't looked at it deeply, but it seems like the official sdk might obsfucate the end client from you, thus rendering it untestable in a non-in-memory fashion? The Java SDK did allow for replacement of the http client so you could decorate it with observability etc..


#### 2024/04/09
As an example of why bother with allocation stack traces, imagine seeing this line in #Kotlin stack trace FooKt$compose$1.invoke(foo.kt:42). With many usages of compose() in the project, it can be hard to find the right one and the functions it composed (and so on recursively).

#### 2024/04/08
Unlikely to be a new idea, but it could be useful to have object allocation stack traces in a debugger. Then the allocation stack traces might include objects that also have allocation stack traces... and that's almost profiling 🤔 #whynot

#### 2024/04/06
In programming, it's important to name things right, so it's "core human", not "soft" skills. (Image by [Susan David, Ph.D.](https://twitter.com/SusanDavid_PhD), discovered via [Compassionate Coding](https://twitter.com/compassioncode).)

<img src="../assets/images/micro-blog/2024-04-06.webp" width="80%" height="80%"/>

=== Reply from [gavr](https://twitter.com/gavr123456789) ===

it seems to me that soft skills is the same generalization as hard skills, they could also be unpacked into a diagram from a bunch of components

#### 2024/04/05
Happy to confirm that #IntelliJ 2024.1 preserves #Kotlin imports after copy-paste 🙏🥳🍻 <https://youtrack.jetbrains.com/issue/KTIJ-10687>

#### 2024/04/04
Given that in #Kotlin `apply` and `with` are often used for configuring objects, it would be interesting to try restricting `this` to only one immediate receiver 🧐 Maybe with something like [`@DslMarker`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-dsl-marker).

=== Reply from [Uberto Barbini](https://twitter.com/ramtop) ===

It's not already like that? I mean you need to qualify it for refer to the other receivers

=== My reply ===

You're right, `this` can only refer to immediate receiver or has to be qualified 😳 What I mean is accessing several contexts via implicit `this`

<kotlin>
12.apply {
    "".apply {
        uppercase() // current receiver
        shr(1) // outer receiver
        foo // class field
    }
}
</kotlin>

#### 2024/04/03
The usability of APIs is not just typing the right code. It's also the amount of friction or help from the compiler/IDE/editor at every step, being able to "guess" the right thing to do, navigating to and understanding the source code, finding documentation/examples online, etc.

#### 2024/04/02
I wish there was more usability testing on APIs. Nothing fancy. Just watch someone with good knowledge of the programming language and technology complete a couple of tasks (no hints, no judgment). This might be enough to find pain points and avoid the [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge).

#### 2024/03/31
In case you missed it, there is <https://kotlintoday.com> by [@kotlin_magazine](https://mastodon.social/@kotlin_magazine) 😅 #Kotlin

<img src="../assets/images/micro-blog/2024-03-31.webp" width="80%" height="80%"/>

#### 2024/03/30
Clarifying the point about ::functionReference in #Kotlin. The line between "variables" and functions is blurry anyway, and it's possible to reference a function without "::" 🤷‍

<kotlin>
fun main() = foo(f1)
val f1 = fun() {}
fun foo(f: () -> Unit) = f()
</kotlin>

#### 2024/03/29
I wonder why #Kotlin needs "::" before function references, is it for faster parsing or there is a deeper reason? 🧐

<kotlin>
foo(123).let(bar).let(qix).also(println)
</kotlin>
vs
<kotlin>
foo(123).let(::bar).let(::qix).also(::println)
</kotlin>

#### 2024/03/27
Can anyone recommend good eye tracking hardware/software suitable for recording the area/letters user is looking at on the screen? 🤔 I thought eye tracking was mostly a "solved" problem but after a bit of search I'm more confused than before.

=== Update ===

I found <https://www.tobii.com/products/eye-trackers/screen-based/tobii-pro-spark> for £2600 and <https://pupil-labs.com/products/core> for €3440. Given the prices, I'm not in a rush to order one.

#### 2024/03/26
I wonder if people use #Kotlin scope functions in some idiosyncratic way that doesn't match coding conventions <https://kotlinlang.org/docs/scope-functions.html> 🤔 I think I tend to use `also` only for non-essential side effects and avoid `run` and `with` if possible.

=== Reply from [Simon Vergauwen](https://twitter.com/vergauwen_simon) ===

I almost never use run, or with. I rarely use also, typically for (temp) logging.

let I also use sparingly, for ?.let(::Reference) and similar but definitely not always.

So I refrain from these most of the time.

=== Reply from [Uberto Barbini](https://twitter.com/ramtop) ===

I use with only when I need something in scope to get ext functions on something else.

Run is nice sometimes as a let on receiver, but the name is unfortunate

#### 2024/03/25
Nothing radically new here, but in #Kotlin you can change the order of function/constructor calls in the code to match the execution order with scope or extension functions. For example:
<kotlin>
println(qix(bar(foo(123))))
</kotlin>
👇
<kotlin>
foo(123).let(::bar).let(::qix).also(::println)
</kotlin>

#### 2024/03/23
In terms of less local code ergonomics, e.g. "reading" a function, in addition to eye/mouse/cursor tracking it might be interesting to capture navigation like finding usages, which arguments are passed in, etc. The complexity of navigation could correlate with worse ergonomics? 🤔

#### 2024/03/21
In terms of the "local" code ergonomics for an expression/statement which fits on a few lines, what about eye/mouse/cursor tracking to measure overall distance, path overlap, hot spots, amount of jumps, etc.? This could be a more concrete thing to compare "readability" 🤔

=== Reply from [Louis CAD](https://twitter.com/Louis_CAD) ===

How much you need to navigate and jump your eyes off to understand things, and how many questions you need to ask yourself when reasoning about what happens in the code.

=== My reply ===

Not easy to measure the amount of questions though. Maybe some statistical (AI) magic dust can interpret emotions on the webcam 🙃

=== Reply from [Louis CAD](https://twitter.com/Louis_CAD) ===

You can ask someone to write the questions they have in mind. Mutable references, and unstructured concurrency are the first offenders. Then, there's the "Why was this named like that?".

=== My reply ===

Hm, I was thinking more about lower-level measurements. Questions could be a good way to interpret the results though 🤔 (The problem with asking people questions is figuring out if they actually had this thought or they think they did but actually didn't.)

#### 2024/03/20
Code "readability" has such a wide meaning that I genuinely have no idea what it really means. I suspect it often means "the code that we like" or "we did our best to not make a mess" 🙈 I wonder if thinking about code "ergonomics" could lead to more concrete terms? 🤔

#### 2024/03/18
I doubt it's a new idea, but I wonder if, similar to NP problems, the information on the Internet could/should be made hard to fake and easy to verify (via digital signature, trust network, etc. #noblockchainsplease) 🤔

#### 2024/03/16
One solution for the coding interviews could be for everyone to do them on a regular basis in the spirit of code katas. But when I ask people I know from the big tech to do it on a weekend, they are not very keen and imply it's a waste of time. Something doesn't add up here 🧐

=== Reply from [Alexey Soshin](https://twitter.com/alexey_soshin) ===

Before looking for solutions, someone needs to admit the problem.

As things stand now, there are more than enough people willing and able to solve any ridiculous interview question.

#### 2024/03/15
It might seem weird today, but puzzle-focused interviews were a norm in the tech industry 20+ years ago. With the pinnacle of the ["How Would You Move Mount Fuji?"](https://www.goodreads.com/book/show/205266.How_Would_You_Move_Mount_Fuji_Microsoft_s_Cult_of_the_Puzzle_How_the_World_s_Smartest_Companies_Select_the_Most_Creative_Thinkers) book. I hope in 20 years we will look back at the current hiring process with the same amount of disbelief #progress

(To be clear the diagram is not to scale or be exhaustive, e.g. it ignores the randomness of the hiring process.)

<img src="../assets/images/micro-blog/2024-03-15.webp" width="80%" height="80%"/>

#### 2024/03/14
Here are some old ideas to make coding interviews more fair. Do an actual pair programming session, in which nobody knows the problem or solution. Do it on a "neutral" territory. No hard time limit. In big companies randomly interview existing employees to measure the baseline.

=== Reply from [Jean-Michel](https://twitter.com/jm_fayard) ===

The obvious principle behind that: Being a good candidat should be a second job <https://dev.to/jmfayard/how-to-not-answer-where-do-you-see-yourself-in-5-years-398m>


> Being a good candidate should not be a second job.
Remember back of the day where we didn't care much about usuability. We had our software, it was not perfect but it worked. Users complained that it was hard to use. From our side we complained that they were too lazy to RTFM.
> Thing went on and on, and then we realized that the user is not trained or paid to use our software.
> We are the professional and it's our job to think about usability and make sure we understand the user so much that we will remove the obstacles on her path before she can see it.
> <br/>
> The same principle holds in a job interview.
> The candidate is neither trained nor paid to be a good candidate.
> Her real job is to be a good developer, and that's what the interview should be all about.
> The interviewer is the professional, he is paid for that, he can prepare things in advance. That's his job to think about what makes candidates uncomfortable for no value to the company. And get those obstacles out of the way.


=== Reply from [Dave H](https://twitter.com/thinkfoo) ===

I like the idea. Choosing that neutral territory again and again could be tricky though.

A benefit for the interviewee of working on the companies actual codebase is it's an opportunity for them to learn if the organisations code is an environment they want to work in

Do both?

=== My reply ===

This is a good point. It's easy to run out of neutral spaces even in a big city. Might still be worth it compared to a corporate environment where you can't walk on your own and need a "permission" to drink water or go to the toilet.

Yes! Working on a real codebase is another good idea 🙂 Maybe even pay for it.

Obviously, I don't mean any of the ideas are easy or feasible to implement. But they highlight issues with the current process.

=== Reply from [Михаило Љевћенко](https://twitter.com/TheMishkun) ===

This idea does not scale. Imagine how many new tasks covering the required set of skills you need to craft in medium-large companies?

Good coding interviews already resemble pair programming. Yes, interviewer done that task dozens of times, but that advantage can be neutralized by selecting everyday tasks as interview tasks.

If you hire a backend dev, make them do a CRUD app with some specific of your domain. They've too done cruds dozens if not hundreds of times. So the fact that interviewer done this particular task shouldn't matter.

=== My reply ===

I suspect that interviewers who are very familiar with the problem can be affected by [attribution](https://en.wikipedia.org/wiki/Attribution_bias) and [self-serving](https://en.wikipedia.org/wiki/Self-serving_bias) biases. And since knowing about the bias doesn't make you less biased, something else needs to change.



#### 2024/03/13
To be fair, in #IntelliJ it's easy to write a naive expansion to word boundaries (see attached snippet for LivePlugin). What's hard is to make it work in all contexts with other selection expansion handlers (it doesn't). And given enough users, someone will always be upset 👍

<img src="../assets/images/micro-blog/2024-03-13.webp"/>

#### 2024/03/12
I thought plain text #IntelliJ selection expansion first selects "valid id", then text surrounded by spaces, then wider context. Turns out it's a combination of `PlainTextLineSelectioner`, `NaturalLanguageTextSelectioner` and `WordSelectioner` (actually java id "selectioner"), which don't expand to `a [b=1|23] c`. And I'm not going to debug VSCode 🙅

#### 2024/03/11
The rabbit hole of the day is exploring selection expansion in different editors, e.g.
<plain-text>
foo a=a|aa bar
foo a=[a|aa] bar
[foo a=a|aa bar]
</plain-text>

I wish there was also this selection:
<plain-text>
foo [a=a|aa] bar
</plain-text>

I didn't find a simple answer/solution, unfortunately.

#### 2024/03/09
FYI Sweary Lightweight Agile Planning <https://slap.pm> and SFW version <https://slap.pm/bowdlerised> #NoEstimates Good planning advice on one page of text, which you can read in under 2 minutes.

#### 2024/03/08
I like the idea (can't remember the source) that not all tech decisions need to have economical rationale behind them. For example, it might be worth tidying up the code not because it will make us more productive in the future but because we enjoy a better working environment.

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
Great talk by [Clare Sudbery](https://mastodon.social/@claresudbery) "Continuous Integration: That's Not What They Meant" <https://www.youtube.com/watch?v=Ms3J6_-6-fk> 🤩 And this is your regular reminder that pull requests are a waste.

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

+1 To clarify I'd rather not see any Gradle output in tests output but if it's already there, I wish it included the command.

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

<img src="../assets/images/micro-blog/2024-02-09.webp" width="80%" height="80%"/>

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

<img src="../assets/images/micro-blog/2024-02-04.webp" width="80%" height="80%"/>

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

<img src="../assets/images/micro-blog/2024-01-24.webp" width="80%" height="80%"/>

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
I did a small write up suggesting to inline all single usage "variables" in #Kotlin <https://dmitrykandalov.com/tidy-kotlin#inline-variables-with-single-usage> because there are pretty much no downsides to that (except if it needs a better name or object requires longer lifetime obviously).

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
I wonder if making variables/functions/classes/etc. as private as possible is considered to be a form of encapsulation. Or "encapsulation" is too specific to OO and something like "information hiding" is better for non-OO code?

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

<img src="../assets/images/micro-blog/2023-12-08.webp" width="80%" height="80%"/>

#### 2023/12/07
Thinking about copy-paste issues, #Microsoft is the winner. Formatting issues, broken shortcuts and copy-paste doing nothing at all. Unbelievable! It worked better 20 years ago. Should there be a consumer protection law, so that big companies are obligated to fix basic bugs? 🤔

#### 2023/12/06
(Summoning the power of social media 🪄🎅) When you copy text/code, and then paste it, you expect to see exactly the same code/text. Unfortunately, this is not the case when editing #Kotlin in #IntelliJ. Could this issue be moved out of the backlog (aka "never") please <https://youtrack.jetbrains.com/issue/KTIJ-10687/Copy-Paste-should-preserve-static-imports>

<img src="../assets/images/micro-blog/2023-12-06.webp" width="30%" height="30%"/>

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

<img src="../assets/images/micro-blog/2023-11-26.webp" width="50%" height="50%"/>

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

<img src="../assets/images/micro-blog/2023-11-24.webp" width="50%" height="50%"/>

#### 2023/11/22
I wish #Kotlin stdlib had Flow-like API with onStart/onComplete/catch/etc. for Sequence/Iterable. And maybe cancellation by making them AutoClosable (?) 🙈🤔 (I'm sure there are some good discussions on youtrack, slack and Kotlin forum.)

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
In case anyone needs a podcast recommendation, [Troubleshooting Agile](https://podcasts.apple.com/gb/podcast/troubleshooting-agile/id1327456890) is one of my all-time favourite and probably not very well-known podcasts. Thank you, [Jeffrey Fredrick](https://twitter.com/Jtf) and [Douglas Squirrel](https://twitter.com/douglassquirrel), for producing great content! See also <https://agileconversations.com>

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
Another problem with `eventually {...}` is that it's easy to sprinkle tests with it but can be really hard to remove because the design won't let you control concurrency and it's hard to refactor with the build being slow and flaky. It's a trap! 😒 #testing #rant

#### 2023/10/31
The reason why using `eventually {...}` in tests is not a good idea is that it will make your build slow and non-deterministic. Retries will slow down passing tests, timeouts will make failures even slower, and failure messages will read like "something didn't happen on time" 🤷

#### 2023/10/30
If you use something like `eventually {...}` function all over the tests (which retries with timeout the lambda until it succeeds), the chances are you're doing it wrong. Ideally, refactor concurrency you're waiting for out of the core logic and test concurrent things separately.

#### 2023/10/29
To be clear, I suggest projectional editor for #Kotlin/#Java not just for formatting, but for overall code layout and how we experience working with codebases. For example, "navigation" could show functions next to each other, or maybe hide private fields or some "obvious" types.

#### 2023/10/27
Since it's nearly impossible to "win" any code style/formatting argument, could we have a projectional editor for #Kotlin/#Java, e.g. as an IntelliJ plugin please. It has to be clever though to project into the "current code style" in text format 🧐

#### 2023/10/26
I wonder how much code layout (let's say just within a file) affects how we think about programs. Is there any research? 🤔🔬 What if changing the layout could shift overall project design to be less data centric for example?

#### 2023/10/25
Thinking about details first/last in #Kotlin classes, the default style is neither. It seems to be guided by object initialisation and execution order (init fields, invoke constructor, public/private functions). As a reader you're supposed to play the role of a computer I guess 🤷

#### 2023/10/24
Timeless question: define details first or last? In particular, in a #Kotlin file should data classes used in an interface be defined before or after the interface? If details last, then shouldn't all fields/properties be at the bottom of the class? Do you, should you care?

=== Reply from [Jordan Stewart](https://twitter.com/damaged) ===

Most important thing first. Probably not quite right, I like to _think_ of it as similar to writing's "inverted pyramid" —
<https://en.m.wikipedia.org/wiki/Inverted_pyramid_(journalism)>

=== The hill I'm happy to join [Chris Oldwood](https://twitter.com/chrisoldwood) on ===

![](../assets/images/micro-blog/2023-10-24.webp)

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
Back to #kotest rants. Because kotest has "built in coroutine support at every level" when an assertion fails, you can't navigate to the matcher source code from the stack trace (Kotlin coroutines are stackless). So good luck if the error message is not very clear.

=== Reply from [James Ward](https://twitter.com/_JamesWard) ===

I wonder if Stacktrace Recovery could help:
<https://github.com/Kotlin/kotlinx.coroutines/blob/master/docs/topics/debugging.md#stacktrace-recovery>

#### 2023/10/18
Random #IntelliJ tip. You can select multiple items in lists/trees and apply action to all of them. E.g. select files in project view, press enter and all selected files will be open. The same works with find/show usages. Or abstract function can be implemented on all classes by using "select all" via ctrl/cmd+A, then "enter" 👌
![](../assets/images/micro-blog/2023-10-18.webp)

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
Another #kotest #rant is that most of its matchers don't show diff window in IntelliJ with JUnit5 runner. It tries but most matchers throw `AssertionError` (no diff) and some `AssertionFailedError` (has diff) 🤷😒 Makes you wonder if kotest authors actually use it via IntelliJ.

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
Rick Beato has a great [YouTube channel](https://www.youtube.com/@RickBeato). In particular, "What Makes This Song Great?" videos, e.g. [Metallica - "Master of Puppets" Breakdown](https://www.youtube.com/watch?v=5EOHKfoDyrI). I'm wondering if there is something similar for #software analysing/appreciating/criticising well-known projects. Should John Carmack or Dave Farley do it? 😅

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

