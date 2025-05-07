const url = "https://api.imgflip.com/get_memes";

export async function getMeme(_, res) {
  const data = await fetch(url).then((res) => res.json());
  res.json(data);
}

export async function randMeme(_, res) {
  const data = await fetch(url).then((res) => res.json());
  const memeArr = data.data.memes;
  const meme = memeArr[Math.floor(memeArr.length * Math.random())];
  res.json(meme);
}
