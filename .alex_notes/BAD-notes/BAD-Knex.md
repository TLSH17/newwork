# Knex

一款幫助使用 database Sql 的 library, 市面上有其他 library，這只是其中一款。

其語法接近現時已學習的 query，但在外工作環境不一定使用這種語法，需要學習更多 orm

## yarn add

> yarn add knex pg @types/pg

it will init the knex and generate the knexfile.js automatically.

but we need ts not js

so we need to use the follow cmd

> yarn knex init -x ts

然後將會有一個名為 knexfile.ts 入面是指引 knex 如何進入 db 的各種環境設置，可以自行修改：

### knexfile.ts

```ts
// 常用例子，須要import dotenv
import dotenv from "dotenv";
dotenv.config()
...
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  }
```

### main.ts

```ts
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();
// 注意，config() 將會自動尋找相同層位file的config file. config file不在同一層
// 可使用dotenv.config({path: path.join(__dirname, "..."})

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig["development" || process.env.NODE_ENV]);
```

## KNEX 語法

knex 語法類似但不一樣於之前使用的 sql

例如 insert query ：

原版：

```sql
INSERT INTO teachers (name,date_of_birth) VALUES ('Ken','1962-01-02'),('Ben','1971-01-02') RETURNING id;
```

KNEX:

> 統一風格使用 knex('tableName').insert/select/...

```ts
const ids = await knex("teachers")
  .insert([
    {
      name: "Ken",
      date_of_birth: "1962-01-02",
    },
    {
      name: "Ben",
      date_of_birth: "1971-01-02",
    },
  ])
  .returning("id");
```

基本上將每一個 query 指令改為'.'作接駁，而 columns condition 等指令則以““ 包住，即可使用。

```ts
.select('\*')
.select('columnName','columnName2','columnName3')
.from('tableName')
.where('columnName','condition')
.andWhere('columnName','like', '%e%')
.orWhere('columnName','>=', 123)

// subquery

knex('tableName')
.select('tableName','tableName')
.where('columnName', 'condition')
.whereIn('columnName', function(){
this.select('columnName').from('tableName')
})

// insert data

const result = await knex('tableName')
.insert({
columnName: 'data',
columnName2: 'data'
})
.returning('id')

// if insert multiple data in same query:

const result = await knex('tableName')
.insert([
{
columnName: 'data',
columnName2: 'data'
},
{
columnName: 'data',
columnName2: 'data'
}
])
.returning('*')

// update

const result = await knex('tableName')
.update({
  columnName: data,
  columnName2: data2,
})
.where('columnName','condition')
.returning('*')


// delete

const result = aawait knex('tableName')
.where('columnName', 'condition')
.del()
```

knex 既 doc 非常好睇，建議查 doc （真心易睇）
