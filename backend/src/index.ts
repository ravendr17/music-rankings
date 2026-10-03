import express from "express";
import { env } from "./env.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ message: "hi"});
});

app.listen(env.PORT, () => {
  console.log(`Server running on PORT ${env.PORT}`);
});