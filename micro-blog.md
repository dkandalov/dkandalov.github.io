---
layout: post
permalink: /micro-blog/
---

#### 2023/09/29
The History of Cursor Keys [https://www.youtube.com/watch?v=BytowtVycc0](https://www.youtube.com/watch?v=BytowtVycc0) 
Fun to see all the crazy cursor keys layouts from the past. 
Although for software development I really prefer alt+IJKL, 
see [https://github.com/dkandalov/ijkl-shortcuts-plugin](https://github.com/dkandalov/ijkl-shortcuts-plugin) 
Everything else is suboptimal! 🙈

#### 2023/09/28
Most assertion libraries (in #Kotlin and other languages) reimplement language features (not, or, and, equals etc) 
and standard library (contains, isEmpty, etc). I wish there was more effort to make tools like 
[https://github.com/bnorm/kotlin-power-assert](https://github.com/bnorm/kotlin-power-assert) work really well.

#### 2023/09/27
To be fair, the previous example could use matcher composition where beSuccess() is not an expression 
(it will be type-safe with #Kotlin contracts). Thanks to [@sf105](https://mastodon.social/@sf105@mastodonapp.uk) for pointing that out.
<kotlin>
val items = listOf(...)
storage.upload(items) should beSuccess()
storage.listAll() should (beSuccess() and equalTo(items))
</kotlin>

#### 2023/09/26
A better example of `Result.expectSuccess()` used as an expression. 
If Result is treated like checked exception, it should be ok to handle it in any part of the test 🤔
<kotlin>
val items = listOf(...)
storage.upload(items).expectSuccess()
storage.listAll().expectSuccess() shouldEqual items
</kotlin>

#### 2023/09/25
Thinking about the example with `Result.expectSuccess()` a bit more complete test might look like this:
<kotlin>
val expected = random&lt;Foo&gt;()
val actual = Foo.parse(expected.toJson()).expectSuccess()
actual equalTo expected
</kotlin>
Which pushes one of the assertions into the "when" step 🤔

#### 2023/09/24
I wish more #Kotlin assertion libraries had assertion functions as expressions so that they could be chained. For example:
<kotlin>
result.expectSuccess() equalTo 123
httpResponse.expectStatus(OK).body.equalTo("{some json}")
</kotlin>

#### 2023/09/23
This is your regular reminder that pull requests is a waste when working with people you know and trust (e.g. same company). Here is a more detailed reasoning by [@d_stepanovic](https://mastodon.social/@d_stepanovic) [https://vimeo.com/842233600](https://vimeo.com/842233600) (thanks to [@quii](https://mastodon.social/@quii@mastodon.cloud) for the link) #pullrequest #programming #softwareengineering #coding

#### 2023/09/22
You might have noticed that most meetings and conferences follow the same pattern of one person talking and everyone else listening. (Ok, maybe enterprise "agile" made standups and retros more widespread.) But is it the only way for a group of people to collaborate or share information? Not at all! Welcome Liberating Structures 👉 [https://www.liberatingstructures.com/ls-me](https://www.liberatingstructures.com/ls-me)

#### 2023/09/21
Random #IntelliJ tip. There is "Show Gradle Daemons" action which shows daemons with pid, status, etc. and lets you stop them. It's not in any menu, but you can invoke it via "Find Action" (cmd+shift+A or ctrl+shift+A). As with most tips it's probably a UX failure... I mean an opportunity for improvement 🙈

#### 2023/09/20
Here is another basic function I wish was in #Kotlin stdlib
<kotlin>
inline fun &lt;T : Any, R&gt; T?.ifNotNull(f: (T) -> R): R? = this?.let(f)
</kotlin>

This is really just `?.let` but I think `ifNotNull` follows the Kotlin way by being more explicit.

#### 2023/09/19
Not many people consider this but CONSTANTS DON'T NEED TO BE UPPERCASE. They're not the most important thing in the code and don't need the emphasis (e.g. unlike mutable global variables). The convention dates back to the early days of C and the need to distinguish symbolic constants defined as macros from variables 👉 [https://accu.org/journals/overload/22/121/wakely_1923](https://accu.org/journals/overload/22/121/wakely_1923) It's never too late to stop the cargo cult! Can we have it in #Kotlin 2.0 please? 😅

#### 2023/09/18
One of the basic functions I wish was in #Kotlin stdlib (originally by Duncan McGregor)
<kotlin>
fun &lt;T&gt; T.printed(): T = apply { println(this) }
</kotlin>

So you can do `foo.update().printed()` without extracting a variable and using a separate line for println().

#### 2023/09/17
Rick Beato has a great [YouTube channel](https://www.youtube.com/@RickBeato). In particular, "What Makes This Song Great?" videos, e.g. [Metallica - “Master of Puppets” Breakdown](https://www.youtube.com/watch?v=5EOHKfoDyrI). I'm wondering if there is something similar for #software analysing/appreciating/criticising well-known projects. Should John Carmack or Dave Farley do it? 😅

#### 2023/09/16
Does the "Small advice" in [this talk](https://www.youtube.com/watch?v=eRWoTgYbUqM&t=1498s) mean that explicitly specifying return type for public functions will noticeably improve compiler/IDE speed? If yes, it sounds like an inspection 🤔 #Kotlin #IntelliJ 

There is "Public API declaration with implicit return type" inspection in "Kotlin->Other problems" disabled in the default profile. If it's really going to make difference and is recommended in general, should it be enabled then?

#### 2023/09/15
I'm pretty sure I read a few years ago that #Mastodon (social network) was named after Mastodon (a metal band). However, most articles I can find now are saying Mastodon (social network) was named after the animal. Does anyone know more of the backstory? [https://www.youtube.com/watch?v=s6WGNd8QR-](https://www.youtube.com/watch?v=s6WGNd8QR-)

#### 2023/09/14
Videos from JVM Language Summit 2023 [https://www.youtube.com/playlist?list=PLX8CzqL3ArzW90jKUCf4H6xCKpStxsOzp](https://www.youtube.com/playlist?list=PLX8CzqL3ArzW90jKUCf4H6xCKpStxsOzp) I enjoyed ["The Challenges of Introducing Virtual Threads to the Java Platform"](https://www.youtube.com/watch?v=WsCJYQDPrrE) 🙂

#### 2023/09/13
It might be the "old man yells at cloud" problem but many tools which are supposed to empower developers are achieving the opposite. More levels of indirection, more configs, slow pipelines, etc. instead of faster feedback loops (on faster modern hardware). There is a joke that k8s is a conspiracy by big tech to slow down the rest of the industry 😳

#### 2023/09/12
Here is the simplest way to implement any interface in #Kotlin 🙈 Aka mocking library in four lines of code. (I didn't come up with it though so can't take the credit.)

<kotlin>
class MyList&lt;T&gt; : List&lt;T&gt; by strictMock()

inline fun &lt;reified T&gt; strictMock(): T =
    java.lang.reflect.Proxy.newProxyInstance(
        T::class.java.classLoader,
        arrayOf(T::class.java)
    ) { _, _, _ -> throw NotImplementedError() } as T
</kotlin>

#### 2023/09/11
If you're interested in #Kotlin, [KotlinConf](https://kotlinconf.com) on May 23-24 next year will be a good excuse to visit Copenhagen. It's the same venue as in 2019 which was quite nice. And don't forget the best way to get the ticket is by submitting a talk [https://sessionize.com/kotlinconf-2024](https://sessionize.com/kotlinconf-2024) 🙈 (As always, you don't really need to be an expert in the field to do a good talk!)

#### 2023/09/10
Super slow search for #Kotlin data class components in IntelliJ is a massive contributor for me not enjoying Kotlin as much as I could. It feels that problems like this one are too fundamental to not be fixed on day one 😐 Unreliable/slow search defeats the whole point of IDEs.

