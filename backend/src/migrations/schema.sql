--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_user (
    username character varying(32) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    current_workout_plan_id integer,
    password text NOT NULL,
    is_male boolean DEFAULT true NOT NULL,
    bodymass double precision DEFAULT 80.0 NOT NULL
);


--
-- Name: TABLE app_user; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.app_user IS '@omit create';


--
-- Name: COLUMN app_user.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_user.created_at IS '@omit create, update, delete';


--
-- Name: COLUMN app_user.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_user.updated_at IS '@omit create, update, delete';


--
-- Name: COLUMN app_user.password; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.app_user.password IS '@omit';


--
-- Name: active_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.active_user() RETURNS public.app_user
    LANGUAGE sql STABLE
    AS $$

  select * from app_user where id = (select current_user_id())
$$;


--
-- Name: authenticate(character varying, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.authenticate(username character varying, password text) RETURNS public.jwt_token
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $$
declare
  account app_user;
begin
  select a.* into account
    from app_user as a
    where a.username = authenticate.username;
  if account.password = crypt(password, account.password) then
    return (
      extract(epoch from now() + interval '7 days'),
      account.id
    )::jwt_token;
  else
    return null;
  end if;
end;
$$;


--
-- Name: create_user(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.create_user(username text, password text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$ begin
insert into
  app_user(username, password)
values
  (username, crypt(password, gen_salt('bf')));
end;
$$;


--
-- Name: current_user_id(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.current_user_id() RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::integer;
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
-- Name: completed_workout; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.completed_workout (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: COLUMN completed_workout.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.completed_workout.created_at IS '@omit create, update, delete';


--
-- Name: COLUMN completed_workout.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.completed_workout.updated_at IS '@omit create, update, delete';


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
-- Name: session_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_analytics (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    analytics public.section_and_time_spent[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    app_user_id integer NOT NULL
);


--
-- Name: TABLE session_analytics; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.session_analytics IS '@omit update, delete';


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

ALTER SEQUENCE public.session_analytics_user_id_seq OWNED BY public.session_analytics.app_user_id;


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
    app_user_id integer NOT NULL
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

ALTER SEQUENCE public.user_exercise_user_id_seq OWNED BY public.user_exercise.app_user_id;


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

ALTER SEQUENCE public.user_id_seq OWNED BY public.app_user.id;


--
-- Name: workout_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_plan (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    app_user_id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT non_empty_name CHECK ((((name)::text = ''::text) IS FALSE))
);


--
-- Name: COLUMN workout_plan.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.workout_plan.created_at IS '@omit update, delete, create';


--
-- Name: COLUMN workout_plan.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.workout_plan.updated_at IS '@omit update, delete, create';


--
-- Name: workout_plan_day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_plan_day (
    id integer NOT NULL,
    workout_plan_id integer NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT non_empty_name CHECK ((((name)::text = ''::text) IS FALSE))
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
    id integer NOT NULL,
    CONSTRAINT non_zero_volume CHECK (((reps > 0) AND (sets > 0)))
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
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: session_analytics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN id SET DEFAULT nextval('public.session_analytics_id_seq'::regclass);


--
-- Name: session_analytics app_user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics ALTER COLUMN app_user_id SET DEFAULT nextval('public.session_analytics_user_id_seq'::regclass);


--
-- Name: user_exercise app_user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise ALTER COLUMN app_user_id SET DEFAULT nextval('public.user_exercise_user_id_seq'::regclass);


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
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


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
-- Name: app_user unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: workout_plan_day unique_workout_plan_id_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan_day
    ADD CONSTRAINT unique_workout_plan_id_name UNIQUE (workout_plan_id, name);


--
-- Name: user_exercise user_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_pkey PRIMARY KEY (id, username);


--
-- Name: app_user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
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
-- Name: completed_workout_app_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX completed_workout_app_user_idx ON public.completed_workout USING btree (app_user_id);


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
-- Name: exercise_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX exercise_name_idx ON public.exercise USING btree (name);


--
-- Name: session_analytics_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX session_analytics_user_id_idx ON public.session_analytics USING btree (app_user_id);


--
-- Name: session_analytics_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX session_analytics_username_idx ON public.session_analytics USING btree (username);


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

CREATE INDEX user_exercise_user_id_idx ON public.user_exercise USING btree (app_user_id);


--
-- Name: user_exercise_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_exercise_username_idx ON public.user_exercise USING btree (username);


--
-- Name: user_workout_plan_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_workout_plan_idx ON public.app_user USING btree (current_workout_plan_id);


--
-- Name: workout_plan_app_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX workout_plan_app_user_idx ON public.workout_plan USING btree (app_user_id);


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
-- Name: app_user set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.app_user FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: completed_workout set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.completed_workout FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: user_exercise set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.user_exercise FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: workout_plan set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.workout_plan FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: completed_workout completed_workout_app_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.completed_workout
    ADD CONSTRAINT completed_workout_app_user_id_fkey FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) ON DELETE CASCADE;


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
-- Name: session_analytics session_analytics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_analytics
    ADD CONSTRAINT session_analytics_user_id_fkey FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) ON DELETE CASCADE;


--
-- Name: app_user user_current_workout_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_current_workout_plan_id_fkey FOREIGN KEY (current_workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE SET NULL;


--
-- Name: user_exercise user_exercise_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_exercise
    ADD CONSTRAINT user_exercise_user_id_fkey FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) ON DELETE CASCADE;


--
-- Name: workout_plan workout_plan_app_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_plan
    ADD CONSTRAINT workout_plan_app_user_id_fkey FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) ON DELETE CASCADE;


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
-- Name: app_user; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.app_user ENABLE ROW LEVEL SECURITY;

--
-- Name: app_user app_user_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY app_user_delete_policy ON public.app_user FOR DELETE USING ((id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: app_user app_user_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY app_user_insert_policy ON public.app_user FOR INSERT WITH CHECK ((id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: app_user app_user_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY app_user_select_policy ON public.app_user FOR SELECT USING (true);


--
-- Name: app_user app_user_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY app_user_update_policy ON public.app_user FOR UPDATE USING ((id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: completed_workout; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.completed_workout ENABLE ROW LEVEL SECURITY;

--
-- Name: completed_workout completed_workout_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY completed_workout_delete_policy ON public.completed_workout FOR DELETE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: completed_workout completed_workout_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY completed_workout_insert_policy ON public.completed_workout FOR INSERT WITH CHECK ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: completed_workout completed_workout_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY completed_workout_select_policy ON public.completed_workout FOR SELECT USING (true);


--
-- Name: completed_workout completed_workout_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY completed_workout_update_policy ON public.completed_workout FOR UPDATE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: session_analytics; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.session_analytics ENABLE ROW LEVEL SECURITY;

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
-- Name: session_analytics session_analytics_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_delete_policy ON public.session_analytics FOR DELETE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: session_analytics session_analytics_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_insert_policy ON public.session_analytics FOR INSERT WITH CHECK ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: session_analytics session_analytics_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_select ON public.session_analytics FOR SELECT TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_select_policy ON public.session_analytics FOR SELECT USING (true);


--
-- Name: session_analytics session_analytics_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_update ON public.session_analytics FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: session_analytics session_analytics_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY session_analytics_update_policy ON public.session_analytics FOR UPDATE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: app_user user_create; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_create ON public.app_user FOR INSERT TO query_sender WITH CHECK ((id = ( SELECT active_user.id
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at, id))));


--
-- Name: app_user user_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_delete ON public.app_user FOR DELETE TO query_sender USING ((id = ( SELECT active_user.id
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
-- Name: user_exercise user_exercise_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_delete_policy ON public.user_exercise FOR DELETE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: user_exercise user_exercise_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_insert_policy ON public.user_exercise FOR INSERT WITH CHECK ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: user_exercise user_exercise_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_select ON public.user_exercise FOR SELECT TO query_sender USING (true);


--
-- Name: user_exercise user_exercise_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_select_policy ON public.user_exercise FOR SELECT USING (true);


--
-- Name: user_exercise user_exercise_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_update ON public.user_exercise FOR UPDATE TO query_sender USING (((username)::text = (( SELECT active_user.username
   FROM public.active_user() active_user(username, password, groupname, created_at, updated_at)))::text));


--
-- Name: user_exercise user_exercise_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_exercise_update_policy ON public.user_exercise FOR UPDATE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: app_user user_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_select ON public.app_user FOR SELECT TO query_sender USING (true);


--
-- Name: app_user user_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY user_update ON public.app_user FOR UPDATE TO query_sender USING ((id = ( SELECT active_user.id
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

CREATE POLICY workout_plan_day_delete_policy ON public.workout_plan_day FOR DELETE USING ((id IN ( SELECT workout_plan_day_1.id
   FROM (public.workout_plan
     JOIN public.workout_plan_day workout_plan_day_1 ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan_day workout_plan_day_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_insert_policy ON public.workout_plan_day FOR INSERT WITH CHECK ((id IN ( SELECT workout_plan_day_1.id
   FROM (public.workout_plan
     JOIN public.workout_plan_day workout_plan_day_1 ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan_day workout_plan_day_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_select_policy ON public.workout_plan_day FOR SELECT USING (true);


--
-- Name: workout_plan_day workout_plan_day_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_day_update_policy ON public.workout_plan_day FOR UPDATE USING ((id IN ( SELECT workout_plan_day_1.id
   FROM (public.workout_plan
     JOIN public.workout_plan_day workout_plan_day_1 ON ((workout_plan_day_1.workout_plan_id = workout_plan.id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan workout_plan_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_delete_policy ON public.workout_plan FOR DELETE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: workout_plan_exercise; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.workout_plan_exercise ENABLE ROW LEVEL SECURITY;

--
-- Name: workout_plan_exercise workout_plan_exercise_delete_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_exercise_delete_policy ON public.workout_plan_exercise FOR DELETE USING ((id IN ( SELECT workout_plan_exercise_1.id
   FROM ((public.workout_plan
     JOIN public.workout_plan_day ON ((workout_plan_day.workout_plan_id = workout_plan.id)))
     JOIN public.workout_plan_exercise workout_plan_exercise_1 ON ((workout_plan_day.id = workout_plan_exercise_1.workout_plan_day_id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan_exercise workout_plan_exercise_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_exercise_insert_policy ON public.workout_plan_exercise FOR INSERT WITH CHECK ((id IN ( SELECT workout_plan_exercise_1.id
   FROM ((public.workout_plan
     JOIN public.workout_plan_day ON ((workout_plan_day.workout_plan_id = workout_plan.id)))
     JOIN public.workout_plan_exercise workout_plan_exercise_1 ON ((workout_plan_day.id = workout_plan_exercise_1.workout_plan_day_id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan_exercise workout_plan_exercise_select_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_exercise_select_policy ON public.workout_plan_exercise FOR SELECT USING (true);


--
-- Name: workout_plan_exercise workout_plan_exercise_update_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_exercise_update_policy ON public.workout_plan_exercise FOR UPDATE USING ((id IN ( SELECT workout_plan_exercise_1.id
   FROM ((public.workout_plan
     JOIN public.workout_plan_day ON ((workout_plan_day.workout_plan_id = workout_plan.id)))
     JOIN public.workout_plan_exercise workout_plan_exercise_1 ON ((workout_plan_day.id = workout_plan_exercise_1.workout_plan_day_id)))
  WHERE (workout_plan.app_user_id = ( SELECT public.current_user_id() AS current_user_id)))));


--
-- Name: workout_plan workout_plan_insert_policy; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY workout_plan_insert_policy ON public.workout_plan FOR INSERT WITH CHECK ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


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

CREATE POLICY workout_plan_update_policy ON public.workout_plan FOR UPDATE USING ((app_user_id = ( SELECT public.current_user_id() AS current_user_id)));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO query_sender;


--
-- Name: TABLE app_user; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.app_user TO query_sender;


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
-- Name: TABLE exercise; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.exercise TO PUBLIC;


--
-- Name: TABLE exercise_alias; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.exercise_alias TO query_sender;


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

