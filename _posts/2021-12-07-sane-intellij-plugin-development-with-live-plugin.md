---
draft: true
permalink: liveplugin
---

Pretty much all modern web browsers have [developer tools console](https://en.wikipedia.org/wiki/Web_development_tools) which lets you type some JavaScript code and run it in the browser. In theory, this allows you to do any kind of automation and extend browser functionality at runtime. In practice, it's not suitable for the purpose, and, to be fair, most users are probably not even aware of the developer console, so for a browser development team spending extra effort to make it possible to extend the browser at runtime via console might not be justified.

This is different for code editors and IDEs with their target audience being [power users](https://en.wikipedia.org/wiki/Power_user), so it seems like a sensible idea to make extending editor/IDE functionality and task automation as easy as possible. Surprisingly, this is not the case, and most code editors and IDEs don't have the functionality to develop extensions at runtime. It doesn't have to be this way though.

This blog post is about [LivePlugin](https://github.com/dkandalov/live-plugin) - a plugin for adding/modifying IntelliJ IDEs functionality at runtime without IDE restarts using Kotlin (or Groovy). Even though this blog has details specific to IntelliJ platform and the JVM, some concepts and ideas are universal enough to be applied in other environments.

### Contents
1. [Why?](#why)
2. [What does it look like?](#what-does-it-look-like)
3. [How does it work?](#how-does-it-work)
4. [Notifications, logging, basic input](#notifications-logging-basic-input)
5. [Actions](#actions)
6. [Action groups](#action-groups)
7. [Editor and Document](#editor-and-document)
8. [Intentions and Inspections](#intentions-and-inspections)
9. [IntelliJ APIs Mini Cheat Sheet](#intellij-apis-mini-cheat-sheet)
10. [Final thoughts](#final-thoughts)


### Why?
The main reason is faster and simpler workflow for plugin development. From the IDE user point of view, this means that you can write plugins for things you wouldn't bother writing plugins otherwise, e.g. project-specific scripts and workflows that can be added to IDE. In a way it's like creating IDE macros using a programming language. It also makes it easier to add "missing" IDE features and try these features before creating a "proper" plugin.

- **Minimal setup** — no need to create a separate project for plugin development.
- **Fast feedback loop** — plugins are executed without IDE restarts.
- **Simpler API** — smaller surface area API to make extending IDE functionality easier.


### What does it look like?
Once you install LivePlugin, you can open any project and notice that there is a panel called "Plugins". It contains a list of folders with plugins source code. LivePlugin comes with a few example plugins, some of which, including "hello-world", are installed by default. By convention `plugin.kts` or `plugin.groovy` files are plugin entry points. To get started, you can select the "hello-world" plugin and press the green "Run Plugin" button to compile and run it. The IDE should display some notification messages which should also be available in the "Event Log" tool window.

![](/assets/images/liveplugin/0.png)

The next thing to try is modifying the plugin code. You can, for example, leave only one `show()` function and change the message. If you press the `Rerun Plugin` button, the IDE will display a notification with an updated message. (You can also try writing syntactically invalid code or throw an exception from the code to see how it fails.)

![](/assets/images/liveplugin/1.png)

If you're using IntelliJ IDEA or Android Studio, and have Kotlin plugin installed, all standard IDE features like auto-completion and navigation should work out-of-the-box when editing plugin code. LivePlugin is bundled with its own source code, so you should be able to navigate, for example, to the definition of `show()` function. Other IntelliJ IDEs, which are not compatible with Kotlin plugin, will only have basic syntax highlighting.

![](/assets/images/liveplugin/2.png)

There are few more details, which are described in the bundled examples starting from "hello-world", but overall this is it. LivePlugin compiles and runs code in the same JVM instance as IDE with access to all IDE classes and objects.


### How does it work?
Overall, the whole workflow can be summarized in three steps:
1. dispose resources from previous plugin execution
2. compile plugin source code into `.class` file(s)
3. load plugin classes into newly created classloader and execute the code

This sounds simple but there are more details at each step. In the first place, why do you need to clean up resources from the previous execution? The reason for the cleanup is that if a plugin registers, for example, an IDE event listener, there is no way for the garbage collector to know when the listener is no longer used. So there is a common pattern in IntelliJ IDEs to pass an instance of `com.intellij.openapi.Disposable` class which represents a lifetime of the listener (or some other resource). Each time LivePlugin executes a script, it creates a new `pluginDisposable` object and passes it to the script. The script then will need to use it with IDE APIs or add an explicit cleanup callback (e.g. using `.whenDisposed()` function). When LivePlugin unloads the script, or before script is executed again, it disposes `pluginDisposable` from the previous execution.

At the next step LivePlugin compiles plugin source code. This obviously requires a compiler, so the question is where do you get one? At the moment of writing, it seems that all IntelliJ IDEs come with a Kotlin compiler jar. But it's not clear if it will always be the case, and it's hard to know when Kotlin jars will be updated in IDE (with potentially breaking changes), so LivePlugin is bundled with its own Kotlin compiler. Another question is how to compile code which uses IDE APIs. Luckily, since IDE is running on the JVM, it's possible to look up the location of IDE jar files and use them for compilation classpath. This is limiting in a sense that you cannot write code for an older or newer version of IDE, but most of the time it's not a problem and compiling again current version of IDE just makes setup much easier. LivePlugin can also compile code which uses external libraries or other plugins.

It might seem a bit strange why LivePlugin creates a new classloader for each execution of a script. The answer is that a new classloader is needed to make sure that classes from the previous script executions can be unloaded. [Classloaders](https://en.wikipedia.org/wiki/Java_Classloader) are special classes which can bring other classes into existence, e.g. by reading bytecode from disk, network or generating bytecode. Classloaders form a [hierarchy](https://docs.oracle.com/cd/E19501-01/819-3659/beadf/index.html) in which child classloaders can see classes from their parents, but not the other way round. Classloaders can only load classes with unique names, so plugin classloader won't be able to load another `java.lang.String` (which is already loaded by bootstrap classloader). On the other hand, sibling classloaders don't "see" each other's classes, so two leaf classloaders can both load `my.project.Foo` class at the same time. From that point of view, classloaders are like namespaces. When there are no more references to the classloader and the objects created from its classes, the classloader and the classes become eligible for garbage collection. This is the main reason for creating a new classloader for each script execution.

The final step is running plugin code. At the JVM level, plugin script is really just a class which can be reflectively instantiated with some parameters (including `pluginDisposable`). The construction basically runs all the code in `plugin.kts` (or `plugin.groovy`) file. This happens on the event dispatch thread (EDT) so it is safe to modify IDE state at the top level of the plugin script (see IntelliJ [threading rules](https://plugins.jetbrains.com/docs/intellij/general-threading-rules.html)). On the other hand, this means that blocking operations (like CPU intense calculations or long-running IO) should be done on a background thread, to avoid freezing IDE UI. Just like any other plugin it has access to all objects in the IDE JVM, so it is possible to use any functionality from other plugins and IDE itself.

Here is a diagram with an overview of the components described above, where filled lines represent control flow and dotted lines represent dependencies. It's not a very detailed or precise one, but hopefully it is still useful as a visual guide:
![](/assets/images/liveplugin/how-it-works.png)

This is all there is to it. If you want to extend IDE functionality by, for example, adding some actions, it's up to you to invoke specific functions, i.e. there is no special syntax or some XML/JSON/YAML file with configuration. It's all just Kotlin code.


### Notifications, logging, basic input
Being able to show notifications or print messages is one of the most fundamental ways to get feedback when using LivePlugin. There is no way to debug plugins with breakpoints because there is only one instance of the JVM. In theory, you could test-drive all plugin functionality, but in practice, many APIs are not very TDD-friendly. So notifications are the most useful way to know why something is (not) working.

To show a standard IDE notification you can use the `show()` function (the name is inspired by the [Show](https://hackage.haskell.org/package/base-4.12.0.0/docs/Text-Show.html) typeclass in Haskell and the fact that "notify" would clash with method on `java.lang.Object`). The function takes few optional parameters and in its most complex form can look like this:
<kotlin>
show(
    message = "Hello &lt;a href=''>world</a>",
    title = "Foo",
    groupDisplayId = "MyDisplayGroup",
    notificationListener = { notification, hyperlinkEvent ->
        show("Hi ${notification.content} ${hyperlinkEvent.sourceElement}")
    }
)
</kotlin>
Where `message` is an object which will be converted to a string; `title`, as you can guess, is a title of the message; `groupDisplayId` is a string id which can be configured in "Event Log" settings so that for example IDE plays a sound on events with a particular group id; `notificationListener` is callback invoked when user clicks on hyperlinks in the HTML formatted message. (Note that the support for basic HTML formatting and hyperlink callbacks are really just part of IntelliJ notification API which is pretty cool 😎)

If the notification message is too long, IDE will not show the whole content of the message. In this case, you can use the `showInConsole()` function which creates and opens a tool window with the specified text. It's an extension function on the `Project` object which you can get as a part of the script context or via standard IDE API, e.g. from `AnActionEvent` in an action callback:
<kotlin>
project?.showInConsole(
    message = "a really long message, or maybe even a stacktrace",
    consoleTitle = "Some title",
    contentType = ERROR_OUTPUT
)
</kotlin>

Using notifications and tool windows for what is essentially logging is ok on a small scale to get fast feedback, but not ideal for a larger volume of data. There is a logging API based on `com.intellij.openapi.diagnostic.Logger` which works pretty much as expected appending info/warn/error messages to the IDE log file. And if you want something really simple, you can always use `println()` which ends up in the IDE log anyway:
<kotlin>
val logger = Logger.getInstance("MyPlugin")
logger.info("info message")
logger.warn("warn message")
logger.error("error message") // Will log and show error notification in IDE.
println("info message")
</kotlin>

Finally, there are couple Kotlin functions in the `com.intellij.openapi.ui` package and few static functions in the `com.intellij.openapi.ui.Messages` Java class for basic UI dialogs:
<kotlin>
val isYes = com.intellij.openapi.ui.showYesNoDialog(
    "Dialog Title",
    "And this is a question?",
    project
)
show(if (isYes) "Yes!" else "No 😿")

val userInput = com.intellij.openapi.ui.Messages.showInputDialog(
    project,
    "Please enter something useful",
    "Dialog Title",
    AllIcons.Ide.Gift,
    "initial value",
    null
)
show("userInput = $userInput")
</kotlin>


### Actions
Actions are one of the most fundamental ways of user interaction with IDE. All menu items, text editing activities (e.g. moving cursor) and all items in `Settings -> Keymap` are actions. Actions are essentially stateless functions which can be presented in UI and produce side effects when invoked. Once registered, action becomes available in all projects and will be invoked when you click on a menu item, use corresponding shortcut or, for example, choose an action in the "Find Action..." action. Actions are executed on the UI thread, so long-running tasks must be done in the background to avoid freezing UI.

All actions need to implement `com.intellij.openapi.actionSystem.AnAction` abstract class which is not that difficult, but to make it a bit easier, LivePlugin has `registerAction()` function with lambda as a callback. In the simplest form it looks like this (the new action will appear in the "Find Action..." list, where it can be invoked):
<kotlin>
registerAction("Show Project Name") { 
    show(it.project?.name) 
}
</kotlin>
Since there is a `registerAction()`, it would be reasonable to expect the `unregisterAction()` function. There isn't one though. The reason is that unregistering actions and other callbacks is essentially resource cleanup and done by passing an instance of `com.intellij.openapi.Disposable`. In the example above, disposable is passed as part of the `LivePluginScript` object which is an extension function receiver of `registerAction()`. In a more explicit form, each plugin execution has its own instance of `pluginDisposable` which can be passed to various APIs, e.g. this is a more verbose way of registering action:
<kotlin>
registerAction("Show Project Name", disposable = pluginDisposable) {
    show(it.project?.name)
}
</kotlin>
When a plugin is rerun or unloaded (via the "Unload Plugin" button in the "Plugins" tool window), `pluginDisposable` is disposed unregistering actions and freeing other resources. You can test it by unloading the plugin and checking that the action disappeared from the "Find Action..." list.

There are few more useful details about actions which can be illustrated by expanding on the example above:
<kotlin>
registerAction(
    id = "Show Project Name",
    keyStroke = "alt shift .",
    actionGroupId = "ToolsMenu"
) { actionEvent: AnActionEvent ->
    show(actionEvent.project?.name)
}
</kotlin>
- Here `id` is the action id which must be unique within the IDE. For convenience, it's also used by `registerAction()` as a textual representation of the action.
- Keyboard `keyStroke` to invoke the action, where modification keys are lowercase (e.g. "ctrl", "alt", "shift", "cmd"), letters are uppercase, and other keys are uppercase based on the constant names in `java.awt.event.KeyEvent` (e.g. "ENTER", "ESCAPE", "SPACE", "LEFT", "UP", "F1", "F12").
- `actionGroupId` which is a string identifying a menu/popup/toolbar to which action will be added. Unfortunately, there is no single place to find all these ids, but there are common menu ids listed in `liveplugin.ActionGroupIds` object.
- Instance of `AnActionEvent` with invocation "context" which passed into the lambda. This is usually how actions know about the project, editor or UI component in which they were invoked.

The `registerAction()` function is part of LivePlugin and uses lambda just for convenience. It's entirely legal to implement `AnAction` abstract class from IntelliJ API. Creating a subclass of `AnAction` is a bit more effort, but it also has more configurability. For example, you can specify an action icon or configure if the action is enabled/disabled in the current context.
<kotlin>
registerAction(id = "Show Project Name", action = ShowProjectName())

class ShowProjectName : AnAction(AllIcons.Ide.Gift) {
    override fun actionPerformed(event: AnActionEvent) {
        show(event.project?.name)
    }
    override fun update(event: AnActionEvent) {
        event.presentation.isEnabled = true
    }
}
</kotlin>

Even though LivePlugin comes with some helper functions, you don't have to use any of them. Instead of `registerAction()`, you could use IntelliJ API to register actions. The problem is that in this particular case, API is used by IDE to add actions from XML config files, and unlike newer APIs doesn't support `Disposable`s.
<kotlin>
val actionManager = com.intellij.openapi.actionSystem.ActionManager.getInstance()
actionManager.registerAction("action id", action)
</kotlin>

Finally, since actions are just like functions, it's natural to ask if actions can invoke other actions. The answer is "yes" with the caveat that you need to look up or create `AnAction` and `AnActionEvent` objects. Some actions have simple constructors, so it might be easy to just create a new instance. Some might not be public or hard to construct. In this case, they can be looked up via `ActionManager.getAction(actionId)`. The easiest way to get an instance of `AnActionEvent` is to pass on `event` argument from already invoked action (or if you really need to construct one, see `liveplugin.implementation.Actions#anActionEvent()` for ideas):
<kotlin>
registerAction("Invoke Another Action") { event ->
    val action = ActionManager.getInstance().getAction("ToggleBookmark1")
    action.actionPerformed(event) // Bookmark current line
}
</kotlin>


### Action groups
Actions can be grouped into action groups which are actions themselves. The main reason for creating an action group is that it's a good way to present a bunch of actions in the UI as a submenu or a popup window.

All action groups implement the `com.intellij.openapi.actionSystem.ActionGroup` class. The simplest way to create one is by instantiating `DefaultActionGroup`, however, when used as a menu item it will add all actions without sub-menu, unless the `isPopup` property is set to `true`. For this reason there is `liveplugin.PopupActionGroup()` which makes the group a popup.
<kotlin>
val action1 = registerAction("Action 1") { show("1") }
val action2 = registerAction("Action 2") { show("2") }
registerAction(
    id = "Some Actions",
    actionGroupId = ActionGroupIds.EditorPopupMenu,
    action = DefaultActionGroup(action1, action2).also { it.isPopup = true }
)
</kotlin>

Another option is to display an action group as a popup window. LivePlugin comes with `createPopup()` extension function which has few useful default parameters and uses `JBPopupFactory` under the hood. Note that there is a special `Separator` action in IntelliJ API which represents a separator in the menu.
<kotlin>
registerAction("Show Action Group") {
    PopupActionGroup(name = "Some Actions",
        action1,
        action2,
        Separator.getInstance(),
        PopupActionGroup("Sub Menu",
            action3,
            action4,
        )
    ).createPopup()
     .showCenteredInCurrentWindow(it.project!!)
}</kotlin>

All of the above is straightforward but there are few subtle things worth mentioning. One is that __actions should not share `AnActionEvent`s between each other__. For example, in the code snippet below, "action 1" is using `event` from the outer "Show Action Group" action. This is wrong. The reason is that events capture the content in which an action was invoked, and this context might change by the time another action is invoked. Even if you're sure that sharing an event will be fine, in some cases IDE checks if there was a shared event and will display an error. Another caveat is that when creating a popup, we do want to pass some of the context to actions in the popup window via `event.dataContext`, otherwise, in the example below "action 2" will not know what the current file is.
<kotlin>
registerAction("Show Action Group") { event: AnActionEvent ->
    PopupActionGroup(name = "Some Actions",
        AnAction("action 1") { show(event.virtualFile?.path) },
        AnAction("action 2") { show(it.virtualFile?.path) }
    ).createPopup(event.dataContext)
     .showCenteredInCurrentWindow(event.project!!)
}
</kotlin>

Actions and action groups are the lowest hanging fruit in terms of the plugin development. Even with this minimal IDE integration there are few useful things that can be done, e.g. by sharing bookmarks and doing various automation via shell scripts and HTTP requests. I will not explain the examples below in detail because they are roughly based on the examples bundled with LivePlugin. It's worth noting though that it's possible to use third-party libraries (e.g. [http4k](https://www.http4k.org)) and execute long-running tasks in the background without blocking UI thread.
<kotlin>
// add-to-classpath $PLUGIN_PATH/libs/*

PopupActionGroup(name = "Some Actions",
    AnAction("LivePlugin on GitHub") { 
        openInBrowser("https://github.com/dkandalov/live-plugin") 
    },
    AnAction("LivePlugin on GitHub 2") { 
        it.project?.openInIdeBrowser("https://github.com/dkandalov/live-plugin") 
    },
    AnAction("Open plugin.kts") { 
        it.project?.openInEditor("$pluginPath/plugin.kts") 
    },
    AnAction("Http Request") {
        val client = org.http4k.client.OkHttp()
        val response = client(Request(GET, "https://duckduckgo.com"))
        show(response.status)
    },
    AnAction("Run a Script") {
        runBackgroundTask(taskTitle = "Running shell script", task = {
            show(runShellScript("""
                '$pluginPath/hello.sh'
                sleep 5
                """.trimIndent()
            ).stdout)
        })
    },
)
</kotlin>


### Editor and Document
Writing software is still mostly based on textual representation of code and even though IDEs are good at manipulating syntax tree, being able to programmatically control text editor can be quite useful. This can be achieved using `com.intellij.openapi.editor.Editor` and `Document` APIs. 

If you feel like experimenting, one of the simplest ways might be to use the current editor without any actions directly in the plugin script. The code below uses `caretModel` to move cursor to the beginning of the file and `selectionModel` to select all text:
<kotlin>
val editor = project?.currentEditor ?: error("No editor")
editor.caretModel.moveToOffset(0)
editor.selectionModel.setSelection(0, editor.document.textLength)
</kotlin>

However, as a motivating example, let's write "Random Case" action which will change letters of the current word to be randomly upper or lower case. I would normally write the code incrementally, manually testing each new piece of functionality. The first thing to check in the action is that `document` and `editor` are available. The following action will show a message when invoked in an editor but will not show notification if the focus is, for example, in the "Project" tool window.
<kotlin>
registerAction("Random Case", "alt shift .") { event ->
    val document = event.document
    val editor = event.editor
    if (document != null && editor != null) {
        show("Document and editor are available")
    }
}
</kotlin>

The next step is to get the word under the caret. The trick here is to use offset from `editor.caretModel` which represents a shift in characters from the beginning of the current file. There is always a potential for off-by-one errors on the edges around words and beginning/end of file but the code below seems to be good enough for the job.
<kotlin>
registerAction("Random Case", "alt shift .") { event ->
    val document = event.document
    val offset = event.editor?.caretModel?.offset
    if (document != null && offset != null) {
        val textAfter = document.text.drop(offset).takeWhile { it.isLetterOrDigit() }
        val textBefore = document.text.take(offset).takeLastWhile { it.isLetterOrDigit() }
        show(textBefore + textAfter)
    }
}
</kotlin>

Randomising letters is an easy task in Kotlin (I have to mention though that `Random` object has side effects and should be ideally passed in from outside so that it's possible to give it a seed and write an automated test for the action): 
<kotlin>
val text = (textBefore + textAfter)
    .map { if (Random.nextBoolean()) it.toUpperCase() else it.toLowerCase() }
    .joinToString(separator = "")
show(text)
</kotlin>

The final step is to update text in the document. It is a trivial thing to do using the `Document.replaceString()` function which takes from/to offsets and a replacement string. However, if you run the code below, it doesn't modify the document but instead fails with _"Assertion failed: Write access is allowed inside write-action only (see com.intellij.openapi.application.Application.runWriteAction())"_.
<kotlin>
document.replaceString(
    offset - textBefore.length,
    offset + textAfter.length,
    text
)
</kotlin>

This happens because modifying the state of a document without a write lock violates IntelliJ [Threading Rules](https://plugins.jetbrains.com/docs/intellij/general-threading-rules.html). I recommend reading the rules to understand the details, but overall the rules can be summarized by the following table, where `ReadAction` and `WriteAction` are classes with static `run(ThrowableRunnable)` method and in spite of the name are not related to `AnAction` class described in the section above (yes, naming is hard 🙈️).

|                   | Read       | Write       |
|-------------------|------------|-------------|
| **UI thread**     | ✅          | WriteAction |
| **Other threads** | ReadAction | ❌           |
{:.post-table}

Since "Random Case" action code is executed on the UI thread, the  document modification code can be wrapped with `WriteAction`: 
<kotlin>
WriteAction.run(ThrowableRunnable {
    document.replaceString(
        offset - textBefore.length,
        offset + textAfter.length,
        text
    )
})
</kotlin>

Unfortunately, it still fails but this time with a different message _"IncorrectOperationException: Must not change document outside command or undo-transparent action. See com.intellij.openapi.command.WriteCommandAction or CommandProcessor"_. The reason is that there is [an additional rule](https://plugins.jetbrains.com/docs/intellij/documents.html#what-are-the-rules-of-working-with-documents) that document modification can only happen within an undoable command, meaning that the modification can be undone/redone and will be available in the "Main Menu -> Edit -> Undo/Redo". To make document modification code a bit less nested, LivePlugin comes with an extension function `executeCommand`, so the final code for the "Random Case" action looks like this:
<kotlin>
registerAction("Random Case", "alt shift .") { event ->
    val document = event.document
    val offset = event.editor?.caretModel?.offset
    if (document != null && offset != null) {
        val textAfter = document.text.drop(offset).takeWhile { it.isLetterOrDigit() }
        val textBefore = document.text.take(offset).reversed().takeWhile { it.isLetterOrDigit() }.reversed()
        val text = (textBefore + textAfter)
            .map { if (Random.nextBoolean()) it.toUpperCase() else it.toLowerCase() }
            .joinToString("")
        document.executeCommand(event.project!!, description = "Random Case") {
            replaceString(
                offset - textBefore.length,
                offset + textAfter.length,
                text
            )
        }
    }
}
</kotlin>

### Intentions and Inspections
There are two similar concepts in IntelliJ based IDEs: [intentions](https://www.jetbrains.com/help/idea/intention-actions.html) and [inspections](https://www.jetbrains.com/help/idea/code-inspection.html). Both intentions and inspections run in the background analysing code in the current editor. If a particular intention/inspection can be applied, it shows up in the light bulb popup menu available on `alt+enter`, where you can select it to perform a code transformation. The main conceptual difference is that inspections provide a way to transform code (e.g. invert `if` condition or replace `&&` with `||`) and inspections are looking for problems in the code (e.g. unreachable code or potential `NullPointerException`).

Both intentions and inspections work with [PSI elements](https://plugins.jetbrains.com/docs/intellij/psi-elements.html) (short for Program Structure Interface) which are basically nodes in an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree). PSI elements are represented by different classes in different programming languages, so usually intentions/inspections are written for a specific language. There is [UAST](https://plugins.jetbrains.com/docs/intellij/uast.html) (Unified Abstract Syntax Tree) API for JVM languages (Java, Kotlin, Scala, Groovy) but it's still somewhat experimental at the moment of writing. 

The best way to learn about PSI is to see what it looks like for particular code examples. This is what `println("OMG!!")` looks like using [PsiViewer plugin](https://plugins.jetbrains.com/plugin/227-psiviewer): 

![](/assets/images/liveplugin/psi-viewer.png)

There are only two things you need to know to write intentions/inspections in LivePlugin. One is `registerIntention()` and `registerInspection()` functions which will register intention/inspection on execution and unregister when `pluginDisposable` is disposed. And another is `// depends-on-plugin plugin-id` instruction which can be added after imports and tells LivePlugin to add dependency on a plugin which is not part of core IDE API. The rest is just standard IntelliJ API for working with PSI.

The example below shows a simplistic Kotlin inspection which replaces "OMG" with "🙀" inside string literals. Its `isAvailable()` function will be called on the current PSI element in the editor and if it returns `true`, the intention will be displayed in the light bulb popup menu. When invoked, the intention uses `KtPsiFactory` to construct a string literal PSI node from `newText` and replaces the current element with it. Note that unlike the "Random Case" action example above, PSI transformation doesn't need `WriteAction` or undoable command because it's already done in its superclass `PsiElementBaseIntentionAction`.
<kotlin>
// depends-on-plugin org.jetbrains.kotlin

registerIntention(object : PsiElementBaseIntentionAction() {
    override fun isAvailable(project: Project, editor: Editor?, element: PsiElement) =
        element.parentOfType&lt;KtStringTemplateExpression>() != null 
            && element.text.contains("OMG")

    override fun invoke(project: Project, editor: Editor?, element: PsiElement) {
        val newText = element.text.replace("OMG", "🙀")
        val newElement = KtPsiFactory(element).createLiteralStringTemplateEntry(newText)
        element.replace(newElement)
    }

    override fun startInWriteAction() = true
    override fun getText() = "Replace with 🙀"
    override fun getFamilyName() = "Hello"
})
</kotlin>

Similarly, we can define an inspection which finds "!!" in string literals and replaces it with "💥". Inspections have a different API which instead of returning a boolean, registers a "problem" with a suggested quick fix, but conceptually it's quite similar to intention.
<kotlin>
// depends-on-plugin org.jetbrains.kotlin

registerInspection(object : AbstractKotlinInspection() {
    override fun buildVisitor(holder: ProblemsHolder, isOnTheFly: Boolean): PsiElementVisitor {
        return expressionVisitor { expression: KtExpression ->
            if (expression is KtStringTemplateExpression && expression.text.contains("!!")) {
                holder.registerProblem(expression, "Found !!", MyQuickFix())
            }
        }
    }
    override fun getShortName() = "Usage of !!"
    override fun getDisplayName() = "Usage of !!"
    override fun getGroupDisplayName() = "Hello"
    override fun isEnabledByDefault() = true
})

inner class MyQuickFix: LocalQuickFix {
    override fun applyFix(project: Project, descriptor: ProblemDescriptor) {
        val element = descriptor.psiElement
        val newText = element.text.replace("!!", "💥")
        val newElement = KtPsiFactory(element).createExpression(newText)
        element.replace(newElement)
    }
    override fun getName() = "Replace with 💥"
    override fun getFamilyName() = "Hello"
}
</kotlin>


### IntelliJ APIs mini cheat sheet
There is an obvious and a very reasonable question of how you can find which functions or classes to use. Or, in other words, given a blank screen, how do you figure out what to type? Just like with any other large code base there is no simple answer. 

LivePlugin wraps some of IDE APIs, so you can check what is available in the `liveplugin` package and `liveplugin.PluginUtil` class (this is a Groovy class, but it can be used from Kotlin). The simplest way is to type `liveplugin.` and use auto-complete.

You can explore IntelliJ platform source code on GitHub, [Upsourse] or clone and explore it locally: `git clone https://github.com/JetBrains/intellij-community.git`. One useful code exploration strategy is to find existing IDE functionality which does almost what you want to do or is likely to use the API you're interested in. You can then find source code and see how it actually works. If some functionality is presented in the user interface, you can search for the text you see on the screen as a way to find an entry point into the code.

Finally, it is useful to read [IntelliJ Platform SDK docs] and be familiar with common IDE APIs. Below I listed APIs which I found useful in the form of a mini cheat sheet, but it is by no means exhaustive or complete.

"Core" classes:
- [Application] - core application-wide functionality and methods for working with threads
- [MessageBus] - subscribe/publish messaging infrastructure
- [Project] - represents project in IDE, used in many APIs for project-specific functionality
- [ProjectManager] - open/close/get list of projects (see also [ProjectManagerListener])
- [DumbAware] - marker interface for actions and tool windows that can work while indices are being updated

Actions:
- [AnAction] - all user interactions are performed through actions (see also EditorAction)
- [ActionManager] - register/unregister/find actions
- [IntentionAction] - interface for intention actions
- [IntentionManager] - register/unregister intentions

Editing files:
- [Editor] - represents an instance of text editor (see also [FileEditorManager])
- [CaretModel] - caret(s) position in editor
- [SelectionModel] - text selection(s) in editor
- [MarkupModel] - custom text range highlighting, markers on the gutter, etc
- [FoldingModel] - custom text range folding
- [Document] - represents the contents of a text file loaded into memory and possibly opened in a text editor
  (see also [FileDocumentManager] and [IntelliJ Platform SDK docs](https://plugins.jetbrains.com/docs/intellij/documents.html))
- [VirtualFile] - represent a file on disk, in archive, HTTP server, etc.
  (see also [VirtualFileSystem], [VirtualFileListener], [VirtualFileManager] and [IntelliJ Platform SDK docs](http://www.jetbrains.org/intellij/sdk/docs/basics/architectural_overview/virtual_file.html))

Syntax tree:
- [PsiElement] - common base interface for all PSI elements (see also [IntelliJ Platform SDK docs](https://plugins.jetbrains.com/docs/intellij/psi-files.html))
- [PsiFile] - PSI element representing a file
- [PsiManager] - gets PsiFile for VirtualFile
- "PsiUtil" classes - misc methods for PSI manipulation

UI components:
- [Messages] - various yes/no/ok/cancel and basic input dialogs
- [DialogBuilder] - builder for custom dialogs
- [ToolWindowManager] - get registered tool windows, balloon notification for tool windows
- [ToolWindowFactory] - creates tool windows
- See also [User Interface Components IntelliJ Platform SDK page](https://plugins.jetbrains.com/docs/intellij/user-interface-components.html)

Other interesting APIs:
- com.intellij.codeInsight.completion.CompletionContributor
- com.intellij.lang.LanguageExtension
- com.intellij.patterns.PsiElementPattern (and com.intellij.patterns.PlatformPatterns, com.intellij.patterns.StandardPatterns)
- com.intellij.psi.util.PsiUtilCore


### Final thoughts
If writing plugins/extensions at runtime is such a good idea, why is it not more widespread? This is the question I ask myself and one of the answers I have is that this might be a [chicken and egg problem](https://en.wikipedia.org/wiki/Chicken_or_the_egg). There is a stereotype that creating an editor or IDE plugin/extension is really hard and advanced, so very few people actually try it. Editor/IDE developers correctly conclude that there isn't a lot of demand, so they don't see the need to make plugin/extension development easier. The development experience remains difficult, and reinforces the stereotype of plugin development being hard, so nothing really happens.

There are some inherently difficult problems related to plugin development at runtime which I didn't mention above. One is the state migration between plugin reloads. In dynamic languages like Groovy the new "version" of plugin can use objects from the previous "version" as long as they have the same shape (old objects will prevent old classloader and classes from being garbage collected, which is a "small" memory leak, but at least it will work). In strongly typed languages like Kotlin, it's even harder because classes from different classloaders are incompatible even if their API and implementation are identical. So the solution is to use serialisation/deserialisation which is a problem of its own.

Another difficulty is creating a good API for extending IDE functionality. Ideally, it should cover the areas which are most likely to be extended by users. It should be discoverable, reusable and designed for reloadability. On top of that, just like with any other published API used by many users, once it's public, it might be difficult to evolve. This is a really hard problem, and I don't claim that LivePlugin solves it.

There are a lot of benefits though. One is "outsourcing" IDE features to users, so instead of creating feature requests and waiting for them to be completed (if ever), users could add the functionality themselves. Some user interfaces naturally evolve into a complex conditional configuration anyway. For example, `Run Configuration` has options to run other tasks before/after the current task and many other options which could be expressed via some API instead of a complex user interface. Another benefit is customisation specific to a particular project or library. The simplest automation is to run project-specific scripts in the context of the currently open file or selected text. More advanced uses might include navigation or code completion specific to a library/framework. This is in the territory of traditional plugins and the point here is that if plugin development is easy enough, then it might reach a point when it's a cultural norm to create a plugin with library, framework or project support. To be fair, it might be too much to ask for example, for a Python project, but it seems more reachable for Kotlin. There is one major platform targeting Kotlin development, so having a standard practice of creating tailored plugins is achievable within the Kotlin community. To be precise, there is IntelliJ IDEA and there is now [Fleet](https://www.jetbrains.com/fleet) editor by Jetbrains which supports Kotlin. But Fleet backend is still based on IntelliJ and is likely to be compatible with existing plugins. And the Fleet frontend might be a good chance to explore the minimal most useful user-facing API for both Fleet and IntelliJ. Very exciting times for the ultimate power of custom plugins 🎉


[IntelliJ Platform SDK docs]: https://plugins.jetbrains.com/docs/intellij/welcome.html

[Upsourse]: https://upsource.jetbrains.com/idea-ce/structure/HEAD
[Application]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/application/Application.java
[MessageBus]: https://github.com/JetBrains/intellij-community/blob/master/platform/extensions/src/com/intellij/util/messages/MessageBus.java
[Project]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/project/Project.java
[ProjectManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/projectModel-api/src/com/intellij/openapi/project/ProjectManager.java
[ProjectManagerListener]: https://github.com/JetBrains/intellij-community/blob/master/platform/projectModel-api/src/com/intellij/openapi/project/ProjectManagerListener.java
[DumbAware]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/project/DumbAware.java

[AnAction]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/actionSystem/AnAction.java
[AnActionEvent]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/actionSystem/AnActionEvent.java
[ActionManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/actionSystem/ActionManager.java
[IntentionAction]: https://github.com/JetBrains/intellij-community/blob/master/platform/analysis-api/src/com/intellij/codeInsight/intention/IntentionAction.java
[IntentionManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/analysis-api/src/com/intellij/codeInsight/intention/IntentionManager.java


[Editor]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/Editor.java
[CaretModel]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/CaretModel.java
[SelectionModel]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/SelectionModel.java
[MarkupModel]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/markup/MarkupModel.java
[FoldingModel]: https://github.com/JetBrains/intellij-community/blob/master/platform/editor-ui-api/src/com/intellij/openapi/editor/FoldingModel.java
[FileEditorManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/analysis-api/src/com/intellij/openapi/fileEditor/FileEditorManager.java
[Document]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/editor/Document.java
[FileDocumentManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/fileEditor/FileDocumentManager.java
[VirtualFile]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/vfs/VirtualFile.java
[VirtualFileSystem]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/vfs/VirtualFileSystem.java
[VirtualFileListener]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/vfs/VirtualFileListener.java
[VirtualFileManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/openapi/vfs/VirtualFileManager.java

[PsiElement]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/psi/PsiElement.java
[PsiFile]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/psi/PsiFile.java
[PsiManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/core-api/src/com/intellij/psi/PsiManager.java

[ProjectRootManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/projectModel-api/src/com/intellij/openapi/roots/ProjectRootManager.java
[ModuleManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/projectModel-api/src/com/intellij/openapi/module/ModuleManager.java
[ModuleRootManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/projectModel-api/src/com/intellij/openapi/roots/ModuleRootManager.java

[Messages]: https://github.com/JetBrains/intellij-community/blob/master/platform/platform-api/src/com/intellij/openapi/ui/Messages.java
[DialogBuilder]: https://github.com/JetBrains/intellij-community/blob/master/platform/platform-api/src/com/intellij/openapi/ui/DialogBuilder.java
[ToolWindowManager]: https://github.com/JetBrains/intellij-community/blob/master/platform/platform-api/src/com/intellij/openapi/wm/ToolWindowManager.kt
[ToolWindowFactory]: https://github.com/JetBrains/intellij-community/blob/master/platform/platform-api/src/com/intellij/openapi/wm/ToolWindowFactory.java
