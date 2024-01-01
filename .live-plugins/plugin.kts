import liveplugin.registerEditorAction

registerEditorAction("Escape angle brackets") { editor, _, _ ->
    val escapedText = editor.selectionModel.selectedText?.escape() ?: return@registerEditorAction
    editor.document.replaceString(
        editor.selectionModel.selectionStart,
        editor.selectionModel.selectionEnd,
        escapedText
    )
}

fun String.escape(): String =
    replace("<", "&lt;").replace(">", "&gt;")