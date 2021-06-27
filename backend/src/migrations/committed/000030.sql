--! Previous: sha1:2fe30ab28a61f021ffef1d6e99c3f7b9726aab12
--! Hash: sha1:0e29834cee7768a4e869c40469fb59627884fe91

-- Enter migration here
drop function if exists create_user;
CREATE
or replace FUNCTION public.create_user(username text, password text) RETURNS app_user LANGUAGE plpgsql STRICT SECURITY DEFINER AS $$ declare to_return app_user;
begin
insert into
  app_user(username, password)
values
  (username, crypt(password, gen_salt('bf'))) returning * into to_return;
return to_return;
end;
$$;
drop type if exists user_id_and_jwt cascade;
create type user_id_and_jwt as (app_user_id integer, token jwt_token);
drop function if exists authenticate;
CREATE FUNCTION public.authenticate(username character varying, password text) RETURNS public.user_id_and_jwt LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER AS $$ declare account app_user;
begin
select
  a.* into account
from
  app_user as a
where
  a.username = authenticate.username;
if account.password = crypt(password, account.password) then return (
  account.id,
  (
    extract(
      epoch
      from
        now() + interval '7 days'
    ),
    account.id
  ):: jwt_token
):: user_id_and_jwt;
else return null;
end if;
end;
$$;


alter table workout_plan_exercise enable row level security;
drop policy if exists workout_plan_exercise_select_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_select_policy ON workout_plan_exercise FOR SELECT USING (true);

drop policy if exists workout_plan_exercise_insert_policy on workout_plan_exercise;
create POLICY workout_plan_exercise_insert_policy ON workout_plan_exercise FOR insert with check ((workout_plan_day_id IN ( SELECT workout_plan_day.id
   FROM workout_plan
     JOIN workout_plan_day ON workout_plan_day.workout_plan_id = workout_plan.id
  WHERE workout_plan.app_user_id = ( SELECT current_user_id()))));

drop policy if exists workout_plan_exercise_update_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_update_policy ON workout_plan_exercise FOR update USING ((workout_plan_day_id IN ( SELECT workout_plan_day.id
   FROM workout_plan
     JOIN workout_plan_day ON workout_plan_day.workout_plan_id = workout_plan.id
  WHERE workout_plan.app_user_id = ( SELECT current_user_id()))));

drop policy if exists workout_plan_exercise_delete_policy on workout_plan_exercise;
CREATE POLICY workout_plan_exercise_delete_policy ON workout_plan_exercise FOR delete USING ((workout_plan_day_id IN ( SELECT workout_plan_day.id
   FROM workout_plan
     JOIN workout_plan_day ON workout_plan_day.workout_plan_id = workout_plan.id
  WHERE workout_plan.app_user_id = ( SELECT current_user_id()))));

alter table workout_plan_day enable row level security;

drop policy if exists workout_plan_day_select_policy on workout_plan_day;
CREATE POLICY workout_plan_day_select_policy ON workout_plan_day FOR SELECT USING (true);

drop policy if exists workout_plan_day_insert_policy on workout_plan_day;
create POLICY workout_plan_day_insert_policy ON workout_plan_day FOR insert with check (workout_plan_id in ( SELECT workout_plan.id
   FROM workout_plan
  WHERE workout_plan.app_user_id = ( SELECT current_user_id())));
drop policy if exists workout_plan_day_update_policy on workout_plan_day;

CREATE POLICY workout_plan_day_update_policy ON workout_plan_day FOR update USING (workout_plan_id in ( SELECT workout_plan.id
   FROM workout_plan
  WHERE workout_plan.app_user_id = ( SELECT current_user_id())));
drop policy if exists workout_plan_day_delete_policy on workout_plan_day;
CREATE POLICY workout_plan_day_delete_policy ON workout_plan_day FOR delete USING (workout_plan_id in ( SELECT workout_plan.id
   FROM workout_plan
  WHERE workout_plan.app_user_id = ( SELECT current_user_id())));
