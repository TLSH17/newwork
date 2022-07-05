
import { Client } from 'pg';
import dotenv from 'dotenv';
import excel from 'xlsx';
import { User } from './models';

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

dotenv.config();

const readExcel = async () => {
    const data = await excel.readFile('./WSP009-exercise.xlsx')
    const result = await data.Sheets[data.SheetNames[0]]
    // console.log(data)
    const textresult = excel.utils.sheet_to_json<User>(result)


    for (let result of textresult) {

        const sqlQuery = `INSERT INTO users (username, password) VALUES ($1, $2)`
        client.query(sqlQuery, [result.username, result.password]);
    }
    const userResult = await client.query(/*sql*/ `SELECT * FORM users`);
    console.log(userResult.rows);
}
readExcel()

// async function main() {
//     await client.connect() // "dial-in" to the postgres server
//     const user = {
//         username: 'gordon',
//         password: 'tecky',
//     }
//     await client.query(
//         'INSERT INTO users (username,password) values ($1,$2)',
//         [user.username, user.password]
//     )

//     const result = await client.query(
//         'SELECT * from users where username = $1',
//         ['gordon']
//     )
//     console.log(result.rows[0].username) // gordon
//     await client.end() // close connection with the database
// }
// main()
