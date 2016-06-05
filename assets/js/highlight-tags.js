// The main reason for this function is that highlightjs needs "pre" and "code" tags.
// This is verbose and it doesn't trim content of "code" tag so the first line 
// has to be after the tag and this looks ugly. 
function transformLanguageToCodeTagsOnLoad(hljs) {
    document.addEventListener("DOMContentLoaded", function(event) {
        var languages = ["groovy", "kotlin", "java"];
        languages.forEach(function(language) {
            $.each($(language), function(n, it) {
                var element = $(it);
                element = element.replaceWith(
                    "<pre><code class='code'>" + element.html().trim() + "</code></pre>"
                );
            });
        });

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        }); 
    });
}