const testTableInsert = async ({ tableAndCols, permittedValues, unpermittedValues, admin_client, user_client }) => {
  await user_client.query(`insert into ${tableAndCols} values ${permittedValues}`).catch((err) => {
    expect(err).toBe(undefined);
  });

  const unpermittedQuery = `insert into ${tableAndCols} values ${unpermittedValues}`

  //this user should not be able to insert this value
  await user_client.query(unpermittedQuery).catch((err) => {
    expect(err).not.toBe(undefined);
  });

  //insert this value in anyway with the admin client so it can be used in subsequent tests
  await admin_client.query(`insert into ${tableAndCols} values ${unpermittedValues}`).catch((err) => {
    expect(err).toBe(undefined);
  });
};
const testTableUpdateDelete = async ({ tableName, columnToAlter, newVal, permittedWhereClause, unpermittedWhereClause, user_client }) => {
  const rows = await user_client.query(`update ${tableName} set ${columnToAlter} = ${newVal} where ${unpermittedWhereClause} returning *`)
  //0 rows updated (all updated rows are returned by returning *)
  expect(rows.length).toBe(0)

  const deleteRows = await user_client.query(`delete from ${tableName} where ${unpermittedWhereClause} returning *`);
  expect(deleteRows.length).toBe(0)

  const allowedRows = await user_client.query(`update ${tableName} set ${columnToAlter} = ${newVal} where ${permittedWhereClause} returning *`)
  //altered column should be newval
  expect(allowedRows[0][columnToAlter]).toBe(newVal)

  const allowedDeleteRows = await user_client.query(`delete from ${tableName} where ${permittedWhereClause} returning *`);
  expect(allowedDeleteRows.length).toBe(1)
};

exports.testTableUpdateDelete = testTableUpdateDelete;
exports.testTableInsert = testTableInsert;
