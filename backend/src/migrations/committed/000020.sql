--! Previous: sha1:307d4c60af4928b7af07fc0fc14257faf9718381
--! Hash: sha1:9791fdcb9ca22cc6b0800898822e035b9eceda45

-- Enter migration here
alter table "workout_plan_day" drop column if exists "user_id" cascade;
ALTER TABLE "workout_plan" ADD COLUMN if not exists user_id integer references "user"(id) on delete cascade;
create index if not exists workout_plan_id_seq on "workout_plan"(user_id) ;

alter sequence workout_plan_id_seq restart;

delete from "workout_plan";
insert into "workout_plan"(user_id) values (4);

delete from "workout_plan_day";
alter TABLE "workout_plan_day" drop COLUMN if exists name ;
alter TABLE "workout_plan_day" drop COLUMN if exists exists;
ALTER TABLE "workout_plan_day" ADD COLUMN name varchar unique not null;
--insert into "workout_plan_day"(workout_plan_id, );
