---
draft: true 
permalink: hello-http4k
---

This is a quick intro into [http4k] — a Kotlin library for writing HTTP servers and clients.
Unlike many other libraries and frameworks with (over)complicated core abstractions and workflows, 
http4k uses few simple concepts which encourage good design and testability.

The examples below are based on the "[Live coding: Server as a function with http4k]" talk I've been doing earlier this year.

### Hello handler
The main concept in http4k is `HttpHandler`, which is literally a function 
that takes immutable `Request` and returns immutable `Response` 
(where `Request` and `Response` support all the usual HTTP things like headers and queries):
<kotlin>
typealias HttpHandler = (Request) -> Response
</kotlin>

So the simplest server in http4k is just a lambda which returns an instance of `Response` with `OK` status and (optional) body content. Of course, lambdas can't send/receive HTTP requests over network — for that we need an actual HTTP server.
Http4k doesn't attempt to reinvent the wheel and instead of implementing its own server/client, it has adapters to integrate
with existing HTTP Java servers/clients.
In this case, let's use `ApacheServer` which is an adapter for [Apache HttpComponents]:
<kotlin>
import org.http4k.core.*
import org.http4k.server.*
import org.http4k.core.Status.Companion.OK

fun main() {
    val httpHandler: HttpHandler = { request: Request ->
        Response(OK).body("Hello 🌍")
    }
    httpHandler.asServer(ApacheServer(port = 1234)).start()
}
</kotlin>

We can run the code above in IDE and test it from command line with curl:
<plain-text>
$ curl -D - http://localhost:1234
HTTP/1.1 200 OK
...
Hello 🌍%
</plain-text>

The output looks good but it would be nice to use server code directly from Kotlin.
To do this we need an HTTP client. In particuler, we can use `OkHttp` which is an adapter for [OkHttp] library. 
Note that HTTP client is also `HttpHandler`, i.e. it has the same type as the server!
<kotlin>
fun main() {
    val httpHandler: HttpHandler = { request: Request ->
        Response(OK).body("Hello 🌍")
    }
    httpHandler.asServer(ApacheServer(port = 1234)).start()

    val httpClient: HttpHandler = OkHttp()
    val response: Response = httpClient(Request(GET, "http://localhost:1234"))
    println(response)
}
</kotlin>
If we run the code above, the output will be almost identical to the curl output: 
<plain-text>
HTTP/1.1 200 OK
...
Hello 🌍
</plain-text>

Since both server and client have the same signature, we can refactor the code 
to remove `ApacheServer` and `OkHttp` adapters so that the server handler is called directly:
<kotlin>
fun main() {
    val httpServer: HttpHandler = { request: Request ->
        Response(OK).body("Hello 🌍")
    }
    val httpClient = httpServer
    val response = httpClient(Request(GET, "http://localhost:1234"))
    println(response)
}
</kotlin>
And after a couple more refactorings:
<kotlin>
fun main() {
    val httpServer: HttpHandler = { _: Request ->
        Response(OK).body("Hello 🌍")
    }
    println(httpServer(Request(GET, "http://localhost:1234")))
}
</kotlin>
In general, this outlines the http4k approach for making HTTP servers testable: start the servers in the same process and use in-memory communication, or if it's an external server, replace it with a fake server (supported by contract tests) or with [record/replay client].

### Hello routes
The server above works just fine except that it replies to any request regardless of the URI. For example, it will reply with "Hello 🌍" even if we POST to `http://localhost:1234/foo`. 

In order to fix this, we can use `routes()` function which takes one or more `RoutingHttpHandler`s and aggregates them into a composite `RoutingHttpHandler`. 

The simplest way to create a `RoutingHttpHandler` is by using the following mini-DSL. First, `"/hello" bind GET` bundles path and HTTP method into `PathMethod` data class, and then, `... to { request: Request -> ... }` creates `RoutingHttpHandler`.
<kotlin>
import org.http4k.core.*
import org.http4k.server.*
import org.http4k.core.Method.GET
import org.http4k.core.Status.Companion.OK

fun main() {
    val httpHandler: HttpHandler = routes(
        "/hello" bind GET to { request: Request ->
            Response(OK).body("Hello 🌍")
        }
    )
    httpHandler.asServer(ApacheServer(port = 1234)).start()

    val httpClient: HttpHandler = OkHttp()
    val response: Response = httpClient(Request(GET, "http://localhost:1234"))
    println(response)
}
</kotlin>

If we run the code above, it will print `404` response from `RoutingHttpHandler` because `httpClient` still requests "/" while `httpHandler` only responds to the "/hello" path. Obviously, to fix this we should modify the request:
<kotlin>
val response: Response = httpClient(Request(GET, "http://localhost:1234/hello"))
</kotlin>

### Hello filter
Another important concept in http4k is `Filter`, which is essentially an `HttpHandler` wrapper:
<kotlin>
interface Filter : (HttpHandler) -> HttpHandler
</kotlin>

To illustrate this, let's create a `Filter` from scratch. The simplest possible `Filter` is the one that just returns its argument (note in the code below the usage of the `Filter { ... }` function which saves us the effort of creating an anonymous object):
<kotlin>
fun main() {
    // Equivalent to `Filter.NoOp`
    val filter = Filter { nextHandler ->
        nextHandler
    }
}
</kotlin>

Let's wrap `nextHandler` into another `HttpHandler` called `wrapperHandler`. 
Functionally, the code still works in the same way (and doesn't do anything useful):
<kotlin>
fun main() {
    val filter = Filter { nextHandler ->
        val wrapperHandler: HttpHandler = { request ->
             nextHandler(request)
        }
        wrapperHandler
    }
}
</kotlin>
However, we can now add more functionality to the `wrapperHandler`. For example, to create "catch all" filter we can surround `nextHandler(request)` with try/catch expression and return [I_M_A_TEAPOT] status in case of Exception:
<kotlin>
fun main() {
    val catchAll = Filter { nextHandler ->
        val wrapperHandler: HttpHandler = { request ->
            try {
                nextHandler(request)
            } catch (e: Exception) {
                Response(I_M_A_TEAPOT) // not the best error handling strategy
            }
        }
        wrapperHandler
    }
}
</kotlin>
To try out the filter, let's make the server extract "name" query parameter from the request and throw an exception if the "name" parameter is missing: `request.query("name") ?: error("No name")`. We can apply the filter using `.withFilter(catchAll)`:
<kotlin>
fun main() {
    val catchAll = Filter { nextHandler ->
        val wrapperHandler: HttpHandler = { request ->
            try {
                nextHandler(request)
            } catch (e: Exception) {
                Response(I_M_A_TEAPOT)
            }
        }
        wrapperHandler
    }

    val httpHandler: HttpHandler = routes(
        "/hello" bind GET to { request: Request ->
            val name = request.query("name") ?: error("No name")
            Response(OK).body("Hello $name")
        }
    ).withFilter(catchAll)
    httpHandler.asServer(ApacheServer(port = 1234)).start()
}
</kotlin>
As expected, it's a `200` response on "hello?name=world" GET request: 
<plain-text>
$ curl -D - http://localhost:1234/hello?name=world
HTTP/1.1 200 OK
...
Hello world%
</plain-text>

And it's a `418` "I'm a teapot" response if we forget to specify the "name":
<plain-text>
$ curl -D - 'http://localhost:1234/hello'
HTTP/1.1 418 I'm a teapot
...
</plain-text>

You can find more filters bundled with http4k in `org.http4k.filter.ServerFilters` and `org.http4k.filter.ClientFilters` objects.

### HTTP as a function
Just like any other library or framework http4k is only an abstraction on top of the HTTP protocol. Event the simplest GET request can end up talking to multiple servers (think DNS, SSL) and with the current trend of moving towards containerised cloud (using kubernetes, etc.) there is even more stuff going on in the background. So the library design is by no means a representation of reality but rather it's an abstraction for the library users. Arguably, for the majority of users plain old function (POF?) with an immutable request/response is the best abstraction over HTTP. 

The design of http4k was inspired by ["Your Server as a Function" paper] which defines `HttpHandler` in a bit more complicated way and roughly translates to Kotlin like this:
```
interface HttpHandler<Request, Response>: (Request) -> Future<Response>
```
The main difference compared to http4k is the `Future` in the return type which highlights the asynchronous nature of HTTP requests. The advantage is that each request becomes a task and can be scheduled or even executed asynchronously by the framework. The disadvantage is that `Future` complicates every request and response for some potential performance benefits which don't pay off in most cases. Not doubt, there are large-scale companies which can benefit from this, but the chances are you're one of them. Another argument is that HTTP abstraction should only be dealing with HTTP and stay away from threading strategies, similar to how you would avoid mixing HTTP and domain logic.

From the simple design point of view, it's also not easy to justify the conceptual complexity of an average HTTP framework with its own lifecycle and special testing suite. That's not to mention the use of annotations, which are pretty much [custom keywords][modifiers-vs-annotations] and should probably be used sparingly.


### Summary
One thing to remember from this blog, is that **HTTP servers and clients are uniform**, i.e. both server and client have the same type (in Kotlin terms `(Request) -> Response` or variation of it). This is exactly what makes it possible to write "your server as a function" and http4k takes this approach to its simplest form. So if you're thinking about writing a new web-framework or library, please really consider using this as its core concept!

It's worth mentioning that http4k has been successfully used in large-scale enterprise systems.
There are quite a few http4k modules and this blog just scratches the surface of [the core module].
You can find out more about http4k on [its website][http4k].
For a bit more in-depth overview, I suggest you watch this video by http4k authors:
<p align="center">
	<iframe width="800" height="450" src="https://www.youtube.com/embed/p1VTfcQJefk" frameborder="0" allowfullscreen></iframe>
</p>

Given the amount of web-frameworks and technical marketing (things that come to mind are Spring and, obviously, this blogpost), it can be genuinely hard to know what is the right tool for the problem at hand. The important thing is to avoid [Resume Driven Development] by actually solving the problem instead of focusing on a particular technology.

[http4k]: https://www.http4k.org
[Live coding: Server as a function with http4k]: https://www.youtube.com/watch?v=vsueRJCJuLI
[Apache HttpComponents]: https://hc.apache.org/index.html
[OkHttp]: https://square.github.io/okhttp
[record/replay client]: https://www.http4k.org/cookbook/record_and_replay
[I_M_A_TEAPOT]: https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol
["Your Server as a Function" paper]: https://monkey.org/~marius/funsrv.pdf
[RPC]: https://en.wikipedia.org/wiki/Remote_procedure_call
[modifiers-vs-annotations]: https://blog.jetbrains.com/kotlin/2015/08/modifiers-vs-annotations
[the core module]: http://www.http4k.org/guide/modules/core
[Resume Driven Development]: http://radar.oreilly.com/2014/10/resume-driven-development.html