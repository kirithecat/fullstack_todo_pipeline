import {resetDefaultItems, resetItems} from "../db.js";

export const resetDefaultItemsController = {
  reset: (req, res) => {
    resetItems()
    resetDefaultItems()
    res.send()
  }
};

export const resetItemsController = {
  reset: (req, res) => {
    resetItems()
    res.send()
  }
};
