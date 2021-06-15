const execGraphQL = require("./helpers");
const setup = require("./setup_fixtures");
const fs = require("fs");
const app = require('../src/index.js')

beforeAll(async () => {
  await setup();
});
test("user row policies", async () => {
  const res = await execGraphQL({
    query: `
      mutation{
        updateAppUser(input: {id: 4, patch: {username: "squat"}}){
          appUser{
            username
          }
        }
      }`,
  });
  console.log(res);
  expect(res.updateAppUser.appUser.username === "squat");
});

afterAll(() => {
  app.close();
  fs.unlink("./schema.graphql");
});
