const fetch = require('node-fetch')
const execGraphQL = ({ query}) =>
  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());
module.exports = execGraphQL
