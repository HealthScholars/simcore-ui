#### Design Discovery - SimCore  "Launch Pad" - 02/2018

## Problem:

SimCore's __user interface__ and __dashboard__ is:

`Confusing`: users are not sure where to find the Simulation and Virtual Learning Library.

`Difficult to Use`: users have trouble with, the navigation, how certain menu items are organized, and the content management experience.

`Visually Unappealing`: the user interface looks outdated and does not have SimCore or HealthScholars product branding applied.

### Pain Points

- __CEDs__
  - need clear and easy access (only non-standardized patients)

- __Scenario Library__
  - completion icons are confusing

- __Content Libraries__
  - confusion around the difference between Scenarios and VLE libraries

- __Dashboard__
  - current state lacks a clear pathway to vital tasks or frequently used sections

### Users' Needs (WIP)

__All Users__

- Calendar
- Content Libraries
- Tracking
- CEDs

__Admin (MFA, FA, DA)__

- Calendar
  - Scheduling
  - Events
- Content Libraries
  - Scenarios
  - VLE
  - Assignment Manager
  - Run Sessions
- Tracking
  - Feedback
  - Learner Portfolios
  - Completion Status
  - Reports
- Assets Manager
  - Media
  - Equipment
- Settings
  - User/Facility Management

 __Instructor__

- Calendar
  - Scheduling
  - Events
- Content Libraries
  - Scenarios
  - VLE
  - Assignment Manager
  - Run Sessions
- Tracking
  - Feedback
  - Learner Portfolios
  - Completion Status
  - Reports
- Assets Manager
  - Media

 __Learner__

- Calendar
  - Scheduling
  - Events
- Content Libraries
  - My Learner Portfolio
  - My To-Dos
  - Course Catalogue

## Objective:

__Clarify__ and __Streamline__ the process needed to complete a task.

`Evaluate`, `Organize`, `Design`, and `Develop` a user interface that provides *clear* and *direct* access to:

- __application and navigation menus__
- __scheduling and event calendars__
- __scenario and virtual libraries__
- __administration tools__
- __profile settings__
- __analytics__
- __media items__
- __content management__

`Evaluate` research the current state of the application, each user role, and every possible interaction available.

`Organize` the current navigation and menu system, critical user tasks, and frequently accessed content items.

`Design` the application's landing page, navigation architecture, master page template, and style guide.

`Develop` scalable Vue.js components based on guidelines from our [Design System](https://docs.healthscholars.com/showfile/Development/Design%20System.html) and [Agile Manifesto](https://docs.healthscholars.com/showfile/Development/Agile%20Manifesto%20Team%20Notes.html).

## Context:
This *landing page* provides global navigation and quick access to *critical* and *recurring tasks*. Some content items' visibility will vary based on *specific roles* and *permissions*. The current navigation and menu iconography is not well organized or clearly labeled.

## Concept:

SimCore's application gateway. A visually re-designed and organized user interface and navigation menu. A better way to provide *clear* and *direct* access to:

- __global navigation and menus__
- __content libraries__
- __availability calendar__
- __event scheduling__
- __account management__

## Rules (WIP):

- The most important content items should *always be available*.
- User roles determine if certain content is visible or hidden.

#### RULE 1: Organize Global Navigation
The user must be able to understand where to find the most important sections of the application via the global navigation. These sections should be properly grouped and labeled to avoid _confusion_. user account settings, within the very first moments of using the interface.

## Models:

TBD
