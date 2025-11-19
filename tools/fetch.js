import { writeFileSync } from "fs";

const URL = "https://osu.ppy.sh/api/v2/seasonal-backgrounds";
const OUT_FILE = "current_seasonal.json";

const res = await fetch(URL);
const data = await res.text();

writeFileSync(OUT_FILE, data);
