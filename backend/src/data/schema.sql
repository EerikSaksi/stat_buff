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
-- Name: jwt_token; Type: TYPE; Schema: public; Owner: eerik
--

CREATE TYPE public.jwt_token AS (
	exp integer,
	username character varying
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
-- Name: authenticate(text, text); Type: FUNCTION; Schema: public; Owner: eerik
--

CREATE FUNCTION public.authenticate(input_username text, input_password text) RETURNS public.jwt_token
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  authenticated_user "user"; 
begin
  select u.* into authenticated_user
    from "user" as u
    where u.username = input_username;

  if authenticated_user.password = crypt(input_password, authenticated_user.password) then
    return (
      extract(epoch from now() + interval '50 days'),
      authenticated_user.username
    )::jwt_token;
  else
    return null;
  end if;
end;
$$;


ALTER FUNCTION public.authenticate(input_username text, input_password text) OWNER TO eerik;

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
    string_id character varying NOT NULL,
    body_part character varying NOT NULL,
    weight_connection character varying NOT NULL,
    exercise_type character varying NOT NULL,
    name character varying NOT NULL
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
-- Name: workout; Type: TABLE; Schema: public; Owner: eerik
--

CREATE TABLE public.workout (
);


ALTER TABLE public.workout OWNER TO eerik;

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
-- Data for Name: current; Type: TABLE DATA; Schema: graphile_migrate; Owner: eerik
--

COPY graphile_migrate.current (filename, content, date) FROM stdin;
current.sql	-- Enter migration here\nalter table "user" drop constraint if exists user_pkey cascade;\ndrop table if exists workout;\ncreate table workout ();\n\n\nalter table\n  "bodystat" drop constraint if exists bodystat_username_fkey cascade;\nalter table\n  "chat_message" drop constraint if exists chat_message_username_fkey cascade;\nalter table "session_analytics"\n  drop constraint if exists session_analytics_username_fkey cascade;\nalter table "user_exercise"\n  drop constraint if exists user_exercise_username_fkey cascade;\n\n\nalter table "user" drop column if exists id cascade;\nalter table "user" add column id serial primary key;\n    \nalter table "bodystat" drop column if exists user_id cascade;\nalter table "bodystat" add column user_id serial references "user"(id) on delete cascade;\n\nalter table "chat_message" drop column if exists user_id cascade;\nalter table "chat_message" add column user_id serial references "user"(id) on delete cascade;\n\nalter table "session_analytics" drop column if exists user_id cascade;\nalter table "session_analytics" add column user_id serial references "user"(id) on delete cascade;\n\nalter table "user_exercise" drop column if exists user_id cascade;\nalter table "user_exercise" add column user_id serial references "user"(id) on delete cascade;\n\n\n	2021-04-25 21:17:22.41301+03
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: graphile_migrate; Owner: eerik
--

COPY graphile_migrate.migrations (hash, previous_hash, filename, date) FROM stdin;
sha1:098815c5614167785ee8893db3da508584fa2991	\N	000001.sql	2021-04-25 14:04:09.373213+03
sha1:1ffd055dbf157316f64dc0c9dcc645f702f78a3a	sha1:098815c5614167785ee8893db3da508584fa2991	000002.sql	2021-04-25 14:06:48.606608+03
sha1:83d08ff3784543990488699fb36fb02fc3fab6c6	sha1:1ffd055dbf157316f64dc0c9dcc645f702f78a3a	000003.sql	2021-04-25 14:07:40.076825+03
sha1:288f775859719c8724fd2498059d97a0f7d3fc09	sha1:83d08ff3784543990488699fb36fb02fc3fab6c6	000004.sql	2021-04-25 14:08:27.535498+03
sha1:b475414a4ab6153cbc20c4d82ae328019a09446e	sha1:288f775859719c8724fd2498059d97a0f7d3fc09	000005.sql	2021-04-25 14:19:59.483149+03
sha1:8542c5a8435fc729b069900575ed7e9f023f082d	sha1:b475414a4ab6153cbc20c4d82ae328019a09446e	000006.sql	2021-04-25 14:29:02.829513+03
sha1:d78ee62ce99871b8a7944c132b8dd7ba52686dc3	sha1:8542c5a8435fc729b069900575ed7e9f023f082d	000007.sql	2021-04-25 14:38:32.28778+03
sha1:a95aa26c64a37d7ecadc07a049aa0d6c58e54921	sha1:d78ee62ce99871b8a7944c132b8dd7ba52686dc3	000008.sql	2021-04-25 20:35:09.899861+03
\.


--
-- Data for Name: battle; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.battle (enemy_level, groupname, battle_number, current_health, max_health, created_at, updated_at) FROM stdin;
1	Team Public	1	20	20	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03
\.


--
-- Data for Name: bodystat; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.bodystat (username, ismale, bodymass, created_at, updated_at, user_id) FROM stdin;
orek	t	85	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	1
eerik	f	69	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	2
no team	t	70	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	3
\.


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.chat_message (id, username, text_content, created_at, updated_at, groupname, user_id) FROM stdin;
1	orek	Good day today, right?	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	Team Public	1
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

COPY public.exercise (id, string_id, body_part, weight_connection, exercise_type, name) FROM stdin;
60	hammer-curl	Biceps	Dumbbell Per Arm	Dumbbell	Hammer Curl
1	bench-press	Chest	Barbell Both Arms	Barbell	Bench Press
4	squat	Legs	Barbell Both Arms	Barbell	Squat
5	deadlift	Whole Body	Barbell Both Arms	Barbell	Deadlift
6	shoulder-press	Shoulders	Barbell Both Arms	Barbell	Shoulder Press
9	barbell-curl	Biceps	Barbell Both Arms	Barbell	Barbell Curl
7	front-squat	Legs	Barbell Both Arms	Barbell	Front Squat
8	bent-over-row	Back	Barbell Both Arms	Barbell	Bent Over Row
35	incline-bench-press	Chest	Barbell Both Arms	Barbell	Incline Bench Press
24	hex-bar-deadlift	Whole Body	Barbell Both Arms	Barbell	Hex Bar Deadlift
59	sumo-deadlift	Whole Body	Barbell Both Arms	Barbell	Sumo Deadlift
25	hip-thrust	Legs	Barbell Both Arms	Barbell	Hip Thrust
23	romanian-deadlift	Whole Body	Barbell Both Arms	Barbell	Romanian Deadlift
90	military-press	Shoulders	Barbell Both Arms	Barbell	Military Press
123	seated-shoulder-press	Shoulders	Barbell Both Arms	Barbell	Seated Shoulder Press
67	close-grip-bench-press	Chest	Barbell Both Arms	Barbell	Close Grip Bench Press
111	ez-bar-curl	Biceps	Barbell Both Arms	Barbell	EZ Bar Curl
31	barbell-shrug	Back	Barbell Both Arms	Barbell	Barbell Shrug
44	lying-tricep-extension	Triceps	Barbell Both Arms	Barbell	Lying Tricep Extension
203	strict-curl	Biceps	Barbell Both Arms	Barbell	Strict Curl
33	decline-bench-press	Chest	Barbell Both Arms	Barbell	Decline Bench Press
98	zercher-squat	Legs	Barbell Both Arms	Barbell	Zercher Squat
46	pendlay-row	Back	Barbell Both Arms	Barbell	Pendlay Row
74	box-squat	Legs	Barbell Both Arms	Barbell	Box Squat
50	t-bar-row	Back	Barbell Both Arms	Barbell	T-Bar Row
58	preacher-curl	Biceps	Barbell Both Arms	Barbell	Preacher Curl
158	paused-bench-press	Chest	Barbell Both Arms	Barbell	Paused Bench Press
64	rack-pull	Whole Body	Barbell Both Arms	Barbell	Rack Pull
27	upright-row	Shoulders	Barbell Both Arms	Barbell	Upright Row
78	floor-press	Chest	Barbell Both Arms	Barbell	Floor Press
169	barbell-reverse-lunge	Legs	Barbell Both Arms	Barbell	Barbell Reverse Lunge
94	wrist-curl	Forearms	Barbell Both Arms	Barbell	Wrist Curl
97	stiff-leg-deadlift	Whole Body	Barbell Both Arms	Barbell	Stiff Leg Deadlift
213	barbell-calf-raise	Legs	Barbell Both Arms	Barbell	Barbell Calf Raise
65	bulgarian-split-squat	Legs	Barbell Both Arms	Barbell	Bulgarian Split Squat
79	barbell-lunge	Legs	Barbell Both Arms	Barbell	Barbell Lunge
41	tricep-extension	Triceps	Barbell Both Arms	Barbell	Tricep Extension
26	good-morning	Back	Barbell Both Arms	Barbell	Good Morning
99	split-squat	Legs	Barbell Both Arms	Barbell	Split Squat
147	pause-squat	Legs	Barbell Both Arms	Barbell	Pause Squat
164	bodyweight-calf-raise	Legs	Bodyweight	Bodyweight	Bodyweight Calf Raise
129	safety-bar-squat	Legs	Barbell Both Arms	Barbell	Safety Bar Squat
173	neck-curl	Shoulders	Weight Both Arms	Barbell	Neck Curl
128	deficit-deadlift	Whole Body	Barbell Both Arms	Barbell	Deficit Deadlift
126	log-press	Shoulders	Barbell Both Arms	Barbell	Log Press
120	reverse-barbell-curl	Biceps	Barbell Both Arms	Barbell	Reverse Barbell Curl
193	wide-grip-bench-press	Chest	Barbell Both Arms	Barbell	Wide Grip Bench Press
144	sumo-squat	Legs	Barbell Both Arms	Barbell	Sumo Squat
156	single-leg-deadlift	Whole Body	Barbell Both Arms	Barbell	Single Leg Deadlift
174	neck-extension	Shoulders	Weight Both Arms	Barbell	Neck Extension
168	barbell-glute-bridge	Legs	Barbell Both Arms	Barbell	Barbell Glute Bridge
121	reverse-grip-bench-press	Chest	Barbell Both Arms	Barbell	Reverse Grip Bench Press
95	reverse-wrist-curl	Forearms	Barbell Both Arms	Barbell	Reverse Wrist Curl
195	pause-deadlift	Whole Body	Barbell Both Arms	Barbell	Pause Deadlift
194	jm-press	Triceps	Barbell Both Arms	Barbell	JM Press
163	ab-wheel-rollout	Core	Bodyweight	Bodyweight	Ab Wheel Rollout
139	bench-pull	Back	Barbell Both Arms	Barbell	Bench Pull
130	snatch-grip-deadlift	Whole Body	Barbell Both Arms	Barbell	Snatch Grip Deadlift
189	bench-pin-press	Chest	Barbell Both Arms	Barbell	Bench Pin Press
183	behind-the-neck-press	Shoulders	Barbell Both Arms	Barbell	Behind The Neck Press
142	barbell-hack-squat	Legs	Barbell Both Arms	Barbell	Barbell Hack Squat
132	landmine-press	Shoulders	Barbell Both Arms	Barbell	Landmine Press
88	landmine-squat	Legs	Barbell Both Arms	Barbell	Landmine Squat
208	pin-squat	Legs	Barbell Both Arms	Barbell	Pin Squat
192	snatch-deadlift	Whole Body	Barbell Both Arms	Barbell	Snatch Deadlift
177	barbell-front-raise	Shoulders	Barbell Both Arms	Barbell	Barbell Front Raise
149	belt-squat	Legs	Plate Belt	Barbell	Belt Squat
148	reverse-curl	Biceps	Barbell Both Arms	Barbell	Reverse Curl
133	yates-row	Back	Barbell Both Arms	Barbell	Yates Row
271	walking-lunge	Legs	Barbell Both Arms	Barbell	Walking Lunge
253	machine-shrug	Back	Machine Both Arms	Barbell	Machine Shrug
248	jefferson-squat	Whole Body	Barbell Both Arms	Barbell	Jefferson Squat
223	behind-the-back-barbell-shrug	Back	Barbell Both Arms	Barbell	Behind The Back Barbell Shrug
222	barbell-power-shrug	Back	Barbell Both Arms	Barbell	Barbell Power Shrug
218	bent-arm-barbell-pullover	Back	Barbell Both Arms	Barbell	Bent Arm Barbell Pullover
217	cheat-curl	Biceps	Barbell Both Arms	Barbell	Cheat Curl
216	donkey-calf-raise	Legs	Bodyweight	Bodyweight	Donkey Calf Raise
204	viking-press	Shoulders	Barbell Both Arms	Barbell	Viking Press
202	spider-curl	Biceps	Barbell Both Arms	Barbell	Spider Curl
190	shoulder-pin-press	Shoulders	Barbell Both Arms	Barbell	Shoulder Pin Press
178	barbell-pullover	Back	Barbell Both Arms	Barbell	Barbell Pullover
176	wall-ball	Whole Body	Weight Both Arms	Barbell	Wall Ball
182	standing-leg-curl	Legs	Machine Both Legs	Machine	Standing Leg Curl
161	single-leg-romanian-deadlift	Whole Body	Barbell Both Arms	Barbell	Single Leg Romanian Deadlift
152	z-press	Shoulders	Barbell Both Arms	Barbell	Z Press
131	jefferson-deadlift	Whole Body	Barbell Both Arms	Barbell	Jefferson Deadlift
14	pull-ups	Back	Bodyweight	Bodyweight	Pull Ups
28	push-ups	Chest	Bodyweight	Bodyweight	Push Ups
15	dips	Triceps	Bodyweight	Bodyweight	Dips
32	chin-ups	Back	Bodyweight	Bodyweight	Chin Ups
81	bodyweight-squat	Legs	Bodyweight	Bodyweight	Bodyweight Squat
54	sit-ups	Core	Bodyweight	Bodyweight	Sit Ups
86	handstand-push-ups	Chest	Bodyweight	Bodyweight	Handstand Push Ups
53	crunches	Core	Bodyweight	Bodyweight	Crunches
100	back-extension	Back	Bodyweight	Bodyweight	Back Extension
91	one-arm-push-ups	Chest	Bodyweight	Bodyweight	One Arm Push Ups
209	pistol-squat	Legs	Bodyweight	Bodyweight	Pistol Squat
107	diamond-push-ups	Chest	Bodyweight	Bodyweight	Diamond Push Ups
62	single-leg-squat	Legs	Bodyweight	Bodyweight	Single Leg Squat
55	muscle-ups	Whole Body	Bodyweight	Bodyweight	Muscle Ups
112	glute-bridge	Legs	Bodyweight	Bodyweight	Glute Bridge
80	lunge	Legs	Bodyweight	Bodyweight	Lunge
73	burpees	Whole Body	Bodyweight	Bodyweight	Burpees
118	neutral-grip-pull-ups	Back	Bodyweight	Bodyweight	Neutral Grip Pull Ups
115	hanging-leg-raise	Core	Bodyweight	Bodyweight	Hanging Leg Raise
113	glute-ham-raise	Legs	Bodyweight	Bodyweight	Glute Ham Raise
122	russian-twist	Core	Bodyweight	Bodyweight	Russian Twist
170	bench-dips	Triceps	Bodyweight	Bodyweight	Bench Dips
119	one-arm-pull-ups	Back	Bodyweight	Bodyweight	One Arm Pull Ups
117	lying-leg-raise	Core	Bodyweight	Bodyweight	Lying Leg Raise
116	inverted-row	Back	Bodyweight	Bodyweight	Inverted Row
206	hanging-knee-raise	Core	Bodyweight	Bodyweight	Hanging Knee Raise
205	australian-pull-ups	Back	Bodyweight	Bodyweight	Australian Pull Ups
200	ring-muscle-ups	Whole Body	Bodyweight	Bodyweight	Ring Muscle Ups
199	reverse-lunge	Legs	Bodyweight	Bodyweight	Reverse Lunge
124	toes-to-bar	Core	Bodyweight	Bodyweight	Toes To Bar
270	star-jump	Whole Body	Bodyweight	Bodyweight	Star Jump
268	squat-thrust	Whole Body	Bodyweight	Bodyweight	Squat Thrust
267	squat-jump	Legs	Bodyweight	Bodyweight	Squat Jump
263	side-lunge	Legs	Bodyweight	Bodyweight	Side Lunge
262	side-crunch	Core	Bodyweight	Bodyweight	Side Crunch
260	roman-chair-side-bend	Core	Bodyweight	Bodyweight	Roman Chair Side Bend
259	pike-push-up	Chest	Bodyweight	Bodyweight	Pike Push Up
255	mountain-climbers	Core	Bodyweight	Bodyweight	Mountain Climbers
251	leg-lift	Legs	Bodyweight	Bodyweight	Leg Lift
250	jumping-jack	Core	Bodyweight	Bodyweight	Jumping Jack
249	jump-squat	Legs	Bodyweight	Bodyweight	Jump Squat
247	incline-push-up	Chest	Bodyweight	Bodyweight	Incline Push Up
245	incline-bench-sit-up	Core	Bodyweight	Bodyweight	Incline Bench Sit Up
244	hip-extension	Legs	Bodyweight	Bodyweight	Hip Extension
243	flutter-kick	Core	Bodyweight	Bodyweight	Flutter Kick
242	floor-hip-extension	Legs	Bodyweight	Bodyweight	Floor Hip Extension
241	floor-hip-abduction	Legs	Bodyweight	Bodyweight	Floor Hip Abduction
235	decline-push-up	Chest	Bodyweight	Bodyweight	Decline Push Up
233	decline-crunch	Core	Bodyweight	Bodyweight	Decline Crunch
232	clap-pull-up	Whole Body	Bodyweight	Bodyweight	Clap Pull Up
225	bicycle-crunch	Core	Bodyweight	Bodyweight	Bicycle Crunch
221	sissy-squat	Legs	Bodyweight	Bodyweight	Sissy Squat
219	close-grip-push-up	Chest	Bodyweight	Bodyweight	Close Grip Push Up
207	nordic-hamstring-curl	Legs	Bodyweight	Bodyweight	Nordic Hamstring Curl
196	reverse-crunches	Core	Bodyweight	Bodyweight	Reverse Crunches
141	ring-dips	Triceps	Bodyweight	Bodyweight	Ring Dips
2	power-clean	Whole Body	Barbell Both Arms	Barbell	Power Clean
10	snatch	Whole Body	Barbell Both Arms	Barbell	Snatch
12	clean	Whole Body	Barbell Both Arms	Barbell	Clean
13	push-press	Shoulders	Barbell Both Arms	Barbell	Push Press
11	clean-and-jerk	Whole Body	Barbell Both Arms	Barbell	Clean and Jerk
49	thruster	Whole Body	Barbell Both Arms	Barbell	Thruster
3	clean-and-press	Whole Body	Barbell Both Arms	Barbell	Clean and Press
114	hang-clean	Whole Body	Barbell Both Arms	Barbell	Hang Clean
61	overhead-squat	Legs	Barbell Both Arms	Barbell	Overhead Squat
171	hang-power-clean	Whole Body	Barbell Both Arms	Barbell	Hang Power Clean
71	power-snatch	Whole Body	Barbell Both Arms	Barbell	Power Snatch
48	push-jerk	Whole Body	Barbell Both Arms	Barbell	Push Jerk
136	split-jerk	Whole Body	Barbell Both Arms	Barbell	Split Jerk
157	clean-pull	Whole Body	Barbell Both Arms	Barbell	Clean Pull
155	dumbbell-snatch	Whole Body	Dumbbell One Arm	Dumbbell	Dumbbell Snatch
172	muscle-snatch	Whole Body	Barbell Both Arms	Barbell	Muscle Snatch
239	dumbbell-push-press	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Push Press
238	dumbbell-high-pull	Whole Body	Dumbbell Per Arm	Dumbbell	Dumbbell High Pull
237	dumbbell-hang-clean	Whole Body	Dumbbell Per Arm	Dumbbell	Dumbbell Hang Clean
167	snatch-pull	Whole Body	Barbell Both Arms	Barbell	Snatch Pull
166	clean-high-pull	Whole Body	Barbell Both Arms	Barbell	Clean High Pull
19	dumbbell-bench-press	Chest	Dumbbell Per Arm	Dumbbell	Dumbbell Bench Press
17	dumbbell-curl	Biceps	Dumbbell Per Arm	Dumbbell	Dumbbell Curl
18	dumbbell-shoulder-press	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Shoulder Press
47	incline-dumbbell-bench-press	Chest	Dumbbell Per Arm	Dumbbell	Incline Dumbbell Bench Press
16	dumbbell-row	Back	Dumbbell One Arm	Dumbbell	Dumbbell Row
29	dumbbell-lateral-raise	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Lateral Raise
39	dumbbell-fly	Chest	Dumbbell Per Arm	Dumbbell	Dumbbell Fly
85	goblet-squat	Legs	Dumbbell Both Arms	Dumbbell	Goblet Squat
66	dumbbell-bulgarian-split-squat	Legs	Dumbbell Per Arm	Dumbbell	Dumbbell Bulgarian Split Squat
34	dumbbell-shrug	Back	Dumbbell Per Arm	Dumbbell	Dumbbell Shrug
42	dumbbell-tricep-extension	Triceps	Dumbbell One Arm	Dumbbell	Dumbbell Tricep Extension
108	dumbbell-floor-press	Chest	Dumbbell Per Arm	Dumbbell	Dumbbell Floor Press
43	lying-dumbbell-tricep-extension	Triceps	Dumbbell Per Arm	Dumbbell	Lying Dumbbell Tricep Extension
57	dumbbell-lunge	Legs	Dumbbell Per Arm	Dumbbell	Dumbbell Lunge
56	dumbbell-concentration-curl	Biceps	Dumbbell One Arm	Dumbbell	Dumbbell Concentration Curl
135	dumbbell-squat	Legs	Dumbbell Per Arm	Dumbbell	Dumbbell Squat
77	arnold-press	Chest	Dumbbell Per Arm	Dumbbell	Arnold Press
84	dumbbell-pullover	Back	Dumbbell Both Arms	Dumbbell	Dumbbell Pullover
93	dumbbell-reverse-fly	Back	Dumbbell Per Arm	Dumbbell	Dumbbell Reverse Fly
30	dumbbell-front-raise	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Front Raise
151	renegade-row	Back	Dumbbell Per Arm	Dumbbell	Renegade Row
186	dumbbell-side-bend	Core	Dumbbell One Arm	Dumbbell	Dumbbell Side Bend
185	dumbbell-calf-raise	Legs	Dumbbell Per Arm	Dumbbell	Dumbbell Calf Raise
137	dumbbell-deadlift	Whole Body	Dumbbell Per Arm	Dumbbell	Dumbbell Deadlift
106	chest-supported-dumbbell-row	Back	Dumbbell Per Arm	Dumbbell	Chest Supported Dumbbell Row
187	dumbbell-wrist-curl	Forearms	Dumbbell Per Arm	Dumbbell	Dumbbell Wrist Curl
153	dumbbell-z-press	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Z Press
140	dumbbell-bench-pull	Back	Dumbbell Per Arm	Dumbbell	Dumbbell Bench Pull
110	dumbbell-romanian-deadlift	Whole Body	Dumbbell Per Arm	Dumbbell	Dumbbell Romanian Deadlift
109	dumbbell-tricep-kickback	Triceps	Dumbbell Per Arm	Dumbbell	Dumbbell Tricep Kickback
210	tate-press	Triceps	Dumbbell Per Arm	Dumbbell	Tate Press
45	incline-dumbbell-fly	Chest	Dumbbell Per Arm	Dumbbell	Incline Dumbbell Fly
165	dumbbell-upright-row	Shoulders	Dumbbell Per Arm	Dumbbell	Dumbbell Upright Row
87	incline-dumbbell-curl	Biceps	Dumbbell Per Arm	Dumbbell	Incline Dumbbell Curl
160	dumbbell-preacher-curl	Biceps	Dumbbell Per Arm	Dumbbell	Dumbbell Preacher Curl
75	decline-dumbbell-bench-press	Chest	Dumbbell Per Arm	Dumbbell	Decline Dumbbell Bench Press
184	close-grip-dumbbell-bench-press	Chest	Dumbbell Per Arm	Dumbbell	Close Grip Dumbbell Bench Press
214	incline-hammer-curl	Biceps	Dumbbell Per Arm	Dumbbell	Incline Hammer Curl
272	dumbbell-incline-y-raise	Back	Dumbbell Per Arm	Dumbbell	Dumbbell Incline Y Raise
264	seated-dumbbell-tricep-extension	Triceps	Dumbbell Both Arms	Dumbbell	Seated Dumbbell Tricep Extension
261	seated-dumbbell-shoulder-press	Shoulders	Dumbbell Per Arm	Dumbbell	Seated Dumbbell Shoulder Press
240	dumbbell-reverse-wrist-curl	Forearms	Dumbbell Per Arm	Dumbbell	Dumbbell Reverse Wrist Curl
236	dumbbell-front-squat	Legs	Dumbbell Per Arm	Dumbbell	Dumbbell Front Squat
234	decline-dumbbell-fly	Chest	Dumbbell Per Arm	Dumbbell	Decline Dumbbell Fly
228	dumbbell-external-rotation	Shoulders	Dumbbell One Arm	Dumbbell	Dumbbell External Rotation
226	bent-over-dumbbell-row	Back	Dumbbell Per Arm	Dumbbell	Bent Over Dumbbell Row
220	seated-dumbbell-curl	Biceps	Dumbbell Per Arm	Dumbbell	Seated Dumbbell Curl
162	zottman-curl	Biceps	Dumbbell Per Arm	Dumbbell	Zottman Curl
20	sled-leg-press	Legs	Machine Both Legs	Machine	Sled Leg Press
21	horizontal-leg-press	Legs	Machine Both Legs	Machine	Horizontal Leg Press
36	leg-extension	Legs	Machine Both Legs	Machine	Leg Extension
83	chest-press	Chest	Machine Both Arms	Machine	Chest Press
92	machine-chest-fly	Chest	Machine Both Arms	Machine	Machine Chest Fly
37	lying-leg-curl	Legs	Machine Both Legs	Machine	Lying Leg Curl
89	machine-shoulder-press	Shoulders	Machine Both Arms	Machine	Machine Shoulder Press
38	seated-leg-curl	Legs	Machine Both Legs	Machine	Seated Leg Curl
96	seated-calf-raise	Legs	Machine Both Legs	Machine	Seated Calf Raise
181	machine-tricep-press	Triceps	Machine Both Arms	Machine	Machine Tricep Press
68	hack-squat	Legs	Machine Both Legs	Machine	Hack Squat
40	machine-calf-raise	Legs	Machine Both Legs	Machine	Machine Calf Raise
146	machine-bicep-curl	Biceps	Machine Both Arms	Machine	Machine Bicep Curl
175	smith-machine-squat	Legs	Barbell Both Arms	Barbell	Smith Machine Squat
143	machine-row	Back	Machine Both Arms	Machine	Machine Row
76	vertical-leg-press	Legs	Machine Both Legs	Machine	Vertical Leg Press
211	close-grip-lat-pulldown	Back	Machine Both Arms	Machine	Close Grip Lat Pulldown
201	smith-machine-bench-press	Chest	Barbell Both Arms	Barbell	Smith Machine Bench Press
127	seated-dip-machine	Triceps	Machine Both Arms	Machine	Seated Dip Machine
215	machine-lateral-raise	Shoulders	Machine Both Arms	Machine	Machine Lateral Raise
188	machine-reverse-fly	Back	Machine Both Arms	Machine	Machine Reverse Fly
70	hip-abduction	Legs	Machine Both Legs	Machine	Hip Abduction
212	sled-press-calf-raise	Legs	Machine Both Legs	Machine	Sled Press Calf Raise
191	single-leg-press	Legs	Machine One Leg	Machine	Single Leg Press
69	hip-adduction	Legs	Machine Both Legs	Machine	Hip Adduction
150	machine-seated-crunch	Core	Machine Both Arms	Machine	Machine Seated Crunch
180	machine-back-extension	Back	Machine Back	Machine	Machine Back Extension
266	smith-machine-shrug	Back	Barbell Both Arms	Barbell	Smith Machine Shrug
265	single-leg-seated-calf-raise	Legs	Machine One Leg	Machine	Single Leg Seated Calf Raise
254	machine-tricep-extension	Triceps	Machine Both Arms	Machine	Machine Tricep Extension
22	lat-pulldown	Back	Cable Both Arms	Cable	Lat Pulldown
51	tricep-pushdown	Triceps	Cable Both Arms	Cable	Tricep Pushdown
63	seated-cable-row	Back	Cable Both Arms	Cable	Seated Cable Row
52	tricep-rope-pushdown	Triceps	Cable Both Arms	Cable	Tricep Rope Pushdown
82	cable-fly	Chest	Cable Per Arm	Cable	Cable Fly
72	face-pull	Back	Cable Both Arms	Cable	Face Pull
197	reverse-grip-lat-pulldown	Back	Cable Both Arms	Cable	Reverse Grip Lat Pulldown
102	cable-bicep-curl	Biceps	Cable Both Arms	Cable	Cable Bicep Curl
138	cable-crossover	Chest	Cable Per Arm	Cable	Cable Crossover
134	straight-arm-pulldown	Back	Cable Both Arms	Cable	Straight Arm Pulldown
145	cable-overhead-tricep-extension	Triceps	Cable Both Arms	Cable	Cable Overhead Tricep Extension
125	cable-woodchoppers	Core	Cable Both Arms	Cable	Cable Woodchoppers
105	cable-pull-through	Legs	Cable Both Arms	Cable	Cable Pull Through
104	cable-lateral-raise	Shoulders	Cable One Arm	Cable	Cable Lateral Raise
198	reverse-grip-tricep-pushdown	Triceps	Cable Both Arms	Cable	Reverse Grip Tricep Pushdown
101	cable-crunch	Core	Cable Both Arms	Cable	Cable Crunch
103	one-arm-cable-bicep-curl	Biceps	Cable One Arm	Cable	One Arm Cable Bicep Curl
154	high-pulley-crunch	Core	Cable Both Arms	Cable	High Pulley Crunch
269	standing-cable-crunch	Core	Cable Both Arms	Cable	Standing Cable Crunch
258	overhead-cable-curl	Biceps	Cable Both Arms	Cable	Overhead Cable Curl
257	one-arm-seated-cable-row	Back	Cable One Arm	Cable	One Arm Seated Cable Row
256	one-arm-pulldown	Biceps	Cable One Arm	Cable	One Arm Pulldown
252	lying-cable-curl	Biceps	Cable Both Arms	Cable	Lying Cable Curl
246	incline-cable-curl	Biceps	Cable Both Arms	Cable	Incline Cable Curl
231	cable-upright-row	Back	Cable Both Arms	Cable	Cable Upright Row
230	cable-shrug	Back	Cable Both Arms	Cable	Cable Shrug
229	cable-leg-extension	Legs	Cable One Leg	Cable	Cable Leg Extension
227	cable-external-rotation	Shoulders	Cable One Arm	Cable	Cable External Rotation
224	behind-the-back-cable-curl	Biceps	Cable One Arm	Cable	Behind The Back Cable Curl
179	cable-reverse-fly	Back	Cable Per Arm	Cable	Cable Reverse Fly
159	cable-kickback	Legs	Cable One Leg	Cable	Cable Kickback
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
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public."group" (name, created_at, updated_at, password, battle_number) FROM stdin;
Team Public	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	\N	1
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
private_team_creator	$2a$06$M0HXMtArebEJWwvo24ob3utFWz9ITzc2bWwe0pvbT/exoMjZnvW5W	\N	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	1
no team	$2a$06$GAtxL3zgyVjvEVN4PhA8uOL63B8mMyLxv.8Z1RatMqetJphgFOZky	\N	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	2
Event Notice	$2a$06$9z7mjwYJT1z10seKiZk4OusiVmlsV2s9Vpj7sIq13sqGDTgj4jb72	\N	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	3
orek	$2a$06$agzAkca9zdlR0WRiUU6ahuKAgnvimf3/EULNtPZfTIvPnGEQwYR4.	Team Public	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	4
eerik	$2a$06$rAt49M10qG6wGb7EkICi/.ZIUh95CJzDoV9MdUmpnHL87EHjjeSsW	Team Public	2021-04-25 20:35:09.899861+03	2021-04-25 20:35:09.899861+03	5
\.


--
-- Data for Name: user_exercise; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.user_exercise (id, username, repetitions, liftmass, strongerpercentage, groupname, battle_number, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: workout; Type: TABLE DATA; Schema: public; Owner: eerik
--

COPY public.workout  FROM stdin;
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
-- Name: exercise exercise_string_id_key; Type: CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_string_id_key UNIQUE (string_id);


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
-- Name: battle_enemy_level_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX battle_enemy_level_idx ON public.battle USING btree (enemy_level);


--
-- Name: battle_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX battle_groupname_idx ON public.battle USING btree (groupname);


--
-- Name: bodystat_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX bodystat_username_idx ON public.bodystat USING btree (username);


--
-- Name: chat_message_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX chat_message_groupname_idx ON public.chat_message USING btree (groupname);


--
-- Name: chat_message_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX chat_message_username_idx ON public.chat_message USING btree (username);


--
-- Name: exercise_alias_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX exercise_alias_id_idx ON public.exercise_alias USING btree (id);


--
-- Name: group_name_battle_number_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX group_name_battle_number_idx ON public."group" USING btree (name, battle_number);


--
-- Name: session_analytics_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX session_analytics_username_idx ON public.session_analytics USING btree (username);


--
-- Name: user_exercise_groupname_battle_number_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_groupname_battle_number_idx ON public.user_exercise USING btree (groupname, battle_number);


--
-- Name: user_exercise_id_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_id_idx ON public.user_exercise USING btree (id);


--
-- Name: user_exercise_username_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_exercise_username_idx ON public.user_exercise USING btree (username);


--
-- Name: user_groupname_idx; Type: INDEX; Schema: public; Owner: eerik
--

CREATE INDEX user_groupname_idx ON public."user" USING btree (groupname);


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
-- Name: exercise_alias exercise_alias_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.exercise_alias
    ADD CONSTRAINT exercise_alias_id_fkey FOREIGN KEY (id) REFERENCES public.exercise(id);


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
-- Name: user_exercise user_exercise_groupname_battle_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_groupname_battle_number_fkey FOREIGN KEY (groupname, battle_number) REFERENCES public.battle(groupname, battle_number) ON DELETE SET NULL;


--
-- Name: user_exercise user_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eerik
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_id_fkey FOREIGN KEY (id) REFERENCES public.exercise(id) ON DELETE CASCADE;


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

CREATE POLICY user_create ON public."user" FOR INSERT TO query_sender WITH CHECK (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user user_delete; Type: POLICY; Schema: public; Owner: eerik
--

CREATE POLICY user_delete ON public."user" FOR DELETE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


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

CREATE POLICY user_update ON public."user" FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


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
-- Name: TABLE enemy; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT ON TABLE public.enemy TO query_sender;


--
-- Name: TABLE exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT SELECT ON TABLE public.exercise TO query_sender;


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
-- Name: TABLE user_exercise; Type: ACL; Schema: public; Owner: eerik
--

GRANT ALL ON TABLE public.user_exercise TO query_sender;


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

