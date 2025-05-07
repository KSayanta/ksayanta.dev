import express from "express";
import "dotenv/config";
import cors from "cors";
import { apiRouter } from "./routes/apiRoutes.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use((req, res) => {
  console.log(`Incoming Connection from: ${req.ip}`);
  res.status(404).send("Page does not exist");
});

app.listen(PORT, (err) => {
  if (err) console.error(err.message);

  console.log(`server connected at ${PORT}`);
});
