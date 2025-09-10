import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";

const KEY = process.env.API_KEY_GENAI;

export async function getFromGenAI(ingredientsList) {
  const ai = new GoogleGenAI({ vertexai: false, apiKey: KEY });
  const ingredientsString = ingredientsList.join(", ");
  const systemPrompt = `
    You are an assistant that receives a list of ingredients that a user has and 
    suggests a recipe they could make with some or all of those ingredients.
    You don't need to use every ingredient they mention in your recipe.
    The recipe can include additional ingredients they didn't mention,
    but try not to include too many extra ingredients. Make sure encourage the user at the end.
    Format your response in markdown to make it easier to render to a web page.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 1024,
      },
      contents: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
    });

    return response.text;
  } catch (error) {
    console.error(error.message);
  }
}
