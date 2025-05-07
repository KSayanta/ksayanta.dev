import express from "express";
import { recipeCtrl } from "../controllers/recipeController.js";
import { memeCtrl } from "../controllers/memeController.js";

export const apiRouter = express.Router();

apiRouter.get("/meme", memeCtrl);

apiRouter.post("/recipe", recipeCtrl);
