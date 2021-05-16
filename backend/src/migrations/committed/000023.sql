--! Previous: sha1:d2721586dcae9bad049316ee8cf463efcdd7bd68
--! Hash: sha1:82dd9fd23ac31f5165f7ac4ff7414079cceaa65c

-- Enter migration here

drop type if exists volume cascade;
create type volume as (
  weight float,
  reps int
);

alter TABLE "completed_workout_exercise" drop COLUMN if exists volumes;
ALTER TABLE "completed_workout_exercise" ADD COLUMN volumes volume[] not null;

alter table "bodystat" drop column if exists username cascade;

delete from bodystat;
alter TABLE "bodystat" drop COLUMN if exists user_id cascade; 
ALTER TABLE "bodystat" ADD COLUMN user_id integer primary key not null references "user"(id) ;

insert into "bodystat"(ismale, bodymass, user_id) values (true, 80, 4) on conflict (user_id) do nothing;

alter table "bodystat" enable row level security;
drop policy if exists bodystat_select_policy on "bodystat";
CREATE POLICY bodystat_select_policy ON "bodystat" FOR SELECT USING (user_id = (select id from active_user()));
drop policy if exists bodystat_insert_policy on "bodystat";
create POLICY bodystat_insert_policy ON "bodystat" FOR insert with check (user_id = (select id from active_user()));
drop policy if exists bodystat_update_policy on "bodystat";
CREATE POLICY bodystat_update_policy ON "bodystat" FOR update USING (user_id = (select id from active_user()));
drop policy if exists bodystat_delete_policy on "bodystat";
CREATE POLICY bodystat_delete_policy ON "bodystat" FOR delete USING (user_id = (select id from active_user()));
