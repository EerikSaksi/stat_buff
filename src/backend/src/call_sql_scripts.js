const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

async function exec_file(fileName, client) {
  const sql = fs.readFileSync(path.resolve(__dirname, fileName), "UTF-8");
  await client.query(sql);
}
async function init_enemies(client) {
  for (var level = 2; level < 300; level++) {
    //decide what the enemy name is (they simply rotate)
    var enemy = "";
    switch (level % 8) {
      case 0:
        enemy = "crab";
        break;
      case 1:
        enemy = "earth";
        break;
      case 2:
        enemy = "fire";
        break;
      case 3:
        enemy = "frog_man";
        break;
      case 4:
        enemy = "ice";
        break;
      case 5:
        enemy = "minotaur";
        break;
      case 6:
        enemy = "scorpion";
        break;
      case 7:
        enemy = "wind";
        break;
    }

    //insert new enemy level, name and hp calculated based on level
    await client.query(`
      insert into
        "enemy" (level, max_health, name)
      values
        (${level}, ${150 + level * 50}, '${enemy}');
    `);
  }
}

async function run_all_sql_scripts() {
  const client = new Client(
    "postgres://eerik:postGrizzly@localhost:5432/rpgym"
  );
  await client.connect();
  await exec_file("init.sql", client);
  await exec_file("triggers.sql", client);
  await exec_file("permissions.sql", client);
  await exec_file("strength_level/scrape.sql", client);
  await init_enemies(client);
  await client.end().catch((err) => console.log(err));
}
module.exports = run_all_sql_scripts;
