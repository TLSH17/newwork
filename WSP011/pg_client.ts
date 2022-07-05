import pg from 'pg';
import { config } from 'dotenv'

config()

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_,
    password: "",
});