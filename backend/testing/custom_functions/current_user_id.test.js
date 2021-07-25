const { user_client } = require("../setup_fixtures");
test('User id is correct', () => {
  const {rows} = user_client.query("select current_user_id()")
  console.log({rows})
  expect(rows[0].current_user_id).toBe(1)
})
