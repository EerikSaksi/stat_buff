--! Previous: sha1:ceb7cca7a8dbc5cf7e8dc3bd61d1c533674b9549
--! Hash: sha1:842391f36ad5bd4665c1a448e4a1c5ea002d8c3c

-- Enter migration here
alter table if exists "workout_plan"
rename to "workout_plan_day";
