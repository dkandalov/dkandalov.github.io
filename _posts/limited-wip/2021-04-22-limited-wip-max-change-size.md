---
permalink: max-change-size
title: Limited WIP — Maximum change size
---

There is a lot of focus on the technical side of software development: programming languages, libraries/frameworks, architecture, etc. But not that much focus on what humans are supposed to do while using the tools. There seems to be an implicit assumption that developers will do things in the most optimal way. Unfortunately, this assumption is often false. In the same way that people don't always follow the lifestyle which is best for them, we don't always take the best path when creating software.

To give a specific example, let's say while working on a feature, you spot some code which can be improved. So you go ahead with the improvement and go back to the feature. This happens few more times and before you know there are twenty modified files with changes including both code improvements and the feature itself. The feature is not complete yet but the change feels big enough that it needs to be committed. The bad news is that it's now hard to disentangle code improvements from the feature, and you have to choose between (1) figuring out what to include into a partial commit, (2) committing mixed changes with an incomplete feature or (3) continuing with already oversize change. Not ideal. It would be good to not end up in situations like this in the first place.

This is where techniques to limit [work-in-progress] (WIP) come to rescue by stopping us from doing too many things in parallel. The benefits of limiting work-in-progress are not just about better commits (which is often a symptom), they are about more focused work, fewer mistakes and improved workflow. In this blog I'll describe the technique of setting the maximum change size. 


### The idea
Using maximum change size to limit work-in-progress is quite simple — if the size of changes is bigger than some threshold, you're not allowed to commit. Instead, you have to find a way to split the work into smaller committable chunks. It also means that as soon as you reach the threshold, there is no point making more changes because you won't be able to commit them anyway. Reaching the threshold should be a rare event though. You should keep yourself aware of the current change size, for example, by monitoring diff size in version control or IDE, and dealing with it before it gets too big. 

Many developers already have some kind of implicit change size limit. It manifests itself as the feeling that it's time to commit during a long coding session. So you might be already using maximum change size constraint without being fully aware of it. The advantage of an explicit change size limit is that you can quantify it and keep yourself honest by comparing change size to some threshold. You can also use a tool or script which will watch uncommitted changes and notify you as soon as the change size gets close to or exceeds the threshold instead of relying on the gut feeling to know when there are too many changes. It's also usually harder to "negotiate" with a script (e.g. a Git hook) compared to convincing yourself that the commit is still has a reasonable size "just this one time".

After a while this technique should naturally nudge you into working in a more focused way (unless you're doing it already) along the lines of making one change at a time until it's finished and committed. And if something else comes up during the change, you can add the new task to TODO list for later or shelve the current modifications, finish the new task and unshelve. Sounds simple but it's surprising how often we divert into more complex workflows.


### Calculating change size
Calculating change size is a bit more tricky than it seems. The most obvious question is what to count: lines, words, characters or even the amount of actions/keystrokes in the editor since last commit? Should empty lines and whitespace characters be excluded? Regardless of the choice, there is a problem that modifications of the same size might have different real-world weight. For example, in Java adding an import statement is usually less work compared to writing a line of code that will be executed. Another problem is that conceptually simple changes can produce large diffs. For example, renaming a function which is used across the project will create a large diff even though it's a single rename. There are other problems of this kind and none of them have simple solutions just because it's extremely hard to measure complexity and impact of code. In practice though, I found that using a simple metric like non-empty lines of code works quite well.

Another question is how to calculate modifications on diffs. If we are measuring change size in lines, then adding a brand-new file with 10 lines of code should count as 10. But what if the change is replacing 10 lines of code with completely different 5 lines? Should the change size include only the new code, both old and new `10 + 5 = 15` or maybe average `(10 + 5) / 2 = 7.5`? 

Finally, there is a question about how to quantify file system changes such as moving/renaming files or creating directories and how well the diff algorithm can determine if a file was moved or it's a new file with similar content.

Given the above, the maximum change size is obviously a heuristic which you will need to experiment with to make it useful. A good strategy might be to start with a threshold which is quite low and gradually increase it. Note that you can also track your progress in version control by analysing how commit sizes changed over time.


### Thought experiments
To explore the idea, let's perform a couple of thought experiments: 
- With the maximum change of 1_000_000 lines of code you will never notice that there is a change size limit because pretty much nobody changes a million lines of code on daily basis.
- If we go down to maximum change size of 10_000, once again it's unlikely to be noticed, except for large-scale code migration and restructuring. 
- It becomes more interesting with the change size limit around 100 and below. This is where the learning opportunities are. 
- Finally, with the limit of 1 or 2 lines, it becomes impossible to make any significant changes. Unless we cheat and redefine the constraint to be 1 or 2 actions/keystrokes in the editor. Then automated code transformations are allowed (for example, inline refactoring or create new class). The interesting aspect of it is that if transformations don't break existing functionality, then they are perfectly fine to commit and share the with other people after every single change. There is probably not enough functionality in your editor/IDE to actually do this but it was just a thought experiment.


### Try it yourself!
Maximum change size is an easy constraint to try. You can start by watching change size manually on command line (e.g. with `git diff`). Or you can roll out a proper script to regularly check the change size and prohibit commits above threshold. I went down a different rabbit hole of writing a [Limited WIP plugin] for IntelliJ IDEs. Whatever path you choose, please remember that just like with other techniques nothing is set in stone, so feel free to experiment with it and have fun.

[work-in-progress]: https://en.wikipedia.org/wiki/Work_in_process
[Limited WIP plugin]: https://github.com/dkandalov/limited-wip
