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
