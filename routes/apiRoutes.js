import express from "express";
import { recipeCtrl } from "../controllers/recipeController.js";
import { getMeme, randMeme } from "../controllers/memeController.js";

export const apiRouter = express.Router();

apiRouter.get("/meme", getMeme);
apiRouter.get("/rand_meme", randMeme);

apiRouter.post("/recipe", recipeCtrl);
