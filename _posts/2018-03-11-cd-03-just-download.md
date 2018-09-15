---
layout: post
title: 'Just download already!!!'
date: 2018-03-11
tags: problem-solving code development PHP cURL XML timeout
summary: 'Take a simple looking problem. Discover limitations in your system that rule out obvious solutions. Realize that it is not so simple after all. Spend a reasonable amount of time trying to come up with something. Bash your head in the table/wall, whichever is closer.'
cover: /assets/blog/2018-03-11/cover.jpg
cover-source: Illustration by Olivia Gardiner
---

![cover](\assets\blog\2018-03-11\cover.jpg){: .post-cover-full }

*This was supposed to be some glorious bragging about how I solved a problem I came across during development. But this particular problem wasn't exactly a textbook example, and nor was my solution. I've got nothing to brag about. This is an article about how I tried to understand a problem, only to realize that after solving it, I also needed to understand the solution.*

You may or may not already know, that I have to work with a very bad and unmaintained code base on a daily basis. As a part of my efforts in trying to make it better, I decided to rewrite one of the more important modules of it, which was an **XML processing interface** that allowed us to pull information from our partners and work with that data within our own system.

I am not going to get into the more boring details, in short, the script downloaded the data from a feed, provided by our partners, and saved it into an XML file on our server. Then the script proceeded to read those files, transform the data so it could be safely entered into a MySQL database, and from then on, it could be browsed and manipulated from a graphical interface.

Actually, I wrote several alternatives to the download process, because in some cases, our partners provided the data as a live feed, in other cases, it was direct download of a pre-generated file (XML or CSV), and again in other cases, they provided pre-generated files through FTP connection. I was pleased because all of it worked just fine, the script could process a variety of different formats from different sources.

**And then, there was this particular feed that just didn't want to work the way I wanted it to work.**

It was a live XML feed, with a large total size compared to the other feeds (over 30Mb), coming from a password protected URL. It shouldn't have been a problem, I've had larger feeds than that, I've had other sources that were password protected, **cURL can deal with all of that just fine. Or so I thought.** So I used my regular function to download it, which looked something like this:

<script src="https://gist.github.com/oliviaisarobot/eb1a86b3cfe05eda6b372d638f53ac16.js"></script>

It looks really simple, right? Let's try to download our latest XML feed. Seemingly, everything was okay, but **when it came to verifying the download, it turned out the transferred data only contained an error message**: *Access denied, please try again in 5 minutes.* Okay, what the hell? I tried to run it again in 5, 20, 30 minutes, but I got the same error. I tried to double check my function. I didn't see where the problem was, because when I decided not to send any password or username, I got a response like: *Incorrect username or password*. So I was definitely able to connect to their server, and I was getting a response, but I wasn't getting back any XML-like data.

Unfortunately, I was unable to find the problem on our end, hence I decided to contact our partner's developer, tell them about my problem, just in case the problem is on their end. For the record, it should have been a direct download, which means that providing the correct url, password and username should have allowed me to download the data even in the browser. But it gave me the exact same error as my function above.

I haven't looked at it for another week, but sometimes thought about the unresolved issue with frustration, until I could get through to a developer who sent an example url to me, and I realized that **they changed the way they generated paths for their urls** (as a note to myself and fellow developers, always keep in touch with whomever you are trying to connect to, because their paths may change over time, just like in this case, and if there are no redirects for older urls, you will get weird errors like I did - it's also a mystery why they didn't notify us about the change), and that was causing the access denied error. I got really excited at the thought of being able to resolve this issue, and updated the url information in my script.

**It timed out.** But this was an easy one! The default value of *CURLOPT_TIMEOUT* is zero, which means it never times out during transfer. It was not an ideal setting, I didn't want it to try to execute indefinitely, so I initially set it to 50 seconds, which was enough time to transfer the data on previous occasions, even when it had to transfer over 30 Megabytes. The culprit was my *$curl_options* array, which contained the my curl settings withing the *curlTransfer* function:

<script src="https://gist.github.com/oliviaisarobot/4b741c6bc0e19e093e14ab185acfeb25.js"></script>

This limited the execution time to 50 seconds, which was obviously not enough now, so I increased it to a generous 400 seconds instead.

The result?

Well, the good news was, the file downloaded just fine. The bad news was, the PHP script kept failing and dying after the download had finished. My symptoms were [very similar to the one mentioned here](https://stackoverflow.com/questions/15356138/php-script-stops-suddenly-without-any-error), namely, the download had completed, the file came through as a whole, but after that, the script just stopped without an error. I've tried to **increase the execution time and the memory limit**, but neither has helped my case. There I was sitting, scratching my head.

My first idea was to **forget cURL downloads and write a python script to handle the downloading**, just in case this is related to poor garbage collection in PHP. It's no secret that I love python for its sheer versatility, and it seemed so obvious to use it for downloading something. But there was a problem: you can't just run a python script anywhere you like on an Apache server. But let's say I could get around that problem. But even if I could run my python script, **I would also have to reference the server's python installation** to make it work, which looks something like this:

<script src="https://gist.github.com/oliviaisarobot/fd9620fdcd85d6a0df7c94ded15af580.js"></script>

The first two characters - a.k.a. the shebang - indicates that the following file is a script, and Unix tries to execute it using the interpreter specified after the shebang, in this case, python. It is required to define an absolute path to the python installation. But I had no idea what that was or how to find that out, as my fellow coders did not code in python before, and our server hosting company, who could tell me more about python versions and installation directories, was not of the helpful kind. In fact, I had no idea which version of python was installed on the server (but my guess would be 2.5).

I was stuck. Again.

Until I started looking into the possible reasons of why the script has stopped, once again. What measures did I take to prevent it from happening?

<script src="https://gist.github.com/oliviaisarobot/6c22557f6ad3cdb6cec38766540564b2.js"></script>

But there is another built-in function for timeout handling in php, and that is *set_time_limit()*, which appeared to be but a wrapper for the *ini_set()* function. This is how I used it:

<script src="https://gist.github.com/oliviaisarobot/25a4fbf64cc61b27ba01328ee756033c.js"></script>

Humor me. The script executed, even past the download. We are done, right? It works the way we wanted it to work. But to me, not understanding how or *why* something works can be just as frustrating as not understanding how or why something doesn't. So I decided to try to go deeper. Virtually, [*ini_set('max_execution_time')*](http://php.net/manual/en/function.ini-set.php) and [*set_time_limit()*](http://php.net/manual/en/function.set-time-limit.php) should be the same. They reset the timeout counter and stop the script after the time limit is exceeded, or the script has finished running. Then the timeout returns to its initial value defined in the php.ini - or so the book says.

What happened then? Why did one of them work and the other did not?

I tried to dig up some information to investigate whether the two methods to tinker with timeout are not actually doing the same. I ran into [a suggestion that php timers work differently under Unix and Windows environments](https://stackoverflow.com/a/26260969/7494718). It did not apply to my case, because my development environment and the production environment were both running under Unix. But this got me thinking. [This article suggested that timeouts don't and can't affect outside script calls](https://www.binarytides.com/php-set-time-limit/), such as cURL. As I mentioned above, I've already increased the cURL execution timeout to 400 seconds, which allowed the download to complete. But even though I had *max_execution_time* also set to a few hundred seconds, my php script simply stopped after the download completed. With *set_time_limit()*, everything worked just fine.

But there was something I have overlooked, which is also visible in the code snippets above. In the first case, when I was using *ini_set()*, I put in the first line of my file, before everything else, while in the second case, I inserted *set_time_limit()* just before the download function was called, on the 27th line, before which several other function calls were executed. **This was the point, when I thought I had found the explanation** to how all of this worked, and I wanted to point out that there were several function calls before the 27th line, which must have chewed up quite a bit of execution time, some of which I may not have been able to control (such as outside script calls), but that was not the case.

**When I replaced the *ini_set('max_execution_time')* on the first line with *set_time_limit()*, the script still executed to the very end.** *I was baffled,* and I started looking into the differences between the two functions even more furiously. These are the functions in the stable 5.6 php source code:

<script src="https://gist.github.com/oliviaisarobot/a3d91fae9b4a997a0ed8966cef2a76be.js"></script>

This is the built-in function for *set_time_limit()*, which basically redefines the value of max_execution_time, which was initially set in the php.ini file. I won't paste the function for *ini_set()*, because it just takes one more parameter compared to this, the variable name of the value which you want to replace. It didn't seem like the solution was on an internal function level.

Nonetheless, **I came up with some possible explanations** for the phenomenon:
  * The server could be running in *safe mode*, which would not allow me to override the max_execution_time with the *ini_set()* function. I was unable to find detailed information about this, but *set_time_limit()* seems to work under safe mode. I will look into this in a localhost environment.
     * *Note: The safe mode directive is [marked as deprecated](http://php.net/manual/en/features.safe-mode.php) as of php 5.3, 5.4 and above. This doesn't rule out the possibility of it being in use on our server, because from what I understand, it's running more than one version of php for different parts of the application, varying from 5.2 to 5.6*
  * The server is not running in safe mode, but it has certain internal functions disabled in the php.ini file, for security reasons, and *ini_set()* could be one of them. Knowing our hosting company, this is very likely.
  * There is something else I just haven't thought about, which is also likely.

Quite anti-climactic for a solution, right? There are still a few things I could test myself on a locally hosted apache server, as I don't have that kind of access to our production server, or its configuration.

I've learnt new things while investigating this problem, one of the more notable being that web development problems have many layers, and when we are using routine solutions, **we are barely scratching the surface** of what actually makes the code tick. There are many things I don't know about php yet, and I don't want to dismiss issues as soon as I got my code to work. Why it works is just as important to understand, as why it doesn't. There are times when we are limited to certain solutions, and others are shut off - just like I couldn't outsource the downloading process to a python script. But **I'd like to think that my job is to understand problems and develop solutions for them**, therefore I can't sit back and stop when I see no errors.

Keep thinking, keep investigating.

And for the love of God, cURL, just download that XML already!!!
