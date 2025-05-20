import express from "express";
import { hello } from "../controllers/helloWorld.js";
import { recipeCtrl } from "../controllers/recipeController.js";
import { getMeme, randMeme } from "../controllers/memeController.js";
import { randWord } from "../controllers/wordController.js";
import { omdbCtrl } from "../controllers/movieController.js";

export const apiRouter = express.Router();

apiRouter.get("/", hello);
apiRouter.get("/meme", getMeme);
apiRouter.get("/rand_meme", randMeme);
apiRouter.get("/rand_word", randWord);
apiRouter.get("/movie", omdbCtrl);

apiRouter.post("/recipe", recipeCtrl);
