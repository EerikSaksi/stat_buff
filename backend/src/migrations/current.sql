do $$
begin  
  if not exists (select 1 from workout_plan_exercise where ordering = 0) then 
    insert into workout_plan_exercise(exercise_id, sets, reps, ordering, workout_plan_day_id) values (1, 4, 20, 0, 1); 
  end if;
end $$;

do $$
begin  
  if not exists (select 1 from workout_plan_exercise where ordering = 1) then 
    insert into workout_plan_exercise(exercise_id, sets, reps, ordering, workout_plan_day_id) values (2, 5, 5, 1, 1); 
  end if;
end $$;
    
create index if not exists exercise_name_idx on "exercise"(name);

drop table if exists user_current_workout_plan;

alter TABLE "user" drop COLUMN if exists current_workout_plan_id;
ALTER TABLE "user" ADD COLUMN current_workout_plan_id integer references "workout_plan"(id) on delete cascade;
create index if not exists user_workout_plan_idx on "user"(current_workout_plan_id);


ALTER TABLE workout_plan_exercise drop CONSTRAINT non_zero_volume;

ALTER TABLE workout_plan_exercise
ADD CONSTRAINT non_zero_volume
CHECK (
	reps > 0
    and sets > 0
);

delete from workout_plan_exercise;
insert into workout_plan_exercise(exercise_id, sets, reps, ordering, workout_plan_day_id) 
values 
  (1, 5, 5, 1, 1),
  (2, 5, 5, 2, 1),
  (3, 5, 5, 3, 1),
  (4, 5, 5, 4, 1),
  (5, 5, 5, 5, 1),
  (6, 5, 5, 6, 1);



ALTER TABLE workout_plan drop CONSTRAINT if exists non_empty_name;
ALTER TABLE workout_plan
ADD CONSTRAINT non_empty_name
CHECK (
  (name = '') IS FALSE
);

ALTER TABLE workout_plan_exercise drop CONSTRAINT if exists non_empty_name;
ALTER TABLE workout_plan_day
ADD CONSTRAINT non_empty_name
CHECK (
  (name = '') IS FALSE
);

