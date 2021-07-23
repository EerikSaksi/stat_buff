const {setup, tearDown, user_client} = require('../setup_fixtures')
beforeAll(async (done) => {
  await setup()
  done()
})
test("app_user update", async () => {
  user_client.query("update app_user set bodymass = 90 where id = 1").catch(err => expect(err).toBe(undefined))
  user_client.query("update app_user set bodymass = 90 where id = 2").catch(err => expect(err).not.toBe(undefined))
  user_client.query("delete from app_user where id = 1").catch(err => expect(err).toBe(undefined))
  user_client.query("delete from app_user where id = 2").catch(err => expect(err).not.toBe(undefined))
});
