import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("users"))) {
        await knex.schema.createTable("users", (table) => {
            table.increments(); //id
            table.text("username").notNullable();
            table.string("password").notNullable();
            table.timestamp("created_at");
            table.timestamp("updated_at");
        })
    }

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

