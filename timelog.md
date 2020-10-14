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

how malleable is the schedule
Doesn't really matter

Is there concerns for doing too much too quickly
There isn't really worry for this.

What analytics

Interviewing people, qualitative interviews

Diary based studies, ask users regularly

Usability of the interface
Watch people use the app
Speak out about their use

More quantitatve
Track every single button click
How often they use
Different paths that they take
Clustering
Identifying key features in for example 5 different apps and make a table
The more academic leaning it is the more paper forcused it should be
exer game (wii)

Follow the references on pass the ball
Should users be allowed to play alone? Probably not.

## 11 Oct 2020

- 5 hours: Trying to get react natives google login working. Quite a hastle, as I need to get the compiled Android version working as if a native one.
- 1 hour: Read and analyzed the paper SpyFeet
  I have realized that React Native isn't as easy as Expo (which I have used previously.) React Native requires you to both know how to manage iOS builds and android builds, and I would require a mac to compile the iOS with XCode. Instead I'll use Expo, which is more limited in terms of freedom and libraries available,  but you only have to care about the singular Javascript code base.

 This video explains it quite well: https://youtu.be/uHlAM4ICi1s

