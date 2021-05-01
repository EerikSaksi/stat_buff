--! Previous: sha1:842391f36ad5bd4665c1a448e4a1c5ea002d8c3c
--! Hash: sha1:307d4c60af4928b7af07fc0fc14257faf9718381

-- Enter migration here
drop table if exists workout_plan cascade;
create table workout_plan(
  id serial primary key,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
grant all on workout_plan to public;
grant all on workout_plan_id_seq to public;

ALTER TABLE "workout_plan_day" ADD COLUMN if not exists workout_plan_id integer references workout_plan(id) on delete cascade;
alter table "user_current_workout_plan" drop constraint if exists user_current_workout_plan_workout_plan_id_fkey;
drop index if exists user_current_workout_plan_workout_plan_id_idx;

CREATE INDEX ON "public"."workout_plan_day"("workout_plan_id");


alter table "user_current_workout_plan" drop column if exists workout_plan_id;

alter table "user_current_workout_plan" add column workout_plan_id integer references "workout_plan"(id) on delete cascade;
create index on "user_current_workout_plan"(workout_plan_id);
