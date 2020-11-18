const {Client} = require('pg')
const client = new Client()
const googleIDToUsername = async (googleID) => {
  await client.connect()
  const res = await client.query('SELECT u.username from user as u, userID as uID where u.username = uID.username and uID.googleID = $1::text ', [googleID])
  await client.end()
  return res.rows[0].username
}
module.exports = googleIDToUsername
