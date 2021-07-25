const { readFile } = require("fs/promises");
const pgb = require('pg-promise')();


const setup = async () => {
  const admin_client = pgb("postgres://eerik:Postgrizzly@localhost:5432/rpgym");
  const user_client = pgb("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym");
  const rows = await admin_client.query(
    "SELECT 'delete from ' || table_name || ' cascade;' as delete_query FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"
  );
  for ({ delete_query } of rows) {
    await admin_client.query(delete_query);
  }

  const sequences = await admin_client.query(` SELECT c.relname as name FROM pg_class c WHERE c.relkind = 'S';`);
  for ({name} of sequences) {
    await admin_client.query(`alter sequence ${name} restart`);
  }
  //setup exercises (not really tested but still necessary for a lot of tables, eg workout_plan_exercise)
  const exerciseSql = await readFile("/home/eerik/Documents/stat_buff/backend/src/migrations/committed/000016.sql", "utf8");
  await admin_client.query(exerciseSql);
  await admin_client.query("select create_user('armday', 'everyday')");
  await admin_client.query("select create_user($1, $2)", ["bro", "science"]);
  await user_client.query(`select set_config('jwt.claims.user_id', '1', false);`);
  return {admin_client, user_client}
};
module.exports = { setup }
