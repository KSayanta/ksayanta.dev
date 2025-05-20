import "dotenv/config";
const url = "http://www.omdbapi.com";
const key = process.env.API_KEY_OMDB;

export async function omdbCtrl(req, res) {
  const { s: string, i: id } = req.query;
  let query = `${url}/?apikey=${key}`;

  if (string) {
    query = query.concat(`&s=${string}`);
  }

  if (id) {
    query = query.concat(`&i=${id}`);
  }

  const json = await fetch(query).then((res) => res.json());
  res.json(json);
}
