---
layout: post
title:  "Groovy to Kotlin"
date:   2016-06-01 12:31:00 +0100
categories: groovy kotlin
published: false
---

This is a write-up of my experience converting [Activity Tracker](https://github.com/dkandalov/activity-tracker)
plugin for IntelliJ IDEs from [Groovy](http://www.groovy-lang.org/) to [Kotlin](https://kotlinlang.org/).

It is written for anyone familiar with Groovy or Kotlin but, hopefully, can be interesting for wider audience.
I didn't attempt to do a thorough or balanced comparison and only included things I came across
while transforming Groovy code in Kotlin.

#### About Activity Tracker plugin
It doesn't really matter for this blog post but it might good to mention that
Activity Tracker is proof-of-concept plugin for IntelliJ IDEs to track and record user activity.
Unlike other IntelliJ plugins with similar functionality it keeps all your data locally so you can see and
control everything what is being logged.

IntelliJ plugins are usually written in Java and they use xml plus Java API of IntelliJ platform.
Activity Tracker is not like that at all. In the first place, it mostly ignores standard xml configuration
and uses [LivePlugin](https://github.com/dkandalov/live-plugin) Groovy API instead.
Ignoring the details from plugin point of view this means that in addition to standard Java APIs
it has to interface with LivePlugin Groovy APIs.
Another difference with standnard plugins is that Activity Tracker was itself written in Groovy.

Writing plugins in Groovy is not a common practice. The main motivation for me was to use programming language
which is more exciting and powerful than Java 6. (Yes, it's Java 6. IntelliJ had to stay on it for a very long time
because of UI bugs in later versions of JDK). These days IntelliJ uses Java 8 and has Kotlin as an
"officially approved" language for writing plugins. So migrating Activity Tracker from Groovy to Kotlin
was not only about having fun but also moving to a more standard technology.


#### No 'new' keyword
Unlike Groovy (and probably most JVM languages) there is no ``new`` keyword in Kotlin.
To create an instance of a class you can just use class name with constructor parameters.
This doesn't sound like much but I believe that lots of tiny improvements can accumulate and make a big overall difference.

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
Even though this is more verbose, I think overall it's a good thing
considering how subtle and difficult to find implicit conversion bugs can be.
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
		it
	})
	//...
	it
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
One of the things you might want to do with value-object is to copy it into new object
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
I'm sure the whole business with getters/setters/properties is a complex design decision
with mutually exclusive options and lots of people getting frustrated no matter what you choose.
Basically, Kotlin doesn't have groovy getters, you have to use getters Java-style.

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

In Kotlin this is a bit more complex.
Functions have to use ``return`` keyword while lambdas cannot use ``return``.
The result of the last expression in lambda is the value that lambda will return
because ``return`` in lambda means returning from enclosing method.

There must be good reasons for this (and didn't search for them, sorry)
but why last expression in function needs ``return`` I do not understand.
In practice I had no problems with it except when transforming Kotlin code
from lambda into method and the other way round.

#### Getting Class object
Kotlin has its own reflection classes, i.e. in addition to ``java.lang.Class`` there is also ``kotlin.reflect.KClass``.
This makes sense because Kotlin has language features which do not exist in java
(for example, optional function arguments) but can be confusing if you don't know about it.

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

