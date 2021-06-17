const fetch = require("node-fetch");
const server = require("../src/index.js");
var token = "";

const execGraphQL = ({ query }) => {
  var headers =  {"Content-Type": "application/json"};
  if (token){
    headers.authorization = `Bearer ${token}`
  }
  console.log({headers})
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());
};
(async () => {
  const res = await execGraphQL({
    query: `
      query{
        authenticate(username: "hip", password: "thruster")
      }`,
  });
  token = res.data.authenticate
})();
