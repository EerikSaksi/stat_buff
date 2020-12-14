--initializes the health of the battle to be the hardcoded enemy max health
CREATE FUNCTION init_battle_stats()
  RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  previous_battle battle;
  BEGIN
    --last battle had battle_number - 1
    previous_battle = * from "battle" where battle_number = NEW.battle_number - 1 and groupName = NEW.groupName;

    --if the last battle was won (enemy has 0 or less current_health) then increment enemy_level
    NEW.enemy_level = CASE 
      WHEN (
        previous_battle.current_health  <= 0
      ) 
      THEN previous_battle.enemy_level + 1
      ELSE previous_battle.enemy_level
    END;
    NEW.current_health = max_health from "enemy" where level = NEW.enemy_level;
    return NEW;
  END;
$BODY$
 LANGUAGE plpgsql;


--health is set whenever a battle is created
CREATE TRIGGER init_battle_stats_on_create
before insert ON "battle"
FOR EACH ROW
EXECUTE PROCEDURE init_battle_stats();






--creates a battle with whatever group name and battle number that the groups was set to 
CREATE FUNCTION create_battle()
RETURNS TRIGGER AS $$
BEGIN
  insert into "battle"(groupName, battle_number) values (NEW.name, NEW.battle_number);
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






--calculates how much damage this workout dealt based on the users current damage and the difficulty (which is calculated to hits) 
CREATE FUNCTION calculate_total_damage()
  RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  hits integer;
  BEGIN
    hits =  ((10 - NEW.average_rir) / 10.0 * NEW.sets);
    NEW.total_damage = (select dph from calculate_strength_stats(NEW.username)) * hits; 
    return NEW;
  END;
  $BODY$
LANGUAGE plpgsql;

CREATE TRIGGER insert_total_damage
before insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE calculate_total_damage();






--subtracts the total damage from the group's current battle whenever a workout is created
CREATE FUNCTION subtract_workout_damage()
  RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  new_health integer;
BEGIN
  --subtract health from the current battle 
  update "battle"
  set current_health = (current_health - NEW.total_damage) 
  where battle_number = NEW.battle_number and groupName = NEW.groupName;

  --set the battle number to be greater than one if the health is negative (this enemy was defeated)
  update "group"
  set battle_number = battle_number + 1
  where battle_number = NEW.battle_number and name = NEW.groupName
  and (
    select current_health from "battle"
    where battle_number = NEW.battle_number and groupName = NEW.groupName
  ) <= 0;
  return NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER subtract_workout_damage_on_workout_create
after insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE subtract_workout_damage();
