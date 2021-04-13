const fetch = require("node-fetch");
const https = require("https");
const rootCas = require("ssl-root-cas").create();
const path = require("path");
rootCas.addFile(path.resolve(__dirname, "intermediate.pem"));
const httpsAgent = new https.Agent({ ca: rootCas });
const cheerio = require("cheerio");

async function statsToPercentageVal(gender, bodymass, exercise, liftmass, repetitions, bodyweight) {
  const liftmassParameter = bodyweight
    ? //bodyweight exercise with no additional weight is a bodyweight variation
      liftmass
      ? //weighted bodyweight exercise
        `variation=weighted&extramass=${liftmass}`
      : "variation=bodyweight"
    : //not bodyweight, pass liftmass as it is
      `liftmass=${liftmass}`;
  return await fetch("https://strengthlevel.com/", {
    agent: httpsAgent,
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,fi;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://strengthlevel.com/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: `gender=${gender}&age=20.5&bodymass=${bodymass}&bodymassunit=kg&exercise=${exercise}&${liftmassParameter}&liftmassunit=kg&repetitions=${repetitions}&timezone=2&source=homepage`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
    })
    .then((text) => {
      $ = cheerio.load(text);
      const result = $("p[class=has-text-weight-bold]").first().text().match(/[0-9]/g);
      const toReturn = parseInt(result.join(""));
      return toReturn;
    });
}

var x = Array(0)
var y = Array(0);

(async () => {
  for (var i = 0; i < 100; i++) {
    const weight = 20 + i * 2;
    const percentage = await statsToPercentageVal("male", 80, "bench-press", weight, 1, false);
    x.push(weight)
    y.push(percentage)
  }
  console.log(x)
  console.log(y)
})();

module.exports = statsToPercentageVal;
