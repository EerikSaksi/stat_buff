--updates the current battle and group for the users workout/exercise log
CREATE FUNCTION update_battle_to_current()
  RETURNS TRIGGER AS $$
  BEGIN
    select groupName into NEW.groupName from "user" where username = NEW.username;
    select battle_number into NEW.battle_number from "group" where name = 'Dream Team';
    return NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercise_to_current_battle
before insert on "user_exercise"
FOR EACH ROW 
EXECUTE PROCEDURE update_battle_to_current();






--encrypts supplied password
CREATE FUNCTION encrypt_password_and_set_creator()
  RETURNS TRIGGER AS $BODY$
  declare 
  active_user_username varchar(32);
  BEGIN
    NEW.creator_username = (select username from active_user());
    if NEW.password is not null then
      NEW.password = crypt(NEW.password, gen_salt('bf'));
    end if; 
    return NEW;
  END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER encrypt_password_and_set_creator_on_group_create
before insert on "group"
FOR EACH ROW 
EXECUTE PROCEDURE encrypt_password_and_set_creator();





--the creator should join the group
CREATE FUNCTION creator_joins_group()
  RETURNS TRIGGER AS $$
  BEGIN
    update "user" set groupName = NEW.name where username = NEW.creator_username;
    return NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER creator_joins_group_after_group_create
after insert on "group" 
FOR EACH ROW 
EXECUTE PROCEDURE creator_joins_group();





--check if there exist at least 2 members, in which case we initialize the first battle
CREATE FUNCTION scale_health()
  RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  num_members integer;
  BEGIN
    --user left group
    if OLD.groupName is not null then
      --count members in old group
      select count(*) into num_members from "user" where groupName = OLD.groupName;
      raise notice 'num_members %', num_members;
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
  $BODY$
LANGUAGE plpgsql;

CREATE TRIGGER scale_health_on_groupname_change
after update of groupName on "user"
FOR EACH ROW 
EXECUTE PROCEDURE scale_health();




--calculates how much damage this workout dealt based on the users current damage and the difficulty (which is calculated to hits) 
CREATE FUNCTION calculate_total_damage()
  RETURNS TRIGGER AS 
  $BODY$
  DECLARE
  hits integer;
  gn character varying(32);
  bn integer;
  new_current_health integer;
  new_enemy_level integer;
  BEGIN
    --load group and battle info to this table (so we can select when this battle was created)
    select groupName into gn from "user" where username = NEW.username;
    select battle_number into bn from "group" where name = gn;
    NEW.groupName = gn;
    NEW.battle_number = bn;

    --calculate hits and thus the damage that this dealt
    hits =  ((10 - NEW.average_rir) / 10.0 * NEW.sets);
    raise notice 'hits %', hits; 
    NEW.total_damage = (select DPH from calculate_strength_stats(NEW.username)) * hits; 

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
      insert into "battle"(groupName, battle_number, enemy_level, current_health) values (gn, bn, new_enemy_level, new_current_health);
      update "group" set battle_number = battle_number + 1 where name = gn;
    end if;
    return NEW;
  END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER insert_total_damage
before insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE calculate_total_damage();

--updates the current battle and group for the users workout/exercise log
CREATE FUNCTION set_creator_username()
  RETURNS TRIGGER AS $$
  BEGIN
    return NEW;
  END;
$$ LANGUAGE plpgsql;

