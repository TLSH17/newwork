# Server

Using express and express-session to set up the server in TS

syntax:

```ts
import express from "express";
import expressSession from "express-session";

const app = express();

app.use(
  expressSession({
    secret: "Alex is handsome",
    resave: true,
    saveUninitialized: true,
  })
);

//middleware
app.use((req, res, next) => {});

app.get("", (req, res, next) => {});

app.use(express.static(path.join(__dirname, "public")));
// 導入網站所需的file夾

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});
//如上面所有middleware或指示都沒有，即無法找到對應頁或功能，傳回404

// set up the host port as 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});
```

---

## Read and Writing Jsonfile

當 client side or server side 傳回資料時，都是以 object 為主，當中包括大量資訊，但在網絡傳輸上，無法發送 object，因為 object 是一種暫存記憶體，我們需要進行 Serialization & Deserialization，將 object 與 Json string 之間兩者轉換，才能透過網絡傳送及接收。

基本簡單的文字，json，jsonfile 的 read write 可以使用 npm jsonfile

> npm i jsonfile

```ts
import jsonfile from "jsonfile";

export function readJsonfile<T>(filepath: string) {
  return jsonfile.readFile(filepath) as Promise<Array<T>>;
}

export function writeJsonFile(filepath: string, data: Array<any>) {
  return jsonfile.writeFile(filepath, data, { spaces: 2 });
}
//or
export async function readJsonfile(filepath: string) {
  const data = await jsonfile.readFile(filepath);
  return data;
}

export async function writeJsonFile(filepath: string) {
  const data = await jsonfile.writeFile(filepath);
  return data;
}
```

> express.json()

---

## Form Submition

主要分 2 種：一是不包含 file 的 form；二是包含 file 的 form。
兩者有不同的寫法

- No file -> `URLEncoded`

**FE**

```html
<form action="xxx" method="post">...</form>
<!-- or -->
<form id="XXX"></form>
```

```js
window.onload = () => {
  initPostMemoForm();
};

function initPostMemoForm() {
  document
    .querySelector("#form-post-memo")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData();
      formData.append("content", form.content.value);
      formData.append("image", form.image.files[0]);
      const resp = await fetch("/memos", {
        method: "POST",
        body: formData,
      });
      const result = await resp.json();
      if (result.success) {
        alert("Success !!!");
        form.reset();
        loadMemos();
      } else {
        alert(result.message);
      }
    });
}
```

**BE**

```ts
import express from 'express'

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('xxx'()=>{
  console.log(req.body) // will log the dataform of object
})
```

- With file -> Multi

**FE**

```html
<form action="" method="" enctype="multipart/form-data"></form>
```

**BE**

> npm install formidable @types/formidable

```ts
// import the package
import formidable from "formidable";
// due to using the call back function, not only using the express.use , we need to import the type for req,res and next
import type { Request, Response, NextFunction } from "express";

// declare the interface class to get the form data by express
declare global {
  namespace Express {
    interface Request {
      form?: {
        // ? is for maybe have or not
        fields: Fields;
        files: Files;
      };
    }
  }
}

//////////////////////////
// set up for upload files
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
//////////////////////////

const app = express();

const formidableMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files });
    if (err) {
      console.error(err);
      res.redirect("/500.html");
      return;
    }

    // req.form = { fields, files };
    req.form.fields = fields;
    req.form.files = files;
    next();
  });
};
```

> OUTPUT TO JSON FILE TO SAVE DATA

```TS
app.post("/memos", formidableMiddleware, async (req, res) => {
  const form = req.form!; // must have form data
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
});
```
