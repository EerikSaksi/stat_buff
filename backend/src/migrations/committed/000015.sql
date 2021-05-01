--! Previous: sha1:0654172cb085ff95cb81d5ee80cd4b1a12a940f5
--! Hash: sha1:1d36938d73b47adf8764f6d04097f47d16c364ba

insert into "user_current_workout_plan"(user_id, workout_plan_id) values (1, 1) on conflict(user_id) do nothing;
delete from "exercise";
alter table "exercise" drop column if exists elite_strength_baseline;
alter table "exercise" add column if not exists elite_strength_baseline integer not null;
alter table "workout_plan_exercise" drop constraint "workout_plan_exercise_exercise_id_fkey" ;
alter table "workout_plan_exercise" add constraint "workout_plan_exercise_exercise_id_fkey"  FOREIGN KEY (exercise_id) REFERENCES exercise(id) on delete cascade; 
alter table "workout_plan_exercise" drop  constraint if exists "workout_plan_exercise_exercise_id_fkey1" ;
alter table "workout_plan_exercise" drop  constraint if exists "workout_plan_exercise_exercise_id_fkey2" ;
alter table "workout_plan_exercise" drop  constraint if exists "workout_plan_exercise_exercise_id_fkey3" ;
alter table "workout_plan_exercise" drop  constraint if exists "workout_plan_exercise_exercise_id_fkey4" ;
alter table "workout_plan_exercise" drop  constraint if exists "workout_plan_exercise_exercise_id_fkey5" ;

drop index if exists "workout_plan_exercise_exercise_id_idx1" ;
drop index if exists "workout_plan_exercise_exercise_id_idx2" ;
drop index if exists "workout_plan_exercise_exercise_id_idx3" ;
drop index if exists "workout_plan_exercise_exercise_id_idx4" ;
drop index if exists "workout_plan_exercise_exercise_id_idx5" ;
