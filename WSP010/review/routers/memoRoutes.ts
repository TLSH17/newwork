import express from "express";
import path from "path";
import type { Request, Response } from "express";
import { readJsonfile, writeJsonFile } from "../jsonfile";
import { formidableMiddleware } from "../formidable";
import { isLoggedInMiddleware } from "../guard";
import dotenv from "dotenv";
import { client } from "../excel";

dotenv.config(); // .env in your starting folder

interface Memo {
  content: string;
  id: number;
}

const MEMO_JSON_PATH = path.join(__dirname, "..", "data", "memo.json");
const LIKE_JSON_PATH = path.join(__dirname, "..", "data", "like_memo.json");
export const memoRoutes = express.Router();

// define route handlers
// method: POST, path pattern: /memos
memoRoutes.post("/", formidableMiddleware, createMemo);

// method: GET, path pattern: /memos
memoRoutes.get("/", getAllMemo);

// method: PUT, path pattern: /memos/:id <- params
memoRoutes.put("/:id", editMemo);

// method: DELETE, path pattern: /memos/:id <- params
memoRoutes.delete("/:id", deleteMemo);

// method: GET, path: /memos/likes?uid=xxx
memoRoutes.get("/likes", isLoggedInMiddleware, getLikeMemos);

async function createMemo(req: Request, res: Response) {

  // await client.connect();

  const form = req.form!;
  const content = form.fields.content as string | undefined;
  // const image = form.files.image?.["newFilename"];
  if (!content) {
    res.status(400).json({ success: false, message: "missing content" });
    return;
  }

  const clientResult = `INSERT INTO memos (content) VALUES ($1)`;
  await client.query(clientResult, [content])
  res.json({ success: true });
}

async function getAllMemo(req: Request, res: Response) {
  // client.connect();
  // const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  const memos = await client.query('SELECT * FROM memos;')
  // console.log(memos.rows)
  // await client.end();
  res.json(memos.rows);
}

async function editMemo(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10); // abc hello
  const content = req.body.content;

  if (isNaN(id) || !content) {
    res.status(400).json({ success: false, message: "invalid request" });
    return;
  }

  const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  const foundMemo = memos.find((memo) => memo.id === id);
  if (!foundMemo) {
    res.status(400).json({ success: false, message: "memo not found" });
    return;
  }

  foundMemo.content = content;
  await writeJsonFile(MEMO_JSON_PATH, memos);
  res.json({ success: true });
}

async function deleteMemo(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ success: false, message: "invalid request" });
    return;
  }

  const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  const newMemos = memos.filter((memo) => memo.id !== id);
  await writeJsonFile(MEMO_JSON_PATH, newMemos);
  res.json({ success: true });
}

async function getLikeMemos(req: Request, res: Response) {
  const userId = parseInt(req.query.uid as string, 10);
  if (isNaN(userId)) {
    res.json({ memos: [] });
    return;
  }

  const likeMemos = await readJsonfile<{ user_id: number; memo_id: number }>(LIKE_JSON_PATH);
  const filterLikeMemo = likeMemos.filter((likeMemo) => likeMemo.user_id === userId);
  const memoMap = (await readJsonfile<Memo>(MEMO_JSON_PATH)).reduce(
    (acc, cur) => acc.set(cur.id, cur),
    new Map<number, Memo>()
  );

  const result = {
    user_id: userId,
    memos: filterLikeMemo.map((filterMemo) => memoMap.get(filterMemo.memo_id)),
  };

  res.json(result);
}

