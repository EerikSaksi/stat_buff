const {admin_client, setup} = require('../setup_fixtures')
const {testTableUpdateDelete} = require('./row_level_helper.test.js')
beforeAll(async (done) => {
  await setup()
  await admin_client.query("insert into workout_plan(name, app_user_id) values('Chest', 1)");
  await admin_client.query("insert into workout_plan(name, app_user_id) values('Back', 2)");
  await admin_client.query("insert into workout_plan_day(name, workout_plan_id) values('1st', 1)");
  await admin_client.query("insert into workout_plan_day(name, workout_plan_id) values('2nd', 2)");
  await admin_client.query("insert into workout_plan_exercise(exercise_id, sets, reps, ordering, workout_plan_day_id) values(1, 5, 5, 1, 1)");
  await admin_client.query("insert into workout_plan_exercise(exercise_id, sets, reps, ordering, workout_plan_day_id) values(2, 4, 20, 1, 2)");
  done()
});

test('All workout plan actions', () => {
  await user_client.query("delete from workout_plan where id = 1").catch(error => expect(error).toBe(undefined))
  await user_client.query("delete from workout_plan where id = 2").catch(error => expect(error).not.toBe(undefined))
  await user_client.query("insert into workout_plan(name, app_user_id) values('Leg Day', 1)").catch(error => expect(error).toBe(undefined))
  await user_client.query("insert into workout_plan(name, app_user_id) values('Back', 2)").catch(error => expect(error).not.toBe(undefined))

  await user_client.query("insert into workout_plan(name, app_user_id) values('Back', 2)").catch(error => expect(error).not.toBe(undefined))
  await user_client.query("update workout_plan set name = 'New name' where id = 1").catch(error => expect(error).toBe(undefined))
  await user_client.query("update workout_plan set name = 'New name' where id = 2").catch(error => expect(error).not.toBe(undefined))

  user_client.query("update workout_plan set name = 'Leg day' where id = 1").catch(err => expect(err).toBe(undefined))
  user_client.query("update workout_plan set name = 'Leg day' where id = 2").catch(err => expect(err).not.toBe(undefined))
})
