const express = require('express')
const https = require('https')
const {readFileSync} = require("node:fs");
const {getItems, getItem} = require("./db");
const {isAuthorised} = require("./middleware/auth");
//TODO: explore swagger generation & jsdoc annotations (when doing contracts)
const app = express()
const httpsPort = 443

//using mkcert to generate key/certificate for localhost HTTPS
//- https://github.com/FiloSottile/mkcert
//- https://stackoverflow.com/a/54083405
//------------------------------------------------
//---IMPORTANT: mkcert installs local root CA!!!--
//------------------------------------------------
const httpsOptions = {
  key: readFileSync('./localhost/localhost+2-key.pem'),
  cert: readFileSync('./localhost/localhost+2.pem'),
  requestCert: false,
  rejectUnauthorized: false
};

//--------------------------------
//---------middleware-------------
//--------------------------------
app.route('/*').all((req, res, next) => {
  isAuthorised()
  next()
})

//--------------------------------
//----------routes----------------
//--------------------------------
app.get('/items/', (req, res) => {
  const items = getItems()
  res.send(items)
})

app.post('/items/', (req, res) => {
  res.send('added an item!')
})

app.get('/items/:index', (req, res) => {
  const items = getItem(req.params.index)

  res.send(items[0])
})

app.delete('/items/:index', (req, res) => {
  res.send(`deleted an item with an ${req.params.index} index`)
})

app.patch('/items/:index', (req, res) => {
  res.send(`updated an item with an ${req.params.index} index`)
})

app.post('/items/reset/default', (req, res) => {
  res.send('reseted items to default list!')
})

app.post('/items/reset', (req, res) => {
  res.send('reseted items!')
})


//--------------------------------
//------server start--------------
//--------------------------------
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`Example app listening on port ${httpsPort}`)
})