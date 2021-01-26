const { OAuth2Client } = require("google-auth-library");
const fetch = require('node-fetch')
require("https").globalAgent.options.ca = require("ssl-root-cas").create();
//validate the token that we are given and return the googleID that it was sent by
const client = new OAuth2Client(process.env.GOOGLE_AUTH_ANDROID_CLIENT);
async function tokenToGoogleID(headerAuth) {
  await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${headerAuth.split(" ")[1]}`)
  .then(response => response.text())
  .then(text => console.log(text))
  const ticket = await client.verifyIdToken({
    idToken: headerAuth.split(" ")[1],
  });
  const payload = ticket.getPayload();
  console.log(payload)
  return {
    id: payload["sub"],
    email: payload.email
  }
}
module.exports = tokenToGoogleID;
