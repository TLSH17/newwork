##Create MEMO 

準備工作：
- Install all npm (can set the start file ("ts-node-dev main.ts") to the package.json)  // main.ts is the server file
- Create folder:
    - jasonfile.ts (Optional - will us postgresql)
    - models.ts (create interface to define the types)
- Create a typescript repository. Setup an express application and listen to port 8080.
```ts
import express from 'express'
import { Request, Response } from 'express'

const app = express()

app.get('/', function (req: Request, res: Response, next) {
//   res.end('Hello World')
next();
})

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})
```


- Create a folder called public html,css,js and images files should be inside the folder.

- Connect to the public folder:
```ts
PORT 位後
app.use(express.static('public')) //
app.use(express.static(path.join(__dirname, 'public')))
```

- bootstrap or css to your page to make it prettier


##Middleware

###Session
A HTTP Session is the conversation between the HTTP Server and HTTP Client. Each HTTP Session is different from each other which each of them has a unique session ID. Normally, the Session ID is sent as part of the HTTP Request such that Server can recognize what session this current request belongs to. Therefore , HTTP Session is crucial for common features like login and logout.
類似cookies 可以set expiry time

```ts
import expressSession from 'express-session'

const app = express()

// Add this line
app.use(
  expressSession({
    secret: 'Tecky Academy teaches typescript', //內容無咩所謂
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    name?: string
  }
}

```


- Initialize a counter when our page is first accessed and store it to req.session. Increments the number for every requests. console.log the counter value for every request.

```ts
app.use("/", (req, res, next) => {
  // not yet have value
  const counter = req.session["counter"];
  if (!req.session["counter"]) {
    //swapping
    req.session["counter"] = 1;
  } else {
    req.session["counter"] += 1;
  }
  console.log(counter);
  //   console.log(req.session["counter"]);
  next();
});
```

- Add a 404.html using the catch-all middleware.
console.log all request to our static files using middlewares. The format should be like the following. 

```ts
放係port位後面
app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
});
//
app.use((req, res) => {
  // localhost:8080/404.html
  // 192.168.1.135:8080/404.html
  // res.redirect("/404.html"); 
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

```


###FN
For Form submissions
```html
<form action="/memos" method="post">
    <textarea name="XXX"> //比番ts 去認番
```

For file submissions
formidable
```ts
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true }); //create directory if not exists

const form = formidable({  //create form configuration
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {  
    //因為拆出黎寫，所以唔知係比app.use 黎用, so add 3 types(Request, Response, NextFunction)

  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files });
    if (err) {
      console.error(err);
      res.redirect("/500.html");
      return;
    }
    //success received files
    req.form = { fields, files }; //改request 內容
    next();
  });
};
```
由於本身沒有（req.form ） 所以要declare type
```ts
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
```
##jsonfile.ts (處理jsonfile)
未必需要用到，因為會用sql
```ts
import jsonfile from "jsonfile";

// export async function readJsonfile(filepath: string) {
//   const data = await jsonfile.readFile(filepath);
//   return data;
// }

export function readJsonfile<T>(filepath: string) {
  return jsonfile.readFile(filepath) as Promise<Array<T>>;
}

export function writeJsonFile(filepath: string, data: Array<any>) {
  return jsonfile.writeFile(filepath, data, { spaces: 2 });
}
```