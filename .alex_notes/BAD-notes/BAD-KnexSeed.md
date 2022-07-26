# seed

seed 顧名思義是 database 的種子，當玩爛哂成個 database 要推倒重來時，migrate:seed 可以視為重生檔級重建所有資料。

> yarn knex seed:make -x ts filename

將會創建一個 seed folder in repository

```ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {}
```

可以在｛｝中輸入包括但不限於 del drop create insert...

例如：

```ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("students").del();
  await knex("teachers").del();

  const [{ id }]: Array<{ id: number }> = await knex
    .insert({
      name: "Bob",
      date_of_birth: "1970-01-01",
    })
    .into("teachers")
    .returning("id");

  return await knex
    .insert([
      {
        name: "Peter",
        level: 25,
        date_of_birth: "1995-05-15",
        teacher_id: id,
      },
      {
        name: "John",
        level: 25,
        date_of_birth: "1985-06-16",
        teacher_id: id,
      },
      {
        name: "Simon",
        level: 25,
        date_of_birth: "1987-07-17",
        teacher_id: null,
      },
    ])
    .into("students");
}
```

這是源自於 cms 的例子，也可以寫成自動導入 xlsx，csv 檔的版本。

# 執行 seed

> yarn knex seed:run
