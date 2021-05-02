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
-- Name: graphile_migrate; Type: SCHEMA; Schema: -; Owner: eerik
--

CREATE SCHEMA graphile_migrate;


ALTER SCHEMA graphile_migrate OWNER TO eerik;

--
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: eerik
--

CREATE SCHEMA postgraphile_watch;


ALTER SCHEMA postgraphile_watch OWNER TO eerik;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: body_part_enum; Type: TYPE; Schema: public; Owner: eerik
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


ALTER TYPE public.body_part_enum OWNER TO eerik;

--
-- Name: exercise_type_enum; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.exercise_type_enum AS ENUM (
    'Barbell',
    'Bodyweight',
    'Olympic',
    'Dumbbell',
    'Machine',
    'Cable'
);


ALTER TYPE public.exercise_type_enum OWNER TO eerik;

--
-- Name: jwt_token; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.jwt_token AS (
	exp integer,
	user_id integer
);


ALTER TYPE public.jwt_token OWNER TO eerik;

--
-- Name: section_and_time_spent; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.section_and_time_spent AS (
	section character varying,
	time_spent double precision
);


ALTER TYPE public.section_and_time_spent OWNER TO eerik;

--
-- Name: strengthstats; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.strengthstats AS (
	average_strength numeric,
	num_exercises numeric,
	dph numeric
);


ALTER TYPE public.strengthstats OWNER TO eerik;

--
-- Name: volume; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.volume AS (
	sets integer,
	reps integer
);


ALTER TYPE public.volume OWNER TO eerik;

--
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: eerik
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


ALTER FUNCTION postgraphile_watch.notify_watchers_ddl() OWNER TO eerik;

--
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: eerik
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


ALTER FUNCTION postgraphile_watch.notify_watchers_drop() OWNER TO eerik;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public."user" (
    username character varying(32) NOT NULL,
    password text,
    groupname character varying(32),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."user" OWNER TO eerik;

--
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON TABLE public."user" IS '@omit create';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."user".password IS '@omit';


--
-- Name: COLUMN "user".groupname; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."user".groupname IS '@omit update';


--
-- Name: COLUMN "user".created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."user".created_at IS '@omit create, update, insert';


--
-- Name: COLUMN "user".updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."user".updated_at IS '@omit create, update, insert';


--
-- Name: active_user(); Type: FUNCTION; Schema: public; Owner: eerik
--

CREATE FUNCTION public.active_user() RETURNS public."user"
    LANGUAGE sql STABLE
    AS $$
  select * from "user" where username = 'orek'
$$;


ALTER FUNCTION public.active_user() OWNER TO eerik;

--
-- Name: calculate_strength_stats(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.calculate_strength_stats() OWNER TO eerik;

--
-- Name: calculate_total_damage(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.calculate_total_damage() OWNER TO eerik;

--
-- Name: create_user(text, text); Type: FUNCTION; Schema: public; Owner: eerik
--

CREATE FUNCTION public.create_user(username text, password text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  insert into "user"(username, password) values (username, crypt(password, gen_salt('bf')));
end;
$$;


ALTER FUNCTION public.create_user(username text, password text) OWNER TO eerik;

--
-- Name: encrypt_password_and_set_creator(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.encrypt_password_and_set_creator() OWNER TO eerik;

--
-- Name: battle; Type: TABLE; Schema: public; Owner: eerik
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


ALTER TABLE public.battle OWNER TO eerik;

--
-- Name: TABLE battle; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON TABLE public.battle IS '@omit create, update, insert, all';


--
-- Name: COLUMN battle.created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.battle.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN battle.updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.battle.updated_at IS '@omit create, update, insert';


--
-- Name: get_battle_and_check_expiry(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.get_battle_and_check_expiry() OWNER TO eerik;

--
-- Name: join_group(character varying, text); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.join_group(input_groupname character varying, input_password text) OWNER TO eerik;

--
-- Name: join_random_public_group(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.join_random_public_group() OWNER TO eerik;

--
-- Name: load_groupname(); Type: FUNCTION; Schema: public; Owner: eerik
--

CREATE FUNCTION public.load_groupname() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    new.groupName = (select groupName from "user" where username = NEW.username);
    return new;
  END;
$$;


ALTER FUNCTION public.load_groupname() OWNER TO eerik;

--
-- Name: notify_message_inserted(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.notify_message_inserted() OWNER TO eerik;

--
-- Name: notify_user_exercise_inserted(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.notify_user_exercise_inserted() OWNER TO eerik;

--
-- Name: notify_workout_inserted(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.notify_workout_inserted() OWNER TO eerik;

--
-- Name: nullify_group(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.nullify_group() OWNER TO eerik;

--
-- Name: scale_health(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.scale_health() OWNER TO eerik;

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: eerik
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_set_timestamp() OWNER TO eerik;

--
-- Name: update_battle_to_current(); Type: FUNCTION; Schema: public; Owner: eerik
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


ALTER FUNCTION public.update_battle_to_current() OWNER TO eerik;

--
-- Name: current; Type: TABLE; Schema: graphile_migrate; Owner: eerik
--

CREATE TABLE graphile_migrate.current (
    filename text DEFAULT 'current.sql'::text NOT NULL,
    content text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE graphile_migrate.current OWNER TO eerik;

--
-- Name: migrations; Type: TABLE; Schema: graphile_migrate; Owner: eerik
--

CREATE TABLE graphile_migrate.migrations (
    hash text NOT NULL,
    previous_hash text,
    filename text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE graphile_migrate.migrations OWNER TO eerik;

--
-- Name: bodystat; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.bodystat (
    username character varying(32) NOT NULL,
    ismale boolean NOT NULL,
    bodymass integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT bodystat_bodymass_check CHECK ((bodymass > 0))
);


ALTER TABLE public.bodystat OWNER TO eerik;

--
-- Name: TABLE bodystat; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON TABLE public.bodystat IS '@omit all';


--
-- Name: COLUMN bodystat.created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.bodystat.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN bodystat.updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.bodystat.updated_at IS '@omit create, update, insert';


--
-- Name: bodystat_user_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.bodystat_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bodystat_user_id_seq OWNER TO eerik;

--
-- Name: bodystat_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.bodystat_user_id_seq OWNED BY public.bodystat.user_id;


--
-- Name: chat_message; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.chat_message (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    text_content character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    groupname character varying(32) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.chat_message OWNER TO eerik;

--
-- Name: COLUMN chat_message.id; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.chat_message.id IS '@omit create, update, insert';


--
-- Name: COLUMN chat_message.created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.chat_message.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN chat_message.updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.chat_message.updated_at IS '@omit create, update, insert';


--
-- Name: COLUMN chat_message.groupname; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.chat_message.groupname IS '@omit create, update, insert';


--
-- Name: chat_message_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.chat_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_message_id_seq OWNER TO eerik;

--
-- Name: chat_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.chat_message_id_seq OWNED BY public.chat_message.id;


--
-- Name: chat_message_user_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.chat_message_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_message_user_id_seq OWNER TO eerik;

--
-- Name: chat_message_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.chat_message_user_id_seq OWNED BY public.chat_message.user_id;


--
-- Name: completed_workout; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.completed_workout (
    id integer NOT NULL
);


ALTER TABLE public.completed_workout OWNER TO eerik;

--
-- Name: completed_workout_exercise; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.completed_workout_exercise (
    id integer NOT NULL,
    exercise_id integer NOT NULL,
    volume public.volume[] NOT NULL,
    completed_workout_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.completed_workout_exercise OWNER TO eerik;

--
-- Name: completed_workout_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.completed_workout_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.completed_workout_exercise_id_seq OWNER TO eerik;

--
-- Name: completed_workout_exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.completed_workout_exercise_id_seq OWNED BY public.completed_workout_exercise.id;


--
-- Name: completed_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.completed_workout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.completed_workout_id_seq OWNER TO eerik;

--
-- Name: completed_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.completed_workout_id_seq OWNED BY public.completed_workout.id;


--
-- Name: enemy; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.enemy (
    level integer NOT NULL,
    max_health double precision,
    name character varying(64)
);


ALTER TABLE public.enemy OWNER TO eerik;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    body_part public.body_part_enum NOT NULL,
    exercise_type public.exercise_type_enum NOT NULL,
    name character varying NOT NULL,
    count integer NOT NULL,
    elite_strength_baseline integer NOT NULL
);


ALTER TABLE public.exercise OWNER TO eerik;

--
-- Name: exercise_alias; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.exercise_alias (
    id integer,
    name character varying NOT NULL
);


ALTER TABLE public.exercise_alias OWNER TO eerik;

--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_id_seq OWNER TO eerik;

--
-- Name: exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.exercise_id_seq OWNED BY public.exercise.id;


--
-- Name: group; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public."group" (
    name character varying(32) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    password text,
    is_password_protected boolean GENERATED ALWAYS AS ((password IS NOT NULL)) STORED,
    battle_number integer
);


ALTER TABLE public."group" OWNER TO eerik;

--
-- Name: TABLE "group"; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON TABLE public."group" IS '@omit update';


--
-- Name: COLUMN "group".created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."group".created_at IS '@omit create, update, insert';


--
-- Name: COLUMN "group".updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."group".updated_at IS '@omit create, update, insert';


--
-- Name: COLUMN "group".password; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public."group".password IS '@omit select';


--
-- Name: session_analytics; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.session_analytics (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    analytics public.section_and_time_spent[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.session_analytics OWNER TO eerik;

--
-- Name: COLUMN session_analytics.id; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.session_analytics.id IS '@omit create, update, insert';


--
-- Name: session_analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.session_analytics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_analytics_id_seq OWNER TO eerik;

--
-- Name: session_analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.session_analytics_id_seq OWNED BY public.session_analytics.id;


--
-- Name: session_analytics_user_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.session_analytics_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_analytics_user_id_seq OWNER TO eerik;

--
-- Name: session_analytics_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.session_analytics_user_id_seq OWNED BY public.session_analytics.user_id;


--
-- Name: user_current_workout_plan; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.user_current_workout_plan (
    user_id integer NOT NULL,
    workout_plan_id integer
);


ALTER TABLE public.user_current_workout_plan OWNER TO eerik;

--
-- Name: user_exercise; Type: TABLE; Schema: public; Owner: eerik
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


ALTER TABLE public.user_exercise OWNER TO eerik;

--
-- Name: COLUMN user_exercise.groupname; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.user_exercise.groupname IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.battle_number; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.user_exercise.battle_number IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.created_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.user_exercise.created_at IS '@omit create, update, insert';


--
-- Name: COLUMN user_exercise.updated_at; Type: COMMENT; Schema: public; Owner: eerik
--

COMMENT ON COLUMN public.user_exercise.updated_at IS '@omit create, update, insert';


--
-- Name: user_exercise_user_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.user_exercise_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_exercise_user_id_seq OWNER TO eerik;

--
-- Name: user_exercise_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.user_exercise_user_id_seq OWNED BY public.user_exercise.user_id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO eerik;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: workout_plan; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.workout_plan (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer
);


ALTER TABLE public.workout_plan OWNER TO eerik;

--
-- Name: workout_plan_exercise; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.workout_plan_exercise (
    exercise_id integer NOT NULL,
    sets integer NOT NULL,
    reps integer NOT NULL
);


ALTER TABLE public.workout_plan_exercise OWNER TO eerik;

--
-- Name: workout_plan_day; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.workout_plan_day (
    id integer NOT NULL,
    workout_exercises public.workout_plan_exercise[] NOT NULL,
    workout_plan_id integer,
    name character varying NOT NULL
);


ALTER TABLE public.workout_plan_day OWNER TO eerik;

--
-- Name: workout_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.workout_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workout_plan_id_seq OWNER TO eerik;

--
-- Name: workout_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.workout_plan_id_seq OWNED BY public.workout_plan_day.id;


--
-- Name: workout_plan_id_seq1; Type: SEQUENCE; Schema: public; Owner: eerik
--

CREATE SEQUENCE public.workout_plan_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workout_plan_id_seq1 OWNER TO eerik;

--
-- Name: workout_plan_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: eerik
--

ALTER SEQUENCE public.workout_plan_id_seq1 OWNED BY public.workout_plan.id;


--
-- Name: bodystat user_id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.bodystat ALTER COLUMN user_id SET DEFAULT nextval('public.bodystat_user_id_seq'::regclass);


--
-- Name: chat_message id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.chat_message ALTER COLUMN id SET DEFAULT nextval('public.chat_message_id_seq'::regclass);


--
-- Name: chat_message user_id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.chat_message ALTER COLUMN user_id SET DEFAULT nextval('public.chat_message_user_id_seq'::regclass);


--
-- Name: completed_workout id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout ALTER COLUMN id SET DEFAULT nextval('public.completed_workout_id_seq'::regclass);


--
-- Name: completed_workout_exercise id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout_exercise ALTER COLUMN id SET DEFAULT nextval('public.completed_workout_exercise_id_seq'::regclass);


--
-- Name: exercise id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.exercise ALTER COLUMN id SET DEFAULT nextval('public.exercise_id_seq'::regclass);


--
-- Name: session_analytics id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN id SET DEFAULT nextval('public.session_analytics_id_seq'::regclass);


--
-- Name: session_analytics user_id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN user_id SET DEFAULT nextval('public.session_analytics_user_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_exercise user_id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise ALTER COLUMN user_id SET DEFAULT nextval('public.user_exercise_user_id_seq'::regclass);


--
-- Name: workout_plan id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan ALTER COLUMN id SET DEFAULT nextval('public.workout_plan_id_seq1'::regclass);


--
-- Name: workout_plan_day id; Type: DEFAULT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan_day ALTER COLUMN id SET DEFAULT nextval('public.workout_plan_id_seq'::regclass);


--
-- Data for Name: current; Type: TABLE DATA; Schema: graphile_migrate; Owner: eerik
--

COPY graphile_migrate.current (filename, content, date) FROM stdin;
current.sql	-- Enter migration here\ncreate index if not exists workout_plan_id_seq on "workout_plan"(user_id);\n	2021-05-02 10:48:31.389847+03
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: graphile_migrate; Owner: eerik
--

COPY graphile_migrate.migrations (hash, previous_hash, filename, date) FROM stdin;
sha1:098815c5614167785ee8893db3da508584fa2991	\N	000001.sql	2021-05-02 10:45:11.728764+03
sha1:1ffd055dbf157316f64dc0c9dcc645f702f78a3a	sha1:098815c5614167785ee8893db3da508584fa2991	000002.sql	2021-05-02 10:45:11.819791+03
sha1:83d08ff3784543990488699fb36fb02fc3fab6c6	sha1:1ffd055dbf157316f64dc0c9dcc645f702f78a3a	000003.sql	2021-05-02 10:45:11.823818+03
sha1:288f775859719c8724fd2498059d97a0f7d3fc09	sha1:83d08ff3784543990488699fb36fb02fc3fab6c6	000004.sql	2021-05-02 10:45:11.826956+03
sha1:b475414a4ab6153cbc20c4d82ae328019a09446e	sha1:288f775859719c8724fd2498059d97a0f7d3fc09	000005.sql	2021-05-02 10:45:11.830881+03
sha1:8542c5a8435fc729b069900575ed7e9f023f082d	sha1:b475414a4ab6153cbc20c4d82ae328019a09446e	000006.sql	2021-05-02 10:45:11.839642+03
sha1:d78ee62ce99871b8a7944c132b8dd7ba52686dc3	sha1:8542c5a8435fc729b069900575ed7e9f023f082d	000007.sql	2021-05-02 10:45:11.855234+03
sha1:a95aa26c64a37d7ecadc07a049aa0d6c58e54921	sha1:d78ee62ce99871b8a7944c132b8dd7ba52686dc3	000008.sql	2021-05-02 10:45:11.860279+03
sha1:4352b4eabd06f20183301cc1b11c7aa52bd3fe7e	sha1:a95aa26c64a37d7ecadc07a049aa0d6c58e54921	000009.sql	2021-05-02 10:45:11.884584+03
sha1:34267d94e82f16a798bb30e5cf195a9944db60f5	sha1:4352b4eabd06f20183301cc1b11c7aa52bd3fe7e	000010.sql	2021-05-02 10:45:11.939229+03
sha1:38f79a787992a715ce6642406bff26c329105536	sha1:34267d94e82f16a798bb30e5cf195a9944db60f5	000011.sql	2021-05-02 10:45:11.951736+03
sha1:28ef2524a70a92896db46b8b7b289dd7baa9c8ec	sha1:38f79a787992a715ce6642406bff26c329105536	000012.sql	2021-05-02 10:45:11.977963+03
sha1:dbab98216984f9ddcdd7a3ae86f4a28910d9169b	sha1:28ef2524a70a92896db46b8b7b289dd7baa9c8ec	000013.sql	2021-05-02 10:45:11.998096+03
sha1:0654172cb085ff95cb81d5ee80cd4b1a12a940f5	sha1:dbab98216984f9ddcdd7a3ae86f4a28910d9169b	000014.sql	2021-05-02 10:45:12.010964+03
sha1:1d36938d73b47adf8764f6d04097f47d16c364ba	sha1:0654172cb085ff95cb81d5ee80cd4b1a12a940f5	000015.sql	2021-05-02 10:45:12.020409+03
sha1:33d99fb3dc3d77bb5ee32044c2673a2f9f632ada	sha1:1d36938d73b47adf8764f6d04097f47d16c364ba	000016.sql	2021-05-02 10:45:12.03164+03
sha1:ceb7cca7a8dbc5cf7e8dc3bd61d1c533674b9549	sha1:33d99fb3dc3d77bb5ee32044c2673a2f9f632ada	000017.sql	2021-05-02 10:45:12.044223+03
sha1:842391f36ad5bd4665c1a448e4a1c5ea002d8c3c	sha1:ceb7cca7a8dbc5cf7e8dc3bd61d1c533674b9549	000018.sql	2021-05-02 10:45:12.060765+03
sha1:307d4c60af4928b7af07fc0fc14257faf9718381	sha1:842391f36ad5bd4665c1a448e4a1c5ea002d8c3c	000019.sql	2021-05-02 10:45:12.063223+03
sha1:9791fdcb9ca22cc6b0800898822e035b9eceda45	sha1:307d4c60af4928b7af07fc0fc14257faf9718381	000020.sql	2021-05-02 10:45:12.075726+03
\.


--
-- Data for Name: battle; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.battle (enemy_level, groupname, battle_number, current_health, max_health, created_at, updated_at) FROM stdin;
1	Team Public	1	20	20	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03
\.


--
-- Data for Name: bodystat; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.bodystat (username, ismale, bodymass, created_at, updated_at, user_id) FROM stdin;
orek	t	85	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	1
eerik	f	69	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	2
no team	t	70	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	3
\.


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.chat_message (id, username, text_content, created_at, updated_at, groupname, user_id) FROM stdin;
1	orek	Good day today, right?	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	Team Public	1
\.


--
-- Data for Name: completed_workout; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.completed_workout (id) FROM stdin;
\.


--
-- Data for Name: completed_workout_exercise; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.completed_workout_exercise (id, exercise_id, volume, completed_workout_id, created_at) FROM stdin;
\.


--
-- Data for Name: enemy; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.enemy (level, max_health, name) FROM stdin;
1	10	Earth Golem
\.


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.exercise (id, body_part, exercise_type, name, count, elite_strength_baseline) FROM stdin;
1	Chest	Barbell	Bench Press	13354162	235
2	Whole Body	Barbell	Deadlift	7724948	344
3	Legs	Barbell	Squat	7651637	307
4	Shoulders	Barbell	Shoulder Press	1915786	154
5	Back	Bodyweight	Pull Ups	1097769	21
6	Chest	Dumbbell	Dumbbell Bench Press	986718	106
7	Biceps	Barbell	Barbell Curl	916536	122
8	Biceps	Dumbbell	Dumbbell Curl	782061	66
9	Legs	Barbell	Front Squat	645762	233
10	Back	Barbell	Bent Over Row	605088	205
11	Chest	Bodyweight	Push Ups	564613	67
12	Shoulders	Dumbbell	Dumbbell Shoulder Press	486383	84
13	Whole Body	Barbell	Power Clean	475910	200
14	Chest	Barbell	Incline Bench Press	440513	210
15	Legs	Machine	Sled Leg Press	439430	601
16	Triceps	Bodyweight	Dips	434271	32
17	Shoulders	Barbell	Military Press	321890	154
18	Whole Body	Barbell	Hex Bar Deadlift	321335	353
19	Back	Cable	Lat Pulldown	316879	186
20	Chest	Dumbbell	Incline Dumbbell Bench Press	265624	95
21	Back	Bodyweight	Chin Ups	256834	19
22	Legs	Machine	Horizontal Leg Press	236861	514
23	Shoulders	Dumbbell	Dumbbell Lateral Raise	214661	49
24	Back	Dumbbell	Dumbbell Row	214213	115
25	Whole Body	Barbell	Snatch	199614	173
26	Whole Body	Barbell	Clean and Jerk	196690	209
27	Whole Body	Barbell	Romanian Deadlift	188400	294
28	Legs	Barbell	Hip Thrust	188151	399
29	Whole Body	Barbell	Sumo Deadlift	166154	369
30	Whole Body	Barbell	Clean	158297	200
31	Legs	Machine	Leg Extension	156665	251
32	Shoulders	Barbell	Push Press	144198	203
33	Whole Body	Barbell	Clean and Press	136368	185
34	Chest	Machine	Chest Press	117104	236
35	Triceps	Cable	Tricep Pushdown	114113	167
36	Back	Barbell	Barbell Shrug	110032	371
37	Legs	Machine	Machine Calf Raise	98324	422
38	Legs	Machine	Vertical Leg Press	97872	588
39	Chest	Barbell	Decline Bench Press	97141	256
40	Biceps	Dumbbell	Hammer Curl	90684	65
41	Back	Cable	Seated Cable Row	85784	201
42	Triceps	Cable	Tricep Rope Pushdown	85490	138
43	Back	Dumbbell	Dumbbell Shrug	85464	133
44	Chest	Barbell	Close Grip Bench Press	85277	218
45	Chest	Dumbbell	Dumbbell Fly	85262	72
46	Back	Barbell	Pendlay Row	82540	207
47	Legs	Machine	Seated Leg Curl	76493	206
48	Legs	Dumbbell	Dumbbell Lunge	76227	91
49	Back	Barbell	T-Bar Row	75586	228
50	Triceps	Dumbbell	Dumbbell Tricep Extension	74163	79
51	Triceps	Barbell	Tricep Extension	73719	159
52	Shoulders	Barbell	Upright Row	72743	179
53	Biceps	Barbell	Preacher Curl	69945	124
54	Legs	Dumbbell	Goblet Squat	68753	116
55	Whole Body	Barbell	Rack Pull	68314	430
56	Triceps	Barbell	Lying Tricep Extension	67626	133
57	Legs	Machine	Lying Leg Curl	67495	177
58	Shoulders	Dumbbell	Dumbbell Front Raise	64522	62
59	Core	Bodyweight	Sit Ups	64216	91
60	Shoulders	Machine	Machine Shoulder Press	64007	219
61	Biceps	Barbell	EZ Bar Curl	60909	118
62	Whole Body	Bodyweight	Muscle Ups	59791	12
63	Biceps	Dumbbell	Dumbbell Concentration Curl	59477	62
64	Chest	Machine	Machine Chest Fly	54909	222
65	Back	Barbell	Good Morning	54162	260
66	Legs	Bodyweight	Bodyweight Squat	54141	101
67	Legs	Dumbbell	Dumbbell Bulgarian Split Squat	52172	85
68	Legs	Barbell	Box Squat	52037	353
69	Chest	Dumbbell	Arnold Press	48498	69
70	Legs	Machine	Hack Squat	48468	433
71	Whole Body	Barbell	Thruster	47769	197
72	Legs	Barbell	Overhead Squat	46670	233
73	Chest	Barbell	Floor Press	45923	270
74	Shoulders	Barbell	Seated Shoulder Press	44960	187
75	Whole Body	Barbell	Stiff Leg Deadlift	44850	298
76	Chest	Dumbbell	Incline Dumbbell Fly	43718	80
77	Triceps	Dumbbell	Lying Dumbbell Tricep Extension	43355	74
78	Whole Body	Barbell	Push Jerk	42885	211
79	Legs	Barbell	Zercher Squat	41278	279
80	Back	Cable	Face Pull	40942	144
81	Legs	Barbell	Barbell Lunge	40333	225
82	Chest	Cable	Cable Fly	39375	154
83	Legs	Barbell	Bulgarian Split Squat	38661	210
84	Legs	Machine	Seated Calf Raise	38644	319
85	Biceps	Dumbbell	Incline Dumbbell Curl	38591	57
86	Whole Body	Barbell	Hang Clean	38301	194
87	Legs	Machine	Hip Abduction	38296	294
88	Forearms	Barbell	Wrist Curl	37940	233
89	Whole Body	Barbell	Power Snatch	36647	178
90	Core	Bodyweight	Crunches	36198	95
91	Whole Body	Dumbbell	Dumbbell Romanian Deadlift	35711	126
92	Back	Dumbbell	Dumbbell Pullover	35404	101
93	Chest	Dumbbell	Dumbbell Floor Press	34592	98
94	Legs	Machine	Hip Adduction	34224	312
95	Back	Dumbbell	Dumbbell Reverse Fly	30802	64
96	Chest	Dumbbell	Decline Dumbbell Bench Press	30536	101
97	Legs	Barbell	Split Squat	30315	269
98	Chest	Barbell	Reverse Grip Bench Press	29703	266
99	Triceps	Dumbbell	Dumbbell Tricep Kickback	29435	56
100	Legs	Barbell	Landmine Squat	29407	303
101	Biceps	Cable	Cable Bicep Curl	29233	161
102	Forearms	Barbell	Reverse Wrist Curl	28669	247
103	Core	Cable	Cable Crunch	26284	245
104	Back	Dumbbell	Chest Supported Dumbbell Row	25567	112
105	Legs	Bodyweight	Single Leg Squat	25275	34
106	Shoulders	Cable	Cable Lateral Raise	25119	82
107	Legs	Cable	Cable Pull Through	24990	192
108	Biceps	Barbell	Reverse Barbell Curl	24812	136
109	Biceps	Cable	One Arm Cable Bicep Curl	23906	140
110	Chest	Bodyweight	One Arm Push Ups	20202	32
111	Chest	Bodyweight	Handstand Push Ups	16188	31
112	Whole Body	Bodyweight	Burpees	15144	72
113	Legs	Bodyweight	Lunge	11349	72
114	Chest	Bodyweight	Diamond Push Ups	10362	46
115	Back	Bodyweight	One Arm Pull Ups	7339	9
116	Back	Bodyweight	Neutral Grip Pull Ups	5616	28
117	Core	Bodyweight	Hanging Leg Raise	4474	33
118	Core	Bodyweight	Russian Twist	3979	74
119	Legs	Bodyweight	Glute Bridge	3857	89
120	Back	Bodyweight	Inverted Row	3775	36
121	Back	Bodyweight	Back Extension	3450	66
122	Core	Bodyweight	Toes To Bar	2942	34
123	Core	Bodyweight	Lying Leg Raise	2701	74
124	Legs	Bodyweight	Glute Ham Raise	1187	58
125	Biceps	Barbell	Strict Curl	46	119
126	Legs	Dumbbell	Dumbbell Squat	36	105
127	Chest	Barbell	Paused Bench Press	32	241
128	Legs	Barbell	Barbell Reverse Lunge	22	290
129	Back	Dumbbell	Renegade Row	20	89
130	Triceps	Machine	Machine Tricep Press	20	224
131	Core	Dumbbell	Dumbbell Side Bend	19	128
132	Legs	Dumbbell	Dumbbell Calf Raise	19	151
133	Biceps	Machine	Machine Bicep Curl	19	148
134	Legs	Bodyweight	Pistol Squat	18	30
135	Whole Body	Dumbbell	Dumbbell Deadlift	18	117
136	Legs	Barbell	Barbell Calf Raise	17	340
137	Legs	Barbell	Smith Machine Squat	17	299
138	Back	Cable	Reverse Grip Lat Pulldown	16	237
139	Forearms	Dumbbell	Dumbbell Wrist Curl	15	107
140	Back	Machine	Machine Row	15	264
141	Shoulders	Dumbbell	Dumbbell Z Press	14	82
142	Back	Dumbbell	Dumbbell Bench Pull	13	89
143	Legs	Barbell	Pause Squat	12	291
144	Whole Body	Barbell	Hang Power Clean	12	182
145	Legs	Bodyweight	Bodyweight Calf Raise	11	122
146	Triceps	Dumbbell	Tate Press	11	72
147	Back	Machine	Close Grip Lat Pulldown	11	207
148	Chest	Barbell	Smith Machine Bench Press	11	243
149	Legs	Barbell	Safety Bar Squat	10	318
150	Triceps	Machine	Seated Dip Machine	10	292
151	Shoulders	Barbell	Neck Curl	9	272
152	Whole Body	Barbell	Deficit Deadlift	9	369
153	Whole Body	Barbell	Split Jerk	9	193
154	Shoulders	Machine	Machine Lateral Raise	9	177
155	Shoulders	Barbell	Log Press	8	210
156	Shoulders	Dumbbell	Dumbbell Upright Row	8	112
157	Back	Machine	Machine Reverse Fly	8	185
158	Chest	Cable	Cable Crossover	8	160
159	Chest	Barbell	Wide Grip Bench Press	7	253
160	Legs	Barbell	Sumo Squat	7	312
161	Biceps	Dumbbell	Dumbbell Preacher Curl	7	71
162	Legs	Machine	Sled Press Calf Raise	7	687
163	Legs	Machine	Single Leg Press	7	453
164	Whole Body	Barbell	Single Leg Deadlift	6	161
165	Triceps	Bodyweight	Bench Dips	6	57
166	Back	Cable	Straight Arm Pulldown	6	158
167	Core	Bodyweight	Hanging Knee Raise	5	31
168	Core	Machine	Machine Seated Crunch	5	231
169	Triceps	Cable	Cable Overhead Tricep Extension	5	154
170	Core	Cable	Cable Woodchoppers	5	104
171	Shoulders	Barbell	Neck Extension	4	63
172	Legs	Barbell	Barbell Glute Bridge	4	363
173	Chest	Dumbbell	Close Grip Dumbbell Bench Press	4	129
174	Whole Body	Barbell	Pause Deadlift	3	307
175	Triceps	Barbell	JM Press	3	169
176	Core	Bodyweight	Ab Wheel Rollout	3	42
177	Back	Barbell	Bench Pull	3	161
178	Whole Body	Barbell	Snatch Grip Deadlift	3	339
179	Whole Body	Barbell	Clean Pull	3	198
180	Whole Body	Dumbbell	Dumbbell Snatch	3	107
181	Biceps	Dumbbell	Incline Hammer Curl	3	131
182	Triceps	Cable	Reverse Grip Tricep Pushdown	3	208
183	Chest	Barbell	Bench Pin Press	2	224
184	Shoulders	Barbell	Behind The Neck Press	2	177
185	Legs	Barbell	Barbell Hack Squat	2	308
186	Shoulders	Barbell	Landmine Press	2	162
187	Back	Bodyweight	Australian Pull Ups	2	46
188	Whole Body	Bodyweight	Ring Muscle Ups	2	19
189	Legs	Bodyweight	Reverse Lunge	2	46
190	Whole Body	Barbell	Muscle Snatch	2	164
191	Back	Machine	Machine Back Extension	2	313
192	Legs	Barbell	Pin Squat	1	269
193	Whole Body	Barbell	Snatch Deadlift	1	251
194	Shoulders	Barbell	Barbell Front Raise	1	104
195	Legs	Barbell	Belt Squat	1	457
196	Biceps	Barbell	Reverse Curl	1	200
197	Back	Barbell	Yates Row	1	214
198	Core	Cable	High Pulley Crunch	1	158
199	Legs	Barbell	Walking Lunge	0	225
200	Back	Barbell	Machine Shrug	0	244
201	Whole Body	Barbell	Jefferson Squat	0	271
202	Back	Barbell	Behind The Back Barbell Shrug	0	371
203	Back	Barbell	Barbell Power Shrug	0	371
204	Back	Barbell	Bent Arm Barbell Pullover	0	72
205	Biceps	Barbell	Cheat Curl	0	122
206	Legs	Bodyweight	Donkey Calf Raise	0	119
207	Shoulders	Barbell	Viking Press	0	168
208	Biceps	Barbell	Spider Curl	0	127
209	Shoulders	Barbell	Shoulder Pin Press	0	170
210	Back	Barbell	Barbell Pullover	0	72
211	Whole Body	Barbell	Wall Ball	0	64
212	Whole Body	Barbell	Single Leg Romanian Deadlift	0	443
213	Shoulders	Barbell	Z Press	0	158
214	Whole Body	Barbell	Jefferson Deadlift	0	377
215	Whole Body	Bodyweight	Star Jump	0	98
216	Whole Body	Bodyweight	Squat Thrust	0	65
217	Legs	Bodyweight	Squat Jump	0	86
218	Legs	Bodyweight	Side Lunge	0	70
219	Core	Bodyweight	Side Crunch	0	81
220	Core	Bodyweight	Roman Chair Side Bend	0	53
221	Chest	Bodyweight	Pike Push Up	0	48
222	Core	Bodyweight	Mountain Climbers	0	73
223	Legs	Bodyweight	Leg Lift	0	51
224	Core	Bodyweight	Jumping Jack	0	93
225	Legs	Bodyweight	Jump Squat	0	84
226	Chest	Bodyweight	Incline Push Up	0	56
227	Core	Bodyweight	Incline Bench Sit Up	0	93
228	Legs	Bodyweight	Hip Extension	0	63
229	Core	Bodyweight	Flutter Kick	0	81
230	Legs	Bodyweight	Floor Hip Extension	0	39
231	Legs	Bodyweight	Floor Hip Abduction	0	39
232	Chest	Bodyweight	Decline Push Up	0	56
233	Core	Bodyweight	Decline Crunch	0	76
234	Whole Body	Bodyweight	Clap Pull Up	0	17
235	Core	Bodyweight	Bicycle Crunch	0	64
236	Legs	Bodyweight	Sissy Squat	0	40
237	Chest	Bodyweight	Close Grip Push Up	0	56
238	Legs	Bodyweight	Nordic Hamstring Curl	0	34
239	Core	Bodyweight	Reverse Crunches	0	56
240	Triceps	Bodyweight	Ring Dips	0	21
241	Shoulders	Dumbbell	Dumbbell Push Press	0	82
242	Whole Body	Dumbbell	Dumbbell High Pull	0	81
243	Whole Body	Dumbbell	Dumbbell Hang Clean	0	89
244	Whole Body	Barbell	Snatch Pull	0	184
245	Whole Body	Barbell	Clean High Pull	0	198
246	Back	Dumbbell	Dumbbell Incline Y Raise	0	83
247	Triceps	Dumbbell	Seated Dumbbell Tricep Extension	0	83
248	Shoulders	Dumbbell	Seated Dumbbell Shoulder Press	0	104
249	Forearms	Dumbbell	Dumbbell Reverse Wrist Curl	0	115
250	Legs	Dumbbell	Dumbbell Front Squat	0	106
251	Chest	Dumbbell	Decline Dumbbell Fly	0	76
252	Shoulders	Dumbbell	Dumbbell External Rotation	0	53
253	Back	Dumbbell	Bent Over Dumbbell Row	0	101
254	Biceps	Dumbbell	Seated Dumbbell Curl	0	66
255	Biceps	Dumbbell	Zottman Curl	0	64
256	Back	Barbell	Smith Machine Shrug	0	371
257	Legs	Machine	Single Leg Seated Calf Raise	0	197
258	Triceps	Machine	Machine Tricep Extension	0	139
259	Legs	Machine	Standing Leg Curl	0	191
260	Core	Cable	Standing Cable Crunch	0	235
261	Biceps	Cable	Overhead Cable Curl	0	164
262	Back	Cable	One Arm Seated Cable Row	0	172
263	Biceps	Cable	One Arm Pulldown	0	141
264	Biceps	Cable	Lying Cable Curl	0	163
265	Biceps	Cable	Incline Cable Curl	0	152
266	Back	Cable	Cable Upright Row	0	171
267	Back	Cable	Cable Shrug	0	256
268	Legs	Cable	Cable Leg Extension	0	118
269	Shoulders	Cable	Cable External Rotation	0	70
270	Biceps	Cable	Behind The Back Cable Curl	0	99
271	Back	Cable	Cable Reverse Fly	0	104
272	Legs	Cable	Cable Kickback	0	65
\.


--
-- Data for Name: exercise_alias; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.exercise_alias (id, name) FROM stdin;
4	Back Squat
6	Overhead Press
9	Bicep Curl
7	Barbell Front Squat
8	Barbell Row
35	Incline Press
24	Trap Bar Deadlift
25	Barbell Hip Thrust
123	Seated Barbell Shoulder Press
123	Seated Barbell Overhead Press
44	Skull Crusher
58	Barbell Preacher Curl
78	Barbell Floor Press
97	Stiff Legged Deadlift
97	Straight Legged Deadlift
41	French Press
164	Standing Calf Raise
129	Ssb Squat
129	Safety Squat Bar
129	Safety Squat
173	Neck Flexion
139	Seal Row
183	Back Press
183	Press Behind Neck
132	Landmine Chest Press
132	Standing Landmine Press
133	Reverse Grip Bent Over Row
14	Pullup
28	Press Up
15	Tricep Dips
15	Chest Dip
53	Ab Crunch
100	Hyper Extension
107	Diamond Pushups
112	Bridging
247	Incline Press Up
235	Decline Press Up
12	Squat Clean
155	One Arm Dumbbell Snatch
18	Dumbbell Press
47	Incline Dumbbell Press
16	Dumbbell Bent Over Row
16	One Arm Dumbbell Row
16	One Arm Row
60	Dumbbell Hammer Curl
60	Hammer Curls
39	Dumbbell Chest Fly
34	Shoulder Shrug
57	Dumbbell Lunges
93	Rear Delt Fly
93	Bent Over Lateral Raise
93	Bent Over Raise
106	Chest Supported Row
106	Incline Dumbbell Row
140	Dumbbell Seal Row
109	Dumbbell Kickback
87	Incline Curl
160	One Arm Dumbbell Preacher Curl
75	Decline Dumbbell Press
184	Close Grip Dumbbell Press
261	Seated Dumbbell Press
21	Seated Leg Press
92	Pec Deck Fly
92	Butterfly
92	Machine Fly
92	Fly Machine
92	Pec Deck
38	Hamstring Curl
146	Machine Curl
143	Hammer Strength Row
127	Machine Dip
188	Machine Rear Deltoid Fly
188	Rear Delt Machine
188	Reverse Pec Deck Fly
212	Leg Press Calf Raise
191	Single Leg Leg Press
150	Machine Crunches
22	Machine Pulldown
22	Back Lat Pulldown
51	Tricep Pressdown
63	Seated Row
63	Low Row
197	Reverse Grip Pulldown
102	Cable Curl
102	Biceps Cable Curl
102	Standing Cable Curl
134	Straight Arm Lat Pulldown
145	Overhead Tricep Rope Extension
145	Overhead Tricep Cable Extension
145	Overhead Cable Tricep Extension
145	Tricep Overhead Extension
125	Wood Chopper
125	Cable Wood Chop
198	Reverse Grip Tricep Extension
101	Cable Crunches
103	One Arm Cable Curl
2	Back Squat
3	Overhead Press
4	Pullup
6	Bicep Curl
8	Barbell Front Squat
9	Barbell Row
10	Press Up
11	Dumbbell Press
13	Incline Press
15	Tricep Dips
15	Chest Dip
17	Trap Bar Deadlift
18	Machine Pulldown
18	Back Lat Pulldown
19	Incline Dumbbell Press
21	Seated Leg Press
23	Dumbbell Bent Over Row
23	One Arm Dumbbell Row
23	One Arm Row
27	Barbell Hip Thrust
29	Squat Clean
34	Tricep Pressdown
39	Dumbbell Hammer Curl
39	Hammer Curls
40	Seated Row
40	Low Row
42	Shoulder Shrug
44	Dumbbell Chest Fly
46	Hamstring Curl
47	Dumbbell Lunges
50	French Press
52	Barbell Preacher Curl
55	Skull Crusher
63	Pec Deck Fly
63	Butterfly
63	Machine Fly
63	Fly Machine
63	Pec Deck
72	Barbell Floor Press
73	Seated Barbell Shoulder Press
73	Seated Barbell Overhead Press
74	Stiff Legged Deadlift
74	Straight Legged Deadlift
84	Incline Curl
89	Ab Crunch
94	Rear Delt Fly
94	Bent Over Lateral Raise
94	Bent Over Raise
95	Decline Dumbbell Press
98	Dumbbell Kickback
100	Cable Curl
100	Biceps Cable Curl
100	Standing Cable Curl
102	Cable Crunches
103	Chest Supported Row
103	Incline Dumbbell Row
108	One Arm Cable Curl
113	Diamond Pushups
118	Bridging
120	Hyper Extension
132	Machine Curl
137	Reverse Grip Pulldown
139	Hammer Strength Row
141	Dumbbell Seal Row
144	Standing Calf Raise
148	Ssb Squat
148	Safety Squat Bar
148	Safety Squat
149	Machine Dip
150	Neck Flexion
156	Machine Rear Deltoid Fly
156	Rear Delt Machine
156	Reverse Pec Deck Fly
160	One Arm Dumbbell Preacher Curl
161	Leg Press Calf Raise
162	Single Leg Leg Press
165	Straight Arm Lat Pulldown
167	Machine Crunches
168	Overhead Tricep Rope Extension
168	Overhead Tricep Cable Extension
168	Overhead Cable Tricep Extension
168	Tricep Overhead Extension
169	Wood Chopper
169	Cable Wood Chop
172	Close Grip Dumbbell Press
176	Seal Row
179	One Arm Dumbbell Snatch
181	Reverse Grip Tricep Extension
183	Back Press
183	Press Behind Neck
185	Landmine Chest Press
185	Standing Landmine Press
196	Reverse Grip Bent Over Row
225	Incline Press Up
231	Decline Press Up
247	Seated Dumbbell Press
2	Back Squat
3	Overhead Press
4	Pullup
6	Bicep Curl
8	Barbell Front Squat
9	Barbell Row
10	Press Up
11	Dumbbell Press
13	Incline Press
15	Tricep Dips
15	Chest Dip
17	Trap Bar Deadlift
18	Machine Pulldown
18	Back Lat Pulldown
19	Incline Dumbbell Press
21	Seated Leg Press
23	Dumbbell Bent Over Row
23	One Arm Dumbbell Row
23	One Arm Row
27	Barbell Hip Thrust
29	Squat Clean
34	Tricep Pressdown
39	Dumbbell Hammer Curl
39	Hammer Curls
40	Seated Row
40	Low Row
42	Shoulder Shrug
44	Dumbbell Chest Fly
46	Hamstring Curl
47	Dumbbell Lunges
50	French Press
52	Barbell Preacher Curl
55	Skull Crusher
63	Pec Deck Fly
63	Butterfly
63	Machine Fly
63	Fly Machine
63	Pec Deck
72	Barbell Floor Press
73	Seated Barbell Shoulder Press
73	Seated Barbell Overhead Press
74	Stiff Legged Deadlift
74	Straight Legged Deadlift
84	Incline Curl
89	Ab Crunch
94	Rear Delt Fly
94	Bent Over Lateral Raise
94	Bent Over Raise
95	Decline Dumbbell Press
98	Dumbbell Kickback
100	Cable Curl
100	Biceps Cable Curl
100	Standing Cable Curl
102	Cable Crunches
103	Chest Supported Row
103	Incline Dumbbell Row
108	One Arm Cable Curl
113	Diamond Pushups
118	Bridging
120	Hyper Extension
132	Machine Curl
137	Reverse Grip Pulldown
139	Hammer Strength Row
141	Dumbbell Seal Row
144	Standing Calf Raise
148	Ssb Squat
148	Safety Squat Bar
148	Safety Squat
149	Machine Dip
150	Neck Flexion
156	Machine Rear Deltoid Fly
156	Rear Delt Machine
156	Reverse Pec Deck Fly
160	One Arm Dumbbell Preacher Curl
161	Leg Press Calf Raise
162	Single Leg Leg Press
165	Straight Arm Lat Pulldown
167	Machine Crunches
168	Overhead Tricep Rope Extension
168	Overhead Tricep Cable Extension
168	Overhead Cable Tricep Extension
168	Tricep Overhead Extension
169	Wood Chopper
169	Cable Wood Chop
172	Close Grip Dumbbell Press
176	Seal Row
179	One Arm Dumbbell Snatch
181	Reverse Grip Tricep Extension
183	Back Press
183	Press Behind Neck
185	Landmine Chest Press
185	Standing Landmine Press
196	Reverse Grip Bent Over Row
225	Incline Press Up
231	Decline Press Up
247	Seated Dumbbell Press
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public."group" (name, created_at, updated_at, password, battle_number) FROM stdin;
Team Public	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	\N	1
\.


--
-- Data for Name: session_analytics; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.session_analytics (id, username, analytics, created_at, user_id) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public."user" (username, password, groupname, created_at, updated_at, id) FROM stdin;
private_team_creator	$2a$06$B8qCGgm6toHV2TyagHsetueNMY0z2fCI8tr..qSVUnBnW0DTxcNxK	\N	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	1
no team	$2a$06$gN4/cSh6btLPCZhfO0c8z.yWbGO/RcNH2I5WtsFoXafVem/dJkrFa	\N	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	2
Event Notice	$2a$06$wluao.9QXuJyy3cWagC2Gu0XUDMtdWD0sCIt7QoI6gPIQ7ciyMSSC	\N	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	3
orek	$2a$06$ggMmIbnYOMmG4UaF1EcTL.sXgkRlfQhUI9OBl70fKf1ErcYdtDU3i	Team Public	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	4
eerik	$2a$06$9YK3S8mCJyR7TryPTwhBZuICffVuaZYHgQusVV8opVb.H2Y60r/MK	Team Public	2021-05-02 10:45:11.860279+03	2021-05-02 10:45:11.860279+03	5
\.


--
-- Data for Name: user_current_workout_plan; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.user_current_workout_plan (user_id, workout_plan_id) FROM stdin;
1	\N
4	\N
\.


--
-- Data for Name: user_exercise; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.user_exercise (id, username, repetitions, liftmass, strongerpercentage, groupname, battle_number, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: workout_plan; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.workout_plan (id, created_at, user_id) FROM stdin;
1	2021-05-02 10:45:12.075726+03	4
\.


--
-- Data for Name: workout_plan_day; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.workout_plan_day (id, workout_exercises, workout_plan_id, name) FROM stdin;
\.


--
-- Data for Name: workout_plan_exercise; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.workout_plan_exercise (exercise_id, sets, reps) FROM stdin;
\.


--
-- Name: bodystat_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.bodystat_user_id_seq', 3, true);


--
-- Name: chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.chat_message_id_seq', 1, true);


--
-- Name: chat_message_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.chat_message_user_id_seq', 1, true);


--
-- Name: completed_workout_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.completed_workout_exercise_id_seq', 1, false);


--
-- Name: completed_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.completed_workout_id_seq', 1, false);


--
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.exercise_id_seq', 272, true);


--
-- Name: session_analytics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.session_analytics_id_seq', 1, false);


--
-- Name: session_analytics_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.session_analytics_user_id_seq', 1, false);


--
-- Name: user_exercise_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.user_exercise_user_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: workout_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.workout_plan_id_seq', 1, false);


--
-- Name: workout_plan_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: eerik
--

SELECT pg_catalog.setval('public.workout_plan_id_seq1', 1, true);


--
-- Name: current current_pkey; Type: CONSTRAINT; Schema: graphile_migrate; Owner: eerik
--

ALTER TABLE ONLY graphile_migrate.current
    ADD CONSTRAINT current_pkey PRIMARY KEY (filename);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: graphile_migrate; Owner: eerik
--

ALTER TABLE ONLY graphile_migrate.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (hash);


--
-- Name: battle battle_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_pkey PRIMARY KEY (groupname, battle_number);


--
-- Name: bodystat bodystat_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.bodystat
    ADD CONSTRAINT bodystat_pkey PRIMARY KEY (username);


--
-- Name: chat_message chat_message_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_pkey PRIMARY KEY (id);


--
-- Name: completed_workout_exercise completed_workout_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_pkey PRIMARY KEY (id);


--
-- Name: completed_workout completed_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout
    ADD CONSTRAINT completed_workout_pkey PRIMARY KEY (id);


--
-- Name: enemy enemy_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.enemy
    ADD CONSTRAINT enemy_pkey PRIMARY KEY (level);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (name);


--
-- Name: session_analytics session_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.session_analytics
    ADD CONSTRAINT session_analytics_pkey PRIMARY KEY (id);


--
-- Name: user unique_username; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: user_current_workout_plan user_current_workout_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_pkey PRIMARY KEY (user_id);


--
-- Name: user_exercise user_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_pkey PRIMARY KEY (id, username);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: workout_plan_day workout_plan_day_name_key; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT workout_plan_day_name_key UNIQUE (name);


--
-- Name: workout_plan_day workout_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT workout_plan_pkey PRIMARY KEY (id);


--
-- Name: workout_plan workout_plan_pkey1; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT workout_plan_pkey1 PRIMARY KEY (id);


--
-- Name: battle_enemy_level_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX battle_enemy_level_idx ON public.battle USING btree (enemy_level);


--
-- Name: battle_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX battle_groupname_idx ON public.battle USING btree (groupname);


--
-- Name: bodystat_user_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX bodystat_user_id_idx ON public.bodystat USING btree (user_id);


--
-- Name: bodystat_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX bodystat_username_idx ON public.bodystat USING btree (username);


--
-- Name: chat_message_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX chat_message_groupname_idx ON public.chat_message USING btree (groupname);


--
-- Name: chat_message_user_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX chat_message_user_id_idx ON public.chat_message USING btree (user_id);


--
-- Name: chat_message_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX chat_message_username_idx ON public.chat_message USING btree (username);


--
-- Name: completed_workout_exercise_completed_workout_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX completed_workout_exercise_completed_workout_id_idx ON public.completed_workout_exercise USING btree (completed_workout_id);


--
-- Name: completed_workout_exercise_exercise_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX completed_workout_exercise_exercise_id_idx ON public.completed_workout_exercise USING btree (exercise_id);


--
-- Name: exercise_alias_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX exercise_alias_id_idx ON public.exercise_alias USING btree (id);


--
-- Name: group_name_battle_number_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX group_name_battle_number_idx ON public."group" USING btree (name, battle_number);


--
-- Name: session_analytics_user_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX session_analytics_user_id_idx ON public.session_analytics USING btree (user_id);


--
-- Name: session_analytics_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX session_analytics_username_idx ON public.session_analytics USING btree (username);


--
-- Name: user_current_workout_plan_workout_plan_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_current_workout_plan_workout_plan_id_idx ON public.user_current_workout_plan USING btree (workout_plan_id);


--
-- Name: user_exercise_groupname_battle_number_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_groupname_battle_number_idx ON public.user_exercise USING btree (groupname, battle_number);


--
-- Name: user_exercise_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_id_idx ON public.user_exercise USING btree (id);


--
-- Name: user_exercise_user_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_user_id_idx ON public.user_exercise USING btree (user_id);


--
-- Name: user_exercise_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_username_idx ON public.user_exercise USING btree (username);


--
-- Name: user_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_groupname_idx ON public."user" USING btree (groupname);


--
-- Name: workout_plan_day_workout_plan_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX workout_plan_day_workout_plan_id_idx ON public.workout_plan_day USING btree (workout_plan_id);


--
-- Name: workout_plan_exercise_exercise_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX workout_plan_exercise_exercise_id_idx ON public.workout_plan_exercise USING btree (exercise_id);


--
-- Name: group encrypt_password_and_set_creator_on_group_create; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER encrypt_password_and_set_creator_on_group_create BEFORE INSERT ON public."group" FOR EACH ROW EXECUTE FUNCTION public.encrypt_password_and_set_creator();


--
-- Name: chat_message load_groupname_to_chat_message; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER load_groupname_to_chat_message BEFORE INSERT ON public.chat_message FOR EACH ROW EXECUTE FUNCTION public.load_groupname();


--
-- Name: chat_message notify_message_inserted_on_insert; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER notify_message_inserted_on_insert AFTER INSERT ON public.chat_message FOR EACH ROW EXECUTE FUNCTION public.notify_message_inserted();


--
-- Name: user_exercise notify_user_exercise_inserted_on_insert; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER notify_user_exercise_inserted_on_insert AFTER INSERT ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.notify_user_exercise_inserted();


--
-- Name: user scale_health_on_groupname_change; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER scale_health_on_groupname_change AFTER UPDATE OF groupname ON public."user" FOR EACH ROW EXECUTE FUNCTION public.scale_health();


--
-- Name: battle set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.battle FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: bodystat set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.bodystat FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: chat_message set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.chat_message FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: group set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public."group" FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user_exercise set_timestamp; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user_exercise update_exercise_to_current_battle; Type: TRIGGER; Schema: public; Owner: eerik
--

CREATE TRIGGER update_exercise_to_current_battle BEFORE INSERT ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.update_battle_to_current();


--
-- Name: migrations migrations_previous_hash_fkey; Type: FK CONSTRAINT; Schema: graphile_migrate; Owner: eerik
--

ALTER TABLE ONLY graphile_migrate.migrations
    ADD CONSTRAINT migrations_previous_hash_fkey FOREIGN KEY (previous_hash) REFERENCES graphile_migrate.migrations(hash);


--
-- Name: battle battle_enemy_level_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_enemy_level_fkey FOREIGN KEY (enemy_level) REFERENCES public.enemy(level);


--
-- Name: battle battle_groupname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.battle
    ADD CONSTRAINT battle_groupname_fkey FOREIGN KEY (groupname) REFERENCES public."group"(name);


--
-- Name: bodystat bodystat_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.bodystat
    ADD CONSTRAINT bodystat_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: chat_message chat_message_groupname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_groupname_fkey FOREIGN KEY (groupname) REFERENCES public."group"(name);


--
-- Name: chat_message chat_message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: completed_workout_exercise completed_workout_exercise_completed_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_completed_workout_id_fkey FOREIGN KEY (completed_workout_id) REFERENCES public.completed_workout(id) ON DELETE CASCADE;


--
-- Name: completed_workout_exercise completed_workout_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.completed_workout_exercise
    ADD CONSTRAINT completed_workout_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- Name: group group_name_battle_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_name_battle_number_fkey FOREIGN KEY (name, battle_number) REFERENCES public.battle(groupname, battle_number) ON DELETE SET NULL;


--
-- Name: session_analytics session_analytics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.session_analytics
    ADD CONSTRAINT session_analytics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_current_workout_plan user_current_workout_plan_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_current_workout_plan user_current_workout_plan_workout_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_current_workout_plan
    ADD CONSTRAINT user_current_workout_plan_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE CASCADE;


--
-- Name: user_exercise user_exercise_groupname_battle_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_groupname_battle_number_fkey FOREIGN KEY (groupname, battle_number) REFERENCES public.battle(groupname, battle_number) ON DELETE SET NULL;


--
-- Name: user_exercise user_exercise_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user user_groupname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_groupname_fkey FOREIGN KEY (groupname) REFERENCES public."group"(name) ON DELETE SET NULL;


--
-- Name: workout_plan_day workout_plan_day_workout_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT workout_plan_day_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE CASCADE;


--
-- Name: workout_plan_exercise workout_plan_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan_exercise
    ADD CONSTRAINT workout_plan_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- Name: workout_plan workout_plan_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT workout_plan_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: battle; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.battle ENABLE ROW LEVEL SECURITY;

--
-- Name: battle battle_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY battle_create ON public.battle FOR INSERT TO query_sender WITH CHECK (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: battle battle_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY battle_delete ON public.battle FOR DELETE TO query_sender USING (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: battle battle_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY battle_select ON public.battle FOR SELECT TO query_sender USING (true);


--
-- Name: battle battle_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY battle_update ON public.battle FOR UPDATE TO query_sender USING (((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: bodystat; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.bodystat ENABLE ROW LEVEL SECURITY;

--
-- Name: bodystat bodystats_all; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY bodystats_all ON public.bodystat TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: chat_message; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.chat_message ENABLE ROW LEVEL SECURITY;

--
-- Name: chat_message chat_message_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY chat_message_create ON public.chat_message FOR INSERT TO query_sender WITH CHECK ((((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text) AND ((groupname)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text)));


--
-- Name: chat_message chat_message_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY chat_message_delete ON public.chat_message FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: chat_message chat_message_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY chat_message_select ON public.chat_message FOR SELECT TO query_sender USING (true);


--
-- Name: chat_message chat_message_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY chat_message_update ON public.chat_message FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: group; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public."group" ENABLE ROW LEVEL SECURITY;

--
-- Name: group group_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY group_create ON public."group" FOR INSERT TO query_sender WITH CHECK (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: group group_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY group_delete ON public."group" FOR DELETE TO query_sender USING (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: group group_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY group_select ON public."group" FOR SELECT TO query_sender USING (true);


--
-- Name: group group_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY group_update ON public."group" FOR UPDATE TO query_sender USING (((name)::text = (( SELECT active_user.groupname
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY session_analytics_create ON public.session_analytics FOR INSERT TO query_sender WITH CHECK (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY session_analytics_delete ON public.session_analytics FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY session_analytics_select ON public.session_analytics FOR SELECT TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY session_analytics_update ON public.session_analytics FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;

--
-- Name: user user_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_create ON public."user" FOR INSERT TO query_sender WITH CHECK ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.user_current_workout_plan ENABLE ROW LEVEL SECURITY;

--
-- Name: user_current_workout_plan user_current_workout_plan_delete_policy; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_current_workout_plan_delete_policy ON public.user_current_workout_plan FOR DELETE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan user_current_workout_plan_insert_policy; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_current_workout_plan_insert_policy ON public.user_current_workout_plan FOR INSERT WITH CHECK ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_current_workout_plan user_current_workout_plan_select_policy; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_current_workout_plan_select_policy ON public.user_current_workout_plan FOR SELECT USING (true);


--
-- Name: user_current_workout_plan user_current_workout_plan_update_policy; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_current_workout_plan_update_policy ON public.user_current_workout_plan FOR UPDATE USING ((user_id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user user_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_delete ON public."user" FOR DELETE TO query_sender USING ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: user_exercise; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.user_exercise ENABLE ROW LEVEL SECURITY;

--
-- Name: user_exercise user_exercise_create; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_exercise_create ON public.user_exercise FOR INSERT TO query_sender WITH CHECK (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user_exercise user_exercise_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_exercise_delete ON public.user_exercise FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user_exercise user_exercise_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_exercise_select ON public.user_exercise FOR SELECT TO query_sender USING (true);


--
-- Name: user_exercise user_exercise_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_exercise_update ON public.user_exercise FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user user_select; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_select ON public."user" FOR SELECT TO query_sender USING (true);


--
-- Name: user user_update; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_update ON public."user" FOR UPDATE TO query_sender USING ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: workout_plan_day; Type: ROW SECURITY; Schema: public; Owner: eerik
--

ALTER TABLE public.workout_plan_day ENABLE ROW LEVEL SECURITY;

--
-- Name: workout_plan_day workout_plan_select_policy; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY workout_plan_select_policy ON public.workout_plan_day FOR SELECT USING (true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO query_sender;


--
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public."user" TO query_sender;


--
-- Name: TABLE battle; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.battle TO query_sender;


--
-- Name: TABLE bodystat; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.bodystat TO query_sender;


--
-- Name: TABLE chat_message; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.chat_message TO query_sender;


--
-- Name: SEQUENCE chat_message_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT,USAGE ON SEQUENCE public.chat_message_id_seq TO query_sender;


--
-- Name: TABLE completed_workout; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.completed_workout TO PUBLIC;


--
-- Name: TABLE completed_workout_exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.completed_workout_exercise TO PUBLIC;


--
-- Name: SEQUENCE completed_workout_exercise_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON SEQUENCE public.completed_workout_exercise_id_seq TO PUBLIC;


--
-- Name: SEQUENCE completed_workout_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON SEQUENCE public.completed_workout_id_seq TO PUBLIC;


--
-- Name: TABLE enemy; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT ON TABLE public.enemy TO query_sender;


--
-- Name: TABLE exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.exercise TO PUBLIC;


--
-- Name: TABLE exercise_alias; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT ON TABLE public.exercise_alias TO query_sender;


--
-- Name: TABLE "group"; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public."group" TO query_sender;


--
-- Name: TABLE session_analytics; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.session_analytics TO query_sender;


--
-- Name: SEQUENCE session_analytics_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT,USAGE ON SEQUENCE public.session_analytics_id_seq TO query_sender;


--
-- Name: SEQUENCE session_analytics_user_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON SEQUENCE public.session_analytics_user_id_seq TO PUBLIC;


--
-- Name: TABLE user_current_workout_plan; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.user_current_workout_plan TO PUBLIC;


--
-- Name: TABLE user_exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.user_exercise TO query_sender;


--
-- Name: TABLE workout_plan; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.workout_plan TO PUBLIC;


--
-- Name: TABLE workout_plan_exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.workout_plan_exercise TO PUBLIC;


--
-- Name: TABLE workout_plan_day; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.workout_plan_day TO PUBLIC;


--
-- Name: SEQUENCE workout_plan_id_seq; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON SEQUENCE public.workout_plan_id_seq TO PUBLIC;


--
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: eerik
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_ddl();


ALTER EVENT TRIGGER postgraphile_watch_ddl OWNER TO eerik;

--
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: eerik
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_drop();


ALTER EVENT TRIGGER postgraphile_watch_drop OWNER TO eerik;

--
-- PostgreSQL database dump complete
--

