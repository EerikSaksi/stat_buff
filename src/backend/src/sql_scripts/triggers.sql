--creates a battle with whatever group name and battle number that the groups was set to 
CREATE FUNCTION create_battle()
RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  previous_battle "battle";
  new_current_health integer;
  new_enemy_level integer;
  BEGIN
    if NEW.battle_number = 1 then 
      insert into "battle"(groupName, battle_number, enemy_level, current_health) values (NEW.name, NEW.battle_number, 1, 10);
      return new;
    end if;


    select enemy_level, current_health into new_enemy_level, new_current_health
      from "battle" 
      where battle_number = OLD.battle_number and groupName = NEW.name;
    if new_current_health <= 0 then
      new_enemy_level = new_enemy_level + 1;
    end if;

    select max_health into new_current_health from "enemy" where level = new_enemy_level;
    insert into "battle"(groupName, battle_number, enemy_level, current_health) values (NEW.name, NEW.battle_number, new_enemy_level, new_current_health);
    return NEW;
  END;
$BODY$
 LANGUAGE plpgsql;

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
    select groupName into gn from "user" where username = NEW.username;
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
    raise notice 'calculate_total_damage %d', NEW.sets;
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
  raise notice 'subtract_workout_damage %d', NEW.total_damage;
  update "battle"
  set current_health = (current_health - NEW.total_damage) 
  where battle_number = NEW.battle_number and groupName = NEW.groupName;

  if (select current_health from "battle" where battle_number = NEW.battle_number and groupName = NEW.groupName) <= 0 then
    update "group"
    set battle_number = battle_number + 1
    where battle_number = NEW.battle_number and name = NEW.groupName;
  end if;
  return NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER subtract_workout_damage_on_workout_create
after insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE subtract_workout_damage();
