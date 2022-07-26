import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const newMemo = await knex.insert(
        {
            content: "Hello. This is Tommy"
        }
    ).into("memos");
    console.log(newMemo);
}


export async function down(knex: Knex): Promise<void> {
}

