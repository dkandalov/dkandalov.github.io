---
draft: true
permalink: live-plugin
---

Pretty much all modern web browsers have [developer tools console](https://en.wikipedia.org/wiki/Web_development_tools) which lets you type some javascript code and run it within the browser. And at least in theory this allows you to do any kind of automation and extend browser functionality at runtime using javascript. In practice, it doesn't seem that developing browser extensions at runtime in developer console is a thing (as far as I know) and that's a question for people who design browser APIs. To be fair, most browser users are probably not even aware of the developer console so spending extra effort on developer experience might not be justified.

It's a different situation if we talk about code editors and IDEs where most users are software developers. In this case it would make sense to make extending editor/IDE functionality and some kind of automation as easy as possible. Surprisingly, this is not the case and even the most recent code editors based on electron (i.e. it uses chromium for UI) don't make developing extensions at runtime particularly easy. It's a shame, and it would be great if the situation changes, however living mostly in the JVM world, I'm interested in java-friendly IDEs and in particular IntelliJ IDEA. You might think that if developing extensions at runtime was not done in javascript environments, it would be even harder on JVM, and you would be wrong. 

In this blog I will go through the details of [LivePlugin](https://github.com/dkandalov/live-plugin) - a plugin for extending IntelliJ IDEs functionality at runtime without IDE restarts using Kotlin (or Groovy). For obvious reasons it's focused on IntelliJ-based IDEs and mentions some JVM-specific details but overall ideas could be applicable in other editors and environments.

### Why?
- **Minimal setup** — no need to create a separate project for plugin development.
- **Fast feedback loop** — plugins are executed without IDE restart.
- **Usable IDE API** — LivePlugin has a small API with entry points for common IDE APIs.

### What does it look like?
Open any project in IDE and notice that there is a panel called `Plugins`. It contains a list of folders with plugins source code. By convention `plugin.kts` or `plugin.groovy` files are entry points for plugin execution. To get started, you can select "hello-world" plugin and press the green `Run Plugin` button to compile and run the plugin. (LivePlugin comes with few example plugins some of which, including "hello-world", are installed by default.)

![](/assets/images/liveplugin/0.png)

The IDE should display a notification messages. If the messages disappear after some time, or you just missed them, they should still be available in the `Event Log` tool window. (It is also possible that something goes wrong. In this case, please feel free to get in touch for example via [GitHub issues](https://github.com/dkandalov/live-plugin/issues).)

[img]()

The next thing to try is modifying the plugin code. You can expand the plugin folder and double-click (or press `Enter`) on `plugin.kts` to open editor. You can, for example, change the message of the first notification and comment out the rest of the code.

[img]()

If you're using IntelliJ IDEA or Android Studio, and have Kotlin plugin installed, all the standard IDE features like intentions to import classes, auto-completion and navigation should work out-of-the-box in the plugin code. Other IntelliJ IDEs are not compatible with Kotlin plugin and will only have a basic syntax highlighting.

[img]()

LivePlugin is bundled with its source code, so if you have Kotlin plugin, you should be able to navigate, for example, to the definition of `show()` function. (Unfortunately, even though there is auto-complete for IntelliJ API, it doesn't come with the source code.)

[img]()

For completeness, you can also try writing syntactically invalid code or throw and exception from the script and see how it fails.

[img]()

There are couple more details about running plugin scripts but, overall, you're just running code in the same JVM instance in which IDE is running, so you have access to all IDE classes and objects. You can find more by following notes in the bundled examples starting from "hello-world".


### How does it work?
The overall picture is not very complicated:
 - compile Kotlin script code into `.class` files
 - create a new classloader (which knows about compiled and IDE classes)
 - using the new classloader, find the script class and reflectively invoke it

This sounds simple but few important details at each step. In the first place, where do you get the compiler? As far as I know, at the moment all IntelliJ IDEs come with a Kotlin compiler jar. But it's not clear if it will be always the case, and it's hard to know when Kotlin version is going to be updated potentially making thing incompatible, so LivePlugin is bundled with its own Kotlin compiler. Another important question is how to compile a script which interacts with IDE API, i.e. the compiler needs to know about a bunch of IDE classes. Luckily, since the script is written inside an IDE, the IDE classes are already available in the current instance of an IDE. This is limiting in a sense that you cannot write code for an older/newer version of the IDE, but most of the time it's not a problem and makes setup much easier. 

It might seem a bit strange why would you want to create a new classloader each time you execute a script. The answer is that new classloader needed not for loading or executing classes, but for unloading classes from the previous script executions. If you're familiar with JVM classloaders (or used OSGi), then it's safe to skip the rest of the paragraph. Otherwise, here is a quick explanation. Classloaders are the "magic" classes which can bring more classes into existence by reading bytecode from disk, network or maybe even by generating bytecode. Classloader form a [hierarchy](https://docs.oracle.com/cd/E19501-01/819-3659/beadf/index.html) in which children can see classes from their parents, but not the other way round. For example, the script classloader can see `com.intellij.openapi.project.Project` classes from IDE classloader and can see `java.lang.String` from the JVM bootstrap classloader. Classloaders can only load classes with unique names, so the script classloader won't be able to load another `java.lang.String` class. On the other hand, sibling classloaders don't see each other's classes, so two leaf classloaders can both load `my.project.Foo` class at the same time. From that point of view, classloaders are just like namespaces. Finally, when there are no more references to the objects created from classloader classes and there are no references to the classloader itself, all of them are garbage collected. And this is the main reason for having a new classloader for each script execution.

The final step is executing the script. At the JVM level, Kotlin script is really just a class which can be instantiated with some parameters. Just like any other plugin it has access to all objects in the IDE JVM, so it is possible to implement any functionality from other plugins or IDE itself. Scripts executed via LivePlugin have a different and much simpler lifecycle compared to normal plugins. There are two steps which are essentially are initialisation and disposal (so calling this a "lifecycle" sounds more sophisticated than it really is). During the initialisation step the script class is instantiated which executes code in `plugin.kts` file. This happens on the event dispatch thread (EDT) so it is safe to modify IDE state (as described in the IntelliJ [threading rules](https://plugins.jetbrains.com/docs/intellij/general-threading-rules.html?from=jetbrains.org)). On the other hand, this means that if there is an intense calculation or a `Thread.sleep()` call invoked direct in the script, this will freeze IDE UI. This is all there is to it to initialisation. If you want to extend IDE functionality by, for example, adding some actions, it's up to you to invoke specific functions that can do it in the script code, i.e. there is no special syntax or some xml/jsom/yml file with configuration. It's all just Kotlin code.

The second step in the LivePlugin script lifecycle is disposal. Each time LivePlugin executes a script, it creates a new `pluginDisposable` object (of type `com.intellij.openapi.Disposable`) and passes it into the script. When the script is unloaded or the script is being executed again, `pluginDisposable` object is disposed. There is no magic here and `pluginDisposable` will not know how to do the cleanup unless it's used in the script. For example, you might want to register a project listener to get notified when IDE projects are opened or closed. If you add a new listener each time the script is executed, then after few cycles of modifying script code and running it, you'll end up with multiple project listeners. To solve the problem, you can pass `pluginDisposable` when registering a listener so that the old listener is removed before the script is executed again: `registerProjectListener(pluginDisposable, listener)`.

### Notifications, logging, basic input
Being able to show notifications or print messages is one of the most fundamental ways to get feedback when using LivePlugin. There is no way to debug plugins with breakpoints because there is only one instance of the JVM. And although in theory you could test-drive all plugin functionality, in practice, many APIs are not very TDD-friendly. So notifications are the most basic way to know why something is (not) working.

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
Where `message` is an object which will be converted to a string; `title`, as you can guess, is a title of the message; `groupDisplayId` is a string id which can be configured in `Event Log` settings so that for example IDE plays a sound on events with a particular group id; `notificationListener` is callback invoked when user clicks on hyperlinks in the HTML formatted message. (Note that the support for basic HTML formatting and hyperlink callbacks are really just part of IntelliJ notification API which is pretty cool 😎)

If the notification message is too long, IDE will not show the whole content of the message. In this case, you can use `showInConsole()` function which crates and opens a tool window with the specified text. It's extension function on the `Project` object which you can get as a part of the script context or via standard IDE API (e.g. from `AnActionEvent` in an action callback):
<kotlin>
project?.showInConsole(
    message = "a really long message, or maybe even a stacktrace",
    consoleTitle = "Some title",
    contentType = ERROR_OUTPUT
)
</kotlin>

Arguably, using notifications and tool windows for what is essentially logging is not ideal. There is a logging API based on `com.intellij.openapi.diagnostic.Logger` which works pretty much as expected appending messages to the IDE log file. And if you want something really simple, you can always use `println()` which writes to stdout and ends up in the IDE log:
<kotlin>
val logger = Logger.getInstance("MyPlugin")
logger.info("info message")
logger.warn("warn message")
logger.error("error message") // Will log and show error notification in IDE.
println("info message")
</kotlin>

Finally, there are couple Kotlin functions in the `com.intellij.openapi.ui` package and quite a few static functions in the `com.intellij.openapi.ui.Messages` Java class for basic UI dialogs:
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
Actions are one of the most fundamental ways of user input. All menu items, editor actions (e.g. moving cursor) and anything you can assign a shortcut in `Settings -> Keymap` is an action. Actions are essentially stateless functions which can be presented in UI and produce side effects when invoked. Once registered in the IDE, action becomes available in all projects and will be invoked when user clicks on a menu item, uses corresponding shortcut or, for example, chooses action in the `Find Action...` action. Actions are executed on the UI thread, so long-running tasks must be done in the background to avoid freezing UI.

All actions need to implement `com.intellij.openapi.actionSystem.AnAction` abstract class which is not difficult to do, but to make it a bit easier, LivePlugin has `registerAction()` function with lambda as a callback. In the simplest form it looks like this (the new action will appear in `Find Action...` list, where it can be invoked):
<kotlin>
registerAction("Show Project Name") { 
    show(it.project?.name) 
}
</kotlin>
Since there is a `registerAction()`, it would be reasonable to expect `unregisterAction()` function. There isn't one though. The reason is that unregistering actions and other callbacks is essentially resource cleanup and done by passing an instance of `com.intellij.openapi.Disposable`. In the example above, disposable is passed as part of `LivePluginScript` object which is an extension function receiver of `registerAction()`. In a more explicit form, each plugin execution has its own instance of `pluginDisposable` which can be passed to various APIs, e.g. this is a more verbose form of registering action:
<kotlin>
registerAction("Show Project Name", disposable = pluginDisposable) {
    show(it.project?.name)
}
</kotlin>
When plugin is rerun or unloaded (via `Unload Plugin` button in the `Plugins` tool window), `pluginDisposable` is disposed unregistering actions and freeing other resources. You can test it by unloading the plugin and checking that the action disappeared from the `Find Action...` list. To be clear, `pluginDisposable` is specific to LivePlugin and exists mainly for plugin reload, but the overall mechanism is a common method of resource de-allocation in IntelliJ APIs.

There are few more useful details about actions which can be illustrated by expanding on the example above:
<kotlin>
registerAction(
    id = "Show Project Name",
    keyStroke = "ctrl alt shift PERIOD",
    actionGroupId = "ToolsMenu"
) { actionEvent: AnActionEvent ->
    show(actionEvent.project?.name)
}
</kotlin>
- Here `id` is the action id which must be unique within IDE. For convenience, it's also used by `registerAction()` as text representation of the action and should be capitalised.
- Keyboard `keyStroke` to invoke the action, where modification keys are lowercase ("ctrl", "alt", "shift", "cmd"), letters are uppercase, and other keys are uppercase based on the constant names in `java.awt.event.KeyEvent` (e.g. "ENTER", "ESCAPE", "SPACE", "LEFT", "UP", "F1", "F12"). See also javax.swing.KeyStroke.getKeyStroke javadoc.
- `actionGroupId` which is a string identifying a menu/popup/toolbar to which action will be added. Unfortunately, there is no single place to find all these ids, but there are common menu ids listed in `liveplugin.ActionGroupIds` object.
- Instance of `AnActionEvent` with invocation "context" which passed into the lambda. This is usually how actions know about the project, editor or UI component in which they were invoked.

The `registerAction()` is part of LivePlugin and uses lambda just for convenience. It's entirely legal to implement `AnAction` abstract class from IntelliJ API. Creating subclass of `AnAction` is a bit more effort, but it also has more configurability. For example, you can specify action icon or configure if action is enabled/disabled in the current context.
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

Even though LivePlugin comes with some helper functions, you don't have to use any of them. Instead of `registerAction()`, you can use IJ API which can register actions. The problem is that this particular API is used by IDE to add actions from xml config files, and unlike newer APIs doesn't support `Disposable`s.
<kotlin>
val actionManager = com.intellij.openapi.actionSystem.ActionManager.getInstance()
actionManager.registerAction("action id", action)
</kotlin>

Finally, since actions are just like functions, it's natural to ask if actions can invoke other actions. The answer is "yes". The caveat is that you need to look up or create `AnAction` and `AnActionEvent` objects. Some actions have simple constructors, so it might be easy to just create a new instance. Some might not be public or hard to construct. In this case, they can be looked up via `ActionManager.getAction(actionId)`. The easiest way to get an instance of `AnActionEvent` is to pass on `event` argument from already invoked action (if you absolutely need to construct one, see `liveplugin.implementation.Actions#anActionEvent()`):
<kotlin>
registerAction("Invoke Another Action") { event ->
    val action = ActionManager.getInstance().getAction("ToggleBookmark1")
    action.actionPerformed(event) // Will bookmark the current line
}
</kotlin>

### Action groups
Actions can be grouped into action groups which are actions themselves. The main reason for creating action groups is that it's a good way to present a bunch of actions in UI as a submenu or a popup window.

Action groups implement `com.intellij.openapi.actionSystem.ActionGroup` class, and the simplest way to create a group is by instantiating `DefaultActionGroup` class. However, when used as a menu item it will add all actions without sub-menu, unless `isPopup` property set to `true` (for this reason there is `liveplugin.PopupActionGroup()` which does exactly that).
<kotlin>
val action1 = registerAction("Action 1") { show("1") }
val action2 = registerAction("Action 2") { show("2") }
registerAction(
    id = "Some Actions",
    actionGroupId = ActionGroupIds.EditorPopupMenu,
    action = DefaultActionGroup(action1, action2).also { it.isPopup = true }
)
</kotlin>

Another option of displaying action group is a popup window. LivePlugin comes with `createPopup()` extension function which has few useful default parameters and uses `JBPopupFactory` under the hood. Note that there is a special `Separator` action in IJ API which represents a separator in the menu.
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

All of the above is straighforward but there are few subtle things worth being aware of when using actions in groups. One is that __actions should not share `AnActionEvent`s between each other__. For example, in code snippet below, "action 1" is using `event` from the outer "Show Action Group" action. This is wrong. The reason is that events capture the content in which action was invoked, and this context might change by the time another action is invoked. Even if you're sure that sharing an event will be fine, in some cases IDE checks if there was a shared event and will display an error. Another caveat is that when creating a popup, we do want to pass some of the context to actions in the popup window via `event.dataContext`, otherwise, in the example below "action 2" will not know what the current file is.
<kotlin>
registerAction("Show Action Group") { event: AnActionEvent ->
    PopupActionGroup(name = "Some Actions",
        AnAction("action 1") { show(event.virtualFile?.path) },
        AnAction("action 2") { show(it.virtualFile?.path) }
    ).createPopup(event.dataContext)
     .showCenteredInCurrentWindow(event.project!!)
}
</kotlin>

Actions and action groups is the lowest hanging fruit in terms of the plugin development. Even with this minimal IDE integration there are few useful things the can be done by sharing bookmarks and various automation, e.g. via http requests and execution of shell scripts. I will not explain the examples below in details because they are roughly based on the examples bundled with LivePlugin. It's worth noting though that it's possible to use third-party libraries (e.g. [http4k](https://www.http4k.org) to make HTTP requests) and execute long-running tasks in the background without blocking UI thread.
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
Writing software is still mostly based on textual representation of code and even though IDEs can manipulate syntax tree, being able to programmatically control text editor can be quite useful. This can be achieved using `com.intellij.openapi.editor.Editor` and `Document` APIs. 

If you fee like experimenting with `Editor` API, one of the simplest ways might be to use current editor without any actions directly in the plugin script. The code below uses `caretModel` to move cursor to the beginning of the file and `selectionModel` to select all text:
<kotlin>
val editor = project?.currentEditor ?: error("No editor")
editor.caretModel.moveToOffset(0)
editor.selectionModel.setSelection(0, editor.document.textLength)
</kotlin>

However, as a motivating example, let's write "Random Case" action which will change letters of the current word to be randomly upper or lower case. I would normally write the code incrementally, manually testing each new piece of functionality. The first thing to check in the action is that document and editor are available. The following action will show a message when invoked in an editor but will not show notification if the focus is, for example, in the project view tool window.
<kotlin>
registerAction("Random Case", "ctrl alt shift PERIOD") { event ->
    val document = event.document
    val editor = event.editor
    if (document != null && editor != null) {
        show("Document and editor are available")
    }
}
</kotlin>

The next step is to get the word under the caret. The whole trick here is to use offset from `editor.caretModel` which represents shift in characters from beginning of the current file. There is always a potential for off-by-one errors on the edges around words and beginning/end of file but the code below seems to be good enough for the job.
<kotlin>
registerAction("Random Case", "ctrl alt shift PERIOD") { event ->
    val document = event.document
    val offset = event.editor?.caretModel?.offset
    if (document != null && offset != null) {
        val textAfter = document.text.drop(offset).takeWhile { it.isLetterOrDigit() }
        val textBefore = document.text.take(offset).takeLastWhile { it.isLetterOrDigit() }
        show(textBefore + textAfter)
    }
}
</kotlin>

Randomising letters is an easy task in Kotlin with the caveat that `Random` object has side effects and should be ideally passed in from outside so that it's possible to give it a seed and write an automated test for the action. 
<kotlin>
val text = (textBefore + textAfter)
    .map { if (Random.nextBoolean()) it.toUpperCase() else it.toLowerCase() }
    .joinToString(separator = "")
show(text)
</kotlin>

The final step is to update text in the document. It is a trivial thing to do using `Document.replaceString()` function which takes from/to offsets and a replacement string. However, if you run the code below, it doesn't modify the document but instead fails with _"Assertion failed: Write access is allowed inside write-action only (see com.intellij.openapi.application.Application.runWriteAction())"_.
<kotlin>
document.replaceString(
    offset - textBefore.length,
    offset + textAfter.length,
    text
)
</kotlin>

This happens because modifying state of a document without a write lock violates IntelliJ [Threading Rules](https://plugins.jetbrains.com/docs/intellij/general-threading-rules.html). I recommend reading the rules to understand the details, but overall the rules can be summarised by the following table, where `ReadAction` and `WriteAction` are classes with static `run(ThrowableRunnable)` method and in spite of the name are not related to `AnAction` class and IDE action system described in the section above (yes, naming is hard 🙈️).

|                   | Read       | Write       |
| ----------------- | -----------| ----------- |
| **UI thread**     | ✅         | WriteAction |
| **Other threads** | ReadAction | ❌          |
{:.post-table}

Since "Random Case" action code is executed on the UI thread, the  document modification code can be rewritten with `WriteAction`: 
<kotlin>
WriteAction.run(ThrowableRunnable {
    document.replaceString(
        offset - textBefore.length,
        offset + textAfter.length,
        text
    )
})
</kotlin>

Unfortunately, it still fails but this time with a different message _"IncorrectOperationException: Must not change document outside command or undo-transparent action. See com.intellij.openapi.command.WriteCommandAction or CommandProcessor"_. The reason is that there is [an additional rule](https://plugins.jetbrains.com/docs/intellij/documents.html#what-are-the-rules-of-working-with-documents) that document modification can only happen within an undoable command, meaning that the modification can be undone/redone and will be available the `Main Menu -> Edit -> Undo/Redo`. To make document modification code a bit less nested, LivePlugin comes with an extension function `executeCommand`, so the final code for the "Random Case" action looks like this:
<kotlin>
registerAction("Random Case", "ctrl alt shift PERIOD") { event ->
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