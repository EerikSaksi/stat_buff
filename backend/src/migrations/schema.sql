--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA postgraphile_watch;


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: body_part_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.body_part_enum AS ENUM (
    'Back',
    'Biceps',
    'Chest',
    'Core',
    'Forearms',
    'Legs',
    'Shoulders',
    'Triceps',
    'Whole Body'
);


--
-- Name: exercise_type_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.exercise_type_enum AS ENUM (
    'Barbell',
    'Bodyweight',
    'Olympic',
    'Dumbbell',
    'Machine',
    'Cable'
);


--
-- Name: jwt_token; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.jwt_token AS (
	exp integer,
	user_id integer
);


--
-- Name: section_and_time_spent; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.section_and_time_spent AS (
	section character varying,
	time_spent double precision
);


--
-- Name: strengthstats; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.strengthstats AS (
	average_strength numeric,
	num_exercises numeric,
	dph numeric
);


--
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_ddl() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'ddl',
      'payload',
      (select json_agg(json_build_object('schema', schema_name, 'command', command_tag)) from pg_event_trigger_ddl_commands() as x)
    )::text
  );
end;
$$;


--
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_drop() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'drop',
      'payload',
      (select json_agg(distinct x.schema_name) from pg_event_trigger_dropped_objects() as x)
    )::text
  );
end;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    username character varying(32) NOT NULL,
    password text,
    groupname character varying(32),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


--
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public."user" IS '@omit create';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".password IS '@omit';


--
-- Name: COLUMN "user".groupname; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".groupname IS '@omit update';


--
-- Name: COLUMN "user".created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".created_at IS '@omit create, update, insert';


--
-- Name: COLUMN "user".updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".updated_at IS '@omit create, update, insert';


--
-- Name: active_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.active_user() RETURNS public."user"
    LANGUAGE sql STABLE
    AS $$
  select * from "user" where username = 'orek'
$$;


--
-- Name: calculate_strength_stats(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.calculate_strength_stats() RETURNS public.strengthstats
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
 result strengthStats;
BEGIN
  select coalesce(round(avg(strongerpercentage), 2), 0) as average_strength, count (*) as num_exercises into result from "user_exercise" 
    where "user_exercise".username = (select username from active_user());
  if result.num_exercises = 0 then
    result.DPH = 0;
  else
    select round((result.average_strength / 100) * ln(result.num_exercises + 1) * 2.5, 2) into result.DPH;
  end if;
return result;
END
$$;


--
-- Name: calculate_total_damage(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.calculate_total_damage() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
  hits integer;
  gn character varying(32);
  bn integer;
  new_current_health integer;
  new_enemy_level integer;
  num_members integer;
  BEGIN
    --load group and battle info to this table (so we can select when this battle was created)
    select groupName into gn from "user" where username = NEW.username;
    select battle_number into bn from "group" where name = gn;
    NEW.groupName = gn;
    NEW.battle_number = bn;

    --calculate hits and thus the damage that this dealt
    hits =  ((10 - NEW.average_rir) / 10.0 * NEW.sets);
    NEW.total_damage = (select DPH from calculate_strength_stats()) * hits; 

    --subtract the dealt damage from the group's current battle
    update "battle"
    set current_health = current_health - NEW.total_damage 
    where battle_number = NEW.battle_number and groupName = gn;

    --get the updated health and current level from the current battle
    select enemy_level, current_health into new_enemy_level, new_current_health
      from "battle" 
      where battle_number = NEW.battle_number and groupName = gn;

    --if we dealt the killing blow then create a new battle with the next enemy
    if new_current_health <= 0 then
      new_enemy_level = new_enemy_level + 1;
      bn = bn + 1;
      select max_health into new_current_health from "enemy" where level = new_enemy_level;
      select count(*) into num_members from "user" where groupName = gn;
      insert into "battle"(groupName, battle_number, enemy_level, current_health, max_health) values (gn, bn, new_enemy_level, new_current_health * num_members, new_current_health * num_members);
      update "group" set battle_number = battle_number + 1 where name = gn;
    end if;
    return NEW;
  END;
$$;


--
-- Name: create_user(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.create_user(username text, password text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  insert into "user"(username, password) values (username, crypt(password, gen_salt('bf')));
end;
$$;


--
-- Name: encrypt_password_and_set_creator(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.encrypt_password_and_set_creator() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  declare 
  active_user_username varchar(32);
  BEGIN
    if NEW.password is not null then
      NEW.password = crypt(NEW.password, gen_salt('bf'));
    end if; 
    return NEW;
  END;
$$;


--
-- Name: battle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.battle (
    enemy_level integer DEFAULT 1 NOT NULL,
    groupname character varying(32) NOT NULL,
    battle_number integer DEFAULT 1 NOT NULL,
    current_health double precision DEFAULT 10 NOT NULL,
    max_health double precision DEFAULT 10 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE battle; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.battle IS '@omit create, update, insert, all';


--
-- Name: COLUMN battle.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.battle.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN battle.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.battle.updated_at IS '@omit create, update, insert';


--
-- Name: get_battle_and_check_expiry(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_battle_and_check_expiry() RETURNS public.battle
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE 
  old_enemy_level integer;
  old_battle_number integer;
  old_max_health integer;
  old_groupName varchar;
  old_createdAt TIMESTAMPTZ;
  to_return "battle";
  BEGIN
    --get current group and the battle of the active user
    select name, battle_number into old_groupName, old_battle_number
      from "user" inner join "group" on "user".groupName = "group".name
        where "user".username = (select username from active_user());

    select enemy_level, max_health, created_at into old_enemy_level, old_max_health, old_createdAt 
      from "battle" 
        where battle_number = old_battle_number and groupName = old_groupName;
    if (select DATE_PART('day', NOW() - old_createdAt) >= 7) then
      --insert new battle with everything the same and reset, but old_battle_number + 1
      insert into "battle"(groupName, battle_number, enemy_level, current_health, max_health) 
      values (old_groupName, old_battle_number + 1, old_enemy_level, old_max_health, old_max_health);

      --new battle is the newly created one
      update "group" set battle_number = old_battle_number + 1 where name = old_groupName;
      
      -- we want this chat message to go to this group, and not be set back to Event Notices group
      ALTER TABLE "chat_message" disable TRIGGER load_groupName_to_chat_message;

      --create message that explains why the enemy reset
      insert into "chat_message"(username, groupName, text_content) 
      values ('Event Notice', old_groupName, 'You ran out of time to defeat the enemy, so it has been reset.');
      ALTER TABLE "chat_message" enable TRIGGER load_groupName_to_chat_message;
      select * into to_return from "battle" where groupName = old_groupName and battle_number = old_battle_number + 1;
      return to_return;
    end if;
    select * into to_return from "battle" where groupName = old_groupName and battle_number = old_battle_number;
    return to_return;
  END
$$;


--
-- Name: join_group(character varying, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.join_group(input_groupname character varying, input_password text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare
succeeded integer;
begin
  select 1 into succeeded from "group" where name = input_groupname 
    and (
    password is null
    or password = crypt(input_password, password)
  );
  if succeeded then
    update "user"
    set groupName = input_groupname
    where username = (select username from active_user());
  end if;
  return succeeded;
end
$$;


--
-- Name: join_random_public_group(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.join_random_public_group() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare
chosen_group_name varchar(32);
begin
  --finds the group with the least members, and breaks ties by taking the older one
  SELECT "group".name into chosen_group_name
  FROM "group" inner join "user" on "user".groupName = "group".name 
  where not "group".is_password_protected
  group by "group".name
  order by count("user"), "group".created_at DESC
  limit 1;
  if chosen_group_name is NULL then 
    return false;
  end if ;
  update "user"
  set groupName = chosen_group_name
  where username = (select username from active_user());
  return true;
end
$$;


--
-- Name: load_groupname(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.load_groupname() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    new.groupName = (select groupName from "user" where username = NEW.username);
    return new;
  END;
$$;


--
-- Name: notify_message_inserted(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.notify_message_inserted() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    raise notice '%', NEW;
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'chat_messages', 
          NEW.id
        )
      )::text
    ); 
    return new;
  END;
$$;


--
-- Name: notify_user_exercise_inserted(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.notify_user_exercise_inserted() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'user_exercises', 
          NEW.slug_name, 
          NEW.username
        )
      )::text
    ); 
    return new;
  END;
$$;


--
-- Name: notify_workout_inserted(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.notify_workout_inserted() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    raise notice '%', format('postgraphile:event_%s', NEW.groupName);
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'workouts', 
          NEW.id
        )
      )::text
    ); 
    return new;
  END;
$$;


--
-- Name: nullify_group(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.nullify_group() RETURNS void
    LANGUAGE plpgsql
    AS $$
declare
  old_groupName varchar(32);
begin
  --get the old group
  select groupName into old_groupName from "user" where username = (select username from active_user());
  update "user" set groupName = null where username = (select username from active_user());

  --if no more users left then delete group
  if (select count(*) from "user" where groupName = old_groupName) = 0 then
    delete from "group" where name = old_groupName;
  end if;
end $$;


--
-- Name: scale_health(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.scale_health() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE
  num_members integer;
  BEGIN
    --user left group
    if OLD.groupName is not null then
      --count members in old group
      select count(*) into num_members from "user" where groupName = OLD.groupName;
      update "battle" 
      set current_health =  current_health * (1.0 * num_members / (num_members + 1)),
      max_health = max_health * (1.0 * num_members / (num_members + 1))
      where groupName = OLD.groupName and battle_number = (select battle_number from "group" where name = OLD.groupName);
    end if;

    --count members
    select count(*) into num_members from "user" where groupName = new.groupName;

    --should have battle
    if 2 <= num_members then  
      --check if this group has a battle yet, if not create one
      if not exists(select 1 from "battle" where battle_number = 1 and groupName = new.groupName) then
        insert into "battle"(groupName) values (new.groupName);
        update "group" set battle_number = 1 where name = NEW.groupName;
      end if;
      --scale the health of the current enemy (if we went from 3 to 4 members then scale by 4/3)
      update "battle" 
      set current_health =  current_health * (1.0 * num_members / (num_members - 1)),
      max_health = max_health * (1.0 * num_members / (num_members - 1))
      where groupName = NEW.groupName and battle_number = (select battle_number from "group" where name = NEW.groupName);
    end if; 
    return NEW;
  END;
  $$;


--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


--
-- Name: update_battle_to_current(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_battle_to_current() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    select groupName into NEW.groupName from "user" where username = NEW.username;
    select battle_number into NEW.battle_number from "group" where name = NEW.groupName;
    return NEW;
  END;
$$;


--
-- Name: bodystat; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bodystat (
    ismale boolean NOT NULL,
    bodymass integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT bodystat_bodymass_check CHECK ((bodymass > 0))
);


--
-- Name: TABLE bodystat; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.bodystat IS '@omit all';


--
-- Name: COLUMN bodystat.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.bodystat.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN bodystat.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.bodystat.updated_at IS '@omit create, update, insert';


--
-- Name: completed_workout; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.completed_workout (
    id integer NOT NULL
);


--
-- Name: volume; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.volume (
    weight double precision NOT NULL,
    reps smallint NOT NULL
);


--
-- Name: completed_workout_exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.completed_workout_exercise (
    id integer NOT NULL,
    exercise_id integer NOT NULL,
    completed_workout_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    volumes public.volume[] NOT NULL
);


--
-- Name: TABLE completed_workout_exercise; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.completed_workout_exercise IS '@mncud
';


--
-- Name: completed_workout_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.completed_workout_exercise ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.completed_workout_exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: completed_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.completed_workout ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.completed_workout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: enemy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enemy (
    level integer NOT NULL,
    max_health double precision,
    name character varying(64)
);


--
-- Name: exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    body_part public.body_part_enum NOT NULL,
    exercise_type public.exercise_type_enum NOT NULL,
    name character varying NOT NULL,
    count integer NOT NULL,
    elite_strength_baseline integer NOT NULL
);


--
-- Name: exercise_alias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercise_alias (
    id integer NOT NULL,
    name character varying NOT NULL
);


--
-- Name: exercise_alias_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.exercise_alias ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.exercise_alias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.exercise ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."group" (
    name character varying(32) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    password text,
    is_password_protected boolean GENERATED ALWAYS AS ((password IS NOT NULL)) STORED,
    battle_number integer
);


--
-- Name: TABLE "group"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public."group" IS '@omit update';


--
-- Name: COLUMN "group".created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."group".created_at IS '@omit create, update, insert';


--
-- Name: COLUMN "group".updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."group".updated_at IS '@omit create, update, insert';


--
-- Name: COLUMN "group".password; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."group".password IS '@omit select';


--
-- Name: session_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_analytics (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    analytics public.section_and_time_spent[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: COLUMN session_analytics.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.session_analytics.id IS '@omit create, update, insert';


--
-- Name: session_analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_analytics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_analytics_id_seq OWNED BY public.session_analytics.id;


--
-- Name: session_analytics_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_analytics_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_analytics_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_analytics_user_id_seq OWNED BY public.session_analytics.user_id;


--
-- Name: user_current_workout_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_current_workout_plan (
    user_id integer NOT NULL,
    workout_plan_id integer NOT NULL
);


--
-- Name: user_exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_exercise (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    repetitions integer NOT NULL,
    liftmass double precision NOT NULL,
    strongerpercentage integer NOT NULL,
    groupname character varying(32),
    battle_number integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: COLUMN user_exercise.groupname; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.user_exercise.groupname IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.battle_number; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.user_exercise.battle_number IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.user_exercise.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.user_exercise.updated_at IS '@omit create, update, insert';


--
-- Name: user_exercise_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_exercise_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_exercise_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_exercise_user_id_seq OWNED BY public.user_exercise.user_id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: workout_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_plan (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer,
    name character varying NOT NULL
);


--
-- Name: workout_plan_day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_plan_day (
    id integer NOT NULL,
    workout_plan_id integer NOT NULL,
    name character varying NOT NULL
);


--
-- Name: workout_plan_day_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan_day ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.workout_plan_day_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: workout_plan_exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_plan_exercise (
    exercise_id integer NOT NULL,
    sets smallint NOT NULL,
    reps smallint NOT NULL,
    ordering smallint NOT NULL,
    workout_plan_day_id integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: workout_plan_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan_exercise ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.workout_plan_exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: workout_plan_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.workout_plan_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: session_analytics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN id SET DEFAULT nextval('public.session_analytics_id_seq'::regclass);


--
-- Name: session_analytics user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN user_id SET DEFAULT nextval('public.session_analytics_user_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_exercise user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise ALTER COLUMN user_id SET DEFAULT nextval('public.user_exercise_user_id_seq'::regclass);


--
-- Name: battle battle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_pkey PRIMARY KEY (groupname, battle_number);


--
-- Name: bodystat bodystat_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bodystat
    ADD CONSTRAINT bodystat_pkey PRIMARY KEY (user_id);


--
-- Name: completed_workout_exercise completed_workout_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_pkey PRIMARY KEY (id);


--
-- Name: completed_workout completed_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.completed_workout
    ADD CONSTRAINT completed_workout_pkey PRIMARY KEY (id);


--
-- Name: enemy enemy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enemy
    ADD CONSTRAINT enemy_pkey PRIMARY KEY (level);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (name);


--
-- Name: session_analytics session_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics
    ADD CONSTRAINT session_analytics_pkey PRIMARY KEY (id);


--
-- Name: workout_plan_exercise unique_ordering; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_exercise
    ADD CONSTRAINT unique_ordering UNIQUE (ordering, workout_plan_day_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workout_plan unique_user_id_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT unique_user_id_name UNIQUE (user_id, name);


--
-- Name: user unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: workout_plan_day unique_workout_plan_id_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT unique_workout_plan_id_name UNIQUE (workout_plan_id, name);


--
-- Name: user_current_workout_plan user_current_workout_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_pkey PRIMARY KEY (user_id);


--
-- Name: user_exercise user_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_pkey PRIMARY KEY (id, username);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: workout_plan_exercise workout_plan_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_exercise
    ADD CONSTRAINT workout_plan_exercise_pkey PRIMARY KEY (id);


--
-- Name: workout_plan_day workout_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT workout_plan_pkey PRIMARY KEY (id);


--
-- Name: workout_plan workout_plan_pkey1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT workout_plan_pkey1 PRIMARY KEY (id);


--
-- Name: battle_enemy_level_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX battle_enemy_level_idx ON public.battle USING btree (enemy_level);


--
-- Name: battle_groupname_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX battle_groupname_idx ON public.battle USING btree (groupname);


--
-- Name: completed_workout_exercise_completed_workout_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX completed_workout_exercise_completed_workout_id_idx ON public.completed_workout_exercise USING btree (completed_workout_id);


--
-- Name: completed_workout_exercise_exercise_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX completed_workout_exercise_exercise_id_idx ON public.completed_workout_exercise USING btree (exercise_id);


--
-- Name: exercise_alias_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exercise_alias_id_idx ON public.exercise_alias USING btree (id);


--
-- Name: group_name_battle_number_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX group_name_battle_number_idx ON public."group" USING btree (name, battle_number);


--
-- Name: session_analytics_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX session_analytics_user_id_idx ON public.session_analytics USING btree (user_id);


--
-- Name: session_analytics_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX session_analytics_username_idx ON public.session_analytics USING btree (username);


--
-- Name: user_current_workout_plan_workout_plan_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_current_workout_plan_workout_plan_id_idx ON public.user_current_workout_plan USING btree (workout_plan_id);


--
-- Name: user_exercise_groupname_battle_number_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_exercise_groupname_battle_number_idx ON public.user_exercise USING btree (groupname, battle_number);


--
-- Name: user_exercise_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_exercise_id_idx ON public.user_exercise USING btree (id);


--
-- Name: user_exercise_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_exercise_user_id_idx ON public.user_exercise USING btree (user_id);


--
-- Name: user_exercise_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_exercise_username_idx ON public.user_exercise USING btree (username);


--
-- Name: user_groupname_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_groupname_idx ON public."user" USING btree (groupname);


--
-- Name: workout_plan_day_workout_plan_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX workout_plan_day_workout_plan_id_idx ON public.workout_plan_day USING btree (workout_plan_id);


--
-- Name: workout_plan_exercise_exercise_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX workout_plan_exercise_exercise_id_idx ON public.workout_plan_exercise USING btree (exercise_id);


--
-- Name: workout_plan_exercise_workout_plan_day_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX workout_plan_exercise_workout_plan_day_idx ON public.workout_plan_exercise USING btree (workout_plan_day_id);


--
-- Name: workout_plan_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX workout_plan_user_id_idx ON public.workout_plan USING btree (user_id);


--
-- Name: group encrypt_password_and_set_creator_on_group_create; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER encrypt_password_and_set_creator_on_group_create BEFORE INSERT ON public."group" FOR EACH ROW EXECUTE FUNCTION public.encrypt_password_and_set_creator();


--
-- Name: user_exercise notify_user_exercise_inserted_on_insert; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER notify_user_exercise_inserted_on_insert AFTER INSERT ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.notify_user_exercise_inserted();


--
-- Name: user scale_health_on_groupname_change; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER scale_health_on_groupname_change AFTER UPDATE OF groupname ON public."user" FOR EACH ROW EXECUTE FUNCTION public.scale_health();


--
-- Name: battle set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.battle FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: bodystat set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.bodystat FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: group set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public."group" FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user_exercise set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user_exercise update_exercise_to_current_battle; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_exercise_to_current_battle BEFORE INSERT ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.update_battle_to_current();


--
-- Name: battle battle_enemy_level_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_enemy_level_fkey FOREIGN KEY (enemy_level) REFERENCES public.enemy(level);


--
-- Name: battle battle_groupname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_groupname_fkey FOREIGN KEY (groupname) REFERENCES public."group"(name);


--
-- Name: bodystat bodystat_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bodystat
    ADD CONSTRAINT bodystat_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: completed_workout_exercise completed_workout_exercise_completed_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_completed_workout_id_fkey FOREIGN KEY (completed_workout_id) REFERENCES public.completed_workout(id) ON DELETE CASCADE;


--
-- Name: completed_workout_exercise completed_workout_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- Name: group group_name_battle_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_name_battle_number_fkey FOREIGN KEY (name, battle_number) REFERENCES public.battle(groupname, battle_number) ON DELETE SET NULL;


--
-- Name: session_analytics session_analytics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics
    ADD CONSTRAINT session_analytics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_current_workout_plan user_current_workout_plan_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_current_workout_plan user_current_workout_plan_workout_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE CASCADE;


--
-- Name: user_exercise user_exercise_groupname_battle_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_groupname_battle_number_fkey FOREIGN KEY (groupname, battle_number) REFERENCES public.battle(groupname, battle_number) ON DELETE SET NULL;


--
-- Name: user_exercise user_exercise_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user user_groupname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_groupname_fkey FOREIGN KEY (groupname) REFERENCES public."group"(name) ON DELETE SET NULL;


--
-- Name: workout_plan_day workout_plan_day_workout_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT workout_plan_day_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE CASCADE;


--
-- Name: workout_plan_exercise workout_plan_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_exercise
    ADD CONSTRAINT workout_plan_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- Name: workout_plan_exercise workout_plan_exercise_workout_plan_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_exercise
    ADD CONSTRAINT workout_plan_exercise_workout_plan_day_id_fkey FOREIGN KEY (workout_plan_day_id) REFERENCES public.workout_plan_day(id) ON DELETE CASCADE;


--
-- Name: workout_plan workout_plan_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT workout_plan_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: battle; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.battle ENABLE ROW LEVEL SECURITY;

--
-- Name: battle battle_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY battle_create ON public.battle FOR INSERT TO query_sender WITH CHECK (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: battle battle_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY battle_delete ON public.battle FOR DELETE TO query_sender USING (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: battle battle_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY battle_select ON public.battle FOR SELECT TO query_sender USING (true);


--
-- Name: battle battle_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY battle_update ON public.battle FOR UPDATE TO query_sender USING (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: bodystat; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.bodystat ENABLE ROW LEVEL SECURITY;

--
-- Name: bodystat bodystat_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bodystat_delete_policy ON public.bodystat FOR DELETE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: bodystat bodystat_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bodystat_insert_policy ON public.bodystat FOR INSERT WITH CHECK ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: bodystat bodystat_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bodystat_select_policy ON public.bodystat FOR SELECT USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: bodystat bodystat_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY bodystat_update_policy ON public.bodystat FOR UPDATE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: group; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."group" ENABLE ROW LEVEL SECURITY;

--
-- Name: group group_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY group_create ON public."group" FOR INSERT TO query_sender WITH CHECK (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: group group_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY group_delete ON public."group" FOR DELETE TO query_sender USING (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: group group_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY group_select ON public."group" FOR SELECT TO query_sender USING (true);


--
-- Name: group group_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY group_update ON public."group" FOR UPDATE TO query_sender USING (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_create ON public.session_analytics FOR INSERT TO query_sender WITH CHECK (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_delete ON public.session_analytics FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_select ON public.session_analytics FOR SELECT TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_update ON public.session_analytics FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;

--
-- Name: user user_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_create ON public."user" FOR INSERT TO query_sender WITH CHECK ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_current_workout_plan ENABLE ROW LEVEL SECURITY;

--
-- Name: user_current_workout_plan user_current_workout_plan_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_current_workout_plan_delete_policy ON public.user_current_workout_plan FOR DELETE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan user_current_workout_plan_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_current_workout_plan_insert_policy ON public.user_current_workout_plan FOR INSERT WITH CHECK ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan user_current_workout_plan_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_current_workout_plan_select_policy ON public.user_current_workout_plan FOR SELECT USING (true);


--
-- Name: user_current_workout_plan user_current_workout_plan_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_current_workout_plan_update_policy ON public.user_current_workout_plan FOR UPDATE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user user_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_delete ON public."user" FOR DELETE TO query_sender USING ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_exercise; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_exercise ENABLE ROW LEVEL SECURITY;

--
-- Name: user_exercise user_exercise_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_create ON public.user_exercise FOR INSERT TO query_sender WITH CHECK (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user_exercise user_exercise_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_delete ON public.user_exercise FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user_exercise user_exercise_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_select ON public.user_exercise FOR SELECT TO query_sender USING (true);


--
-- Name: user_exercise user_exercise_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_update ON public.user_exercise FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user user_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_select ON public."user" FOR SELECT TO query_sender USING (true);


--
-- Name: user user_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_update ON public."user" FOR UPDATE TO query_sender USING ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan ENABLE ROW LEVEL SECURITY;

--
-- Name: workout_plan_day; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan_day ENABLE ROW LEVEL SECURITY;

--
-- Name: workout_plan_day workout_plan_day_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_delete_policy ON public.workout_plan_day FOR DELETE USING ((( SELECT workout_plan.user_id
   FROM (public.workout_plan_day workout_plan_day_1
     JOIN public.workout_plan ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))) = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan_day workout_plan_day_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_insert_policy ON public.workout_plan_day FOR INSERT WITH CHECK ((( SELECT workout_plan.user_id
   FROM (public.workout_plan_day workout_plan_day_1
     JOIN public.workout_plan ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))) = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan_day workout_plan_day_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_select_policy ON public.workout_plan_day FOR SELECT USING (true);


--
-- Name: workout_plan_day workout_plan_day_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_update_policy ON public.workout_plan_day FOR UPDATE USING ((( SELECT workout_plan.user_id
   FROM (public.workout_plan_day workout_plan_day_1
     JOIN public.workout_plan ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))) = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan workout_plan_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_delete_policy ON public.workout_plan FOR DELETE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan workout_plan_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_insert_policy ON public.workout_plan FOR INSERT WITH CHECK ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan workout_plan_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_select_policy ON public.workout_plan FOR SELECT USING (true);


--
-- Name: workout_plan_day workout_plan_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_select_policy ON public.workout_plan_day FOR SELECT USING (true);


--
-- Name: workout_plan workout_plan_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_update_policy ON public.workout_plan FOR UPDATE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO query_sender;


--
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public."user" TO query_sender;


--
-- Name: TABLE battle; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.battle TO query_sender;


--
-- Name: TABLE bodystat; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.bodystat TO query_sender;


--
-- Name: TABLE completed_workout; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.completed_workout TO PUBLIC;


--
-- Name: TABLE volume; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.volume TO PUBLIC;


--
-- Name: TABLE completed_workout_exercise; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.completed_workout_exercise TO PUBLIC;


--
-- Name: TABLE enemy; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.enemy TO query_sender;


--
-- Name: TABLE exercise; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.exercise TO PUBLIC;


--
-- Name: TABLE exercise_alias; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.exercise_alias TO query_sender;


--
-- Name: TABLE "group"; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public."group" TO query_sender;


--
-- Name: TABLE session_analytics; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.session_analytics TO query_sender;


--
-- Name: SEQUENCE session_analytics_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE public.session_analytics_id_seq TO query_sender;


--
-- Name: SEQUENCE session_analytics_user_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.session_analytics_user_id_seq TO PUBLIC;


--
-- Name: TABLE user_current_workout_plan; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.user_current_workout_plan TO PUBLIC;


--
-- Name: TABLE user_exercise; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.user_exercise TO query_sender;


--
-- Name: TABLE workout_plan; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.workout_plan TO PUBLIC;


--
-- Name: TABLE workout_plan_day; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.workout_plan_day TO PUBLIC;


--
-- Name: TABLE workout_plan_exercise; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.workout_plan_exercise TO PUBLIC;


--
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_ddl();


--
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_drop();


--
-- PostgreSQL database dump complete
--

