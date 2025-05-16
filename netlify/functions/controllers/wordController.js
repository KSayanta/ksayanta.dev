import { words } from "../utils/data";

export function randWord(_, res) {
  const idx = Math.floor(Math.random() * words.length);
  const word = words[idx];
  res.json({ id: idx, word: word });
}
