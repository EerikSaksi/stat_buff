-- Enter migration here
alter table workout_plan_day enable row level security;
drop policy if exists workout_plan_day_select_policy on workout_plan_day;
CREATE POLICY workout_plan_day_select_policy ON workout_plan_day FOR SELECT USING (true);
drop policy if exists workout_plan_day_insert_policy on workout_plan_day;
create POLICY workout_plan_day_insert_policy ON workout_plan_day FOR insert with check (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_day_update_policy on workout_plan_day;
CREATE POLICY workout_plan_day_update_policy ON workout_plan_day FOR update USING (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_day_delete_policy on workout_plan_day;
CREATE POLICY workout_plan_day_delete_policy ON workout_plan_day FOR delete USING (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));


alter table workout_plan_exercise enable row level security;
drop policy if exists workout_plan_exercise_select_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_select_policy ON workout_plan_exercise FOR SELECT USING (true);
drop policy if exists workout_plan_exercise_insert_policy on workout_plan_exercise;
create POLICY workout_plan_exercise_insert_policy ON workout_plan_exercise FOR insert with check (workout_plan_day_id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_exercise_update_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_update_policy ON workout_plan_exercise FOR update USING (workout_plan_day_id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_exercise_delete_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_delete_policy ON workout_plan_exercise FOR delete USING (workout_plan_day_id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where app_user_id = (select current_user_id())));

drop type if exists completed_workout_and_user cascade;

create type completed_workout_and_user as (
  completed_workout completed_workout,
  app_user app_user
);

drop function if exists public.save_workout;
CREATE or replace FUNCTION public.save_workout(exercise_ids_and_sets public.sets_and_exercise_id[]) RETURNS completed_workout_and_user 
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  id_and_sets sets_and_exercise_id;
  set completed_set;
  workout_id integer;
  exercise_id integer;
  num_sets integer;
  to_return completed_workout_and_user;
begin
  insert into completed_workout default values returning id into workout_id;
  foreach id_and_sets in array exercise_ids_and_sets loop
    insert into completed_workout_exercise(completed_workout_id, exercise_id) values (workout_id, id_and_sets.exercise_id) returning id into exercise_id;
    foreach set in array id_and_sets.completed_sets loop
      insert into completed_set(completed_workout_exercise_id, reps, weight) values (exercise_id, set.reps, set.weight);
    end loop;
  end loop;
  --select * from completed_workout into to_return where id = workout_id;
  update app_user set total_xp = 5 where id = (select current_user_id()) returning id, total_xp into to_return;
  return to_return;
end; 
$$;

drop table if exists table1 cascade;
create table table1(
	id integer primary key generated always as identity,
	exercise_id integer not null references exercise(id) on delete cascade,
	field1 int,
	field2 int,
	field3 int
);
create index if not exists table1_exercise_idx on "table1"(exercise_id);
grant all on table1 to public;


drop table if exists table2 cascade;
create table table2(
	id integer primary key generated always as identity,
	table1_id integer not null references table1(id) on delete cascade,
	field21 int,
	field22 int,
	field23 int
);
create index if not exists table2_exercise_idx on "table2"(table1_id);
grant all on table2 to public;


drop table if exists table3 cascade;
create table table3(
	id integer primary key generated always as identity,
	table2_id integer not null references table2(id) on delete cascade,
	field31 int,
	field32 int,
	field33 int
);
create index if not exists table3_exercise_idx on "table3"(table2_id);
grant all on table3 to public;
