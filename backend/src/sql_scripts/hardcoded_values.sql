select create_user('orek', 'uh oh');
select create_user('eerik', 'stinky');
select create_user('private_team_creator', 'private_team_creator');
select create_user('no team', 'no team');
select create_user('Event Notice', 'sdfasdfasdfisdasdfasdf');
insert into
  "enemy" (level, max_health, name)
values
  (1, 10, 'Earth Golem');

insert into
  "group" (name, password)
values
  ('Team Public', null);

update "user"
  set groupName = 'Team Public' 
  where username = 'orek';

update "user"
  set groupName = 'Team Public' 
  where username = 'eerik';



insert into
  "bodystat" (bodymass, isMale, username)
values
  (85, true, 'orek'),
  (69, false, 'eerik'),
  (70, true, 'no team');



ALTER TABLE "user_exercise" DISABLE TRIGGER set_timestamp;
update "user_exercise"
set updated_at = '2020-12-03'
where username = 'orek';

update "user_exercise"
set updated_at = '2020-12-04'
where username = 'eerik';
ALTER TABLE "user_exercise" enable TRIGGER set_timestamp;


insert into chat_message (username, text_content)
values ('orek', 'Good day today, right?');
