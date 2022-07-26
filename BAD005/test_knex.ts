import dotenv from "dotenv";
import Knex from "knex";

dotenv.config();

const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);


async function test(){
    let result = await knex.select("*").from("users");

    console.log(result);


    knex.destroy();


}

test()