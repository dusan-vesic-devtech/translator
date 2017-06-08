const express = require('express')
const app = express()
const morgan = require('morgan')
var proxy = require('express-http-proxy');
require('dotenv').config()

const env = app.get('env')
const PORT = process.env.PORT || 3000

app.use('/server-1', proxy(`${process.env.HOST}:3001`, {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    return proxyReqOpts;
  }
}));

app.use('/server-2', proxy(`${process.env.HOST}:3002`));

if (env === 'development') {
  app.use(morgan('short'))
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})