const {user_client, admin_client } = require("../setup_fixtures")
const testTableUpdateDelete = async ({ tableName, columnToAlter, newVal, permittedWhereClause, unpermittedWhereClause }) => {
  const {rows: currentUserIdRows} = await user_client.query(`select current_user_id()`);
  expect(currentUserIdRows[0].current_user_id).toBe(1)

  await user_client.query(`update ${tableName} set ${columnToAlter} = $1 where ${unpermittedWhereClause}`, [newVal]);

  //this clause should not go through (editing someone elses table)
  await user_client.query(`update ${tableName} set ${columnToAlter} = $1 where ${unpermittedWhereClause}`, [newVal]);
  const { rows: invalidRows } = await user_client.query(`select ${columnToAlter} from ${tableName} where ${unpermittedWhereClause}`);
  expect(invalidRows[0][columnToAlter]).not.toBe(newVal);

  //try delete
  await user_client.query(`delete from ${tableName} where ${unpermittedWhereClause}`);

  //check if exists
  const { rows: invalidDeleteRows } = await user_client.query(`select * from ${tableName} where ${unpermittedWhereClause}`);

  expect(invalidDeleteRows[0]).not.toBe(undefined);

  //this clause should go through (our table)
  await user_client.query(`update ${tableName} set ${columnToAlter} = $1 where ${permittedWhereClause}`, [newVal]);
  const { rows } = await user_client.query(`select ${columnToAlter} from ${tableName} where ${permittedWhereClause}`);
  expect(rows[0][columnToAlter]).toBe(newVal);

  //try delete
  await user_client.query(`delete from ${tableName} where ${permittedWhereClause}`);

  //check if exists (shouldnt)
  const { rows: validDeleteRows } = await user_client.query(`select * from ${tableName} where ${permittedWhereClause}`);
  expect(validDeleteRows[0]).toBe(undefined);
};

const testTableInsert = async ({ tableAndCols, permittedValues, unpermittedValues }) => {
  await user_client.query(`insert into ${tableAndCols} values ${permittedValues}`).catch((err) => {
    expect(err).toBe(undefined);
  });

  await user_client.query(`insert into ${tableAndCols} values ${unpermittedValues}`).catch((err) => {
    expect(err).not.toBe(undefined);
  });
};

exports.testTableUpdateDelete = testTableUpdateDelete
exports.testTableInsert = testTableInsert
