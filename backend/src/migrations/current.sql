-- Enter migration here
drop table if exists "workout";
grant all on table "exercise" to public;
alter table "workout_plan_exercise" drop column if exists exercise_id;

alter table "workout_plan_exercise" add column exercise_id integer references "exercise"(id) not null;
CREATE INDEX ON "workout_plan_exercise"(exercise_id);
alter table "workout_plan" rename column exercises to workout_exercises;
