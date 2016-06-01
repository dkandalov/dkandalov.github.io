---
layout: post
title:  "Groovy to Kotlin"
date:   2016-06-01 12:31:00 +0100
categories: groovy kotlin
published: false
---

This is a write-up of my experience converting [Activity Tracker](https://github.com/dkandalov/activity-tracker)
plugin for IntelliJ IDEs from [Groovy](http://www.groovy-lang.org/) to [Kotlin](https://kotlinlang.org/).
It is intended for anyone familiar with Groovy or Kotlin but, hopefully, can be interesting for wider audience.

#### About Activity Tracker plugin
It doesn't really matter for the discussion but it might good to mention that
Activity Tracker is proof-of-concept plugin for IntelliJ IDEs to track and record user activity.
Unlike other plugins with similar functionality it keeps all your data locally so you can see and
control everything what is being logged.

IntelliJ plugins are usually written in Java and they use xml plus Java API of IntelliJ platform.
Activity Tracker is not like that at all. In the first place, it mostly ignores standard xml configuration
and uses [LivePlugin](https://github.com/dkandalov/live-plugin) Groovy API instead.
Ignoring the details from plugin point of view this means that in addition to standard Java APIs
it has to interface with LivePlugin Groovy APIs.
Another difference with standnard plugins is that Activity Tracker was itself written in Groovy.

Writing plugins in Groovy is not a common practice. The main motivation for me was to use programming language
which is more exciting and powerful than Java 6. (Yes, it's Java 6. IJ had to stay on it for a very long time
because of UI bugs in later versions of JDK). These days IJ uses Java 8 and has Kotlin as an
"officially approved" language for writing plugins. So migrating Activity Tracker from Groovy to Kotlin
was not only about having fun but also moving to a more standard technology.


#### No 'new' keyword
Unlike Groovy (and probably most JVM languages) there is no ``new`` keyword in Kotlin.
To create an instance of a class you can just use class name with constructor parameters.
This doesn't sound like much but I believe that lots of tiny improvements can accumulate and make a big overall difference.

Groovy:
{% highlight groovy %}
new ActivityTracker.Config(...)
{% endhighlight %}
Kotlin:
{% highlight kotlin %}
ActivityTracker.Config(...)
{% endhighlight %}

#### No narrowing/widening for numbers
Unlike Groovy (and probably most JVM languages) there is no implicit narrowing/widening for numbers in Kotlin.
That is if