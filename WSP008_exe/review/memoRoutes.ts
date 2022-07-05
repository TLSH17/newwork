
import express from 'express';
import type { Request, Response, NextFunction } from "express";
import { readJsonfile, writeJsonFile } from "./jsonfile";
import { MEMO_JSON_PATH } from './server';
import { Memo } from './models';
import formidable from "formidable";
import fs from "fs";

export const memoRoutes = express.Router();

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: (part) => part.mimetype?.startsWith("image/") || false,
});




export const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

memoRoutes.get('/', getMemos);
memoRoutes.post('/', formidableMiddleware, postMiddle);

export async function getMemos(req: Request, res: Response, next: NextFunction) {
    const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
    res.json(memos);

}


export async function postMiddle(req: Request, res: Response, next: NextFunction) {
    /*your get Memos logic here*/
    const form = req.form!;
    const content = form.fields.content as string | undefined;
    const image = form.files.image?.["newFilename"];
    if (!content) {
        res.status(400).json({ success: false, message: "missing content" });
        return;
    }

    const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
    memos.push({ content, image });
    await writeJsonFile(MEMO_JSON_PATH, memos);
    // res.status(201)
    res.json({ success: true });
}