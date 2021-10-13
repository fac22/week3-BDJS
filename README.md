# Week3 - BDJS

Authentication

## Co-authors

$ git commit -m "Refactor usability tests.

Co-authored-by: danilo-cupido <81513148+danilo-cupido@users.noreply.github.com>
Co-authored-by: cerealenjoyer <59370143+cerealenjoyer@users.noreply.github.com>
Co-authored-by: 0bubbles0 <77367593+0bubbles0@users.noreply.github.com>
Co-authored-by: jijip41 <78619809+jijip41@users.noreply.github.com>"

## Roles

UX &rarr; Sasha
DevOps, Deployment &rarr; Ji
Facilitator, Scrum &rarr; Barbara
Quality Assurance &rarr; Danilo

## Our Links

- Installation commands (Thanks, Ji :+1:): <https://hackmd.io/MkbkWLQ1QKiqR2VJmfjing>
- Miro board: <https://miro.com/app/board/o9J_lqhxUgs=/>

## Our Mistakes & Fixes

- `npm install dotenv`

## Description

<https://learn.foundersandcoders.com/course/syllabus/apprenticeship/authentication/project/>

Your project this week is to build a web app that authenticates users and stores user-specific data in a PostgreSQL database.

Our app, ${placeholder} is looking at disrupting 'doing a coffee run'.
Instead of asking around your office and trying to remember everyone's drink order, ${placeholder} lets you see everyone's drink order wherever they are: At their computer, in the queue at starbucks, even ${somewhere else}!
Simply log on and put in your drink order, and your coworkers will be able to access that data from their app. We at BDJS know that tastes change and develop over time, so if you need to change your coffee order, that's no problem! Just log back in and change your order.

### User stories

#### Core

- As a user, I want to: submit information to your site for anyone to see
- As a user, I want to: come back to your site later and see what I posted is still there
- As a user, I want to: be the only person allowed to delete my stuff
- As a user who needs a coffee, I want to: Log in and share my favourite drink
- As a user who is buying coffee, I want to: View everyone's coffee order, so I know what to get them from Starbucks

### Acceptance Criteria

- Forms for users to sign up and log in
- A form for users to submit data only accessible to logged in users
- A page showing all the data
- A way for logged in users to delete their own data
- Semantic form elements with correctly associated labels
- A Postgres database hosted on Heroku
- Hidden environment variables (i.e. not on GitHub)

#### Stretch criteria

- Tests for all routes
- A user page that shows everything posted by a single user
- GitHub Actions CI setup to run your tests when you push

### Example project ideas

- Founders & Coders book sharing system
- Food / coffee recommendations around Founders & Coders
- Founders & Coders events calendar
