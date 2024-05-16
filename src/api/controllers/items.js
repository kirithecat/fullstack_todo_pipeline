import {addItem, deleteItem, getItem, getItems, updateItem} from "../db.js";
import {weatherifyItem} from "../helpers/weather.js";

export const getItemsController = {
  get: (req, res) => {
    const items = getItems()
    res.status(200).json(items);
  }
};

export const createItemController = {
  post: async (req, res) => {
    const weatheredItem = await weatherifyItem(req.body.item)
    res.send(addItem(weatheredItem))
  }
};

export const getItemController = {
  get: (req, res) => {
    res.send(getItem(req.params.index))
  }
};

export const deleteItemController = {
  delete: (req, res) => {
    deleteItem(req.params.index)
    res.send()
  }
};

export const updateItemController = {
  update: (req, res) => {
    updateItem(req.params.index, req.body.item)
    //todo is this 204, 201??
    res.send()
  }
};