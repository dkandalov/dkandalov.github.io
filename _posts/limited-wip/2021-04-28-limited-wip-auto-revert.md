---
permalink: auto-revert
title: Limited WIP — Auto-revert
---

_(Updated 17th October 2024)_

As software developers, we seem to be mostly interested in technology and tools rather than the human side of the process such as software development workflows. For example, consider [TDD] — one of the few workflows that made it into the mainstream. These days pretty much every project has some kind of unit testing library imported and everyone has TDD on their CV. However, in practice even when people do write tests, they often do it after writing production code (which contradicts the definition of TDD) and instead of the [red-green-refactor] cycle do something like red-code-debug-refactor-code-green.

An easy way to fail at red-green-refactor is by making too many changes. We focus on the solution, start exploring how it can be done, find a couple of problems in the code that need fixing, and end up writing/changing way more code than is necessary to pass existing tests. When we finally add more tests for the implemented functionality, the new code might not work as expected, so we start debugging it. It might also feel convenient and efficient to do the refactoring while we change everything anyway, so it's often done with failing tests. These are common enough patterns, that [Adrian Bolboaca] came up with the baby steps constraint for [code retreats] which essentially adds a time limit to red-green-refactor steps, so you can't go off on a tangent and have to concentrate on tiny steps or your code is reverted.

The idea of time-limited work-in-progress (WIP) is not specific to TDD. Similar to other limited WIP techniques, the benefits are about doing more focused work with fewer mistakes while constantly keeping the project in a working state. In this blog post, I'll describe a generic version of the baby steps constraint which I call "auto-revert".


### What is auto-revert?
As the name suggests, auto-revert is about automatically reverting uncommitted changes after a time interval:
- Start a countdown timer, e.g. 5 minutes.
- On each commit, reset the timer. 
- On a timeout, revert all changes.
- You can only commit when all tests pass.

If you never heard about auto-revert, it probably sounds like an absolute waste of time. It is ridiculous to give up control of when the code is reverted and use a timer instead. Imposing time pressure on yourself to finish the task (as if doing work isn't hard enough) to achieve what, more stress? With a short timeout duration, it will be impossible to get anything done.

All of the above is valid, but... The trick is to learn how to change your ways of working to make small incremental code modifications (aka baby steps) so that the code is never too far away from being in a working state that can be committed. Once you get into this flow, auto-revert fades into the background, and reverts become rare. Even when some changes are reverted, it's not a big deal anymore because it's only a few minutes of work. You can also think about redoing reverted changes as a micro-[codekata]. The code rewrite after a revert might not follow the same steps or end up in the same place as before. And that's ok. The process of making the change again often gives a good insight into a better way of doing it.

Another positive effect of auto-revert is time awareness. We often underestimate even the most basic tasks (perhaps, because we think about the size of the change in terms of text editing and downplay the conceptual complexity and the probability of us not fully understanding the problem). Using an explicit timeout makes the duration of tasks very visible. It also helps to avoid distractions because you know you only need to concentrate only for a limited time. This is similar to [pomodoro technique] which suggests working in 25-minute blocks with regular breaks.


### Thought experiments
To explore auto-revert, let's perform a couple of thought experiments:
- Auto-revert with a 10-year timeout is unlikely to be noticed by anyone. Uncommitted code from years ago will be long forgotten and will be out-of-date anyway. Considering the probability of hardware failures, we are already working with this constraint.
- Similarly, auto-revert with a timeout of months, weeks, or several days will make no difference for most people because changes are done and committed within shorter time intervals. From this point of view, there is nothing radical about auto-revert.
- It becomes more interesting with a timeout measured in hours and minutes. This is the range where the learning opportunities are and auto-revert will be uncomfortable until you change your ways of working.
- Finally, if the auto-revert timeout is just a couple of seconds (or less!), making any change becomes impossible. One interesting solution could be to come up with code transformation tools that can do safe code modifications and immediately commit them. There is a parallel here with using the smallest [maximum change size]({% post_url limited-wip/2021-04-22-limited-wip-max-change-size %}) threshold.


### What about real-world projects?
Using auto-revert on real-world projects comes with its own challenges. The main issue I've seen is complex code which takes a long time to explore and understand, let alone change it within a few minutes. An obvious solution might be to not make any changes during the exploration phase (except for small improvements which can be done and committed within timeout). If it looks like the complexity makes it impossible to implement a feature in a series of small steps, it might be worth asking "Why", "How did we get here", "Can the code be refactored to make it possible", etc.

Another problem is slow build and tests. To be usable, the auto-revert timeout needs to be noticeably longer than the duration of an average feedback loop. For example, if it takes 2 minutes to compile and run all relevant tests, then it's not practical to revert changes every 5 minutes because if the tests fail, there won't be much time left to do anything. Long feedback loops require longer auto-revert timeout which requires a larger change size. And nobody wants to lose large code changes, so no auto-revert. What's worse is that if the feedback loop is too long, we naturally get distracted and forget about the auto-revert timeout (until all the changes are gone). This can be interpreted as auto-revert doesn't work on projects with long build times. Or you can use this as an opportunity to ask yourself "why". In particular, if running tests takes too long, was it a conscious decision based on some trade-offs, or did the tests happen to slow down over time because nobody cared enough? Slow compilers, build tools, and editors/IDEs also get in the way of fast feedback. It's not very common to continuously measure the speed of a compiler or a build tool on the project — it feels that it's outside our circle of influence. But maybe we should. Looking at modern programming environments, many of them don't provide particularly fast feedback, so unless we collectively make a big deal out of toolchain performance, it's likely to improve.

Finally, when using auto-revert, you might start committing really often. This brings up the question about the meaning of commit messages. If there are changes every few minutes, commits can become too fine-grained to write a separate message for each of them. One option might be to squash tiny commits into more chunky ones with meaningful commit messages. Another idea is to decouple the process of integrating changes with other people from explaining the changes and documenting project history (so commits on the trunk / main branch can be essentially a "Save" button for distributed work).


### Try it yourself!
The simplest way to try auto-revert is to use a timer on the command line or on your phone. Be aware that if you're not pair-programming, it's easy to negotiate with yourself and skip the revert "just this one time". A bit more advanced approach might be to write a script that will perform a `git reset` every few minutes and restart the timer if there are no local changes. Going down this path I ended up creating [Limited WIP plugin] for IntelliJ IDEs.

Auto-revert is an essential constraint to try on a [codekata] to challenge current ways of working and to observe your reaction to code being reverted. It can be more tricky on a large-scale project, but it's worth trying if nothing else to find the bottlenecks in your working environment. Similar to other workflows, nothing is set in stone with auto-revert. Feel free to experiment with it and have fun.


[TDD]: http://wiki.c2.com/?TestDrivenDevelopment
[red-green-refactor]: https://martinfowler.com/bliki/TestDrivenDevelopment.html
[Limited WIP plugin]: https://github.com/dkandalov/limited-wip
[Adrian Bolboaca]: https://twitter.com/adibolb
[code retreats]: https://www.coderetreat.org
[codekata]: http://codekata.com
[pomodoro technique]: https://en.wikipedia.org/wiki/Pomodoro_Technique