import express from "express";
import {
  getItemsController,
  createItemController,
  getItemController,
  deleteItemController,
  updateItemController
} from "../controllers/items.js";

export const items = express.Router();

items.get('/items/', getItemsController.get);
items.post('/items/', createItemController.post)
items.get('/items/:index', getItemController.get)
items.delete('/items/:index', deleteItemController.delete)
items.patch('/items/:index', updateItemController.update)