const express = require('express')
const app = express()
const morgan = require('morgan')
const moment = require('moment')
const levelup = require('levelup')
const db = levelup('./mydb')
const env = app.get('env')
const PORT = process.env.PORT || 3001

app.use(require('cors')())
if (env === 'development') {
  app.use(morgan('short'))
}

app.get('/', (req, res) => {
  res.send({
    message: "OK from proxy 1"
  })
})

app.get('/now', (req, res) => {
  res.send({
    now: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  })
})

/**
 * Test level
 */
app.get('/set/:name', (req, res) => {
  let name = {
    [req.params.name] : [
      { value1: 'value-1'},
      { value2: 'value-2' }
    ]
  }
  db.put('name', JSON.stringify(name), (err) => {
    if (err) res.send(err);
    res.send({
      status: 'OK'
    })
  })
})

/**
 * Test level
 */
app.get('/get', (req, res) => {
  db.get('name', (err, value) => {
    if (err) res.send(err);

    res.send({
      value: JSON.parse(value)
    })
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})