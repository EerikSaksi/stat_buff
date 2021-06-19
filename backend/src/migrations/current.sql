-- Enter migration here
drop function if exists create_user;
CREATE or replace FUNCTION public.create_user(username text, password text) RETURNS app_user
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$ 
    declare
      to_return app_user;
    begin
    insert into
        app_user(username, password)
      values
        (username, crypt(password, gen_salt('bf'))) returning * into to_return;
    return to_return;
end;
$$;


drop type if exists user_id_and_jwt cascade;
create type user_id_and_jwt as (
  app_user_id integer,
  token jwt_token
);
drop function if exists authenticate;

CREATE FUNCTION public.authenticate(username character varying, password text) RETURNS public.user_id_and_jwt
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
      account.id,
      (
        extract(epoch from now() + interval '7 days'),
        account.id
      )::jwt_token
    )::user_id_and_jwt;
  else
    return null;
  end if;
end;
$$;
