---
permalink: tcr
title: Limited WIP — test && commit || revert
---

Limited work-in-progress doesn't seem to be a very well-known idea in the software development world but there are few practices which we use without realising that they're limited work-in-progress (WIP) techniques. One example is [pomodoro] which suggests to focus on a task for 25 minutes and then take a break (without checking email or social networks), i.e. pomodoro limits the amount tasks that can be done in parallel. A less obvious example is [TDD] which makes us focus on the problem taking one step at a time, i.e. TDD limits what we can do at each stage of red-green-refactor cycle (for example, we can't add production code when tests are green). Another not-so-obvious example is continuous integration (CI) which is about regularly combining all changes into a working piece of software, i.e. CI is about limiting [merge debt].

Unfortunately, there is no common practice to quantify merge debt and [doing CI] can a bit more subtle than most CI tools want us to think. In particular, it might seem ok to stay on a branch as long as it can be merged into trunk (aka main/master branch). The problem is that there is no guarantee that pending changes on the branch can be integrated with the pending changes on all other active branches. You can optionally make the problem more interesting by adding code reviews via pull-requests and multiple "main" branches (e.g. dev/uat/prod).

Without suggesting that it's the best, easy or even practical solution, one extreme way of doing CI might be developing on trunk using ["test && commit \|\| revert"][tcr] (TCR). TCR is a workflow inspired by TDD and intended to encourage small changes which are safe to integrate.


### The idea
TCR can be summarised with the following three rules:
- You can't commit without running tests.
- If the tests pass, all changes are automatically committed.
- If the tests fail, all changes are automatically reverted.

There is an analogy with some arcade computer games where if you reach a safe point in the game, then the next time character dies, it respawns at the last safe point. Similarly, with TCR if the code is broken (i.e. has any failing tests), you're taken to the last safe point when all the tests were green. Unlike arcade games it's up to you to decide where the safe points are and there are no lives or score in TCR (it might be an interesting idea to explore though).

TCR might seem hard because of the constant pressure to get the code and the tests right on the first attempt. If anything goes wrong (even a typo in assertion), all uncommitted work is deleted. The trick is to find ways of working in tiny increments so that at each step it's nearly impossible to fail and if you do fail, there isn't much to lose anyway (this is quite similar to [auto-revert]({% post_url limited-wip/2021-04-28-limited-wip-auto-revert %}) constraint).


### The most continuous integration
Because TCR makes us work in small increments, merging code becomes much easier. Small frequent changes are less likely to have conflicts and even when a conflict occurs, it's easier to resolve it or to just drop local changes and do them again. Since TCR only allows to commit on passing tests, all commits should be safe to share with other people. Obviously, frequent pushes will also ensure that you receive updates from everyone else, so it might be somewhat like using a collaborative code editor except that it's done via version control. From this point of view, "test && push || revert" (TPR) could be a better name to promote continuous integration at the smallest possible level.

Given that the commits are done automatically, there is a question of when/how to specify commit messages. One straightforward solution might be to edit commit message just before it's done automatically. Or you can try specifying commit message in advance before making changes, e.g. in some environment variable. Although these options are likely to get in the way of TCR flow and with lots of small changes you might discover that writing a commit message after each modification is too tedious. So another approach is to use a "default" commit message for a series of commits and squash them later. Or use a placeholder message and later squash commits into more meaningful chunks with better commit messages.

It's also interesting to challenge the whole idea of writing a commit message for each code modification. Having an explanation of why code has changed is good, but should it really be part of the commit? Maybe there is more value in decoupling incremental changes from the task description and decisions made on a project which often span many commits anyway. And as a nice bonus we'll get a detailed history of code modifications.


### TCR with TDD?
Following the basic TCR rules, there is no way to have a failing test without code being reverted. This means that you can't really use TCR with TDD but there are few workarounds. One approach is to bend TCR rules a bit and only revert production code. Another approach is to write negated assertion(s) before implementation and fix it once the implementation is done. Or you can try negating/modifying assertions after a successful commit to confirm that they fail (somewhat like a manual mutation testing).

TCR is perfect for refactoring though. It encourages the refactoring strategy to run tests after each change and go back if anything went wrong without wasting time trying to figure out why refactoring didn't work. After a failed attempt you can do a simpler, smaller or just different refactoring. Trying to analyse failure from a stacktrace or debugging code with TCR is problematic anyway, because the stacktrace will be pointing to the code which doesn't exist anymore, and you can't rerun a failed test with a debugger (although I suppose you could run tests in debugger in the first place).

There is a question of which tests should be run when using TCR. The ideal answer is all tests. In practice, running all tests might be too slow, so a subset of tests which are the most relevant for modification is a pragmatic choice. Unfortunately, on many code bases even running a single test might be too slow because of build/compilation time. It's not a great experience to spend 2 minutes writing a bit of code and then wait for a minute to see it all reverted. There are two possible conclusions. One is that TCR is not usable on some projects and with certain toolsets. Another is that some projects and toolsets are not very usable themselves. The second conclusion is particularly interesting because it's hard to say that many mainstream toolsets are really focusing on performance. This is especially sad because as software developers we created all these tools ourselves (editors, compilers and testing frameworks). What stops us from focusing on a really good tool performance in the range of milliseconds so that it's instant from human perception point of view? Maybe a hanging code editor or one minute compilation time should be socially unacceptable similar to a major security breach or personal data leak. Maybe testing frameworks should be more opinionated and fail unit tests which run for longer than a second.


### Try it yourself!
The easiest way to try TCR is by setting up a toy project or a [code kata] and manually following the rules. Writing a small script (or finding one on the Internet) might be a bit more effort but is worth it to make TCR more interactive and a bit like playing a mini-arcade game. I ended up adding TCR-mode to the [Limited WIP plugin] for IntelliJ IDEs which already had similar functionality. Either way don't take it too seriously, experiment with the rules and make sure to have fun.


[TDD]: http://wiki.c2.com/?TestDrivenDevelopment
[pomodoro]: https://en.wikipedia.org/wiki/Pomodoro_Technique
[Limited WIP plugin]: https://github.com/dkandalov/limited-wip
[tcr]: https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864
[doing CI]: https://benjiweber.co.uk/blog/2020/02/12/do-you-ci
[merge debt]: http://www.chrisoldwood.com/articles/branching-strategies.html
[tcr variants]: https://medium.com/@tdeniffel/tcr-variants-test-commit-revert-bf6bd84b17d3
[code kata]: http://codekata.com