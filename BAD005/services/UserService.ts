import type { Client } from "pg";
import { hashPassword } from "../hash";
import { User } from "../models";

export class UserService {
  constructor(private client: Client) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return (
      await this.client.query<User>(
        `select id, username, password from users where users.username = $1`,
        [username]
      )
    ).rows[0];
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return (
      await this.client.query(
        `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
        [username, hashedPassword]
      )
    ).rows[0];
  }
}
