const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
require("https").globalAgent.options.ca = require("ssl-root-cas").create();
//validate the token that we are given and return the googleID that it was sent by
const client = new OAuth2Client();
async function tokenToGoogleID(headerAuth) {
  await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${headerAuth.split(" ")[1]}`)
    .then((response) => response.json())
    .then((json) => {
      console.log({
        "json.aud === process.env.GOOGLE_AUTH_ANDROID_CLIENT,": json.aud === process.env.GOOGLE_AUTH_ANDROID_CLIENT,
        "json.azd === process.env.GOOGLE_AUTH_ANDROID_CLIENT,": json.azd === process.env.GOOGLE_AUTH_ANDROID_CLIENT,
        "json.azd === process.env.GOOGLE_AUTH_IOS_CLIENT,": json.azd === process.env.GOOGLE_AUTH_IOS_CLIENT,
        "json.azd === process.env.GOOGLE_AUTH_IOS_CLIENT,": json.azd === process.env.GOOGLE_AUTH_IOS_CLIENT,
      });
      console.log(json);
    });
  const ticket = await client.verifyIdToken({
    idToken: headerAuth.split(" ")[1],
    audience: [process.env.GOOGLE_AUTH_ANDROID_CLIENT, process.env.GOOGLE_AUTH_IOS_CLIENT],
  });
  const payload = ticket.getPayload();
  console.log(payload);
  return {
    id: payload["sub"],
    email: payload.email,
  };
}
module.exports = tokenToGoogleID;
