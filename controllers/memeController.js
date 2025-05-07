const url = "https://api.imgflip.com/get_memes";

export async function memeCtrl(_, res) {
  const data = await fetch(url).then((res) => res.json());
  res.json(data);
}
