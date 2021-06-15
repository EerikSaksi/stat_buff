--! Previous: sha1:d7a1729cebd3b962325c98d4c3897e7dedd46b77
--! Hash: sha1:38e624f24fdf10085a10cb7ef95cbbd513fa44c1

-- Enter migration here


CREATE or replace FUNCTION public.create_user(username text, password text) RETURNS void LANGUAGE plpgsql STRICT SECURITY DEFINER AS $$ begin
insert into
  app_user(username, password)
values
  (username, crypt(password, gen_salt('bf')));
end;
$$;

CREATE or replace FUNCTION public.active_user() RETURNS public.app_user
    LANGUAGE sql STABLE
    AS $$

  select * from app_user where id = (select current_user_id())
$$;

alter table bodystat drop column if exists user_id cascade;
alter TABLE bodystat drop COLUMN if exists app_user_id cascade;
ALTER TABLE bodystat ADD COLUMN app_user_id integer not null references app_user(id);

alter table bodystat enable row level security;
drop policy if exists bodystat_select_policy on bodystat;
CREATE POLICY bodystat_select_policy ON bodystat FOR SELECT USING (true);
drop policy if exists bodystat_insert_policy on bodystat;
create POLICY bodystat_insert_policy ON bodystat FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists bodystat_update_policy on bodystat;
CREATE POLICY bodystat_update_policy ON bodystat FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists bodystat_delete_policy on bodystat;
CREATE POLICY bodystat_delete_policy ON bodystat FOR delete USING (app_user_id = (select current_user_id()));


DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='completed_workout' and column_name='user_id')
  THEN
      ALTER TABLE completed_workout RENAME COLUMN "user_id" TO "app_user_id";
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='session_analytics' and column_name='user_id')
  THEN
      ALTER TABLE session_analytics RENAME COLUMN "user_id" TO "app_user_id";
  END IF;
END $$;


DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='user_exercise' and column_name='user_id')
  THEN
      ALTER TABLE user_exercise RENAME COLUMN "user_id" TO "app_user_id";
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='workout_plan' and column_name='user_id')
  THEN
      ALTER TABLE workout_plan RENAME COLUMN "user_id" TO "app_user_id";
  END IF;
END $$;
