const { user_client } = require("../setup_fixtures");
const testTableUpdateDelete = async ({ tableName, columnToAlter, newVal, permittedWhereClause, unpermittedWhereClause }) => {
  const { rows: currentUserIdRows } = await user_client.query(`select current_user_id()`);

  if (currentUserIdRows[0].current_user_id !== 1) {
    debugger
    return true
    return 'currentUserIdRows[0].current_user_id !== 1';
  }

  //this clause should not go through (editing someone elses table)
  badEdit = `update ${tableName} set ${columnToAlter} = ${newVal} where ${unpermittedWhereClause}`;
  const {err} = await user_client.query(badEdit)
  if (err){
    return badEdit
  }



  //try delete
  await user_client.query(`delete from ${tableName} where ${unpermittedWhereClause}`);

  //check if exists
  const { rows: invalidDeleteRows } = await user_client.query(`select * from ${tableName} where ${unpermittedWhereClause}`);

  if (invalidDeleteRows[0] !== undefined) {
    return false;
  }

  //this clause should go through (our table)
  await user_client.query(`update ${tableName} set ${columnToAlter} = $1 where ${permittedWhereClause}`, [newVal]);
  const { rows } = await user_client.query(`select ${columnToAlter} from ${tableName} where ${permittedWhereClause}`);
  if (rows[0][columnToAlter] !== newVal) {
    return false;
  }

  //try delete
  await user_client.query(`delete from ${tableName} where ${permittedWhereClause}`);

  //check if exists (shouldnt)
  const { rows: validDeleteRows } = await user_client.query(`select * from ${tableName} where ${permittedWhereClause}`);
  if (validDeleteRows[0] !== undefined) {
    return false;
  }
  return true;
};

const testTableInsert = async ({ tableAndCols, permittedValues, unpermittedValues }) => {
  await user_client.query(`insert into ${tableAndCols} values ${permittedValues}`).catch((err) => {
    expect(err).toBe(undefined);
  });

  await user_client.query(`insert into ${tableAndCols} values ${unpermittedValues}`).catch((err) => {
    expect(err).not.toBe(undefined);
  });
};

exports.testTableUpdateDelete = testTableUpdateDelete;
exports.testTableInsert = testTableInsert;
