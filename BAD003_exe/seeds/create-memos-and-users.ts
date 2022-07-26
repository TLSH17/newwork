import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('memos').del();
    await knex('users').del();


    // Inserts seed entries
    const newUsers = await knex.insert([
        {
            username: "tommy@gmail.com",
            password: "1234",
        },
        {
            username: "tommy123@gmail.com",
            password: "1234",
        }
    ]).into('users');
    console.log(newUsers);

    const newMemos = await knex.insert([
        {
            content: "This is 1st memo",
        }
    ]).into('memos');
    console.log(newMemos);
};


