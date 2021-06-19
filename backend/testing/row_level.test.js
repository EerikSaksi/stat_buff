const { Client } = require("pg");
const client = new Client("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym");
const setup = require('./setup_fixtures')

beforeAll(async (done) => {
  await client.connect();
  await client.query(`select set_config('jwt.claims.user_id', '1', false)`)
  await setup()
  done();
});

const testTable = async ({ tableName, columnToAlter, newVal, permittedWhereClause, unpermittedWhereClause }) => {
  //this clause should not go through (editing someone elses table)
  await client.query(`update ${tableName} set ${columnToAlter} = $1 where ${unpermittedWhereClause}`, [newVal]);
  const { rows: invalidRows} = await client.query(`select ${columnToAlter} from ${tableName} where ${unpermittedWhereClause}`, );
  expect(invalidRows[0][columnToAlter]).not.toBe(newVal)


  //this clause should go through (our table)
  await client.query(`update ${tableName} set ${columnToAlter} = $1 where ${permittedWhereClause}`, [newVal]);
  const { rows } = await client.query(`select ${columnToAlter} from ${tableName} where ${permittedWhereClause}`, );
  expect(rows[0][columnToAlter]).toBe(newVal)
};

test("user row level policies", async () => {
  await testTable({tableName: 'app_user', columnToAlter: 'bodymass', newVal: 90, permittedWhereClause: 'id = 1', unpermittedWhereClause: 'id = 2' })
  await testTable({tableName: 'workout_plan', columnToAlter: 'name', newVal: "pant", permittedWhereClause: 'id = 1', unpermittedWhereClause: 'id = 2' })
  await testTable({tableName: 'workout_plan_day', columnToAlter: 'name', newVal: "3rd", permittedWhereClause: 'id = 1', unpermittedWhereClause: 'id = 2' })
  await testTable({tableName: 'workout_plan_exercise', columnToAlter: 'sets', newVal: 69, permittedWhereClause: 'id = 1', unpermittedWhereClause: 'id = 2' })
});
afterAll(async (done) => {
  await client.end();
  done();
});
