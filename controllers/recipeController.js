import { getFromGenAI } from "../utils/ai.js";

export async function recipeCtrl(req, res) {
  const { ingredients } = req.body;
  const strIng = await getFromGenAI(ingredients);
  res.json({ recipe: strIng });
}
