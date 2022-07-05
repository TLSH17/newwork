import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import type { Fields, Files } from "formidable";
import { readJsonfile } from "./jsonfile";
import { User } from "./models";
import expressSession from "express-session";
import { memoRoutes } from './memoRoutes'; //

export const MEMO_JSON_PATH = path.join(__dirname, "data", "memo.json");
const USER_JSON_PATH = path.join(__dirname, "data", "user.json");

const app = express();
app.use(express.urlencoded({ extended: true }));


app.use('/memos', memoRoutes); //

app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

declare global {
  namespace Express {
    interface Request {
      form?: {
        fields: Fields;
        files: Files;
      };
    }
  }
}

app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});


// method: POST, path pattern: /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect("/");
    return;
  }

  const users = await readJsonfile<User>(USER_JSON_PATH);
  const foundUser = users.find((user) => user.username === username && user.password === password);
  if (!foundUser) {
    res.redirect("/");
    return;
  }

  req.session["user"] = { username: foundUser.username };
  res.redirect("/admin.html");
});

const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session["user"]) {
    console.log("isLoggedInMiddleware - fail");
    res.redirect("/");
    return;
  }
  next();
};


app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use(isLoggedInMiddleware, express.static(path.join(__dirname, "private")));

app.use((req, res) => {
  // localhost:8080/404.html
  // 192.168.1.135:8080/404.html
  // res.redirect("/404.html");
  res.sendFile(path.join(__dirname, "public", "404.html"));
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
