const {OAuth2Client} = require('google-auth-library');

//validate the token that we are given and return the googleID that it was sent by
async function tokenToGoogleID(headerAuth){
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: headerAuth.split(" ")[1],
    audience: [process.env.GOOGLE_AUTH_ANDROID_CLIENT, process.env.GOOGLE_AUTH_IOS_CLIENT]
  });
  const payload = ticket.getPayload();
  return {id: payload['sub'], email: payload['email']};
}
module.exports = tokenToGoogleID