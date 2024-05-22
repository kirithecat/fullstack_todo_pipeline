import * as db from "../db.js";
import {weatherifyItem} from "../helpers/weather.js";

export const getItemsController = {
  get: (req, res) => {
    const items = db.getItems()
    res.status(200).json(items);
  }
};

export const createItemController = {
  post: async (req, res) => {
    const weatheredItem = await weatherifyItem(req.body.item)
    res.send(db.addItem(weatheredItem))
  }
};

export const getItemController = {
  get: (req, res) => {
    res.send(db.getItem(req.params.index))
  }
};

export const deleteItemController = {
  delete: (req, res) => {
    db.deleteItem(req.params.index)
    res.send()
  }
};

export const updateItemController = {
  update: (req, res) => {
    db.updateItem(req.params.index, req.body.item)
    //todo is this 204, 201??
    res.send()
  }
};