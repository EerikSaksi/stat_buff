const { setup } = require("../setup_fixtures");

test("User id is correct", async (done) => {
  const {user_client, admin_client} = await setup()
  const rows = await user_client.query("select current_user_id()");
  expect(rows[0].current_user_id).toBe(1);
  await admin_client.$pool.end()
  await user_client.$pool.end()
  done()
});
