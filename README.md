![screenshot](https://github.com/jakubhrstka/smashingkeys/assets/55590543/61aa826b-5698-4f8f-85fe-6e64461d230b)

# smashingkeys - a monkeytype.com clone app

Some sort of clone of Monkeytype typing test app. It features timer with predefined times and ability to set custom time, result summary after the test ends in simple and easy to read format, option to save the result, choose from multiple custom color themes, smooth visualization and realtime feedback on caret, typos and progress in general.

## Features

- Realtime feedback
- Custom timer
- Smooth and eye pleasing visualization of caret position, typos and progress in test
- Authentication through GitHub
- User profile with saved test results
- Leaderboard of all users and their saved test results
- Custom color themes saved to user preferences (for signed in users) or local storage
- Mobile responsiveness (recommended to use with dedicated keyboard)

## How it works

Core stack: Typescript + Next.js + TailwindCSS + Prisma + PostgresDB  
Hosted on Vercel

--

Test text is fetched from hipsum.co api and happens on load and while resetting the aplication (retry or new test run). After test is finished a result page is shown with correct typed words calculated as per 1 minute (if the test is run with different timer than 60 seconds) and accuracy (number of errors / number of correctly typed characters).
User can sign in with his GitHub account (NextAuth is used for handling authentication) and save test result after the attempt.
List of saved results is displayed on profile page. List of best results is displayed on leaderboard page (one per user and only name and profile image are used from the user's data to not leak any sensitive information e.g. email).
Timer can be set with predefined times or set your own by clicking on wrench icon.
User can choose from 2 color themes (bento for dark-ish mode and emerald for light mode). Chosen color theme is saved to user preferences for signed in users (DB, JWT token) or local storage for anonymous users.
UI is inspired by monkeytype application and bento color scheme aswell.
Components are styled with tailwind and application is written in typescript for type safety.

## Things to improve

- Create prettier and eslint configs at the beginning of the project in case some other person joins in (only local vscode prettier config is used at the moment)
- Testing - component testing using react testing library, e2e testing using cypress or playwright
- Option to save test results even if user isn't signed in yet (store result in local storage, user signs in and save the stored result afterwards)
- More color themes + nice to have: live previews on hover
