import xlsx from "xlsx";
import path from "path";
import Knex from "knex";
import knexConfig from "./knexfile";
import { hashPassword } from "./hash";

interface UserData {
    username: string;
    password: string | number;
    level: string;
}

interface CategoryData {
    name: string;
}

interface FileData {
    name: string;
    Content: string;
    is_file: number;
    category: string;
    owner: string;
}

// console.log(fileData.reduce((acc, cur) => acc.add(cur.owner), new Set<string>()));
const fixUserObject = Object.freeze({
    gordan: "gordon",
    alexs: "alex",
    admiin: "admin",
    ales: "alex",
    micheal: "michael",
});

async function importData() {
    const filename = path.join(__dirname, "data", "BAD004-exercise.xlsx");
    const workbook = xlsx.readFile(filename);

    const userData = xlsx.utils.sheet_to_json<UserData>(workbook.Sheets["user"]);
    const categoryData = xlsx.utils.sheet_to_json<CategoryData>(workbook.Sheets["category"]);
    const fileData = xlsx.utils.sheet_to_json<FileData>(workbook.Sheets["file"]);

    console.log(`user length = ${userData.length}`);
    console.log(`category length = ${categoryData.length}`);
    console.log(`file length = ${fileData.length}`);

    const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
    const trx = await knex.transaction();
    try {
        await trx("files").del();
        await trx("users").del();
        await trx("categories").del();

        // you can try to use userData.amp(...) to create the array !!!
        for (const user of userData) {
            user.password = await hashPassword(String(user.password));
        }

        const userMapping = (
            await trx("users")
                .insert(userData)
                .returning<Array<{ id: number; username: string }>>(["username", "id"])
        ).reduce((acc, cur) => acc.set(cur.username, cur.id), new Map<string, number>());
        console.log(userMapping);

        const categoryMapping = (
            await trx("categories")
                .insert(categoryData)
                .returning<Array<{ id: number; name: string }>>(["id", "name"])
        ).reduce((acc, cur) => acc.set(cur.name, cur.id), new Map<string, number>());
        console.log(categoryMapping);

        const toBeInsertFiles = fileData.map((file) => ({
            name: file.name,
            content: file.Content,
            is_file: file.is_file,
            category_id: categoryMapping.get(file.category),
            owner_id: userMapping.get(file.owner) || userMapping.get(fixUserObject[file.owner]),
        }));
        await trx("files").insert(toBeInsertFiles);

        await trx.commit();
    } catch (err) {
        console.error(err.message);
        await trx.rollback();
    } finally {
        await knex.destroy();
    }
}

importData();
