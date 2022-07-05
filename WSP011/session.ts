import session from "express-session";
import { config } from "dotenv";

config();

if (!process.env.SESSION_SECRET) {
    throw new Error("missing session secret")
}

export let expressSessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
})