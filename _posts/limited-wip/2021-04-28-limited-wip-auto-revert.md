---
permalink: auto-revert
title: Limited WIP — Auto-revert
---

As software developers, we seem to be mostly interested in technology and tools rather than in the human side of the process such as software development workflows. For example, consider [TDD] — one of the few workflows that made it into the mainstream. These days pretty much every project has some kind of unit testing library imported and everyone has TDD on their CV. However, in practice even when people do write tests, they often do it after writing production code (which contradicts the definition of TDD) or are following a red-code-refactor-code-debug-green approach.

An easy way to fail at the red-green-refactor is by making too many changes. We focus on the solution, start exploring how it can be done, find a couple of problems in the code that need fixing, and end up writing/changing way more code than is necessary to pass existing tests. When we finally add more tests for the implemented functionality, the new code might not work as expected, so we need to debug it, therefore the "debug" step in the red-code-refactor-code-debug-green pattern (where the "refactor" step is often done with failing tests or is missing). It's quite a common problem, so [Adrian Bolboaca] came up with the baby steps constraint for [code retreats] which essentially adds a time limit to red-green-refactor steps.

The idea of limiting work-in-progress (WIP) based on time is not specific to TDD and can be used in other contexts as well. Similar to other limited WIP techniques, the benefits are about doing more focused work with fewer mistakes while constantly keeping the project in a working state. In this blog post, I'll describe a generic version of the baby steps constraint which I call "auto-revert".


### The idea
As the name suggests, auto-revert is about automatically reverting uncommitted changes after a time interval:
- Start a countdown timer, e.g. 5 minutes.
- On each commit, restart the timer. 
- On a timeout, revert all changes.

There is also an implicit rule that you can only commit when the code compiles and doesn't have any failing tests but, hopefully, it's not necessary to mention.

It might seem ridiculous to give up control of when the code is reverted and use a timer instead. It can also be difficult emotionally because of the perceived time pressure to finish the task before the timeout and the harsh penalty of code being reverted if it's not done on time. Plus with a low timeout duration (e.g. 5 minutes) it might seem impossible to get any work done. Given the above, it's reasonable to assume that using auto-revert is not going to work.

The trick is to change your ways of working to make small incremental code modifications (baby steps) so that the code is never too far away from being in a working state that can be committed. Once you get into this flow, auto-revert fades into the background, and reverts become very rare. Even when some changes are reverted, it's not a big deal anymore because it's only a few minutes of work. You can also think about redoing reverted changes as a micro-[codekata]. Interestingly, the code might not end up in the same place where it was before the revert, because the process of making the same changes again can give us insights into a better way of doing it. 

Another positive effect of auto-revert is better time awareness. It seems we often underestimate even the most basic tasks (perhaps, because we imagine the size of the change in terms of text editing and downplay the probability of things not going according to the plan). Using a timeout makes the duration of tasks more visible. It also helps to avoid distractions because you know you need to concentrate only for a limited time. This is similar to [pomodoro technique] which suggests working in 25-minute blocks with regular breaks.


### Thought experiments
To explore the idea, let's perform a couple of thought experiments:
- Auto-revert with a 10-year timeout will be impossible to notice because the changes that were not committed for that long will be forgotten about and will be out-of-date by that time anyway. Considering the probability of hardware failures over 10 years, we are already working with this constraint.
- Similarly, with a timeout of months, weeks, or several days there will be no effect on the workflow for most people. From this point of view, there is nothing radical about auto-revert.
- It becomes more interesting with a timeout measured in hours and minutes. This is the range where the learning opportunities are and auto-revert will be uncomfortable until you change your ways of working.
- Finally, if the auto-revert timeout is just a couple of seconds, making any change becomes impossible. One interesting solution could be to use some kind of code transformation tool that can do safe code modifications and immediately commit them. There is a parallel here with using the smallest [maximum change size]({% post_url limited-wip/2021-04-22-limited-wip-max-change-size %}) threshold.


### What about real-world projects?
Auto-revert is a great technique for learning at code retreats but there is a question of how useful it is on real-world projects. One of the problems is complex code which takes a long time to understand, let alone to make the required change within a few minutes. The solution is to work in read-only mode during the exploration phase or to make focused improvements which can be done and committed within timeout. If it looks like it's impossible to implement the feature in a series of small steps, then it might be worth asking yourself "why", "how did we get here" and if the code can be refactored to make it possible.

Another problem is slow build and tests. To be usable, auto-revert timeout has to be longer than the duration of an average feedback loop on the project. For example, if it takes 2 minutes to compile and run all relevant tests, then it's not practical to revert changes every 5 minutes. Because of this, long feedback loops will push the lowest usable auto-revert timeout to the point when the change size is quite big and expensive to revert. What's worse is that if the feedback loop is too long, we naturally get distracted (start checking email or chatting to someone) and forget about the auto-revert timeout. Surely, this can be interpreted as "auto-revert doesn't work on real projects". Or you can use this as an opportunity to ask yourself "why". In particular, if running tests takes too long, was it a conscious decision based on some trade-offs, or it just happened to slow down over time? Slow compilers, build tools, and editors/IDEs also often get in the way of fast feedback. It's less common to continuously measure the speed of a compiler or a build tool on the project — it feels that it's outside our circle of influence anyway. But maybe we should, because looking at modern programming environments, many of them don't provide particularly fast feedback, so unless we collectively make a big deal out of toolchain performance, it's likely to stay just around "ok".

Finally, when using auto-revert, you might start committing really often. This brings up the question about the meaning of commit messages. If there are changes every few minutes, commits can become too fine-grained to write a separate message for each of them. One option might be to squash tiny commits into more chunky ones which can have more meaningful messages. Another idea is to decouple the process of integrating changes with other people from documenting project history (so commits on the trunk / main branch will be essentially like a "Save" button for distributed work).


### Try it yourself!
The simplest way to try auto-revert is to use a timer on the command line or on your phone. Although if you're not pair-programming, it's easy to negotiate with yourself and skip the revert "just this one time". A bit more advanced approach might be to write a script that will perform a `git reset` every few minutes and restart the timer if there are no local changes. I ended up going down the path of creating [Limited WIP plugin] for IntelliJ IDEs.

Auto-revert is an absolutely essential constraint to try on a [codekata] to challenge your current ways of working and observe the reaction to code being reverted. It can be more tricky to use on a large-scale project, but it's worth trying just to find the bottlenecks in your working environment. Similar to other workflows, nothing is set in stone with auto-revert, so feel free to experiment with it and have fun.


[TDD]: http://wiki.c2.com/?TestDrivenDevelopment
[Limited WIP plugin]: https://github.com/dkandalov/limited-wip
[Adrian Bolboaca]: https://twitter.com/adibolb
[code retreats]: https://www.coderetreat.org
[codekata]: http://codekata.com
[pomodoro technique]: https://en.wikipedia.org/wiki/Pomodoro_Technique