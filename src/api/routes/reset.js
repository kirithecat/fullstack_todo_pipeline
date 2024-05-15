import express from "express";
export const reset = express.Router();
import {resetDefaultItems, resetItems} from "../db.js";

reset.post('/items/reset/default', (req, res) => {
  resetItems()
  resetDefaultItems()
  res.send()
})

reset.post('/items/reset', (req, res) => {
  resetItems()
  res.send()
})