import { client } from "./pg_client";

export async function importUser() {

    await client.connect();

    let result = await client.query(
        `insert into "users" (username, password) values ($1,$2)`, ["gordon", "tecky"]);

    await client.query(`insert into "users" (username, password) values ($1,$2)`, ["alex", "tecky"]);
}

importUser