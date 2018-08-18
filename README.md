# Important Note
Remindo development is currently **on hold**. This is because Google just recently released their new version of the [Material guidelines](https://www.youtube.com/watch?v=XGH7xQpgt-U) (which are absolutely lovely), but because my main dependency (materialize) does not support the new guidelines as of yet and the fact that [enabling the experimental "import" keyword that Google's official module uses](git@github.com:material-components/material-components-web.git) is extremely annoying and difficult for Electron instances (it works fine on newer browsers), I will have to halt development until:
* A newer version of Node which allows the use of this keyword without annoying flags and file extensions
* A version of the official Google module which doesn't rely on `import`
* I fork the Google module and replace all instances of `import` with `require` (unlikely seeing as it's used often)
* `materialize` (the main dependency I use at the moment for all things material design) creates a new version featuring the new guideline updates

Thanks for your patience.

# Remindo
*A simple yet powerful application that can remind you of certain tasks.*

## What is Remindo?
Remindo is a reminder/to-do list that can help you stay on top of your life with advanced options like tags, comments, color-coding, markdown and more, whilst keeping a simplistic and sleek design.

## What's the goal here?
You may think that Remindo sounds like any other generic reminder-based application that "helps you stay organized", but Remindo (in the future) will support unique features such as;
* Cross-platform notification support
* Markdown
* Color-coding
* Multiple attachment support
* Due dates and alerts
* Priority and importance alerts/reminders
* The ability to change the font, position and sizing of specific cards

The goal is to remain simplistic and have a beautiful, user-friendly design, whilst giving the option to use more advanced and unique features to help those who are serious about organization.

## Development
Remindo is currently in an early alpha stage, very early in development. Bugs are to be expected, but if you wish, you can use the "Issues" section to report bugs and/or feedback to me.
It's worth noting that in it's current state, Remindo is only intended for developmental usage.
