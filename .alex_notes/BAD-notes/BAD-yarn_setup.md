# yarn

> sudo npm install -g yarn

在 project file 使用流程：

1. open file repo
2. yarn init -y
3. yarn add node-fetch
4. yarn add --dev jest
5. yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev dotenv
6. yarn ts-jest config:init
7. yarn add libraries
   7.1 yarn add knex pg @types/pg
   7.1.1 yarn knex init -x ts

   ```ts
    development: {
      debug: true ,
      client: "postgresql",
      connection: {
        database: "my_db",
        user: "username",
        password: "password"
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: "knex_migrations"
      }
    }
   ```

8. .gitignore

```json
node_modules
.prettierrc
package-lock.json
.DS_Store
.env
*.session.sql
```

9. .prettierrc

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

10. tsconfig.json

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

11. .env

```json
DB_NAME=test
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

12. running TS

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
    "start":"ts-node main.ts",
    "dev":"ts-node-dev main.ts",
    "test": "jest"
}
```

command line:
<b>npm run start / npm start</b>

> with npx

command line:
<b>npx ts-node app.ts</b>

---

## yarn commands

1. yarn init
2. yarn install
3. yarn link
4. yarn add
5. yarn add -dev
6. yarn -g add
7. yarn build
8. yarn start
9. yarn dev
10. yarn remoe
