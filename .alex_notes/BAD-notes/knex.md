SET up knex
```
yarn add pg @types/pg knex @types/knex
yarn knex init -x ts
```
Will auto create the "knexfile.ts"

```
yarn add knex  pg @types/pg
```

Copy below and replace in the development
```ts
import dotenv from 'dotenv';
dotenv.config();

//module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
```

Create another ts (eg app.ts)
Example:

```ts
import Knex from 'knex';
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development" || process.env.NODE_ENV]);

async function main() {
    const staff = await knex.select("*").from("staff").where("id", ">", "0"); // Query Builder
    console.log(staff);

    //disconnect from the db
    knex.destroy();
}

main();
```

##Migration
```
yarn knex migrate:make {filename}
```

CODE:
```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {}

export async function down(knex: Knex): Promise<void> {}
```

forward direction of migrate
```
yarn knex migrate:latest
```
backward direction of migrate
```
yarn knex migrate:down
```

##Rolling Back migration

```
yarn knex migrate:rollback
```

##Knex Seed
Seeding is the process of providing initial data to the application.

gen a seed file
```
yarn knex seed:make -x ts create-teachers-and-students
```
Run
```
yarn knex seed:run
```

No rolling back!
