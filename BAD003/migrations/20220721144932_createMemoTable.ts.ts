import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("memos", (table) => {
        table.increments(); //id
        table.text("content");
        table.string("filename");
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("memos");
}

