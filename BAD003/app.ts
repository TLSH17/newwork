import Knex from 'knex';
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development" || process.env.NODE_ENV]);

async function main() {
    const staff = await knex.select("*").from("staff").where("id", ">", "0"); // Query Builder
    console.log(staff);

    //disconnect from the db
    knex.destroy();
}

main();