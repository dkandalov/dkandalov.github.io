import liveplugin.registerEditorAction
import java.time.LocalDate
import java.time.format.DateTimeFormatter

registerEditorAction("Escape Angle Brackets") { editor, _, _ ->
    fun String.escape(): String =
        replace("<", "&lt;").replace(">", "&gt;")
    
    val escapedText = editor.selectionModel.selectedText?.escape() ?: return@registerEditorAction
    editor.document.replaceString(
        editor.selectionModel.selectionStart,
        editor.selectionModel.selectionEnd,
        escapedText
    )
}

registerEditorAction("Insert Current Date") { editor, caret, _ ->
    val formattedDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"))
    editor.document.insertString(caret.offset, "#### $formattedDate")
}