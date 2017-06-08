
const express = require('express')
const app = express()
const morgan = require('morgan')
const axios = require('axios')
const async = require('async');
const bodyParser = require('body-parser')
const env = app.get('env')
const PORT = process.env.PORT || 3002

require('dotenv').config()

app.use(require('cors')());
app.use(bodyParser.json())
if (env === 'development') {
  app.use(morgan('short'))
}

app.get('/', (req, res) => {
  res.send({
    message: "OK from proxy 2"
  })
})

app.post('/translate', (req, res) => {
  let text = req.body.text
  let toLangs = []
  let merged = []

  for (el of ['de', 'es', 'it', 'sr']) {
    if (req.body.hasOwnProperty(el)) {
      toLangs.push(el);
    }
  }

  async.eachSeries(toLangs, function(el, callback) {
    let tr_url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.APIKEY}&text=${text}&lang=en-${el}`
    axios.get(tr_url)
      .then((response) => {
        merged.push({
          to: el,
          text: text,
          result: response.data
        });
        callback(null);
      })
  }, function(err, result) {
      if (err) res.send(err)
      res.send(merged)
  });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})