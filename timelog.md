# Timelog

Collaborative Activity Tracker
Eerik Saksi
2392230S
Alistair Morrison

## Guidance

- This file contains the time log for your project. It will be submitted along with your final dissertation.
- **YOU MUST KEEP THIS UP TO DATE AND UNDER VERSION CONTROL.**
- This timelog should be filled out honestly, regularly (daily) and accurately. It is for _your_ benefit.
- Follow the structure provided, grouping time by weeks. Quantise time to the half hour.

## Week 1

### 4 Oct 2019

- 2 hours: reading the paper recommended by supervisor "Pass the Ball: Enforced Turn-Taking in Activity Tracking". Although this wasn't directly related to my project, it gave some valuable information that I can apply to my own project.

## 5 Oct 2020

- 1 hour: meeting with supervisor. We also discussed about what I should do before the next meeting. I should make my plan for software development of the project in the timeframe of until end of December, and consider what the priorities of the app should be (fun vs inciting behaviour change, targeting beginners or already exercising people)

## 6 Oct 2020

- 1 hour: writing plan
- 3 hours: setting up React Native client and then setting up running on my phone. This took a while because I needed to install Android Studio, make sure all the SDK's were intalled, and it took me a while to realize I needed Java JDK 8.

## 9 Oct 2020

- 1 hour: converted both backend and frontend to typescript

## 10 Oct 2020

- 3 hours: played around with setting up PostGraphile as a library. Tried to drop tables from the database and accidentally messed up entire datbase and had to reinstall everything until I figured out I was running multiple clusters at the same time which I had to remove. Will probably just stick to an ORM like sequelize from now on.

## 11 Oct 2020

- 2 hours: analyzed existing products and appended existing research to new file, research.md
- 3 hours: setup Google OAuth console. Installed google login library in the app. Currently cannot connect the app to the client. Created User table in backend and inserted test user and PostGraphile automatically generated queries (and handled middleware).

- 0.5 hours: meeting

Discussed the importance of following the schedule (the plan is only for me). I asked about potential evaluation methods, and some that were listed were tracking events and analyzing the logging. I could analyze different paths that they take around the app, and how often they use, etc.

## 11 Oct 2020

- 5 hours: Trying to get react natives google login working. Quite a hastle, as I need to get the compiled Android version working as if a native one.
- 1 hour: Read and analyzed the paper SpyFeet
  I have realized that React Native isn't as easy as Expo (which I have used previously.) React Native requires you to both know how to manage iOS builds and android builds, and I would require a mac to compile the iOS with XCode. Instead I'll use Expo, which is more limited in terms of freedom and libraries available, but you only have to care about the singular Javascript code base.

This video explains it quite well: https://youtu.be/uHlAM4ICi1s

## 11 Oct 2020 - Nov 3 2020

- You might notice a gap in timelogging during this period
- I had a hard drive problem that took over two weeks to repair, and I lost all my data.
- During this time it was unrealistic to set up environments and work on my parent's computer, so I did a literatrue review and paper summaries on 5 different papers, and got ahead on other classes.
- I plan on getting a lot of work done in the following days and weeks.

## Nov 4 (6 hours)

- I got the Google login working with firebase now on client side: I built the app, I'm prompted for a login and the response showed my data as well as an token ID I can send and validate with my backend.

- I started setting up authentication on the backend (which I have done before). I did a lot of reading in to PostGraphile docs and I came to the following conclusions:

  - Users Google IDs/emails need to be stored in a private schema, where PostGraphile doesn't auto generate relations that allow malicious users to steal them.
  - In order to implement data fetching through token IDs, I need to extend the PostGraphile resolvers manually, and include a query that uses Google's API to convert the token ID to a Google ID, which should then fetch the username from a private schema, which can then return all data for that username.

## Nov 5 (6 hours)

- I managed to create the aformentioned custom query. The query takes a tokenId, sends it to Google who convert it to a GoogleID which I use to select the username from a private table.
- Lost an hour because I moved my .env file away from the root directory which meant that process.env.DATABASE_URL didn't exist, which was causing a weird error with PostGraphile.
- Managed to wrap the expo app with an ApolloProvider tag, which allows me to execute queries to the GraphQL API at the specified URL.
- Forwarding queries now works. I can send and receive the custom token ID query (app to server back to app). I have not tested the full login as its a bit of a hastle to test.
- I tried to use their design pattern (public and private schema) but it didn't hide my tables from the API, and all relations became really verbose (appPublicUser instead of user). I decided to instead add the @omit comment on the userID table which prevents it from being read on the API.
- The idea is that if have a resolver that goes from tokenId -> user through Googles system, I can then go from user -> group and group -> users and users -> data for example, which will be fully auto generated by PostGraphile recognizing foreign keys. It has been a hastle, but pretty magic, right?

## Nov 9 (4 hours)

- I have fully integrated and tested Google authentication with the mobile device and the API
- Removed Typescript from the backend. My language server was constantly complaining of non issues which made seeing real issues harder, and PostGraphile is truly so useful that I really won't write much code to even type check
- Created groups tables and managed to created indices in the SQL script for foreign keys which makes PostGraphile auto generate queries like group(name: "Dream Team"){findUsersByGroup{ username}} to get the names of a particular group.
- Development will now move more towards the App. I was initially planning on using symmetricstrength.com, but they're not responding so I have messaged other websites.
- I will have to make some decisions on for instance what RPG art pack I might use for enemies and for the persona of the current character and how the navigation in the app should feel.

## Nov 11 (3 hours)

- Separated the initial app launch in to various parts depending on the user query (user existence hasn't been fethced (null) which prompts login if automatic login doesn't work) and true and false if it does or doesn't exist. I conditionally render the rest of the app or a username picker. This username picker runs regex on the username making sure it's valid (which is also done in the backend aswell) and also calls the automatically generated user query, which allows me to query users by username. If the result is non null prevent creation.
- I realized that the google auth library I'm using has a very neat and handy getCurrentUser() which gives you a tokenID along with other information, which can be used to call methods that get/set sensitive info, as the backend will validate and connect who sent the token.
- I have come to realize that UI design will be a bigger barrier than I initially thought. I consider myself reasonably good in web dev, but mobile development is a different beast.
- I have now contacted strengthlevel.com, which is very similar to symmetricstrength.com

## Nov 13 (3 hours)

- Worked more on the create user page. Added a nice little blurred background image (royalty free of course). I'm working a lot on UI design now. Also worked on decomposing components in to more reusable ones to increase code reuse.

## Nov 14 (2 hours)

- Got the color working for the username creation (green if ok username, red if not ok, and white if empty.)
- Started dividing the app more (you start in the authentication component, which either sends you to user creation or the main app component, and the main app has two tabs for you and your group)

## Nov 15 (5 hours)

- As I was designing the group page, I realized that I needed to include a search feature.
- I did some digging and managed to get a filter plugin working with PostGraphile.
- This allows me to add to the query "filter: {name:{startsWithInsensitive: $query}" which only shows groups with names that start with $query (disregarding case). PostGraphile also allows me to add a first: 5 parameter which ensures I only get at most 5 elements
- I realized that I had to do a little bit of research and refactoring with PostGraphile. The library auto generates CRUD (create read update delete) operations for all publicly available relations. This is problematic without any kind of security, because someone could for example run deleteUser(username: "not mine"). One solution is to hide these auto generated queries, and instead manually authenticate the Google token ID and to convert it to a Google one, and then perform the operation after the authentication. This is time consuming (instead of having an auto generated relation that handles all the latest fields I might have to implement updateUsername and updateAvatar and updateGroup) which would defeat the purpose of this library. I did a lot of digging and realized that there's an option called pgSettings that acts as initial middleware to the request. pgSettings can for example validate the sent Google ID token, convert it to a google ID, and then pass it as context to the database as user_id where it can be accessed for that user's request with current_setting("user_id").
- So in short (well not very short, this has been a lot to digest in a day):

client -> request (with Google tokenID) -> pgSettings converts token to Google ID -> pgSettings passes Google ID as user_id -> postgres accesses user_id through current_settings function -> CREATE policy update_own ON user FOR update USING ( current_settings('user_id') = google_id ) (users can only update their own data each query)

## Nov 16 (4 hours)

- First I simply tried to pass hard coded user id to Postgres (not extracted from an incoming request), which worked.
- I was having issues with managing permissions with Postgres, until I realized that I was passing the admin's connection string. I replaced this with a new user who had no permissions outside of accessing the schema, who was granted row access permission (eg. can update rows in user table but only if boolean condition is true, such as id = current_user.id). I now succesfully manage permissions, but haven't yet managed to integrate the pgSettings variable (which should tell me which users data we can access) with Postgres.
- Next steps will be integrating with the client. I think this will be easy, as my query client provides a function which it calls to get an authentication header, so I will just have to call Google's token request function. I also already have a function that goes from tokenID -> googleID so this will not require much work.
- Also I had a meeting with my supervisor. We discussed plans and what we are supposed to do. I meant to make a recording of the app working, but felt like I needed to fix this backend issue before developing the app more. For next week I should fix this issue, work on the app and deliver a recording so that we can discuss the usability as my supervisor specializes in HCI so I should receive lots of valuable feedback.

## Nov 17 (5 hours)

- I have now verified and made sure that I can pass the username from nodejs to Postgres for a particular query, which then only allows access to rows that contain user info. I also verified that I can send a auth header from the client which could contain the token that can be deduced to a username
- I have not done a full integration test yet. Because the Google sign-in library only works in the compiled app,I have used fallback values (for example, instead of querying user, just setting username to eerik.) Just to save time in future builds, I will implement some fake queries (for example, fetching my data without requiring a token). After this switching from tests to real builds will be as simple as disabling fake queries, enabling google token auth headers, and enabling token validation in the backend.

## Nov 17 (6 hours)

- I refactored my app to remove all authentication logic as the authentication is now defined in just one place so it can be removed.
- I made it such that I can test locally without using the client side Google library, and without using the token validation, and also in a way where I only have to change a few lines of codes to make this happen.
- Certain attributes of users are now readable for everyone (everything but the googleID), but all other operations (update, insert, delete) are restricted with an ID check (where the ID is a validated token).
- I struggled for a long time to actually get the checks for the different restricted operations to work. The issue in the end was that the boolean condition that checks if the passed googleID was the same as the one validated from the token needed to have permission to select the googleID to evaluate the condition. I removed this selection permission because I didn't want those to be accessible. I solved this by reenabling the select permission, but omitting googleID from being visible from the API with an @omit comment on that column.

## Nov 22 (7 hours)

- I have now fully integrated the different components together, such that creating a user refetches the user data and thus takes youto the user page
- I got the validation working properly for my custom defined resolvers by using a Postgres settings.
- I started doing some scraping for a site that evaluates performance and found one that works with curl, this could be a possible solution for getting relative performance
- Searching for a group and clicking on it lets you join that group.
- I have done some work on UI design for the sign in/create app, but my UI for user/group mostly just validates that the queries work. Once I know what data I will present I will develop the UI more

## Nov 23 (4 hours)

- I implemented a scraper for the site strengthlevel.com by analysing the requests sent by the program and copying the request as a fetch. As it was a request sent from a domain, I had to apply the intermediary certificate as a https agent parameter for the fetch, which took a bit of tiem to figure out.
- Coincidentally, the owner of strengthlevel also messaged me asking what I need to use his cite for, so they might give me access to their API, or their internal logic they use to calculate relative strength.
- Implemented body stats table, these are only accessible and mutable by the user who these belong to. These include gender and body weight (might also include age once I figure out if it should be a range or any value).
- I thought about how I could make my app look nicer. I realized one easy way would be to have different characters that the user could use, for instance this one https://luizmelo.itch.io/ghost-warrior. It has idle and attack animations, and the creator has many other ones in the same style. These would cost a bit but I want to include this in a resume so it would be worth it. I could have 5 different characters for the different strength classifications (beginner, novice, intermediate, advanced, elite) where the characters get cooler and look nicer.
- Before I have thought about simply having the characters perpetually attack, but I figured that a better idea might be to have the characters attack n times after you workout, where n is calculated based on the difficulty of the workout. The damage of each swing would be based on the strength of the player. This would combine progress but also training consistently and hard.
- I also had a meeting with my advisor. We discussed that we should include user stories, wireframes, ER diagram (databases). ''
- Papers (not high priority, design is the most priority)?

## Nov 24 (5 hours)

- Implemented animated characters in the app. I wanted to make sure they work in the real app before implementing in Figma.
- Parsed all exercise names from strengthlevel.com, can be used to fetch standards for a particular exercise
- Added them to a table by their popularity ranking, so all searches will be ordered by their rank
- Implementing modal popover that lets you update your body data and exercises in the user page.

## Nov 25 (4 hours)

- Finished the parse of all exercises, and integrated the users body stats (a user who has given their stats can find their relative strength as a percentage.)
- Refactoring. I realized that I should be able to open another users page, so instead of passing the current authenticated users name in to the user component, I fetch that from the local state. This way if a username was passed we know we are looking at another users page, so we can omit things like edit profile.

## Nov 26 (6 hours)

- Added a modal popup on the user page. Clicking on it let's you set your body weight and gender and save it to the database. Really pleased with the logic for this: first it tries to fetch them from my server: if they exist, it prefills the inputs and switches the button to (update) which calls update body stats instead of create to avoid "duplicate primary key" issue.
- Also implemented exercise search: you can search for any exercise enter the reps and weight, which gives you a percentage strength value. This is not yet sent back to the database or persistent, which needs more work.
- Once this is done I can calculate the strength of a user by taking their average relative stronger than percentage. This means that we have met (at least my own) minimum specification for user stats. I still need to implement tracking workouts which lets you attack based on the frequency of the workout.

## Nov 27 (5 hours)

- Exercise data is sent to the database now. It first shows you the percentage of relative strength, and then asks you to confirm. This is good because the tracking of some exercises is ambiguous (if you use two dumbbells do you track both or 1?). Getting a really high or low value will make you realize the issue.
- The data is also persistent like the weight and gender. If you close the app, the exercise data will be there, and reps and weight will be prefilled.
- Added a filter which only shows exercises that you have logged, which allows easy updating/deletion for existing exercises.
- Separated the body stat update and the exercise search in to two different modals, as it was a bit crammed having both forms and search results for exercises come up. This also makes the logic of forcing the user to enter their body stats before they calculate their strength easier.
- Finished ER diagram illustrating a simple query, and a query requiring authentication. I didn't go in to much detail about the implementation of each technology (for example, I didn't talk about the tables in my database.) I am not fully sure about the requirements, so I will talk to my advisor about this. https://drive.google.com/file/d/1XRXI-DjldtAq4NITHhNCsKDC-83fxlEG/view?usp=sharing
- Next step's for user include calculating the users strength and thus calculating their character's damage, aswell as giving the user a cooler looking avatar whenver they make it to a new classification. I also need to add a workout log which then lets your character attack n times based on the intensity of the workout. I will probably only do this once I have implemented the enemy in the group page.

## Nov 28 (3 hours)

- Finished user stories. I am not very experienced with this, so I expect that I will have to refine them based on my feedback from my supervisor.
- Finished Figma design https://www.figma.com/file/snj7PAjmHJOEm6HVV61Htp/rogym?node-id=5%3A5

## Nov 29 (6 hours)

- There's now guidance in the input order. You can't track workouts before filling in body stats, and you must fill in exercises before tracking a workout
- Made the body stat modal visually better. Before the modal took up the whole screen but it only had a gender and weight picker and a submit. Now it is much smaller and has a nice shadow effect over the user page.
- Saw a black friday sale on rpg assets, and decided to buy it. I have 8 different enemies and many different player characters.
- Added average strength query, which can be used to calculate strength and thus DPS.
- Implemented idle characters for 5 different characters that are chosen based on your average relative strength percentage.
- Added refetch prop to children of user: For example, I check from the root if the user has added their weight and gender, and I refetch after the child component sees this as submitted.
- Fixed bug where I wasn't recalculating relative strength when updating reps and weight.
- Weird bug, still not fixed. I pass a refetch for average strength to the strength form, so whenever you update or create exercise strength data, the average is recalculated. This refetch is triggered by the onCompleted hook of the exercise create/update, so the new data should be there. I also verified that the new average is in fact queried after the create/update from the server logs. Strangely, the average returned by the refetch is the old average. This probably has something to do with the fact that the average is a custom function, and might not have access to some memory of values that are queued to be written. Either way, annoying.

## Nov 30 (2 hours)

- Fixed another annoying bug. I realized that the postgres functions do not work very well, or at least do not fetch the most recent data. This problem was causing the updated username sometimes to be available and sometimes not. Also, for whatever reason, the onCompleted hook for the useQuery hook (function called when the query that was passed to useQuery resolves) does not get called when refetching data, which is also annoying.
- Other than that, noticed a small bug where usernames weren't being validated on client side for illegal characters but they were on the backend, so you were stuck pressing the create user button hoping that it would work.
- Made a video recording of the state of the current app. This was around the user tab as that is where I have done the most work.

- Normally user stories stop where before they need the user stories. This might not be an issue unless word count is an issue.
- Update strength numbers on figma. Embed search box and more exercises.
- 200 hp left, how much out of health, and how much time have you spent so far.
- Maybe health bar or a clock
- History of attacks
- Timestamps
- Extra screen for just the team leaderboards, current and total
- Extra screen for just the current task and information on that
- New screen should be a new concept
- More information about the other users and their workouts
- Clearer descriptions about how workouts and strengths connect
- Log workout should take more inputs, but also prefill defaults (people hate filling inputs more than once)
- Crab defeated: new history
- Overall history, all enemies that have been defeated. If you clicked on it, you can see the breakdowns of all the workouts that defeated it.
- ER diagram that describes the database and shows the database and what I might have
- Planning out all the screens

## Dec 1 (3 hours)

- Finished ER diagram but for real this time, I accidentally made a system architecture diagram before.
- Implemented some of those new tables
- Added created and updated at timestamps that are automatically triggered on create and update on most tables (this will be good for future extensibility, and for things like logging and debugging). It is also necessary for some tables, such as the enemy table, as it spawns at a certain time and you have a certain amount of time to defeat it.

## Dec 2 (4 hours)

- To be honest, really didn't feel like getting work done today
- There were still some menial tasks I needed to get done so I decided to do those
- My node client automatically calls the SQL scripts when launching. This makes it easier to make changes to the database, as I can run the new scripts and the server at once. This will also make builds much easier once I host the server, as I won't need to open the CLI for the remote database after the build to run the scripts
- Did a little bit of refactoring of files, thought about the component structure for the groups and made skeletons for those components
- Decided to go over the enemy assets that I downloaded. They require a bit of preprocessing (concatenating the sprites that I need row by row, specifying how many rows and columns there are, and what animations are on each row). These sprites also need to manually sized and have their margins adjusted, such that each one is centered and has roughly the same bottom vertical position.
- Next steps include editing the figma diagram to fix previous issues as well as designing the group view. I need to create a script that generates enemies with progressively higher levels and health counts, and refer to different enemies (which will trigger loading a different sprite and name on client side). Hard coding this once will give everyone a consistent experience and save processing power.

## Dec 3 (4 hours)

- Created script that auto generates 300 levels of enemies, rotating characters and upping their hitpoints
- Figured out how to set up auto triggers for the enemy metadata table. I have a table for each group that stores the current hitpoints and remaining time to defeat the current enemy. I created a trigger that auto generates the meta table with level = 1 when a group is created, and one that sets the current health to be equal to the max health on update (but only if the old level does not equal the new level, or the enemy changed).
- Started making the enemy information page. It fetches and renders the enemy, it's current health and name, and renders the correct sprite.

## Dec 4 (5 hours)

- Renamed all enemies from boring names like frog_man to "Frogman, King of Deadlift Leverages".
- Divided screens in the group section. It now shows the enemy, its health, time remaining to defeat on one top tab, and yet to implement, stats for the current enemy and members of the team.
- I will try to update my figma, finish the stats page and create the workout tracking for tomorrow.
- Implemented damage calculation. I do this by multiplying the your average relative strength percentage (for instance, stronger than 60% of male lifters at 80kg) by the number of exercises you've tracked. I think this is better than just looking at average strength, as otherwise the optimal strategy would be to only track your best exercise as that would result in the best average.

## Dec 5 (6 hours)

- Instead of storing the current enemy level and having a metadata table, the group now stores a "battle number" which is the nth battle that they are fighting. This is important, as you might get stuck on an enemy and thus have multiple battles against the same level. This will make it easier to show stats on the current enemy
- This also meant I had to refactor the frontend as the query structure changed. This is why I favor working first on the backend, but often you don't realize what you need until you start implementing
- Created workout table
- Worked on implementing more complex row level security
- Turns out that all my sprites were manually adjusted wrong. I hard coded margin adjustments, but turns out margin adjustments take size in to account, so when I tried to create a smaller sprite for the workout battle screen, the different sprites were at inconsistent heights. Using absolute positioning with left, right etc. works fine. I had to manually render, readjust until the sprite was placed correctly until they were good again for all 6 player characters and 8 enemies. Hopefully for the last time.

## Dec 6 (5 hours)

- Finished up figma
- Added new changes to ER diagram
- Finished first prototype of group events feed
- Added workout tracking
- Had meeting. We had a long discussion about whether tracking workouts and tracking exercises should be a separate action, or a simultaneous one. My supervisor had a good argument that you need to workout to track exercises, and that it is confusing to do both at the same time. My argument was that I want the user to realize that their contribution is based on both their strength but also how hard they workout (rewarding performance but also effort). I also want the action of tracking workouts to be as easy as possible as this is done frequently.
- Should strength be rewarded? Yes long term, people see the progress
- Should workouts and strength exercises be tracked together
- Chat

## Dec 8 (4 hours)

- Started working on the workout animations

## Dec 12 (3 hours)

- Finished workout animations

## Dec 13 (6 hours)

- Trying to make workouts save values to the database so that progress isn't just local
- On a side note, I tried to get some database functions working again, as they had some reusable logic that I could use to save the damage dealt by an enemy.
- I realized that the reason that my functions hadn't been working was because I declared them as immutable, which meant that the compiler assumes that same args -> same output, which isn't suitable for a function that queries the database (as these values might change).

## Dec 14 (6 hours)

- Workouts now deal damage that is reflected in the view
- Finally finished the animation of dealing damage to the enemy
- Weird bug: the damage dealt by a workout is the last workouts damage, and not the current?
- Had meeting
- We dicussed whether leftover damage should be spilled over to the next enemy or if it simply wasted?
- Could be annoying, but also encourages cooperation (someone with a shorter workout could track first)
- What notifications or updates should users receive about their team and their team killing enemies

## Dec 15 (5 hours)

- Fixed the afformentioned bug where workouts would deal damage delayed. I think this was caused by an accidental race condition as I had two database triggers that triggered before inserting a workout. This is now one trigger.
- I needed some way of creating a default level 1 battle for a group. The way that I got this working was by creating a trigger that is triggered after a user changes group. The trigger checks if the group doesn't have a battle, in which case it also checks if the team has at least 2 members. In this case, the team is large enough to start. I will probably also use this trigger to scale the max health of enemies higher or lower when a member joins or leaves to make any sized team viable.

# Dec 17 (4 hours)
- You can now view history for all battles, and not just current
- Figured out how to trigger data refresh for new workouts and new damage dealt to the enemy whenever the screen is loaded. This is also done efficiently with caching.
- My query client was complaining about caching, so I did some research and understood that I had to tell my client what the unique identifier(s) for each type (such as a group or user) are. Luckily, postgraphile ships with globally unique attributes called nodeId's for all tables, so  all I had to do was append nodeId to all attribute I already fetched, and specify to my query client that the nodeId is the unique identifier.  This has cut down on the amount of queries that my client is making. It's also good, because whenever a refresh is triggered, the cached data is shown until the new is loaded. 

# Dec 25 (4 hours)
- Worked on setting up password protections for groups
- I use the pgcrypto library with a salt and compare the encrypted passwords together
- I initially wanted to do public/invite only groups, but I realized that another user would need to change a users group, which would need to bypass row level security with a security definer function, which seems like bad practice.
- Also set up joining public groups
- Public groups have a simple join button but password protected ones also have a password field.

# Dec 26 (6 hours)
- Started making a create group view
- Trying to track a workout without a team will now navigate the user to join one
- Creating a team will not start a battle, and will tell the user that they need another member
- Users can join a "random" team. In reality, this will put the user in a public team with the least members, breaking ties by taking the oldest one. This should help prevent huge teams and should prevent a user with no friends that want to play with them from having to wait too long for a stranger to join.
- Creating a team is now fully working. You can choose to include the password. You are also automatically placed in that team when you create it, and set as the creator 
