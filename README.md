#2DoBox Pivot

##Phase 1: Refactor

Your project should evolve, refactor, and clean up the code you inherit. This includes deleting redundant, broken, or obsolete code. However, you should not throw out the previous work wholesale.

Furthermore, there should be no reduction in functionality except when explicitly called for by new requirements.

There are no new features in this phase, however it is a good idea to generalize your application. For example, if there is an HTML element with the class of idea-save-button, then it should be updated to save-btn, which is less coupled to content and tied more to functionality.

Note: While refactoring, if there is functionality missing from the base IdeaBox project, you will need to implement that functionality as well in this refactor phase.

###Refactoring Guidelines

Here are some refactoring points we want to see in your project:

- Small JavaScript functions focused on single responsibility (SRP) - for example, one function should not handle both disabled button state and rendering elements to the DOM
- Consistent formatting, indentation, and naming schemes
- Smart, concise comments (only when absolutely needed for clarity)
- Little to no duplication in JavaScript (DRY principle)
- Avoid deep nesting (for if/else conditionals)
- Line lengths (keep them short and readable to avoid horizontal scrolling in your text editor)
- File and folder organization (images, CSS directories)
- Specifically, we’re going to set some constraints:

You cannot use any nested if/else statements
- When you can, you should not use anonymous functions (mainly looking at event event listeners for this)
- For example, if you find an anonymous function in an event listener, pull it out of the event listener and use a function reference as the callback function
- HTML must follow basic accessibility guidelines (semantic tagging, image attributes, roles)
- No use of global variables (we’re not saying you should never use global variables in life, but for this project it will be an exercise in not using global variables)
- Functions cannot be longer than 8 lines (including event listeners)
- When you “refactor,” you make changes to the code without changing any of its functionality. You can think of it like a “clean up,” for the sake of improving readability and quality.

This doesn’t include bug fixes or the addition of any new 2DoBox functionality. You might refactor code that you have written the day before, while it’s still fresh in your head, so that it is more readable and reusable when you may potentially look at it two months from now. As the motto says: “refactor early, refactor often.”

##Phase 2: Pivot

This is the existing IdeaBox functionality that should be pivoted for the 2DoBox user interface:

###Adding a new TODO

On the application’s main page, a user should:

- See two text boxes for entering the Title and Task for a new TODO, and a Save button for committing that TODO.

When a user clicks Save:
- A new TODO with the provided title and body should appear in the TODO list.
- The text fields should be cleared and ready to accept a new TODO.
- The page should not reload.
- The TODO should be persisted (in localStorage) - it should still be present upon reloading the page.
- The Save button should be disabled when there is not valid content in both input fields.

###Deleting an existing TODO

When viewing the TODO list:

- Each TODO in the list should have a link or button to Delete (or 𝗫).
- Upon clicking Delete, the appropriate TODO should be removed from the list.
- The page should not reload when an idea is deleted.
- The TODO should be removed from localStorage - it should not re-appear on next page load.

###Editing an existing TODO

When a user clicks the title or task of a TODO in the list, that text should:

- Become an editable text field, pre-populated with the existing TODO title or task.
- The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
- If the user reloads the page, their edits will be reflected.

###Filtering

We’d like our users to be able to easily find specific TODOs they’ve already created, so let’s provide them with a filtering interface on the TODO list.

- At the top of the TODO list, include a text field labeled Filter.
- As a user types in the filter box, the list of TODOs should filter in real time to only display TODOs whose title or task include the user’s text.
- The page should not reload.
- Clearing the filter box should restore all the ideas to the list.

##Phase 3: Add New Features

###Marking a TODO as completed

When viewing the TODO list:

- Each TODO in the list should have a button called Completed Task.
- When a the user clicks the Completed Task button, the idea should be either grayed out and/or shown with a strike through text.
- On reloading the page the page, the completed TODOs should be exempted (but not deleted) from the list.
- When the user clicks the show completed TODOs, the completed TODOs should be loaded back onto the top of the TODO list.

###Importance

Each TODO should be given a level of importance.

- As a user, I should be able to change the level of importance by up-voting or down-voting that specific TODO.
- Each TODO should start with a level of Normal.
- Levels of importance are as follows: 1) Critical, 2) High, 3) Normal, 4) Low, 5) None
- The change of importance should persist after a page refresh.

###Recent TODOs

The application should only show the ten most recent TODOS.

- The application should contain a button labeled 'Show more TODOs ....''
- When a user clicks on the 'Show more TODOs...' button, this list should load additional messages from the past.

###Filter by Importance

The application should allow users to filter the TODO list based on level of importance.

- Your application should have 5 buttons corresponding to each level of importance (Critical, High, Normal, Low, and None).
- When one of the filter buttons is clicked, the TODO list should only display TODOs with the selected importance.