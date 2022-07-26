import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.insert({
        username: "tommy@gmail.com",
        password: "1234",
    })

}


export async function down(knex: Knex): Promise<void> {

}

