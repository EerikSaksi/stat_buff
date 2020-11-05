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
