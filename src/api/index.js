const express = require('express')
const https = require('https')
const {readFileSync} = require("node:fs");
const {getItems, getItem, addItem, deleteItem, updateItem, resetItems} = require("./db");
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
//parse request body as JSON
app.use(express.json())

//--------------------------------
//----------routes----------------
//--------------------------------
app.get('/items/', (req, res) => {
  res.send(getItems())
})

app.post('/items/', (req, res) => {
  res.send(addItem(req.body.item))
})

app.get('/items/:index', (req, res) => {
  res.send(getItem(req.params.index))
})

app.delete('/items/:index', (req, res) => {
  deleteItem(req.params.index)
  res.send()
})

app.patch('/items/:index', (req, res) => {
  updateItem(req.params.index, req.body.item)
  //todo is this 204, 201??
  res.send()
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