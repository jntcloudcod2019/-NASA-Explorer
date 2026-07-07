import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { router } from "./routes.js";

const app = express();
app.use(cors());
app.use("/api", router);

app.listen(config.port, () => {
  console.log(`[api] NASA Explorer API rodando em http://localhost:${config.port}`);
});
