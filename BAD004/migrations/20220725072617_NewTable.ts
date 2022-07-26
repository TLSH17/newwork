import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("users"))) {
        await knex.schema.createTable("users", (table) => {
            table.increments("id");
            table.string("username").unique();
            table.text("password");
            table.text("level");

        });
    }

    if (!(await knex.schema.hasTable("categories"))) {
        await knex.schema.createTable("categories", (table) => {
            table.increments("id");
            table.string("name").unique();
        });
    }

    if (!(await knex.schema.hasTable("files"))) {
        await knex.schema.createTable("files", (table) => {
            table.increments("files_id");
            table.string("name");
            table.text("content");
            table.integer("is_file");
            table.string("category");
            table.foreign("category").references("categories.name");
            table.string("username");
            table.foreign("username").references("users.username");
            table.integer("category_id");
            table.foreign("category_id").references("categories.id");
            table.integer("user_id");
            table.foreign("user_id").references("users.id");
        });
    }

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
    await knex.schema.dropTable("categories");
    await knex.schema.dropTable("files");
}

