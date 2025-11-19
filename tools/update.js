import { readFile, writeFile } from "fs/promises";
import { seasonal } from "../netlify/functions/utils/seasonal.js";

const data = await readFile("current_seasonal.json", "utf8");
const jsonData = await JSON.parse(data);

seasonal.push(jsonData);

const template = `
export const seasonal = ${JSON.stringify(seasonal)}
`;

await writeFile("netlify/functions/utils/seasonal.js", template, "utf8");
