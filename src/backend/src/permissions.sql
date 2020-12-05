--ensure no privileges that were set before exist
drop owned by query_sender;
drop role query_sender;
create role query_sender;
alter role query_sender with login;
alter user query_sender with password 'restrictedPermissions';

grant all on database rpgym to query_sender;
grant all on schema public to query_sender;
grant select on table "exercise" to query_sender;
grant select on table "enemy" to query_sender;

grant all on table "user" to query_sender;
grant all on table "group" to query_sender;
grant all on table "bodystat" to query_sender;
grant all on table "user_exercise" to query_sender;
grant all on table "battle" to query_sender;
grant all on table "workout" to query_sender;

comment on column "user".googleID is E'@omit';
comment on table "user" is E'@omit create';
comment on table "group" is E'@omit update';
comment on table "bodystat" is E'@omit all';
comment on table "battle" is E'@omit create, update, insert, all';
--comment on column "workout".id is E'@omit create, update, insert';

Alter table "user" enable row level security;
Alter table "group" enable row level security;
Alter table "bodystat" enable row level security;
Alter table "user_exercise" enable row level security;
Alter table "battle" enable row level security;
Alter table "workout" enable row level security;


CREATE FUNCTION active_user() RETURNS "user" AS $$
  select * from "user" where googleID = current_setting('user.googleID')
$$ LANGUAGE sql IMMUTABLE STRICT;
--comment on function "current_user" is E'@omit';

CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_delete ON "user" FOR delete to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_create ON "user" FOR insert to query_sender with check (googleID = current_setting('user.googleID'));
CREATE POLICY user_select ON "user" FOR select to query_sender using (true);

-- --any user can update the group, but these mutations are omitted. The group updates are executed automatically, for example when a user deals damage to the enemy which triggers the next level.
CREATE POLICY group_update ON "group" FOR update to query_sender USING (name = (select groupName from active_user()));
CREATE POLICY group_delete ON "group" FOR delete to query_sender USING (creator_username = (select username from active_user()));
CREATE POLICY group_create ON "group" FOR insert to query_sender with check (creator_username = (select username from active_user()));
CREATE POLICY group_select ON "group" FOR select to query_sender using (true);

--only a user should have permissions to their own body stats
create policy bodystats_all on "bodystat" FOR all to query_sender using (username = (select username from active_user()));

--everyone can see a users lifts, but only the user has permission to update them
CREATE POLICY user_exercise_update ON "user_exercise" FOR update to query_sender USING (username = (select username from active_user()));
CREATE POLICY user_exercise_delete ON "user_exercise" FOR delete to query_sender USING (username = (select username from active_user()));
CREATE POLICY user_exercise_create ON "user_exercise" FOR insert to query_sender with check (username = (select username from active_user()));
CREATE POLICY user_exercise_select ON "user_exercise" FOR select to query_sender using (true);


--only members of the group can update the state of the battle. Much like group updates, battle mutations are disabled as we don't want a malicious actor setting enemy health manually.
CREATE POLICY battle_update ON "battle" FOR update to query_sender USING (groupName = (select groupName from active_user()));
CREATE POLICY battle_delete ON "battle" FOR delete to query_sender USING (groupName = (select groupName from active_user()));
CREATE POLICY battle_create ON "battle" FOR insert to query_sender with check (groupName = (select groupName from active_user()));
CREATE POLICY battle_select ON "battle" FOR select to query_sender using (true);

--much like user_exercise, only the user can mutate these, but these are visible to everyone
CREATE POLICY workout_update ON "workout" FOR update to query_sender USING (username = (select username from active_user()));
CREATE POLICY workout_delete ON "workout" FOR delete to query_sender USING (username = (select username from active_user()));
CREATE POLICY workout_create ON "workout" FOR insert to query_sender with check (true);
CREATE POLICY workout_select ON "workout" FOR select to query_sender using (true);
