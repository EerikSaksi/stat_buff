const { user_client } = require("../setup_fixtures");
beforeAll(async () => {
  await setup()
})
test("Save workout function", async () => [
  await user_client.query('select save_workout(ARRAY[(1, ARRAY[(0,1,2,2), (0,2,2,2), (0,3,3,2), (0,4,4,2)]::completed_set[])]::sets_and_exercise_id[]);')
])
