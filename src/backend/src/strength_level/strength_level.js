const fetch = require('node-fetch')
const https = require('https');
const rootCas = require('ssl-root-cas').create();
rootCas.addFile('intermediate.pem');
const httpsAgent = new https.Agent({ca: rootCas});
const cheerio = require('cheerio')

async function statsToPercentageVal(gender, bodymass, exercise, liftmass, repetitions) {
  await fetch("https://strengthlevel.com/", {
    "agent": httpsAgent,
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,fi;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://strengthlevel.com/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `gender=${gender}&age=20.5&bodymass=${bodymass}&bodymassunit=kg&exercise=${exercise}&liftmass=${liftmass}&liftmassunit=kg&repetitions=${repetitions}&timezone=2&source=homepage`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
  })
    .then(response => {
      if (response.ok) {
        return response.text()
      }
    })
    .then(text => {
      $ = cheerio.load(text)
      const result = $('p[class=has-text-weight-bold]').first().text().match(/[0-9]/g)
      console.log(parseInt(result.join('')))
      return parseInt(result.join(''))
    })
}
statsToPercentageVal("male", 83, "bench-press", 140, 8)
