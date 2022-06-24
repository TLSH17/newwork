import fs from 'fs';

const directory = __dirname;
fs.readdir(directory, function(error, files){
    if (error){
        console.log("[ERROR]: ")
        console.log(error)
        return;
    }

    for (let file of files){

        fs.readFile(file, function(error, data){
            if (error){
                console.log("[ERROR]: ")
                console.log(error)
                return;
            }
        console.log(`-----File (${file}):`)

            //convert buffer to string
            const dataString = data.toString()

            //split data by line and save as a string array
            const lines = dataString.split("\n")

            const toFile = `File(${file}): ${lines[0]} \n`;
            console.log(lines[0]);

            fs.writeFile('output.txt', toFile, "utf-8", function(error){
                if (error){
                    console.log("[ERROR]: ")
                    console.log(error)
                    return;
                }
            } )
        })
    }
})

console.log(`The above files are located in: \n ${directory}`)