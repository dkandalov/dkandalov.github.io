---
layout: post
title:  "From Groovy to Kotlin"
date:   2016-06-01 12:31:00 +0100
categories: groovy kotlin
published: false
---

This is a write-up of my experience converting [Activity Tracker](https://github.com/dkandalov/activity-tracker)
plugin for IntelliJ IDEs from [Groovy](http://www.groovy-lang.org/) to [Kotlin](https://kotlinlang.org/).

It is written for anyone familiar with Groovy or Kotlin
and might be especially relevant for anyone considering move from Groovy to Kotlin.
Hopefully, it can be interesting for non-Groovy and non-Kotlin people as well.

This is not a thorough comparison, it only included things I came across while transforming Groovy code in Kotlin.


#### About migration
It doesn't really matter for this blog post but it might good to mention that
Activity Tracker is a proof-of-concept plugin for IntelliJ IDEs to track and record user activity.
It keeps all your data locally so you can see and control what is being logged.

IntelliJ plugins are usually written in Java and they use xml plus Java API of IntelliJ platform.
Activity Tracker is not like that at all. In the first place, it mostly ignores standard xml configuration
and uses [LivePlugin](https://github.com/dkandalov/live-plugin) Groovy API instead.
Ignoring the details from plugin point of view this means that in addition to standard Java APIs
it has to interface with LivePlugin Groovy APIs.
Another difference with standard plugins is that Activity Tracker was itself written in Groovy.

Writing plugins in Groovy is not a common practice.
At the time the main motivation for me was to use programming language more exciting than Java 6.
These days IntelliJ uses Java 8 and Kotlin is "officially approved" language for writing plugins.
So migrating from Groovy to Kotlin was not only about having fun
but also about moving to standard technology.


#### No 'new' keyword
Unlike Groovy (and probably most JVM languages) there is no ``new`` keyword in Kotlin.
To create an instance of a class you can just use class name with constructor parameters.

Groovy:
<groovy>
new ActivityTracker.Config(...)
</groovy>

Kotlin:
<kotlin>
ActivityTracker.Config(...)
</kotlin>

#### No implicit narrowing/widening for numbers
Unlike Groovy (and probably most JVM languages) there is no implicit narrowing/widening conversion for numbers in Kotlin.
That is if you have variable of type ``Long`` you cannot assign ``Int`` value to it and vice versa.

Even thought this might seem strange from C-like languages point of view,
this makes perfect sense because ``Int`` and ``Long`` classes are not subtypes of each other.
The same applies to ``Double`` and ``Float``.

Considering how subtle and difficult it can be to find implicit conversion bugs
this is probably a good design.
(In case you were wondering about silent underflow/overflow, it is still there. Works the same way as in Java.)

Groovy:
<groovy>
def l = 123L
def i = 123
l = i // works ok
</groovy>
Kotlin:
<kotlin>
var l = 123L
var i = 123
l = i // compilation error
</kotlin>

#### Closure type parameters
In Groovy types and type parameters are optional.
You can skip types all together or specify them in when you feel like doing it.
I found it useful to always add types to libraries and other APIs which might be heavily used from other code.
It worked fine except for the ``Closure<V>`` type which has type parameter only for its return value.
To be fair, there is ``ClosureParams`` annotation to specify types for closure inputs, but it's too painful to use.

In Kotlin, closures (aka lambdas) have type parameters for both inputs and output as you would expect.

Groovy:
<groovy>
private updateState(Closure&lt;State&gt; closure) {...}
// or
private updateState(@ClosureParams(State.class) Closure&lt;State&gt; closure) {...}
</groovy>
Kotlin:
<kotlin>
private fun updateState(closure: (State) -&gt; State) {}
</kotlin>

#### "With" vs "run" and "apply"
One of the interesting features in Groovy is ``.with`` function defined on ``Object`` class.
It takes a closure and executes it with ``this`` set to target object.
The result of ``.with`` function is the value of the last expression in closure.
This can be useful for calling a bunch of methods on object which doesn't have fluent API.

Confusingly, Kotlin has ``with`` function which does exactly the same thing except that it cannot be called on object itself.
So to replace Groovy ``.with`` in Kotlin there is ``.run`` function.
In addition, there is the ``.apply`` function in Kotlin which is like ``.run`` but returns target object.
It can be useful when building trees of object to avoid ``it`` as the last expression in each closure.

Groovy:
<groovy>
def actionGroup = new DefaultActionGroup().with {
	add(toggleTracking)
	add(new DefaultActionGroup("Current Log", true).with {
		add(showStatistics)
		add(openLogInIde)
		add(openLogFolder)
		addSeparator()
		add(rollCurrentLog)
		add(clearCurrentLog)
		it // &lt;-- meh
	})
	//...
	it // &lt;-- meh
}
</groovy>
Kotlin:
<kotlin>
val actionGroup = DefaultActionGroup().apply {
    add(toggleTracking)
    add(DefaultActionGroup("Current Log", true).apply {
        add(showStatistics)
        add(openLogInIde)
        add(openLogFolder)
        addSeparator()
        add(rollCurrentLog)
        add(clearCurrentLog)
    })
    // ...
}
</kotlin>

#### "Modifying" immutable objects
Both Groovy and Kotlin can define value-objects, i.e. a class with immutable fields
and implicitly defined equality and hash code methods.
In Groovy it's ``@Immutable`` annotation, in Kotlin it's ``data class`` definition.
One of the things you might want to do with value-object is copy it into new object
with one or more fields modified.
In both Groovy and Kotlin it's almost the same method name and almost the same syntax.

Groovy:
<groovy>
@Immutable(copyWith = true)
static final class State {
	boolean isTracking
	boolean trackIdeActions
}
new State(false, false).copyWith(trackIdeActions: true)
</groovy>
Kotlin:
<kotlin>
data class State(
        val isTracking: Boolean,
        val trackIdeActions: Boolean)
State(false, false).copy(trackIdeActions = true)
</kotlin>

#### No groovy getters
When referencing Java getters from Groovy code you can pretend it is a read-only field.
So in Groovy instead of ``o.getFoo()``, you can do ``o.foo``.

Kotlin doesn't have groovy getters, you have to use getters Java-style.

Groovy:
<groovy>
def actionManager = ActionManager.instance
</groovy>
Kotlin:
<kotlin>
val actionManager = ActionManager.getInstance()
</kotlin>

#### Method names with spaces
Both Groovy and Kotlin allow method names with spaces.
This might sound like a strange feature but it's great for naming unit-tests
so that you don't have to decide if camel case is less/more readable than underscore
and just use spaces instead.

Another less practical but much more exciting question is whether any string can be a method name.
For Groovy the answer is yes, while Kotlin seems to be more restrictive.

Groovy:
<groovy>
@Test def "convert event object into csv line"() {...}
@Test def "\n"() {...} // naming is hard
@Test def ""() {...}   // the shortest method name ever
</groovy>
Kotlin:
<kotlin>
@Test fun `convert event object into csv line`() {...}
@Test fun `\n`() {...} // doesn't compile
@Test fun ``() {...}   // doesn't compile :(
</kotlin>

#### Almost optional "return"
In Groovy the last expression in function/closure is its return value.
You can use ``return`` keyword to return from function earlier, otherwise it's entirely optional.

In Kotlin this is more complex.
Functions have to use ``return`` keyword while lambdas cannot use ``return``.
The result of the last expression in lambda is the value that lambda will return
because ``return`` in lambda means returning from enclosing method. <<--- TODO not true

There must be good reasons behind this design in Kotlin
but why last expression in function needs ``return`` is still a mystery for me.
In practice, I had no problems with it except when transforming Kotlin code
from lambda into method and the other way round.

#### Getting Class object
Kotlin has its own reflection classes, i.e. in addition to ``java.lang.Class`` there is ``kotlin.reflect.KClass``.
This makes sense because Kotlin has language features which do not exist in Java.
(For example, you might want to check using reflection if function argument is optional.)

In Groovy, as far as I know, it's not possible to know using reflection if function argument is optional or not.
Probably, checking Groovy AST is the way to do it.

Java:
<java>
println(ActivityTracker.class);
</java>
Groovy:
<groovy>
println(ActivityTracker)
</groovy>
Kotlin:
<kotlin>
println(ActivityTracker::class.java)
</kotlin>

#### Buffered file appender
Groovy has quite a few "helper" methods which are automatically "added" to Java core classes.
For example, ``withWriterAppend()`` method in ``ResourceGroovyMethods`` class
which simplifies appending to a text file using ``Writer``.

In Kotlin there are also quite a few "helper" methods.
In particular for IO operations, in ``kotlin.io.FileReadWrite`` there is ``writer()`` function.
It does almost the right thing except that there is no option to make writer appendable
so reproducing Groovy behaviour is somewhat verbose.

Groovy:
<groovy>
new File(statsFilePath).withWriterAppend("UTF-8") { writer -&gt;
	// ...
}
</groovy>
Kotlin:
<kotlin>
FileOutputStream(File(statsFilePath), true).buffered().writer(utf8).use { writer -&gt;
	// ...
}
</kotlin>

#### Mapping collection into Map
In Groovy there is ``collectEntries()`` method from ``DefaultGroovyMethods`` class which is
automatically added to all collections. It takes a closure and assuming the closure returns
two-elements arrays, it will put them into a map.

In Kotlin there seems to be no functionality like this.
Using ``Pair`` and avoiding maps is one possible way out.

(Note that except for missing ``collectEntries`` the code below is almost identical.)

Groovy:
<groovy>
events
    .findAll{ it.eventType == "IdeState" && it.focusedComponent == "Editor" && it.file != "" }
    .groupBy{ it.file }
    .collectEntries{ [fileName(it.key), it.value.size()] }
    .sort{ -it.value }
</groovy>
Kotlin:
<kotlin>
events
    .filter{ it.eventType == "IdeState" && it.focusedComponent == "Editor" && it.file != "" }
    .groupBy{ it.file }
    .map{ Pair(fileName(it.key), it.value.size)}
    .sortedBy{ it.second }
</kotlin>

