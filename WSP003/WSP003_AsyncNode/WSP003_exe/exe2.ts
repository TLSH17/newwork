import fs from 'fs';

async function listAllJsRecursive(path: string, fileType:string) {

    try {
        const data = await fs.promises.readdir(path)
        for (const list of data) {
            if (fs.lstatSync(list).isDirectory() === true) {
                const innerFile = await fs.promises.readdir(list)
                for (let inside of innerFile) {
                    if (inside.slice(-3) == fileType){
                        console.log(`${path}/${list}/`+ inside)
                    }
                }
            } else if (list.slice(-3)== fileType){
                console.log(`${path}` + "/" + list)
            }
        }
    } catch (err) {
        console.error(err.message);
    }
}



listAllJsRecursive('/Users/tommylau/tecky-exercises/WSP003_exe', ".js")