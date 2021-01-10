grant all on schema public to PUBLIC;
grant select on table "exercise" to PUBLIC;
grant select on table "enemy" to PUBLIC;

grant all on table "user" to PUBLIC;
grant all on table "group" to PUBLIC;
grant all on table "bodystat" to PUBLIC;
grant all on table "user_exercise" to PUBLIC;
grant all on table "battle" to PUBLIC;
grant all on table "workout" to PUBLIC;
grant all on table "chat_message" to PUBLIC;

GRANT USAGE, SELECT ON SEQUENCE workout_id_seq TO PUBLIC;
GRANT USAGE, SELECT ON SEQUENCE chat_message_id_seq TO PUBLIC;


--google ids are only used internally to identify users 
comment on column "user".googleID is E'@omit';
comment on column "user".email is E'@omit';
--handled by plugin function
comment on table "user" is E'@omit create';
--groupname updates must go through a custom function that performs password checks for protected groups
comment on column "user".groupName is E'@omit update';
comment on column "group".creator_username is E'@omit create, update, insert';
comment on table "group" is E'@omit update';
comment on column "group".password is E'@omit select';
comment on table "bodystat" is E'@omit all';
--set by triggers
comment on column "user_exercise".groupName is E'@omit create, update, insert';
comment on column "user_exercise".battle_number is E'@omit create, update, insert';
--these are completely managed by triggers
comment on table "battle" is E'@omit create, update, insert, all';
--these are calculated by triggers
comment on column "workout".groupName is E'@omit create, update, insert';
comment on column "workout".battle_number is E'@omit create, update, insert';
comment on column "workout".total_damage is E'@omit create, update, insert';

Alter table "user" enable row level security;
Alter table "group" enable row level security;
Alter table "bodystat" enable row level security;
Alter table "user_exercise" enable row level security;
Alter table "battle" enable row level security;
Alter table "workout" enable row level security;
Alter table "chat_message" enable row level security;
comment on column "chat_message".groupName is E'@omit create, update, insert';
comment on column "chat_message".id is E'@omit create, update, insert';

CREATE POLICY user_update ON "user" FOR update to PUBLIC USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_delete ON "user" FOR delete to PUBLIC USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_create ON "user" FOR insert to PUBLIC with check (googleID = current_setting('user.googleID'));
CREATE POLICY user_select ON "user" FOR select to PUBLIC using (true);

--any user can update the group, but these mutations are omitted. The group updates are executed automatically, for example when a user deals damage to the enemy which triggers the next level.
CREATE POLICY group_update ON "group" FOR update to PUBLIC USING (name = (select groupName from active_user()));
CREATE POLICY group_delete ON "group" FOR delete to PUBLIC USING (creator_username = (select username from active_user()));
CREATE POLICY group_create ON "group" FOR insert to PUBLIC with check (creator_username = (select username from active_user()));
CREATE POLICY group_select ON "group" FOR select to PUBLIC using (true);

--only a user should have permissions to their own body stats
create policy bodystats_all on "bodystat" FOR all to PUBLIC using (username = (select username from active_user()));

--everyone can see a users lifts, but only the user has permission to update them
CREATE POLICY user_exercise_update ON "user_exercise" FOR update to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY user_exercise_delete ON "user_exercise" FOR delete to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY user_exercise_create ON "user_exercise" FOR insert to PUBLIC with check (username = (select username from active_user()));
CREATE POLICY user_exercise_select ON "user_exercise" FOR select to PUBLIC using (true);

--only members of the group can update the state of the battle. Much like group updates, battle mutations are disabled as we don't want a malicious actor setting enemy health manually.
CREATE POLICY battle_update ON "battle" FOR update to PUBLIC USING (groupName = (select groupName from active_user()));
CREATE POLICY battle_delete ON "battle" FOR delete to PUBLIC USING (groupName = (select groupName from active_user()));
CREATE POLICY battle_create ON "battle" FOR insert to PUBLIC with check (groupName = (select groupName from active_user()));
CREATE POLICY battle_select ON "battle" FOR select to PUBLIC using (true);

--much like user_exercise, only the user can mutate these, but these are visible to everyone
CREATE POLICY workout_update ON "workout" FOR update to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY workout_delete ON "workout" FOR delete to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY workout_create ON "workout" FOR insert to PUBLIC with check (true);
CREATE POLICY workout_select ON "workout" FOR select to PUBLIC using (true);

--chat messages are only between groups, but only the user themselves can edit them
CREATE POLICY chat_message_update ON "chat_message" FOR update to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY chat_message_delete ON "chat_message" FOR delete to PUBLIC USING (username = (select username from active_user()));
CREATE POLICY chat_message_create ON "chat_message" FOR insert to PUBLIC with check (username = (select username from active_user()) and groupName = (select groupName from active_user()));
CREATE POLICY chat_message_select ON "chat_message" FOR select to PUBLIC using (groupName = (select groupName from active_user()));
