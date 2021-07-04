//const { Client } = require("pg");
//const client = new Client("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym");
//const setup = require("./setup_fixtures");
//
//beforeAll(async (done) => {
//  await client.connect();
//  await client.query(`select set_config('jwt.claims.user_id', '1', false)`);
//  await setup();
//  done();
//});
//
//test('saveWorkout', async () => {
//  await client.query("select save_workout((5, ARRAY[(5,5)::completed_set]::exercise_id_and_sets))") 
//  .catch(err => expect(err).toBe(undefined))
//})
//
//afterAll(async (done) => {
//  await client.end();
//  done();
//});
