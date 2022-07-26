import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    if (!(await knex.schema.hasTable("files"))) {
        // await knex.schema.createTable("files", (table) => {
        //     table.increments("files_id");
        //     table.string("name");
        //     table.text("content");
        //     table.integer("is_file");
        //     table.string("category");
        //     table.foreign("category").references("category.name");
        //     table.string("username");
        //     table.foreign("username").references("users.username");
        // });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("files");
}

