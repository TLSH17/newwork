import fs from 'fs';


async function listAllJs(path:string){
    try {
        const data = await fs.promises.readdir(path)

        for (let list of data){
            if(list.slice(-2)=="js"){
                console.log(list)
            }
        }
    }catch(err){
        console.log(err)
    }
}
listAllJs('/Users/tommylau/tecky-exercises/WSP003_exe')
