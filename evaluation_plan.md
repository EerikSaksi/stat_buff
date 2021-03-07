# Evaluation Plan

- Ideally, the evalution participation requests would start rolling out latest 1st of February (Start of Week 4).
- The participation requests will be simple messages asking if people want to download my exercise app, with a brief description of it. My app-embedded consent sheet will let me make my messages simple as the app explains the study and game in more detail.
- I think the latest join date for the study is week 7.
- I will likely let teams form organically. Users can join random teams or their friends teams.

- My primary data will points will be interviews/surveys with users after they have used the app for about 2 weeks. I will get in contact via email, as I can see registered users through Google's sign in API.

  - Some questions that I should ask in interviews/survey
    - Did you experience technical difficulties/did you have any issues with the app (although not relevant to the study, this will hopefully remove technical issues from the rest of the answers)
    - Have you used any of these apps before/have you used any of these games?
    - How much to do you train baseline
    - Public/friend team
    - Age/gender/location
    - Did you find yourself more motivated to train than usually? (broad overall effectiveness response, allows us to branch out in to specifics)
    - Were you motivated to strengthen your character/workout? If so, was it because you wanted to improve your character or because you wanted to help your team?
    - Did you like getting a cooler looking character, and increasing their strength (personal motivation)
    - How would you describe your teams atmosphere? Were you more supportive of one another, or more competitive?
    - Did you feel obligated to do your part towards your team, and look down on members that didn't?
    - Did they get warning on adding too much weight and did click video?
    - What additional features or changes would you suggest?
    - What would make you use it longer/if features were present would you use?

- In order to analyze this data, I will hopefully analyze responses and place users on a x/y axis, where the x axis is a continium from "complete self centered motivation" -> "complete collaborative motation", and the y axis goes from "the app was not motivating at all" -> "the app was extrememly motivating." This should provide me with a graph, which shows me how motivated users were, were they driven by standard personal motivation or collaborative motivation, and whether personal or collabative motivation lead to more training motivation.

- Log data will also be valuable

  - I haven't really analyzed log data before, I will have to consult with my supervisor first. Currently, my app saves an array of [section, time] pairs that shows the paths that a user takes and how long they spend on each section. One quantative way of going about it would be to weigh different sections/paths in terms of personal/team focused actions, and use these estimations to draw conclusions. For example user -> workout -> team -> messages could be seen as more team based, while just user -> workout would be more self centered, as the user didn't check up on their team after it. It is hard to separate these two, as more self centered acts such as working out help your team. It could be that all user actions are by default weighted as personal motivation, but flipped if the user checks up on their team (as then they clearly wanted to help their team).

- I also store data such as workouts, chat messages, and strength updates. The frequency at which users update workouts and exercises will likely only tell me how much they exercise/engage with the app, but it could serve as a normalizer for other events (if the user chats a lot but they also engage with the app a lot, their chatting wouldn't be as significant). Chats will be very valuable, as they will give me a window into whether users get into fights or get along well, random users vs friends, etc.

Week 4 - Week 6/7 recruit users
Week 6/7 - Week 8/9 start sending out survey and interview requests as users have used the app for at least two weeks
Week 8/9 - Week 11 data analysis

Throughout all this time I will be addressing technical issues, responding to messages, writing my report (on non evaluation specific topics) and fine tune data analysis (for example writing an analytics scorer)
