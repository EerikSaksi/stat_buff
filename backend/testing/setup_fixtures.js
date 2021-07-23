const { Pool} = require("pg");
const exerciseSql = require("./exercise_sql");

const admin_client = new Pool({
  user: "eerik",
  host: "localhost",
  database: "rpgym",
  password: "Postgrizzly",
  port: 5432,
});
const user_client = new Pool({
  user: "query_sender",
  host: "localhost",
  database: "rpgym",
  password: "restrictedPermissions",
  port: 5432,
});

const setup = async () => {
  admin_client.connect().catch(err => console.log(err));
  user_client.connect().catch(err => console.log(err));

  const { rows } = await admin_client.query(
    "SELECT 'delete from ' || table_name || ' cascade;' as delete_query FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"
  );
  for ({ delete_query } of rows) {
    await admin_client.query(delete_query);
  }

  const { rows: sequences } = await admin_client.query(` SELECT c.relname as name FROM pg_class c WHERE c.relkind = 'S';`);

  for ({ name } of sequences) {
    await admin_client.query(`alter sequence ${name} restart`);
  }

  //setup exercises (not really tested but still necessary for a lot of tables, eg workout_plan_exercise)
  await admin_client.query(exerciseSql);

  await admin_client.query(`select set_config('jwt.claims.user_id', '1', false);`);
  await admin_client.query("delete from app_user;");
  await admin_client.query("select create_user($1, $2)", ["armday", "everyday"]);
  await admin_client.query("select create_user($1, $2)", ["bro", "science"]);
  console.log("Fixtures setup!");
  return { admin_client, user_client };
};
setup()

const tearDown = async () => {
  await admin_client.end();
  await user_client.end();
};
module.exports = { setup, tearDown, admin_client, user_client };
