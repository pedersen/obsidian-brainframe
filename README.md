# brainframe

The Brain Frame, the app that connects your life together.

# Community Plugin Dependencies

- Full Calendar
- Heatmap Calendar
- Dataview
- Citations
- Pocket
- Templater
- Todoist Plugin

# Quick Usage

This plugin is *extremely* incomplete, and is being released at this
stage simply to make usage easier for me. More features will be
forthcoming, but I wanted to get this out the door.

Right now, two new commands are added, along with relevant settings
for those commands.

## Add Product Bookmark

Open your browser, go to the product you wish to bookmark, click the
address bar, highlight everything, and press "Control-C" (or "Command-C")
to copy the contents. Open your vault in Obsidian, and press 
"Control-Shift-P" or "Command-Shift-P". You will now have a file named 
"products.md" at the root of your vault, with the product page title
and address as the last entry in that page in your vault. You can edit
this file as much as you wish, all that will ever be done by this plugin
is to add the product in question as a link for you here.

To edit which file the entry will be added to, open the settings in your
vault, go to the Brainframe tab, and change the products setting.

## Add Git Bookmark

Open your browser, go to the repository you wish to bookmark, click the
address bar, highlight everything, and press "Control-C" (or "Command-C")
to copy the contents. Open your vault in Obsidian, and press
"Control-Shift-P" or "Command-Shift-P". You will now have a file named
"gitmarkss.md" at the root of your vault, with the repository page title
and address as the last entry in that page in your vault. You can edit
this file as much as you wish, all that will ever be done by this plugin
is to add the product in question as a link for you here.

To edit which file the entry will be added to, open the settings in your
vault, go to the Brainframe tab, and change the gitmarks setting.

## Archive A Note

Move the note from where it currently sits into the archive folder (by
default, `_archived`). The location is configurable. Note that this command
is also available by right-clicking on a note or by right-clicking on an
editor tab.

# What is Brainframe?

Right now, it's an idea, built off the back of a group of ideas and
how they interact with Getting Things Done.

Getting Things Done has several elements to it that are critical to
making it work. Those individual elements are worthy of being whole
products all by themselves (and actually are) already.

In essence, every single item can be responded to by placing it in one
of these specific locations:

* Trash
* Incubate/Someday/Maybe
* Reference materials
* Projects
	* Project actions
* Next Actions
	* Do immediately
	* Do at next opportunity
* Calendar
* Delegated / Waiting

# Existing Products

Some current products cover aspects of this extremely well.

## [Todoist](https://www.todoist.com/)

Todoist covers projects and next actions quite nicely. It allows for
individual actions, projects (which all have actions items for those
projects), and even some amount of delegation.

Where it falls down is in the long term reference archive and the
calendar. In addition, it is arguable if it provides a good single
inbox for everything. Multiple email accounts, calendars, task lists,
all need to be combined to capture things. With enough web extensions,
it can work, but I question if ever more extensions is the best
choice.

Next actions are also fairly sketchy. What if my project has five
actions, and multiple actions can be accomplished in a single day? The
recommended practice at
<https://todoist.com/productivity-methods/getting-things-done> would
require me to re-visit my actions list after every task to tag them
with `@next`.

It's worth noting that [Trello](https://www.trello.com/) exists, and
provides an alternative to Todoist, but with many of the same
pitfalls. The GUI is possibly nicer to deal with though.

## [Orgmode](https://www.orgmode.org/)

I can't say enough good things about Orgmode. Everything is stored in
plain text. It has agendas, next actions, can be used for
zettelkasten, can store and access media, has a zotero connector, web
extensions, in short it covers nearly every possible use case.

Where it fails is in the connection to the digital world. It doesn't
integrate with digital speakers, no mobile clients, the connections
with the calendar are convoluted to set up, and making changes/using
the API is difficult unless you are experienced with emacs lisp. It's
amazingly powerful, but the power comes at the price of a significant
investment of time and effort to make it truly (and personally)
awesome.

## [Google Calendar](https://calendar.google.com/)

Simple and effective calendar, shows the time that is blocked off for
activities, and provides a clear agenda of planned and open time.

Where this falls down is in having a list of tasks that are not
scheduled for a specific day/time, but need to get done at the next
available opportunity. Todoist handles a calendar somewhat, but it
doesn't easily include things like a Dr appt, resulting in multiple
places to look to figure out what needs doing and when.

It also fails to handle anything to do with reference material. The
only way to link anything with reference material is to manually add
the information to the event.

## [Zotero](https://www.zotero.com/)

This tool provides a great bibliography, and even has some ability to
include snapshots of pdfs, web pages, etc. It misses out on a key
aspect, though: Cross-linking the data. It misses out on the entirety
of the Zettelkasten system, and that system provides immense value.

It does not manage calendars, projects, actions, incubating ideas,
none of that at all. It should not be discounted, though. It provides
real value, in part because it's so specific about what it does.

## [Pocket](https://www.getpocket.com/) and [Goodreads](https://www.goodreads.com/)

These two tools maintain separate reading lists that are mostly
incompatible with each other. Pocket is used for anything on the web,
while Goodreads is used for anything offline. They do not integrate
directly with Zotero, are not a part of the next actions list, do not
participate in the calendar, and are essentially completely standalone
from everything else in this process.

However, they can (and should be) a part of the process, allowing me
to say "I have time to read, what should I read next?" In other words,
they should appear in the next actions list, they're just harder to
showcase in the process as it stands.

## [The Zettelkasten Method](https://writingcooperative.com/zettelkasten-how-one-german-scholar-was-so-freakishly-productive-997e4e0ca125)

A zettelkasten (or slip box or note box) is a different way of
organizing reference material into individual note cards. It provides
an easier way to roam through what you've learned over the years, and
discover new connections among these things. It even allows for you to
discover how your thoughts on a topic have evolved. For a reference
archive, it's absolute genius, and I wish I had been taught this
system (and used it) as a kid. I can't even imagine how much
information I'd have in my zettelkasten by now if I had.

A blog about how to use and maintain your own zettelkasten is
available, and has been quite interesting to read so far. See
<https://zettelkasten.de>

This does not have any means of tracking projects, calendars, action
items, what's been delegated, any of that. It's *only* for tracking my
personal reference archive.

## [Journaling](https://journey.cloud/)

Journaling apps do exist, and Journey.cloud is just one of them that
I've used. I've also used Orgmode for journaling. It's not explicitly
listed in the GTD process, but regular reviews are listed, and a
journal provides a way to do just that. They also provide a way for
people to snapshot their thoughts for a day, and some sort of support
for it should be put in place here.

They don't really connect with the other buckets, except for reference
material. A journal can link to it, or explain how that reference
material came about.

## [Habitica](https://habitica.com/)

Habitica (and others like it) provide habit tracking tools to help the
user develop better habits that the user defines. For instance,
getting in a daily workout of some sort would be a good habit to
track. These are the sorts of things that are usually not good fits
for agendas. They don't fit well as todo items, since they are
supposed to recur regularly. They're not reference. They're not
projects. They really are their own thing.

However, Brainframe is about helping to manage your life. Habits are
one of the things that people want to do better. Some sort of habit
tracker needs to be included.

# Processes To Incorporate

## Personal Review

* What are your values?
* How does your lifestyle reflect those values?
* What do you do that does not align with those values?
* What are your goals?
* What do your horizons looks like (see Getting Things Done book for
  definitions)

## Letter to future self

Not sure if this is a good one or just hokey, but I'm going to note it
in here for now. It might be able to help out as people work to define
what they want and help them move forward.

# Conclusions and Looking Forward

All of these tools provide essential elements of the whole process,
while not being fully integrated with each other or with our whole
digital world. Brainframe will seek to provide integration across
everything, to allow its users to cover all of the components from
above, and do so across their entire digital landscape:

* Desktop client (Windows, Linux, Mac support out of the box)
* Mobile client (iOS, Android)
* Web app (can be used at the central location as a traditional cloud
  based app, or a personal installation on a user's own site)
* Smart speakers (Alexa and Google Home)

It will store the user data in Markdown formatted text. Where the data
is binary (pictures, videos), it will attempt to store in a common
format (PNG for still images, MP4 for video). Other media to be stored
on a case-by-case basis, with the real possibility that some binary
data may be stored without Brainframe having the ability to do
anything with the data. For instance, data might be encrypted for some
reason, or it's a format known only to a single app (or two).

# Other Requirements I've Written Down

* A knowledge management system
* A to-do list
* A journal
* A bibliography (think something like Zotero, if you're familiar with that)
* A web page capture/clipper
* A "media to consume" list (books, youtube videos, something like Pocket on steroids)
* A way to share sub-sections of this with others (for instance, the journal likely should never be shared)
* Synchronized across multiple machines
* Stores everything in text (when possible)
* Allows attaching media to it (pics, videos, PDFs, etc)
* Cross platform (Win/Lin/Mac/iOS/Android)

# TODO
* Archive notes
* Bookmarking links
