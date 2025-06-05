import { vans } from "../utils/data";

export function getVans(_, res) {
  res.json(vans);
}

export function getVanById(req, res) {
  const { id } = req.params;
  res.json(vans.find((elm) => elm.id === id));
}
