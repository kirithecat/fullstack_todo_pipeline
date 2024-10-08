import express from "express";
import {isAuthorised} from "../middleware/auth.js";
export const middleware = express.Router();

//TODO this is not safe
// Enable CORS for all routes
middleware.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with the origin of your frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //res.setHeader('Content-Type', 'application/json');
  next();
});

//TODO: check if a user authorised
// it is a WIP, implementation is currently does nothing!
middleware.route('/*').all((req, res, next) => {
  isAuthorised()
  next()
})

middleware.route('/*').all((req, res, next) => {
  //todo remove me!?
  console.log('I am a global middleware. My job is to spam to console!:)')
  next()
})


//parse request body as JSON
middleware.use(express.json())