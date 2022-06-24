import { readdir, stat } from "fs/promises";
import { join as pathJoin, extname } from "path";

async function listAllJsRecursive(path: string) {
  try {
    // import fs from "fs"
    // const files = await fs.promises.readdir(path);
    const files = await readdir(path);
    for (const file of files) {
      const filepath = pathJoin(path, file);
      const stats = await stat(filepath);

      if (stats.isFile() && extname(filepath) === ".js") {
        console.log(filepath);
      } else if (stats.isDirectory()) {
        await listAllJsRecursive(filepath);
      }
    }
  } catch (err) {
    console.log("catch !!!");
    console.error(err.message);
  }
}

listAllJsRecursive("./folder_01");


listAllJsRecursive('/Users/tommylau/tecky-exercises/WSP003_exe')