import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import type { Fields, Files } from "formidable";
import { readJsonfile, writeJsonFile } from "./jsonfile";
import { Memo, User } from "./models";
import expressSession from "express-session";

const MEMO_JSON_PATH = path.join(__dirname, "data", "memo.json");
const USER_JSON_PATH = path.join(__dirname, "data", "user.json");

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });




const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) =>
    part.mimetype?.startsWith("image/") || part.mimetype?.startsWith("application/pdf") || false,
});

const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files });
    if (err) {
      console.error(err);
      res.redirect("/500.html");
      return;
    }

    req.form = { fields, files };
    next();
  });
};

app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});

// define route handlers
// method: POST, path pattern: /memos
app.post("/memos", formidableMiddleware, async (req, res) => {
  const content = req.form?.fields.content as string;
  const image = req.form?.files.image?.["newFilename"];
  const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  memos.push({ content, image });
  // let {} = req.body
  await writeJsonFile(MEMO_JSON_PATH, memos);

  let html_content = `<h1>User input is: ${content} Submission Completed</h1>`

  res.json(html_content);
  // res.redirect("/");
});



// method: GET, path pattern: /memos
app.get("/memos", async (req, res) => {
  const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  res.json(memos);
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
  console.log(foundUser);
  res.redirect("/admin.html");
});

const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session["user"]) {
    res.redirect("/");
    return;
  }
  next();
};
app.use(express.static(path.join(__dirname, "public")));
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
