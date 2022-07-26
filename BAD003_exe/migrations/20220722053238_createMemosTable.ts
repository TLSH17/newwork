import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("memos"))) {
        await knex.schema.createTable("memos", (table) => {
            table.increments(); //id
            table.text("content").notNullable();
            table.text("image");
            table.timestamp("created_at");
            table.timestamp("updated_at");
        })
    }

}


export async function down(knex: Knex): Promise<void> {
}

