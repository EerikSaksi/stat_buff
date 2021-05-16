-- Enter migration here

drop type if exists volume cascade;
create type volume as (
  weight float,
  reps int
);

alter TABLE "completed_workout_exercise" drop COLUMN if exists volumes;
ALTER TABLE "completed_workout_exercise" ADD COLUMN volumes volume[] not null;
