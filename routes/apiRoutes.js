import express from "express";
import { recipeCtrl } from "../controllers/recipeController.js";

export const apiRouter = express.Router();

apiRouter.post("/recipe", recipeCtrl);
