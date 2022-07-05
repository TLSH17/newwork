import express from "express";
// import path from "path";
// import { readJsonfile } from "../jsonfile";
import type { Request, Response } from "express";
import { User } from "../models";
import pg from "pg";



// const USER_JSON_PATH = path.join(__dirname, "..", "data", "user.json");
export const userRoutes = express.Router();

// method: POST, path pattern: /login
userRoutes.post("/login", login);

export async function login(req: Request, res: Response) {
  const client = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  await client.connect();

  const { username, password } = req.body;
  // console.log(username, password); <-input data

  if (!username || !password) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  // const users = await readJsonfile<User>(USER_JSON_PATH);
  const users = await client.query<User>("SELECT username,password FROM users")
  const urow = users.rows;

  for (let userinfo of urow) {
    // userinfo.username = username
    // userinfo.password = password
    // const foundUser = urow.find((user) => userinfo.username === username && userinfo.password === password);
    console.log("loop" + userinfo.username, userinfo.password);
    console.log(username, password);
    if ((userinfo.username === username && userinfo.password === password) === false) {
      res.status(400).json({ success: false, message: "invalid username/password" });
      console.log("Worng!!!!")
    }

    // res.json({ success: true });
    console.log('Welcome!!!');
    return;

  }





  // const userInfo = `INSERT INTO users (username,password) VALUES ($1,$2）`;

  // await client.query(userInfo, [username, password]);

  // req.session["user"] = { username: foundUser.username };
  // res.json({ success: true });
  // console.log("2nd" + username, password);
}
