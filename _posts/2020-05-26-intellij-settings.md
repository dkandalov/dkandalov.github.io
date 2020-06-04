---
permalink: intellij-settings
---

As a reminder for myself and for the benefit of anyone else interested, here are some of my IntelliJ settings.
I intend to keep this page up-to-date with new settings and changes in my preferences. 

### IDE Settings
 - disable `Main Menu > View > Appearance > Navigation Bar`
 - in `Editor > General`
     - enable `Smart Keys > Use "CamelHumps" words`
     - disable `Smart Keys > Honor "CamelHumps" words on double click`
     - disable `Smart Keys > Surround selection on typing quote or brace`
     - disable `Appearance > Show intention bulb`
     - disable `Appearance > Smooth scrolling`
     - disable `Breadcrumbs > Show breadcrumbs`
     - enable `Rich-Text Copy > Plain text`
 - in `Editor > Code Editing`
     - disable `Highlight on Caret Movement > Usages of element at caret`
     - disable `Show quick documentation on mouse move`
 - in `Appearance & Behavior > Appearance`
     - enable `Automatically position mouse cursor on default button`
     - disable `Allow merging buttons on dialogs`

### IDE Registry
Use `Find Action` and search for "Registry...":
 - disable `ide.mac.file.chooser.native` — IJ file chooser dialog is just better
 - disable `light.edit.file.open.enabled` — <br/> 
   because light editor it's not ready yet (see [IDEA-236868](https://youtrack.jetbrains.com/issue/IDEA-236868))
 - enable `analyze.exceptions.on.the.fly` — <br/>
   automatically analyze clipboard content for stacktrace on IDE frame activation
 - enable `ide.completion.delay.autopopup.until.completed` — <br/>
   deterministic auto-completion results (see [KT-29042](https://youtrack.jetbrains.com/issue/KT-29042))
 - disable `debugger.valueTooltipAutoShow` — no debugger tooltip on mouse over
 - disable `git.reset.credential.helper` — don't save passwords in IDE ([IDEA-211251](https://youtrack.jetbrains.com/issue/IDEA-211251))
 - disable `show.live.templates.in.completion` (see [IDEA-216928](https://youtrack.jetbrains.com/issue/IDEA-216928))
 - configure `undo.globalUndoLimit` and `undo.documentUndoLimit`

### IDE Keymap
 - use [IJKL shortcuts plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin)
 - remove `F1` from keymap
 - use `cmd+2` for Git toolwindow
 - use `cmd+M` for "Scroll to Center"
 - use `cmd+shift+G` for "Execute Gradle Task"
 - assign a shortcut to `Window > Notifications > Close First / Close All` (see [IDEA-218434](https://youtrack.jetbrains.com/issue/IDEA-218434))

### OSX
 - disable accents `defaults write -g ApplePressNadHoldEnabled -bool false`
 - max values for `Preferences > Keyboard > Key Repeat / Delay Until Repeat`
 - map CapsLock to Control in `Preferences > Keyboard > Modifier Keys...`
 - disable shortcuts in `Preferences > Keyboard > Shortcuts` which clash with IntelliJ, e.g. `cmd+shift+/`
 - disable option-space, see [https://superuser.com/questions/78245](https://superuser.com/questions/78245)
 