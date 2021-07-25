const {setup} = require('../setup_fixtures')
const {testTableUpdateDelete, testTableInsert} = require('./row_level_helper.js')
var user_client, admin_client;
beforeAll(async (done) => {
  const clients = await setup()
  user_client = clients.user_client
  admin_client = clients.admin_client
  done()
})

test('Plan Insert', () => {
   testTableInsert({
     tableAndCols: 'workout_plan(name, app_user_id)', permittedValues: "('Leg Day', 1)", unpermittedValues: "('Leg Day', 2)", admin_client, user_client 
   })
})
test('Plan Update Delete', () => {
  await testTableUpdateDelete({
    tableName: "workout_plan",
    columnToAlter: "name",
    newVal: 'Chest Day',
    permittedWhereClause: "app_user_id = 1",
    unpermittedWhereClause: "app_user_id = 2",
    user_client
  });
})

test('All workout plan actions', () => {
  await testTableUpdateDelete({
    tableName: "",
    columnToAlter: "bodymass",
    newVal: 90,
    permittedWhereClause: "id = 1",
    unpermittedWhereClause: "id = 2",
    user_client
  });
})

afterAll(() => {
  await admin_client.$pool.end()
  await user_client.$pool.end()
})
