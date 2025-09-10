import seasonal from "../utils/seasonal";
const URL = "https://osu.ppy.sh/api/v2/seasonal-backgrounds";

export async function getSeasonal(_, res) {
  res.json(seasonal);
}

export async function getSeasonalPage(req, res) {
  const { page } = req.params;
  if (page < 1 || page > seasonal.length) {
    res.status(400).json({ response: false, message: "Invalid page" });
  } else {
    res.json(seasonal[page - 1]);
  }
}

export async function getCurrentSeasonal(_, res) {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw {
        message: "API not reachable",
      };
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ response: false, message: err.message });
  }
}
