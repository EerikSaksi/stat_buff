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
