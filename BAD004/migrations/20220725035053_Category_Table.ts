import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    if (!(await knex.schema.hasTable("categories"))) {
        await knex.schema.createTable("categories", (table) => {
            table.increments("categories_id");
            table.string("name");

            table.primary(["categories_id", "name"]);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("categories");
}

