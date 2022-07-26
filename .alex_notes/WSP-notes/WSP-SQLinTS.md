# SQL in TS

## pg

首先要係 server.ts / main.ts import pg

```ts
import pg from "pg";
```

然後使用 pg 當中 pg.client 設立一個身份去連入你本機的 database, 原理同我地份 project “proclient“ 一樣

設立既 syntax:

```ts
import pg from 'pg'
...
...
export const client = new pg.client({
    database: abc_database,
    user: hi123,
    password: 12345678,
})

client.connect()
// 表示給予client 可以連接到database
// 大多情況下不會斷問連接，除非特定handling，強制用家斷連可以用：client.end()
// 但很少會用
```

咁樣就可以設定帳號比人，佢地可以透過呢個 server 連入你本機 database，但咁樣並唔安全，因為一但你 git push，係會比全世界知道哂你既密碼，所以我地會用.env 檔去設定呢個 database 帳號，亦會改動上面 syntax 以讀取.env 內設定的帳號。

## env

要使用.env 直接創建一個檔案“.env"
然後檔案內輸入：database 個名，username,password

```
DB_NAME=teckywspproject
DB_USERNAME=proclient
DB_PASSWORD=1234
```

然後係 server.ts / main.ts 要 import dotenv 用來讀取 env 檔，用法如下：

```ts
import pg from 'pg'
import dotenv from "dotenv";
dotenv.config();
...
...
export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();
```

## SQL 語法 in TS

當設定了上面的環境後，在各種 routes 中可以 import { client } from "./server.ts"
咁之後你就可以方便使用 query 指令讀取 database

query 寫法基本上源用於 PSQL 的語法，唯獨要用少量 ts 語法包裝住，例如：

假設我有 a table
table 入面有：
id, name, ac, pw

我想讀取 a table 資料：

```sql
select * from a

select id from a

select id, name, ac from a

select * from a where name = 'Jason'
-- return All data(id,name,ac,pw) which is name = jason

...

```

在 TS 其實是一樣寫法，只需改動少少：

```ts
const result = client.query("SELECT * from a");
// 讀取所有資料從a table, 因為ts唔會好似sql咁會產生個table樣比你睇到，所以要set個野去接住d資料

const result = client.query("SELECT id, name, ac from a");

const result = client.query("SELECT * from a where name = $1", ["Jason"]);
// 呢種寫法會複雜少少，＄1是對應','後的[]中順序數據或設定，可以同時設定好多個$ 或 多個$1重用同一個值
```

基本上你留意到 sql ＆ sql in ts 分別係要用 variable 裝住個 result, 用 client.query（）包住…

除此之外仲有好多拎／改／加／刪資料比 database，要 case by case 教，有唔明就問我啦～
