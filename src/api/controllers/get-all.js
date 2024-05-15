import {getItems} from "../db.js";

export const getAllController = {
  get: (req, res) => {
    const items = getItems()
    res.status(200).json(items);
  }
};
