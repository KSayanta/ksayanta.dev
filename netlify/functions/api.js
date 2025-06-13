import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { apiRouter } from "./routes/apiRoutes.js";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use("/api/", apiRouter);

app.use((req, res) => {
  console.log(`Incoming Connection from: ${req.ip}`);
  res.status(404).json({
    message: "Endpoint not found. Please check the API documentation.",
  });
});

export const handler = serverless(app);
