import { Knex } from "knex";
import { hashPassword } from "../hash";

const tableName= "users";



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    const hashedPassword = await hashPassword("1234");
    // Inserts seed entries
    await knex(tableName).insert([
        { username: "jason@tecky.io", password: hashedPassword },
        { username: "adams@tecky.io", password: hashedPassword },
       
    ]);
};
