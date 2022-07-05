import express from "express";
import path from "path";
import { readJsonfile } from "../jsonfile";
import type { Request, Response } from "express";
import { User } from "../models";

const USER_JSON_PATH = path.join(__dirname, "..", "data", "user.json");
export const userRoutes = express.Router();

// method: POST, path pattern: /login
userRoutes.post("/login", login);

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  const users = await readJsonfile<User>(USER_JSON_PATH);
  const foundUser = users.find((user) => user.username === username && user.password === password);
  if (!foundUser) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  req.session["user"] = { username: foundUser.username };
  res.json({ success: true });
}
