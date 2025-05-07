import express from "express";
import "dotenv/config";
import cors from "cors";
import { apiRouter } from "./routes/apiRoutes.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use((_, res) => {
  res.status(404).send("Page does not exist");
});

app.listen(PORT, () => {
  console.log(`server connected at ${PORT}`);
});
