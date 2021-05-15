-- Enter migration here
insert into "workout_plan"(user_id, name) values (4, 'Leg day everyday') on conflict (user_id, name) do nothing;
