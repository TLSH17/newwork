import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("staff", (table) => {
        table.renameColumn("username", "name");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("staff", (table) => {
        table.renameColumn("name", "username");
    })
}
