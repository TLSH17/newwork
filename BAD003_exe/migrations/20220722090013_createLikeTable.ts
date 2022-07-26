import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("likes"))) {
        await knex.schema.createTable("likes", (table) => {
            table.increments(); //id
            table.integer("user_id");
            table.foreign("user_id").references("users.id");
            table.integer("memo_id");
            table.foreign("memo_id").references("memos.id");
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("likes");
}

