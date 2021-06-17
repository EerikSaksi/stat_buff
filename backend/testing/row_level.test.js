const execGraphQL = require("./helpers");
const setup = require("./setup_fixtures");
const fs = require("fs");
const server = require('../src/index.js')

beforeAll(async () => {
  await setup();
});

test("user row policies", async () => {
  const res = await execGraphQL({
    query: `
      query{
        appUsers{
          nodes{
            username
          }
        }
      }
    `
  });
  console.log({res})
  //const res = await execGraphQL({
  //  query: `
  //    mutation{
  //      updateAppUser(input: {id: 4, patch: {username: "squat"}}){
  //        appUser{
  //          username
  //        }
  //      }
  //    }`,
  //});
  //console.log(res);
  //expect(res.updateAppUser.appUser.username === "squat");
});

afterAll(() => {
  server.close()
});

