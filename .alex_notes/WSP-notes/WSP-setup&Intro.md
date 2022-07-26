# 關於 wsp 第一課

## 安裝 npm

> npm 主要分開三種安裝路徑

1. npm install
   一般安裝方法，通用於整個 pj
2. npm install node-fetch
3. npm install -div
   安裝於獨立 file，local 化
4. sudo npm install --global forever
   安裝用於全域性，例如 debug 工具等

各種安裝有影響，例如當一個網站要上線時，將無用的 package 上載會使成本大增，global 是本機內使用，而 local 安裝於 file 中的會上載到網上給 user。

## 使用 TS 流程

1. open file/dir/pj localtion
2. <b>npm init</b>
3. <b>npm istall node-fetch</b>
   (npm install node-fetch / npm install -D jest / sudo npm install --global forever)
4. create a file called <b>.gitignore</b> , and put this line in the file : <b>node_modules package-lock.json</b>
5. <b>npm install ts-node typescript @types/node</b>
   5.1 For Server:

   > npm install express
   > npm install -D @types/express

   ```ts
   import express from "express";
   ...
   const app = express();
   ...
   const PORT = 8080;
   app.listen(PORT, () => {
   console.log(`listening to PORT: ${PORT}`);
   });
   ```

   5.2 For Server Dev mode
   npm install -D ts-node-dev

   ```json
   // add in package.json
   "scripts": {
    "start": "ts-node-dev main.ts",
    "test": "tsc -p . --noEmit"
   },
   // commandLine use npm start
   ```

   5.3 Server Session
   npm install express-session
   npm install -D @types/express-session

   ```ts
   import expression from "express-session";
   ...
   app.use( // app is const by express, not specify function name
     expressSession({
       secret: "Alex is handsome",
       resave: true,
       saveUninitialized: true,
     })
   );
   ```

   5.4  
    npm install jsonfile @types/jsonfile

   jsonfile supports writeFile and readFile for the .json file. In order to write the changes permanently to the json file such that our changes to the data are preserved even after reloading the express application. You can do something similar to the following.

   ```ts
   const users = await jsonfile.readFile(path.join(__dirname, "users.json"));
   users.push({
     username: "peter",
     password: "peter",
     level: "user",
   });
   await jsonfile.writeFile(path.join(__dirname, "users.json"), users, {
     spaces: 2,
   });
   ```

   5.5 Foridable
   npm install formidable @types/formidable

   ```ts
   import formidable from "formidable";

   const uploadDir = "uploads";
   fs.mkdirSync(uploadDir, { recursive: true });

   const form = formidable({
     uploadDir,
     keepExtensions: true,
     maxFiles: 1,
     maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
     filter: (part) => part.mimetype?.startsWith("image/") || false,
   });

   const app = express();

   app.post("/contact", (req, res) => {
     form.parse(req, (err, fields, files) => {
       console.log({ err, fields, files });
       res.redirect("/");
     });
   });
   ```

6. create a file called <b>tsconfig.json</b> as the <b>root</b> of your project, and put the following code in to tsconfig.json:

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

7. .prettierrc

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

8. .gitignore

```json
node_modules
.prettierrc
package-lock.json
.DS_Store
```

9. Running TS

> with index.js

In th index.js, put the following lines:

```js
require("ts-node/register");
require("./main");
```

command line:
<b>node index.js</b>

> with NPM Scripts

goto package.jason, in the scripts object:

```js
"scripts": {
    "start": "ts-node main.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

command line:
<b>npm run start / npm start</b>

> with npx

command line:
<b>npx ts-node app.ts</b>

---

## Modules 補丁 for project

### I. Typescript Modules

There are modules that support typescript by default. For these kind of packages, you can easily install them and import it using the import syntax instead of require

For example, axios is a package that supports typescript module by default:

> npm install axios

```js
import axios from 'axios'

axios.get(...)
//The syntax import axios from 'axios' is similar(but not the same) to the syntax const axios = require('axios')
```

### II. DefinitelyTyped Javascript Module

Some Javascript modules have their type provided by a project called DefinitelyTyped. For these kind of packages, you have to install the package itself and the @types package of it to provide the typing for that package.

For example, express is a package that supports its typing by the extra @types/express package:

> npm install express @types/express

```js
// Import Express package as the variable Express
import Express from "express";
// or import * as Express from 'express';

Express();
```

### III. Plain Javascript Module

For Javascript Modules that have no typing provided , we are going to reuse the require function to import the package.

```js
// For old style module.exports
const module = require("some-packages");

// For new style export.default
const module = require("some-packages").default;
```
