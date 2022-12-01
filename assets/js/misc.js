// The main reason for this function is that highlightjs needs "pre" and "code" tags.
// This is verbose and it doesn't trim content of "code" tag so the first line 
// has to be after the tag and this looks ugly. 
function transformLanguageToCodeTagsOnLoad(hljs) {
	document.addEventListener("DOMContentLoaded", function() {
		const languages = ["groovy", "kotlin", "java", "lua", "javascript", "scheme", "x86asm", "plain-text"];
		languages.forEach(function(language) {
			$.each($(language), function(n, it) {
				if (language === "plain-text") language = "plaintext"; // Rename so that there is no clash with plaintext html tag.
				let element = $(it);
				element.replaceWith(
					"<pre><code class='" + language + "'>" + element.html().trim() + "</code></pre>"
				);
			});
		});
		hljs.configure({tabReplace: '    '});
		hljs.initHighlighting();
	});
}

function isDarkTheme() {
	let theme = localStorage.getItem('theme');
	return theme === 'dark' || (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function toggleTheme() {
	if (isDarkTheme()) {
		localStorage.setItem('theme', 'light');
	} else {
		localStorage.setItem('theme', 'dark');
	}
	window.location.reload();
	return false;
}

function appendStylesheet(href) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = href;
	document.head.appendChild(link);
}