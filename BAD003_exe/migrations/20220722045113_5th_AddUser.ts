import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    //Insert new users into "users"

    const newUser = await knex.insert(
        {
            username: "test@gmail.com",
            password: "1234",
        },

    ).into("users").returning('id');

    console.log(newUser);
}


export async function down(knex: Knex): Promise<void> {
    // await knex.schema.dropTable("users");
}

