import express from "express";
import { env } from "./env.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ message: "hi"});
});

app.post("/api/auth/register", async (req, res) => {
  const {username, password} = req.body;

  if (typeof username !== "string" || !username.trim()) {
    return res
      .status(400)
      .send({error: "Username is required."});
  }

  if (typeof password !== "string" || !password.trim()) {
    return res
      .status(400)
      .send({error: "Password is required."});
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 8) {
    return res
      .status(400)
      .send({error: "Username must be at least 8 characters long."});
  }

  if (trimmedUsername.length > 30) {
    return res
      .status(400)
      .send({error: "Username cannot exceed 30 characters."});
  }

  if (password.length < 12) {
    return res
      .status(400)
      .send({error: "Password must be at least 12 characters long."});
  }

  if (password.length > 100) {
    return res
      .status(400)
      .send({error: "Password cannot exceed 100 characters."});
  }

  const usernameRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/;

  if (!usernameRegex.test(trimmedUsername)) {
    return res.status(400).send({
      error: "Username must contain at least one lowercase letter and one " + 
        "number, with no uppercase letters or special characters."
    });
  }
});



app.listen(env.PORT, () => {
  console.log(`Server running on PORT ${env.PORT}`);
});