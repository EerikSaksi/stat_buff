--initializes the health of the battle to be the hardcoded enemy max health
CREATE FUNCTION init_health()
RETURNS TRIGGER AS $$
BEGIN
  NEW.current_health = (select max_health from "enemy" where level = NEW.enemy_level);
  return NEW;
END;
$$ LANGUAGE plpgsql;


--health is set whenever a battle is created
CREATE TRIGGER init_stats_on_create
before insert ON "battle"
FOR EACH ROW
EXECUTE PROCEDURE init_health();



--creates a battle with whatever group name and battle number that the groups was set to 
CREATE FUNCTION create_battle()
RETURNS TRIGGER AS $$
BEGIN
  insert into "battle"(enemy_level, groupName, battle_number) values (1, NEW.name, NEW.battle_number);
  return NEW;
END;
$$ LANGUAGE plpgsql;

--creates that battle whenever the battle number is updated
CREATE TRIGGER create_battle_on_update 
before UPDATE of battle_number on "group"
FOR EACH ROW 
EXECUTE PROCEDURE create_battle();



--updates the current battle and group for the users workout/exercise log
CREATE FUNCTION update_battle_to_current()
RETURNS TRIGGER AS 
$BODY$
DECLARE
gn   character varying(32);
bn   integer;
BEGIN
  select groupName into gn from "user" where username = username;
  select battle_number into bn from "group" where name = gn;
  NEW.groupName = gn;
  NEW.battle_number = bn;
  return NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER update_workout_to_current_battle
before insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE update_battle_to_current();

CREATE TRIGGER update_exercise_to_current_battle
before insert on "user_exercise"
FOR EACH ROW 
EXECUTE PROCEDURE update_battle_to_current();




--initializes the health of the battle to be the hardcoded enemy max health
CREATE FUNCTION calculate_total_damage()
RETURNS TRIGGER AS $$
BEGIN
  NEW.current_health = (select max_health from "enemy" where level = NEW.enemy_level);
  return NEW;
END;
$$ LANGUAGE plpgsql;
