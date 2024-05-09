import express from "express";
import https from "https";
import {readFileSync} from "node:fs";
import {addItem, deleteItem, getItems, updateItem, resetDefaultItems, resetItems, getItem} from "./db.js";
import {isAuthorised} from "./middleware/auth.js";
import {weatherifyItem} from "./helpers/weather.js";

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

//TODO this is not safe
// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the origin of your frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

app.post('/items/', async (req, res) => {
  const weatheredItem = await weatherifyItem(req.body.item)
  res.send(addItem(weatheredItem))
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
  resetItems()
  resetDefaultItems()
  res.send()
})

app.post('/items/reset', (req, res) => {
  resetItems()
  res.send()
})


//--------------------------------
//------server start--------------
//--------------------------------
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`Example app listening on port ${httpsPort}`)
})