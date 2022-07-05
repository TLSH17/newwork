import express from "express";
import path from "path";
import expressSession from "express-session";
// import type { Request, Response, NextFunction } from "express";

import { memoRoutes } from "./routers/memoRoutes";
import { userRoutes } from "./routers/userRoutes";
import { isLoggedInMiddleware } from "./guard"
import { client } from "./excel";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

client.connect();

app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});

// Route Handlers
app.use("/memos", memoRoutes);
app.use("/login", userRoutes);
app.use(userRoutes);

// export const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.session["user"]) {
//     console.log("isLoggedInMiddleware - fail");
//     res.redirect("/");
//     return;
//   }
//   next();
// };

app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use(isLoggedInMiddleware, express.static(path.join(__dirname, "private")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
