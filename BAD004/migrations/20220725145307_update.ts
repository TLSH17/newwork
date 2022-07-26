import { Knex } from "knex";

const userTableName = "users";
const fileTableName = "files";
const categoryTableName = "categories";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(userTableName, (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
        table.string("level").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable(categoryTableName, (table) => {
        table.increments();
        table.string("name").notNullable().unique();
        table.timestamps(false, true);
    });

    await knex.schema.createTable(fileTableName, (table) => {
        table.increments();
        table.string("name");
        table.text("content");
        table.boolean("is_file");
        table.integer("category_id").unsigned().notNullable();
        table.foreign("category_id").references(`${categoryTableName}.id`);
        table.integer("owner_id").unsigned().notNullable();
        table.foreign("owner_id").references(`${userTableName}.id`);
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(fileTableName);
    await knex.schema.dropTableIfExists(categoryTableName);
    await knex.schema.dropTableIfExists(userTableName);
}
