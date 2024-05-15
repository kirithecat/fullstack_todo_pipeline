import express from "express";
import https from "https";
import {readFileSync} from "node:fs";
import {isAuthorised} from "./middleware/auth.js";
import {items} from "./routes/items.js"
import {reset} from "./routes/reset.js"

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
app.use(items)
app.use(reset)

//--------------------------------
//------server start--------------
//--------------------------------
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`Example app listening on port ${httpsPort}`)
})