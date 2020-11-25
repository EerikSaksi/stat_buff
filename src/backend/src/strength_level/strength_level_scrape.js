const cheerio = require('cheerio')
const fetch = require('node-fetch')
const https = require('https');
const rootCas = require('ssl-root-cas').create();
rootCas.addFile('intermediate.pem');
const httpsAgent = new https.Agent({ca: rootCas});

fetch("https://strengthlevel.com/strength-standards/bench-press/kg", {
  agent: httpsAgent,
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9,fi;q=0.8",
    "cache-control": "max-age=0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "strengthsession=q7gi7ve1kolq2cs2g5dh93ksl4"
  },
  "referrer": "https://strengthlevel.com/strength-standards/bench-press",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
})
.then(response => response.text())
.then(text => {
  console.log($('table[class=strength__standards]').html())
})
