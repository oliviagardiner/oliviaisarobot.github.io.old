---
layout: post
title: 'Junior life #1: Code consistency vs. improvement'
date: 2017-04-11
tags: code development junior legacy-code PHP consistency refactoring clean-code
summary: "In these articles, I would like to share my experiences as a beginner web developer, talk about expectations vs. reality, mistakes I've made and solutions I came up with."
cover: \assets\blog\2017-04-11\cover.jpg
cover-source: Illustration by Olivia Gardiner
---

![junior life cover](\assets\blog\2017-04-11\cover.jpg){: .post-cover-full }

**In these articles, I would like to share my experiences as a beginner developer, talk about expectations vs. reality, mistakes I've made and solutions I came up with. The aim of this is not to put down my employer, or my colleagues, as many businesses might suffer from the same or similar problems, I invite you to think about these together.**

I'm quite sure the mention of legacy code triggers serious PTSD in many of us. It's that sticky and slimy thing in the corner, that nobody wants to touch. But it's a part of our codebase, therefore there is a legitimate need to maintain it, and not let it rot any further.

When I arrived at my first very real and very serious developer job several weeks ago, all I had was expectations, and very little factual knowledge about what I will have to work with. I had studied frontend and backend JavaScript for the most part, version control, design patterns. I knew this was going to be different, and PHP and MySQL were waiting for me with open arms. I was familiar with the syntax of PHP 7, and looked into frameworks like Laravel and Zend. Asking my colleagues what framework we were using, lead to strange looks and cryptic answers. **It's a mixture of PHP 5.4.x and 5.6.x and some other things.** That is not exactly what you want to hear, is it?

Nothing compares to the shock when you are granted access to the code, and what you see is nothing like anything you thought a web application could look like. There was no framework, no design pattern in use, no structure, no tests, it was not object-oriented, no proper indentation or standards in the files. There were, however, constant character coding problems, a fusion of English and Hungarian in the code which can only be described as "Hungrish", and a bad choice of IDE.

In their defense, this was the code base of an internal application, only meant to be used by the employees of the company. On the other hand, there is no excuse for what I saw in those files.

**Those files served as a bin for years and years of technical debt.** Upon asking, why or how that happened, I usually got a shrug and something along these lines: "Management wanted it fast." or "There was a really short deadline. I wanted to come back to tidy it up, but there was just no time." The thing is, there **has to be time**. As [Robert C. Martin puts in his book](https://www.goodreads.com/book/show/3735293-clean-code):

> Were you trying to go fast? Were you in a rush? Probably so. Perhaps you felt that you
didn’t have time to do a good job; that your boss would be angry with you if you took the
time to clean up your code. Perhaps you were just tired of working on this program and
wanted it to be over. Or maybe you looked at the backlog of other stuff that you had promised
to get done and realized that you needed to slam this module together so you could
move on to the next. We’ve all done it.
We’ve all looked at the mess we’ve just made and then have chosen to leave it for
another day. We’ve all felt the relief of seeing our messy program work and deciding that a working mess is better than nothing. We’ve all said we’d go back and clean it up later. Of
course, in those days we didn’t know LeBlanc’s law: *Later equals never*.

What you are coding might get done sooner, but is it worth it, if you disregard code quality? What if you actually do have to go back and work with that code again? Badly written, badly organized, untested code will slow you down.

It is a hell of a task to start refactoring something like that. And even if you set your mind on doing so, where do you start? Do you introduce new standards, new libraries, update the old ones? Or when you have to develop a new feature, do you just continue on like it was before? It's probably going to bad, messy, but it will be consistent.

The problem of consistency vs. improvement is [often discussed]((https://www.thekua.com/atwork/2014/11/a-tech-lead-paradox-consistency-vs-improvement/)) in relation to legacy code maintenance.

A few pros of consistency:
* If the application is heavily interconnected, changing the way something works might break other things, consistency provides stability in this case.
* Consistent code is easier and faster to read and understand, and therefore faster to write.

A few pros of improvement:
* It might make the application or feature faster and more secure.
* Possibly simplifies and shortens code, eliminates duplications.

Ideally, this is a decision that your team makes together, or your lead dev makes on behalf of the team. My team was not very cooperative for the most part - I will write about this at another time -, so I took it upon myself to make a decision. **There is no good answer to this problem, it depends on the situation and the code you have to work with.** It seems like a good idea to look at the possible benefits of improvement, and how desperately do you need consistency.

In my case, consistency was semi-important, the application being very interconnected, and the pressure of deadlines was also a legitimate problem. Too much improvement would slow down the development significantly, in case someone else had to first get used to the changes I made, to then be able to contribute. It was important that my colleagues, who are used to this badly written code, will find these changes readable, clear. **Some improvement is better than no improvement.**

This is how I was inching forward, slowly fixing up legacy code while I was in the process of developing new features. The following improvements were easy to implement, and improved overall code quality considerably:

* Using consistent **formatting**, so the code looks visually neat.
* Breaking up large files to make them **shorter**, more easily readable, and naming them in a way that helps find out how are they connected.
* Deleting **unused code**.
* Removing **duplications** and writing functions for frequently copied solutions, which could be included from another file.
* Removing and rewriting unnecessary **comments**.
* Introducing **exceptions**.

There are really small changes that don't affect the overall application design - I couldn't suddenly introduce classes and design patterns when hasn't been used anywhere else in the application, it could be a possible source of confusion and duplications. I also updated some manually installed plugins to newer versions. Even if you absolutely can't make time to go back to write tests for older functions, **it is a good idea to unit test the newly written code**.

These might seem like trivial additions, but apparently, some developers are in such a hurry to deliver the new features, that they disregard even the basics. Please encourage your colleagues to care about code quality, and stand up to the management, if necessary.

**It is crucial to make your management understand that writing good quality code takes a little more time**, and in the long run, it is going to be more beneficial to sometimes extend the deadline to allow the developers to tie the loose ends. Accumulating technical debt can greatly reduce performance later on, when you have to cut your way through a messy jungle of code, every single time you want to implement a new feature. Not to talk about unnecessary workaround, which can be time-consuming, but could be avoidable if the team took a little longer thinking about the overall design.

I have learnt that when trying to make changes, I should always consider the general state of the code - and when possible, discuss it with other developers. I do want to deliver the best quality code possible, but there are also legitimate limitations, such as the need that the code is easily readable and understandable for your whole team.

**Both consistency and improvement are important**. Try to make the best compromise, when you have to.
