const { Client } = require("pg");
const client = new Client("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym");
const setup = require("./setup_fixtures");

beforeAll(async (done) => {
  await client.connect();
  await client.query(`select set_config('jwt.claims.user_id', '1', false)`);
  await setup();
  done();
});

const testTableUpdateDelete = async ({ tableName, columnToAlter, newVal, permittedWhereClause, unpermittedWhereClause }) => {
  await client.query(`update ${tableName} set ${columnToAlter} = $1 where ${unpermittedWhereClause}`, [newVal]);
  //this clause should not go through (editing someone elses table)
  await client.query(`update ${tableName} set ${columnToAlter} = $1 where ${unpermittedWhereClause}`, [newVal]);
  const { rows: invalidRows } = await client.query(`select ${columnToAlter} from ${tableName} where ${unpermittedWhereClause}`);
  expect(invalidRows[0][columnToAlter]).not.toBe(newVal);

  //try delete
  await client.query(`delete from ${tableName} where ${unpermittedWhereClause}`);

  //check if exists
  const { rows: invalidDeleteRows } = await client.query(`select * from ${tableName} where ${unpermittedWhereClause}`);
  expect(invalidDeleteRows[0]).not.toBe(undefined);

  //this clause should go through (our table)
  await client.query(`update ${tableName} set ${columnToAlter} = $1 where ${permittedWhereClause}`, [newVal]);
  const { rows } = await client.query(`select ${columnToAlter} from ${tableName} where ${permittedWhereClause}`);
  expect(rows[0][columnToAlter]).toBe(newVal);

  //try delete
  await client.query(`delete from ${tableName} where ${permittedWhereClause}`);

  //check if exists (shouldnt)
  const { rows: validDeleteRows } = await client.query(`select * from ${tableName} where ${permittedWhereClause}`);
  expect(validDeleteRows[0]).toBe(undefined);
};

const testTableInsert = async ({ tableAndCols, permittedValues, unpermittedValues }) => {
  await client.query(`insert into ${tableAndCols} values ${permittedValues}`).catch((err) => {
    expect(err).toBe(undefined);
  });

  await client.query(`insert into ${tableAndCols} values ${unpermittedValues}`).catch((err) => {
    expect(err).not.toBe(undefined);
  });
};

test("user row level policies", async () => {
  await testTableUpdateDelete({
    tableName: "workout_plan_exercise",
    columnToAlter: "sets",
    newVal: 69,
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
  });
  await testTableInsert({
    tableAndCols: "workout_plan_exercise(workout_plan_day_id, exercise_id, sets, reps, ordering)",
    permittedValues: "(1, 1, 5, 5, 3)",
    unpermittedValues: "(2, 1, 5, 5, 3)",
  });

  await testTableUpdateDelete({
    tableName: "workout_plan_day",
    columnToAlter: "name",
    newVal: "3rd",
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
  });
  await testTableInsert({
    tableAndCols: "workout_plan_day(workout_plan_id, name)",
    permittedValues: "(1, 'heyo')",
    unpermittedValues: "(2, 'no heyo')",
  });

  await testTableUpdateDelete({
    tableName: "workout_plan",
    columnToAlter: "name",
    newVal: "pant",
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
  });
  await testTableUpdateDelete({
    tableName: "app_user",
    columnToAlter: "bodymass",
    newVal: 90,
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
  });
});
afterAll(async (done) => {
  await client.end();
  done();
});
