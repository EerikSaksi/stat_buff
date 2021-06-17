const { Client } = require("pg");
const client = new Client("postgres://eerik:Postgrizzly@localhost:5432/rpgym");
client.connect();

const deleteAllData = async () => {
  const { rows } = await client.query(
    "SELECT 'delete from ' || table_name || ' cascade;' as delete_query FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"
  );
  for ({ delete_query } of rows) {
    await client.query(delete_query);
  }

  const { rows: sequences } = await client.query(` SELECT c.relname as name FROM pg_class c WHERE c.relkind = 'S';`);

  for ({ name } of sequences) {
    await client.query(`alter sequence ${name} restart`);
  }
  console.log("setup complete");
};

const setupUsers = async () => {
  await client.query("select create_user($1, $2)", ["bobby", "tables"])
  await client.query("select create_user($1, $2)", ["bro", "science"]);
  await client.query("select create_user($1, $2)", ["armday", "everyday"]);
  await client.query("select create_user($1, $2)", ["hip", "thruster"]);
};

const setup = async () => {
  await deleteAllData();
  await setupUsers();
  await client.end();
};
module.exports = setup
