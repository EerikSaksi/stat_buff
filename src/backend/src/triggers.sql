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






CREATE OR REPLACE FUNCTION init_battle()
RETURNS TRIGGER AS $$
BEGIN
  insert into "battle" (groupName) values(new.name);
  return new;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER init_stats
After insert ON "group"
FOR EACH ROW
EXECUTE PROCEDURE init_battle();



CREATE OR REPLACE FUNCTION init_health()
RETURNS TRIGGER AS $$
BEGIN
  if (old.enemy_level != new.enemy_level) then
    new.current_health = (select max_health from "enemy" where level = new.enemy_level);
  end if;
  return new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER init_stats_on_create
before insert ON "battle"
FOR EACH ROW
EXECUTE PROCEDURE init_health();

CREATE TRIGGER init_stats_on_update
before update ON "battle"
FOR EACH ROW
EXECUTE PROCEDURE init_health();

