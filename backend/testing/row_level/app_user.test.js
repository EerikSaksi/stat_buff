const { setup } = require("../setup_fixtures");
const { testTableUpdateDelete } = require("./row_level_helper");
beforeAll(async (done) => {
  await setup();
  done();
});
test("app_user update", async () => {
  expect(testTableUpdateDelete({ tableName: "app_user", columnToAlter: "bodymass", newVal: 90, permittedWhereClause: "id = 1", unpermittedWhereClause: "id = 2" })).toBe("");
});
