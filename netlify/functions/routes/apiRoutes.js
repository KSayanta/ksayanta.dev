import express from "express";
import { hello } from "../controllers/helloWorld.js";
import { recipeCtrl } from "../controllers/recipeController.js";
import { getMeme, randMeme } from "../controllers/memeController.js";
import { randWord } from "../controllers/wordController.js";
import { omdbCtrl } from "../controllers/movieController.js";
import { getVanById, getVans } from "../controllers/vanController.js";

export const apiRouter = express.Router();

apiRouter.get("/", hello);
apiRouter.get("/meme", getMeme);
apiRouter.get("/rand_meme", randMeme);
apiRouter.get("/rand_word", randWord);
apiRouter.get("/movie", omdbCtrl);
apiRouter.get("/vans", getVans);
apiRouter.get("/vans/:id", getVanById);

apiRouter.post("/recipe", recipeCtrl);
