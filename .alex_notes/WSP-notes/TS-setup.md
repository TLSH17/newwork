# TS set up

npm init

npm install ts-node typescript @types/node

npm install node-fetch

---

Addon:

> For Server

npm install express
npm install -D @types/express

> For Server Session

npm install express-session
npm install -D @types/express-session

> For Server Dev

npm install -D ts-node-dev

```json
// add in package.json
   "scripts": {
    "start": "ts-node-dev main.ts",
    "test": "echo \"Error: no test specified\" && exit 1 tsc -p . --noEmit"
   },
   // commandLine use npm start
```

> For File

npm install jsonfile @types/jsonfile

> For axios

npm install axios

> For formidable

npm install formidable @types/formidable

---

> tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "build", "scripts", "index.js"]
}
```

> .prettierrc

```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  "overrides": [
    {
      "files": ["*.ts", "*.js"],
      "options": {
        "semi": true,
        "tabWidth": 2,
        "singleQuote": false,
        "printWidth": 100
      }
    }
  ]
}
```

> .gitignore

```json
node_modules
.prettierrc
package-lock.json
.DS_Store
.env
```

> index.js

```js
require("ts-node/register");
require("./main");
```

---

## SQL

> npm install pg @types/pg dotenv

```ts
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

async function main() {
  await client.connect();

  await client.end();
}
main();
```

> .env

```
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

## xlsx

> npm install xlsx

## Socket.io

> npm install socket.io

**BE**

```ts
import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";

//....
const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", function (socket) {
  console.log(socket);
});
//....
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
// Please note that it is server.listen not app.listen
// import {server} from 'socket.io'
```

**FE**

IN HTML:

```html
<script src="/socket.io/socket.io.js"></script>
```

In javascript(client side):

```js
const socket = io.connect();
```
