import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    if (!(await knex.schema.hasTable("users"))) {
        await knex.schema.createTable("users", (table) => {
            table.increments("id");
            table.string("username").unique();
            table.text("password");
            table.text("level");

            // table.primary(["users_id", "username"]);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

