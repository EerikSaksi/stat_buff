const {OAuth2Client} = require('google-auth-library');

//validate the token that we are given and return the googleID that it was sent by
async function tokenToGoogleID(headerAuth){
  const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
  const ticket = await client.verifyIdToken({
    idToken: headerAuth.split(" ")[1],
  });
  const payload = ticket.getPayload();
  return payload['sub'];
}
module.exports = tokenToGoogleID
