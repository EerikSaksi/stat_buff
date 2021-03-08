--user strength (44%, 2.22 damage)
select "user".username, count(slug_name) as num_exercises, avg(strongerpercentage) as strength,  avg(strongerpercentage) / 100 *  ln(count(slug_name) + 1) * 2.5  as damage
  from "user" inner join "user_exercise" on "user".username = "user_exercise".username
  group by "user".username
  order by avg(strongerpercentage);


--team performance (average enemy level 4.40
select "battle".* 
  from "battle", "group"
  where "group".battle_number = "battle".battle_number
  and "group".name= "battle".groupName;


--your team contribution 
select "user".username, sum(total_damage) / group_damage * 100 as contribution
from "user", "workout", 
(select "group".name as groupName, sum(total_damage) as group_damage
  from "workout" inner join "group" on "workout".groupName = "group".name
  group by "group".name) group_query
where "user".username = "workout".username
and "user".groupName= group_query.groupName
group by group_query.group_damage, "user".username;


--app use (average opens 22)
select "user".username, count("session_analytics".created_at)
  from "user" inner join "session_analytics" on "user".username = "session_analytics".username
  group by "user".username
  order by count("session_analytics".created_at);


--total use (avg 16 minutes) 
select username, sum(analytics) / 60 from (
select username, (select sum(time_spent) from unnest(analytics)) as analytics
  from "session_analytics" 
  group by session_analytics.analytics, session_analytics.username
) query group by username order by sum(analytics) ;


