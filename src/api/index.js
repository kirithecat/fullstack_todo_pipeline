import express from "express";
import https from "https";
import {readFileSync} from "node:fs";
import {items} from "./routes/items.js"
import {reset} from "./routes/reset.js"
import {middleware} from "./routes/middleware.js"

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
app.use(middleware)

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

export default app