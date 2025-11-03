---
permalink: intellij-settings
---

For the benefit of anyone interested and as a reference for myself, here are some of the IntelliJ and related macOS settings I normally use. This page will be occasionally updated as IntelliJ and my preferences evolve. 

Last updated on 20th May 2025 for IntelliJ IDEA `2025.2 EAP`.

### Settings
- In `Main Menu > View > Appearance`
   - Enable `Navigation Bar > Don't Show`
   - Enable `Compact Mode`
   - Disable `Toolbar`
- In `Editor > General`
   - Disable `Appearance > Show intention bulb`
   - Disable `Breadcrumbs > Show breadcrumbs`
   - Enable `Smart Keys > Use "CamelHumps" words`
   - Disable `Smart Keys > Honor "CamelHumps" words on double click`
   - Disable `Smart Keys > Surround selection on typing quote or brace`
   - Disable `Rich-Text Copy > Copy as rich text`
   - Disable `Sticky Lines > Show sticky lines when scrolling`
   - Set `Editor Tab > Tab placement` to `None`
- In `Editor > Code Editing`
   - Disable `Usages of element at caret`
   - Disable `Show quick documentation on hover`
   - Set `The 'Next Error' action goes through` to `All problems`
- In `Editor > Inlay Hints`
   - Enable all, and then disable with `Toggle Inlay Hints Globally` action<br/>
     (optionally assign a shortcut to the action for a better to way show hints on-demand)
- In `Editor > Font` set `Size` to 15.0
- In `Appearance & Behavior > Appearance`
   - Disable `Smooth scrolling` (so that the scrolling position is on the border between lines)
   - Disable `System Settings > Updates > Show What's New in the editor after an IDE update`
- In `Version Control > Git`
   - Set `Update method` to `Rebase`
   - Enable `Use credential helper` — don't save passwords in IDE (see [IDEA-211251](https://youtrack.jetbrains.com/issue/IDEA-211251))
- In `Advanaced Settings`
   - Enable `User Interface > Position mouse cursor on default button in dialogs`
   - Disable `User Interface > Use native faile chooser dialog on Windows/macOS` — because IntelliJ file chooser dialog is just better
   - Enable `Version Control > Toggle commit controls`
   - Disable `Version Control > Enable Commit tool window`

### Registry
Invoke `Find Action` and search for "Registry...":
 - Disable `ide.allow.merge.buttons` — <br/>
   don't merge buttons in VCS dialogs (see [IJPL-87262](https://youtrack.jetbrains.com/issue/IJPL-87262), [IJPL-80718](https://youtrack.jetbrains.com/issue/IJPL-80718), etc.)
 - Disable `light.edit.file.open.enabled` — <br/>
   because light editor it's not ready yet (see [IDEA-236868](https://youtrack.jetbrains.com/issue/IDEA-236868))
 - Enable `analyze.exceptions.on.the.fly` — <br/>
   automatically analyze clipboard content for stacktrace on IDE frame activation
 - Enable `ide.completion.delay.autopopup.until.completed` — <br/>
   deterministic auto-completion results (see [KT-29042](https://youtrack.jetbrains.com/issue/KT-29042))
 - Disable `debugger.valueTooltipAutoShow` — no debugger tooltip on mouse over
 - Disable `show.live.templates.in.completion` (see [IDEA-216928](https://youtrack.jetbrains.com/issue/IDEA-216928))
 - Increase `undo.globalUndoLimit` and `undo.documentUndoLimit`
 - Enable `toolwindow.disable.overlay.by.double.key` — <br/>
   because when using `alt+...` shortcuts (e.g. with [IJKL shortcuts plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin)) 
   it can be annoying in presentation mode to accidentally open tool window overlay (see [IDEA-112097](https://youtrack.jetbrains.com/issue/IDEA-112097))
 - Disable `ide.switcher.tool.window.list` and `ide.recent.files.tool.window.list` — don't show tool windows in switcher and recent file popups (see [IDEA-131137](https://youtrack.jetbrains.com/issue/IDEA-131137))
 - Disable `project.tree.structure.show.url` to hide the path next to the project name in the Project tool window

### Keymap (based on "IntelliJ IDEA Classic")
- Use [IJKL shortcuts plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin) for navigation
- Assign `F1` to `Quick Fix` (see [QuickFix plugin](https://github.com/dkandalov/quick-fix)), remove it from `Context Help`
- Assign `alt+\` to `Show Context Menu` (i.e. the popup window displayed on the right click)
- Assign `alt+1` to `Project` tool window
- Assign `cmd+2` and `alt+2` to `Version Control` tool window
- Assign `cmd+9` to `Live Plugins` tool window (see [LivePlugin plugin](https://github.com/dkandalov/live-plugin))
- Assign `cmd+§` and `alt+§` (i.e. to the key left of `1`) to `Main Menu > View > Tool Windows`
- Assign `cmd+M` to `Scroll to Center`
- Assign `cmd+F4` to `Close Project`
- Assign `cmd+shift+G` to `Execute Gradle Task`
- Assign `cmd+ctrl+shift+P` to `Enter Presentation Mode`
- Assign `alt+shift+9` to `Put arguments/parameters on separate lines` intentions
- Assign `alt+shift+8` to `Put arguments/parameters on one line` intentions
- Assign `alt+shift+7` to `Add names to call arguments` and `Remove all argument names` intentions
- Assign `cmd+alt+H` to `Window > Notifications > Close First / Close All` (see [IDEA-218434](https://youtrack.jetbrains.com/issue/IDEA-218434))
- Assign `ctrl+d` to `Show Diff for Lines`
- Assign `ctrl+b` to `Version Control Systems > Git > Branches` popup window
- Remove `Markdown > Create Link` shortcut because it clashes with `Toggle Case`
- Remove `Increase/Decrease Font Size in All Editors` shortcuts

### macOS (Sonoma and above)
- Disable accents `defaults write -g ApplePressAndHoldEnabled -bool false`
- Max values for `Preferences > Keyboard > Key Repeat` and `Delay Until Repeat`
- Map CapsLock to Control in `Preferences > Keyboard > Modifier Keys...`
- Enable "Use scroll gesture with modifier keys to zoom" in <br/>
  `Preferences > Accessibility > Zoom` and select Control as the modifier key for gesture
- Select "Three-Finger Drag" as dragging style in <br/>
  `Preferences > Accessibility > Pointer Control > Trackpad Options...`
- Disable shortcuts in `Preferences > Keyboard > Shortcuts` that clash with IntelliJ (e.g. `cmd+shift+/`; there is usually a popup notification with the conflict after IDE install)
- Disable option-space, see [https://superuser.com/questions/78245](https://superuser.com/questions/78245)
 