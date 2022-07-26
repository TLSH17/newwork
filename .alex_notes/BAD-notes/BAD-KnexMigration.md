# Migration

Migration 類似於一種版本控制器的存在，每一次對 database 的改動，都利用 migration 的檔案作處理，執行並留檔，方便日後查詢所有變化及 rollback。

migration 分 up and down，up 主要為新增，改動，修改等等，down 主要為刪減，drop，delete 等…

如你不想細分，也可以不理會 up down，將所有 code 寫在 up 上，然後執行 migrate:latest，將會按未有執行的 migration file 全數執行一次，但這做法絕非正確。

## Migrate , up & latest

如要使用 migration，在 repository 中 command line 輸入：

> yarn knex migrate:make filename

將會在你的 repo 中自動創建一個 migrations folder，並生成一個 migrate.ts

e.g.

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {}

export async function down(knex: Knex): Promise<void> {}
```

你可以在 up 部份進行 database table creation, alter 等等… for example:

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable("user");
  if (!hasTable) {
    await knex.schema.createTable("user", (table) => {
      //(t / table) 係params 代號用
      table.string("username").primary();
      table.string("password");
      table.string("level");
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
```

也可以修改 table：

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("category", (t) => {
    //(t / table) 係params 代號用
    t.string("name").primary().alter();
  });
}

export async function down(knex: Knex): Promise<void> {}
```

當寫好各個 migration file 後，如要執行其設定，可以在 command line 輸入：

> yarn knex migrate:latest

> yarn knex migrate:up

### Migration down

主要用作刪減

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user");
}
```

> yarn knex migrate:down

### Migration rollback

如果 dropTable 後後悔，想 rollback
可以使用

> yarn knex migrate:rollback

將會將上一個 migration 的執行 branch 退回
