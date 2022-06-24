import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import expressSession from "express-session";

const app = express();

app.use(
  expressSession({
    secret: "Jason is Handsome",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log("middleware 1");
  console.log(`method: ${req.method} path: ${req.path} ip: ${req.ip}`);
  next();
});

app.get("/name", (req, res) => {
  const name = req.session["name"];
  if (!name) {
    req.session["name"] = "Jason";
    res.send("No Name !!!");
    return;
  }
  res.send(name);
});

app.use((req, res, next) => {
  console.log("middleware 2");
  next();
});

// HTTP Method
// Path Pattern
app.get(
  "/",
  (req, res, next) => {
    console.log("middleware 3");
    next();
  },
  (req, res) => {
    res.send("Hello, World");
  }
);

const jasonHandler = (req: Request, res: Response) => {
  res.send("Hello, World, Jason");
};
const jasonMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("jason middleware");
  next();
};
app.get("/jason", jasonMiddleware, jasonHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});