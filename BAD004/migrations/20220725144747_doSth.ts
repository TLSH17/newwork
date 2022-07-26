import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("files");
    await knex.schema.dropTable("users");
    await knex.schema.dropTable("categories");
}

