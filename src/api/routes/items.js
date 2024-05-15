import express from "express";
export const items = express.Router();
import {getAllController} from "../controllers/get-all.js";
import {weatherifyItem} from "../helpers/weather.js";
import {addItem, deleteItem, getItem, updateItem} from "../db.js";

items.get('/items/', getAllController.get);

items.post('/items/', async (req, res) => {
  const weatheredItem = await weatherifyItem(req.body.item)
  res.send(addItem(weatheredItem))
})

items.get('/items/:index', (req, res) => {
  res.send(getItem(req.params.index))
})

items.delete('/items/:index', (req, res) => {
  deleteItem(req.params.index)
  res.send()
})

items.patch('/items/:index', (req, res) => {
  updateItem(req.params.index, req.body.item)
  //todo is this 204, 201??
  res.send()
})