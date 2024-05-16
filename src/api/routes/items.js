import express from "express";
import {
  getItemsController,
  createItemController,
  getItemController,
  deleteItemController,
  updateItemController
} from "../controllers/items.js";

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

items.get('/items/', getItemsController.get);
items.post('/items/', createItemController.post)
items.get('/items/:index', getItemController.get)
items.delete('/items/:index', deleteItemController.delete)
items.patch('/items/:index', updateItemController.update)