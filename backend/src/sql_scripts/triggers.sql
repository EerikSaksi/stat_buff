--updates the current battle and group for the users workout/exercise log
CREATE FUNCTION update_battle_to_current()
  RETURNS TRIGGER AS $$
  BEGIN
    select groupName into NEW.groupName from "user" where username = NEW.username;
    select battle_number into NEW.battle_number from "group" where name = NEW.groupName;
    return NEW;
  END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER update_exercise_to_current_battle
before insert on "user_exercise"
FOR EACH ROW 
EXECUTE PROCEDURE update_battle_to_current();


--encrypts supplied password
CREATE FUNCTION encrypt_group_password()
  RETURNS TRIGGER AS $BODY$
  declare 
  active_user_username varchar(32);
  BEGIN
    if NEW.password is not null then
      NEW.password = crypt(NEW.password, gen_salt('bf'));
    end if; 
    return NEW;
  END;
$BODY$ LANGUAGE plpgsql security definer;

CREATE TRIGGER encrypt_group_password()
before insert on "group"
FOR EACH ROW 
EXECUTE PROCEDURE encrypt_group_password();

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
LANGUAGE plpgsql security definer;

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
$BODY$
LANGUAGE plpgsql security definer;

CREATE TRIGGER insert_total_damage
before insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE calculate_total_damage();

--updates the current battle and group for the users workout/exercise log
CREATE FUNCTION load_groupName()
  RETURNS TRIGGER AS $$
  BEGIN
    new.groupName = (select groupName from "user" where username = NEW.username);
    return new;
  END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER load_groupName_to_chat_message
before insert on chat_message
FOR EACH ROW 
EXECUTE PROCEDURE load_groupName();

-- we create a special function that you can access active users current battle. Before we send the current battle, we check whether or not it has expired, in which case we create a new battle with the same parameters (other than the battle_number) and return that instead. This is efficient as we only check if a battle has expired once a user requests it (does a tree make a sound if no one sees it == has a battle not expired if no one has requested it)
create function get_battle_and_check_expiry()
  returns "battle" as $$
  BEGIN
    WITH current_battle AS (select name, "battle".battle_number, enemy_level, max_health, "battle".created_at as battle_created_at
      from "user" 
        inner join "group" on "user".groupName = "group".name
        inner join "battle" on "group".battle_number = "battle".battle_number and "group".name = "battle".groupName
        where "user".username = (select username from active_user()))
    With other_battle as (select name, "battle".battle_number, enemy_level, max_health, "battle".created_at as battle_created_at
      from "user" 
        inner join "group" on "user".groupName = "group".name
        inner join "battle" on "group".battle_number = "battle".battle_number and "group".name = "battle".groupName
        where "user".username = (select username from active_user()))
    -- if 1 then
    --   --insert into "battle"(enemy_level, groupName, battle_number, current_health, max_health) 
    --   --select (enemy_level, name, battle_number + 1, max_health, max_health) from current_battle;
    --   --update "group" set battle_number = battle_number + 1 where name = (select name from current_battle);
    -- end if;
  END
$$ LANGUAGE plpgsql volatile security definer;
