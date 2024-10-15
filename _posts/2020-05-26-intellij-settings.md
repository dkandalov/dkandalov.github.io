---
permalink: intellij-settings
---

For the benefit of anyone interested and as a reference for myself, here are some of the IntelliJ and related macOS settings I normally use. This page will be occasionally updated on new IntelliJ releases and changes in my preferences. 

Last updated on 15th October 2024 for IntelliJ version `2021.2.4`.

### Settings
 - disable `Main Menu > View > Appearance > Navigation Bar`
 - in `Editor > General`
     - enable `Smart Keys > Use "CamelHumps" words`
     - disable `Smart Keys > Honor "CamelHumps" words on double click`
     - disable `Smart Keys > Surround selection on typing quote or brace`
     - disable `Appearance > Show intention bulb`
     - disable `Breadcrumbs > Show breadcrumbs`
     - disable `Rich-Text Copy > Copy as rich text`
 - in `Editor > Code Editing`
     - disable `Highlight on Caret Movement > Usages of element at caret`
     - disable `Show quick documentation on hover`
 - in `Editor > Inlay Hints`
     - enable all, and then disable with `Toggle Inlay Hints Globally` <br/>
       (which with a shortcut is a better way show hint on-demand)
 - in `Appearance & Behavior > Appearance`
     - disable `Smooth scrolling` (so that the scrolling position is on the border between lines)
     - disable `System Settings > Updates > Show What's New in the editor after an IDE update`  
 - in `Version Control > Git`
     - set `Update method` to `Rebase`
     - enable `Use credential helper` — don't save passwords in IDE ([IDEA-211251](https://youtrack.jetbrains.com/issue/IDEA-211251))
 - in `Advanaced Settings`
     - enable `User Interface > Position mouse cursor on default button in dialogs`
     - disable `User Interface > Use native faile chooser dialog on Windows/macOS` — because IntelliJ file chooser dialog is just better
     - enable `Version Control > Toggle commit controls`
     - disable `Version Control > Enable Commit tool window`

### Registry
Use `Find Action` and search for "Registry...":
 - disable `ide.allow.merge.buttons` — <br/>
   don't merge buttons in VCS dialogs (see [IJPL-87262](https://youtrack.jetbrains.com/issue/IJPL-87262), [IJPL-80718](https://youtrack.jetbrains.com/issue/IJPL-80718), etc.)
 - disable `light.edit.file.open.enabled` — <br/>
   because light editor it's not ready yet (see [IDEA-236868](https://youtrack.jetbrains.com/issue/IDEA-236868))
 - enable `analyze.exceptions.on.the.fly` — <br/>
   automatically analyze clipboard content for stacktrace on IDE frame activation
 - enable `ide.completion.delay.autopopup.until.completed` — <br/>
   deterministic auto-completion results (see [KT-29042](https://youtrack.jetbrains.com/issue/KT-29042))
 - disable `debugger.valueTooltipAutoShow` — no debugger tooltip on mouse over
 - disable `show.live.templates.in.completion` (see [IDEA-216928](https://youtrack.jetbrains.com/issue/IDEA-216928))
 - increase `undo.globalUndoLimit` and `undo.documentUndoLimit`
 - enable `toolwindow.disable.overlay.by.double.key` — <br/>
   because when using `alt+...` shortcuts (e.g. with [IJKL shortcuts plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin)) 
   it can be annoying in presentation mode to accidentally open tool window overlay (see [IDEA-112097](https://youtrack.jetbrains.com/issue/IDEA-112097))
 - enable `vcs.background.commit.checks` — perform commit checks in background
 - disable `ide.switcher.tool.window.list` and `ide.recent.files.tool.window.list` — hide tool windows from switcher and recent file popups (see [IDEA-131137](https://youtrack.jetbrains.com/issue/IDEA-131137))

### Keymap
 - reassign `F1` to [QuickFix plugin](https://github.com/dkandalov/quick-fix)
 - use [IJKL shortcuts plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin) for navigation
 - use `alt+\` for "Show Context Menu" (right click menu)
 - use `cmd+2` for Git tool window
 - use `cmd+M` for "Scroll to Center"
 - use `cmd+shift+G` for "Execute Gradle Task"
 - assign a shortcut to `Window > Notifications > Close First / Close All` (see [IDEA-218434](https://youtrack.jetbrains.com/issue/IDEA-218434))

### macOS
 - disable accents `defaults write -g ApplePressAndHoldEnabled -bool false`
 - max values for `Preferences > Keyboard > Key Repeat / Delay Until Repeat`
 - map CapsLock to Control in `Preferences > Keyboard > Modifier Keys...`
 - disable shortcuts in `Preferences > Keyboard > Shortcuts` which clash with IntelliJ, e.g. `cmd+shift+/`
 - disable option-space, see [https://superuser.com/questions/78245](https://superuser.com/questions/78245)
 