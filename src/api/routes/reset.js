import express from "express";
import {resetDefaultItemsController, resetItemsController} from "../controllers/reset.js";

export const reset = express.Router();

reset.post('/items/reset/default', resetDefaultItemsController.reset)
reset.post('/items/reset', resetItemsController.reset)