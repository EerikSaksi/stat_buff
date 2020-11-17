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
  I have realized that React Native isn't as easy as Expo (which I have used previously.) React Native requires you to both know how to manage iOS builds and android builds, and I would require a mac to compile the iOS with XCode. Instead I'll use Expo, which is more limited in terms of freedom and libraries available,  but you only have to care about the singular Javascript code base.

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

client -> request (with Google tokenID)  -> pgSettings converts token to Google ID -> pgSettings passes Google ID as user_id -> postgres accesses user_id through current_settings function -> CREATE policy update_own ON user FOR update USING ( current_settings('user_id') = google_id )  (users can only update their own data each query)


## Nov 16 (4 hours)
- First I simply tried to pass hard coded user id to Postgres (not extracted from an incoming request), which worked.
- I was having issues with managing permissions with Postgres, until I realized that I was passing the admin's connection string. I replaced this with a new user who had no permissions outside of accessing the schema, who was granted row access permission (eg. can update rows in user table but only if boolean condition is true, such as id = current_user.id). I now succesfully manage permissions, but haven't yet managed to integrate the pgSettings variable (which should tell me which users data we can access) with Postgres.
- Next steps will be integrating with the client. I think this will be easy, as my query client provides a function which it calls to get an authentication header, so I will just have to call Google's token request function. I also already have a function that goes from tokenID -> googleID so this will not require much work.
- Also I had a meeting with my supervisor. We discussed plans and what we are supposed to do. I meant to make a recording of the app working, but felt like I needed to fix this backend issue before developing the app more. For next week I should fix this issue, work on the app and deliver a recording so that we can discuss the usability as my supervisor specializes in HCI so I should receive lots of valuable feedback.
