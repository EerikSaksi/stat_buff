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
        enemy = "Mudcrab";
        break;
      case 1:
        enemy = "Earth Golem";
        break;
      case 2:
        enemy = "Fire Devil";
        break;
      case 3:
        enemy = "Frogman, King of Deadlift Leverages";
        break;
      case 4:
        enemy = "Guardian of the Frost Cavern";
        break;
      case 5:
        enemy = "Minotaur";
        break;
      case 6:
        enemy = "Queen of Scorpions";
        break;
      case 7:
        enemy = "Defender on the Air Temple";
        break;
    }

    //insert new enemy level, name and hp calculated based on level
    await client.query(`
      insert into
        "enemy" (level, max_health, name)
      values
        (${level}, ${6 + 2 * level}, '${enemy}');
    `);
  }
}

async function run_all_sql_scripts() {
  const client = new Client(
    process.env.DATABASE_URL
  );
  await client.connect();
  await exec_file("init.sql", client);
  await exec_file("triggers.sql", client);
  await exec_file("subscriptions.sql", client);
  await exec_file("timestamp_triggers.sql", client);
  await exec_file("permissions.sql", client);
  client.query(`
    revoke all on database stat_buff from query_sender;
    alter role query_sender with login;
    alter user query_sender with password '${process.env.DATABASE_USER_PASSWORD}';`
  );
  await init_enemies(client);
  await exec_file("hardcoded_values.sql", client);
  await client.end().catch((err) => console.log(err));
}
module.exports = run_all_sql_scripts;
