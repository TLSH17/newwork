// import type { Client } from "pg";
import { hashPassword } from "../hash";
// import { User } from "../models";
import { Knex } from "knex";



export class UserService {
  constructor(private knex: Knex) { }

  async getUserByUsername(username: string)
  // : Promise<User | undefined> 
  {

    const result = await this.knex("users")
      .select('id', 'username', 'password')
      .from('users')
      .where('username', username);

    return result[0];
    // return (
    //   await this.client.query<User>(
    //     `select id, username, password from users where users.username = $1`,
    //     [username]
    //   )
    // ).rows[0];
  }

  async insertUser(username: string, password: string)
  // : Promise<User> 
  {
    const hashedPassword = await hashPassword(password);

    const result = await this.knex("users")
      .insert({
        username: username,
        password: hashedPassword
      })
      .returning("*");

    return result;


    // return (
    //   await this.client.query(
    //     `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
    //     [username, hashedPassword]
    //   )
    // ).rows[0];
  }
}
