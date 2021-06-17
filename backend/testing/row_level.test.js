const { Client } = require("pg");
const client = new Client("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym");

beforeAll(async (done) => {
  await client.connect();
  done();
});

const testTablesWithUserIdFk = async ({ tableName, columnToAlter, newVal }) => {
  await client.query(`update $1 set $2 = $3 where app_user_id = 1`, [tableName, columnToAlter, newVal]);
  const { res } = await client.query(`select $2 from $1 where app_user_id = 1`, [tableName, columnToAlter, newVal]);
  expect(res.rows[0][columnToAlter]).toBe(newVal)
};

test("user row level policies", async () => {});

afterAll(async (done) => {
  await client.end();
  done();
});
