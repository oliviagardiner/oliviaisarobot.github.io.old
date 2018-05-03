---
layout: post
title: "Code diary #4 - How I learned the importance of commit messages"
date: 2018-05-02
tags: code learning git commit repository changelog version-control
summary: "An argument for writing better commit messages, in addition to showing some real-world examples. Have you ever refactored commit messages? Are you wondering what's the point? This article might just be the right read for you."
cover: /assets/blog/2018-05-02/cover.jpg
cover-source: Illustration by Olivia Gardiner
---

![cover](\assets\blog\2018-05-02\cover.jpg){: .post-cover-full }

*Err... what? Commit messages, you say?*

The other day, I was browsing through the repository of our current frontend project, trying to catch up with what has changed after I was temporarily moved to a side-project for two months. I scrolled back the timeline up to the point where I was still present. This timeline I'm talking about is called "network" on Github, "graph" on GitLab, it is basically a visual representation of all branches, how and where they connect to the master branch and to each other. GitLab also has the upside of displaying commit messages next to the braches.

A few things immediately stood out to me.

* Everybody else had a LOT more commits than me (with currently three more people working on the repository).
* The commits were also more frequent.
* The commits were by far more explanatory of the underlying code changes.

# What's the big deal?

These are just commit messages, not the actual code, right? If so, why did I immediately realize something was wrong, when I looked at my colleague's commit messages? Probably because it was so plain obvious, and [after reading this artile](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message) I was downright ashamed of the quality of my commit messages. So I've done a bit of research and I stumbled upon some recommendations and indeed [very good explanations](https://hackernoon.com/what-makes-a-good-commit-message-995d23687ad) on how commit messages can be bad, and why it is so important to get them right.

## It's a way of communication

When you are working on a larger project, it can get hard to keep track of what everyone else is doing, and how the application changes shape as everyone is working on his or her own part. Meaningful commit messages help "briefing" us about the very recent changes, without forcing every single person on the team to go through the actual code and see what was implemented, and how. Being a form of communication, it also greatly improves readability if they are proper English sentences. **Good commit messages provide explanations to why certain changes were made, or why they were implemented in a certain way**.

## Code review is great, but...

It's tedious task. Reading code is time consuming, and even though it's essential, and has many benefits, imagine if in a team of 6 people, everyone had to spend time reading what everyone else wrote. Development would slow down considerably, and we would spend most of our time reviewing code written by others. That is where good commit messages come into the picture, they can tell you what has changed in a much quicker way. **Good commit messages speed up the reviewing process considerably**.

## Documentation? What documentation?

There might come a point, when you need to put together some documentation on how your application works, what are its core features, and how those implementations were carried out exactly. Commit messages can prove invaluable in a scenario like this. I have not had the misfortune to write release notes or documentation yet, but when that time comes, my future self will surely thank me for the foresight. **Good commit messages can make it easier and faster to put together docs and release notes**.

# What does a good commit message look like?

The internet suggests that we should keep our first line under 50-72 characters. [Git itself offers us an example](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project) of what a commit message should look like:

```
Short (50 chars or less) summary of changes

More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.  In some contexts, the first
line is treated as the subject of an email and the rest of
the text as the body.  The blank line separating the
summary from the body is critical (unless you omit the body
entirely); tools like rebase can get confused if you run
the two together.

Further paragraphs come after blank lines.

  - Bullet points are okay, too
  - Typically a hyphen or asterisk is used for the bullet,
    preceded by a single space, with blank lines in
    between, but conventions vary here
```

The first line can be a summary of the changes, written in a commanding style. Using a period is not necessary. It's important to leave the second line blank for rebasing and other purposes. Use line breaks to avoid having to scroll horizontally.

## What to write?

In [this blog post](http://who-t.blogspot.hu/2009/12/on-commit-messages.html), Peter Hutterer states that a good commit message should be able to answer 3 questions:

* Why is it necessary?
* How does it solve the problem?
* What effects does the patch have?

If you don't take my word for it, consider that [this was a matter of importance ten years ago](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), and will continue to be. And if [even Linus Torvalds](https://github.com/torvalds/linux/pull/17#issuecomment-5659933) thinks it's important, who am I to argue?

# ...and what does a bad commit message look like?

Common mistakes I've collected from several sources (and my own commits) were the following:

* Uninformative, meaningless ('minor fixes', 'package update', 'layout change')
* Including too many changes to too many files, using source code management as a backup system
* Including too few changes, keep related changes in one commit
* They refer other sources ('look here', 'fixing issue 123')

# Atonement

Last but not lest, I'm going to show you some examples, and at the same time, describe what's wrong with them, and how could they be better. Let's walk the walk of shame, and have a look at my most recent, and very real commit messages. Learn from my mistakes.

**The task**: We wanted to open product information, which currently routed us to a different page, away from the original product list. UX concerns made us decide to use a popup product page instead, and render all information on separate tabs of the popup, while the full product list is still visible and easy to return to in the background. You will now read my first few commit messages, working on this problem.

## #1

> empty popup product page added

Yes, that is it. I'm guilty of those one-liner commit messages, and also of including too many changes in one commit. Remember the three questions I cited above? This commit message doesn't answer any of that. So I went back to the changelog, and concluded that this commit, in fact, only included one important change, so this would have been a much better commit message:

```
commit#1
Add modal popup for product page instead of rerouting

The previous product page was not user friendly enough,
a popup modal allows a quicker and easier return to the
product list, and makes it easier to switch between
product pages.

This was done using the bootstrap modal, adding a new
field formatter to the grid to trigger the modal itself.

The field formatter might need refactoring because it is
using a workaround to trigger the modal, as regular event
emitter could not be used, having to communicate between
element and grandparent element (and vue 2 event emitter
works only between parent and child).
```

## #2

> internationalization and store base for product page

Whoa, whoa, whoa, 18 changed files, with 265 additions. That doesn't look like a single commit to me. And like the brief commit message suggests, internationalization and the Vue store are two different things. But how does the store even come to the picture here? The changelog suggests something else, so this commit message is very misleading (yes, I was indeed working on the store, but significant changes were in a much, much later commit). Let's split that up, and rewrite it!

```
commit#2
Fix i18n in nuxt config

It was previously unusable because it wasn't properly
installed, adding it to the plugins and the middleware
solved the problem.

Also populated the respective jsons with some text.

---

commit#3
Create product page components

The product page components were added based on the
blueprint from lucidchart, as tabs of the modal, using
bootstrap. Static texts were rendered with i18n,
currently available in English and Hungarian.
```

## #3

> login form data is cleared

Despite the simple-looking commit messages, the changelog indicated that this should have been split into two commit messages, as it includes not only a store fix, but also some layout changes.

```
commit#4
Fix persistent login data in store

The form store kept the data from the login fields,
throwing rendering errors before it was replaced
by the product form data.

The error could be fixed by clearing the form store
after successful authentication, and keeping the user
info in the employee store.

---

commit#5
Add store access and fallback data to product form

The product page no longer needs any props, it pulls
the current product information from the vue store.

Also added some fallback data and rendering failsafes
for properties that dont yet arrive from the backend.

Computed variables might need a rework after we finalize
the product object's contents that is coming from the backend.
```

## #4

> added filters and basic overview layout

Speaks for itself, let's split that commit message! So based on the changelog, I was doing pipes, and outlines the overview tab of the product page.

```
commit#6
Create basic product overview layout

Overview tab layout was created based on the lucidchart
blueprint. All essential blocks are included. Using
standard bootstrap/coreui elements.

---

commit#7
Add filters for price and currency formatting

Filters are now set up in the nuxt config, and
they include price formatting for thousand separators,
with or without decimals, and currency code replacement
with currency characters if available.

Decimal and non-decimal formatting couldn't be merged
because filters only take one argument.
```

## #5

> overview tables

My ultimate moment of shame. 12 changed files, 263 additions and 221 deletions explained with only two words. To redeem myself a little bit, most of the deletions come from deleting a duplicate svg file, according to the changelog. That in itself could be a commit message.

```
commit#8
Delete duplicated svg logo file

The file was included in both assets and assets/img,
but only the latter was used by css and components.

---

commit#9
Add state indicators to product page

Product state and variant state gained their independent
indicators on top of the product page, using conditional
rendering and bootstrap progress bar.
```

And finally, the actual change those two words referred to:

```
commit#10
Add price and stock info tables to product overview

Conditionally render price and stock info tables on the
product overview tab, using bootstrap tables, flag icons
and formatters.
```

# Conclusion

Writing commit messages, **good commit messages** is not as obvious as it might seem at first sight. It was something probably overlooked in education as well, even though such a seemingly small detail might have a landslide effect on our team's efficiency and speed. In this case, the devil certainly is in the details.

I believe that this might also have beneficial effects on coding discipline, as I've mentioned above, I also tend to (past tense!) dump a whole lot of changes into a single commit. I will pay more attention, and instead of just hitting an easy `git add .` (remember when I wrote that using SCM as backup system is bad practice?), I will go through my changes once again, group my files together into commits that make sense. As you can see, 10 commits would have been more ideal instead of the 5 that I've used, and adding some explanations and pointing out possible flaws or issues might also help future bug tracking.

One step at a time, towards becoming a better coder. Thank you for reading!
