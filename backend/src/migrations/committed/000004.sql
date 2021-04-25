--! Previous: sha1:83d08ff3784543990488699fb36fb02fc3fab6c6
--! Hash: sha1:288f775859719c8724fd2498059d97a0f7d3fc09

-- Enter migration here

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "group"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "bodystat"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "user_exercise"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "battle"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "workout"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "chat_message"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--timestamps are all managed manually
comment on column "user".created_at is E'@omit create, update, insert'; 
comment on column "group".created_at is E'@omit create, update, insert'; 
comment on column "bodystat".created_at is E'@omit create, update, insert'; 
comment on column "user_exercise".created_at is E'@omit create, update, insert'; 
comment on column "battle".created_at is E'@omit create, update, insert'; 
comment on column "workout".created_at is E'@omit create, update, insert'; 
comment on column "chat_message".created_at is E'@omit create, update, insert'; 

comment on column "user".updated_at is E'@omit create, update, insert'; 
comment on column "group".updated_at is E'@omit create, update, insert'; 
comment on column "bodystat".updated_at is E'@omit create, update, insert'; 
comment on column "user_exercise".updated_at is E'@omit create, update, insert'; 
comment on column "battle".updated_at is E'@omit create, update, insert'; 
comment on column "workout".updated_at is E'@omit create, update, insert'; 
comment on column "chat_message".updated_at is E'@omit create, update, insert';
