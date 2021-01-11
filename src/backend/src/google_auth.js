const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
require("https").globalAgent.options.ca = require("ssl-root-cas").create();
//validate the token that we are given and return the googleID that it was sent by
async function tokenToGoogleID(headerAuth) {
  const ticket = await client.verifyIdToken({
    idToken: headerAuth.split(" ")[1],
    audience: process.env.GOOGLE_AUTH_CLIENT,
  });
  const payload = ticket.getPayload();
  return {
    id: payload["sub"],
    email: payload["email"],
  }
}
module.exports = tokenToGoogleID;
