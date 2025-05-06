import express from "express";
import "dotenv/config";
import { getFromGenAI } from "./ai.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.post("/api", async (req, res) => {
  const { ingredients } = req.body;
  const strIng = await getFromGenAI(ingredients);

  res.json({ recipe: strIng });
});

app.listen(PORT, () => {
  console.log(`server connected at ${PORT}`);
});
