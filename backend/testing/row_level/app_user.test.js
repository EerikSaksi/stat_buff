const { setup } = require("../setup_fixtures");
const { testTableUpdateDelete } = require("./row_level_helper");
test("app_user update", async () => {
  const {user_client, admin_client} = await setup()
  await testTableUpdateDelete({
    tableName: "app_user",
    columnToAlter: "bodymass",
    newVal: 90,
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
    user_client
  });
  await admin_client.$pool.end()
  await user_client.$pool.end()
});
