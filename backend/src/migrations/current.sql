-- Enter migration here
drop table if exists "workout";
grant all on table "exercise" to public;
alter table "workout_plan_exercise" add if not exists exercise_id integer references "exercise"(id) not null;
CREATE INDEX ON "workout_plan_exercise"(exercise_id);

alter table "workout_plan_exercise" drop if exists id;

DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='workout_plan' and column_name='exercises')
  THEN
      ALTER TABLE "public"."workout_plan" RENAME COLUMN "exercises" TO "workout_exercises";
  END IF;
END $$;



grant all on workout_plan_id_seq to public;
