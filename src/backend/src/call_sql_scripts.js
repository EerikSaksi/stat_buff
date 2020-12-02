const {Client} = require("pg");
const fs = require("fs");
const path = require('path')

async function exec_file(fileName, client) {
  const sql = fs.readFileSync(path.resolve(__dirname, fileName), 'UTF-8');
  await client.query(sql)
}

async function run_all_sql_scripts() {
  const client = new Client("postgres://eerik:postGrizzly@localhost:5432/rpgym")
  await client.connect()
  await exec_file("init.sql", client);
  await exec_file("triggers.sql", client);
  await exec_file("permissions.sql", client);
  await exec_file("strength_level/scrape.sql", client);
  await client.end().catch((err) => console.log(err))
}
module.exports = run_all_sql_scripts;
