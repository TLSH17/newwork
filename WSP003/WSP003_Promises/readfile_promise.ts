import fs from "fs";
//Promisify the call back function



const directory = __dirname;

// tradition style function
export function readdirPromise(directory: string) {
    return new Promise<string[]>(function (resolve, reject) {
        fs.readdir(directory, function (err, files) {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        })

    })

}


// arrow function (same result)
export const readFilePromise = (file: string) => {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}

// traditional 
export function writeFilePromise(outputfile:"string", data: string, option?: { flag: string }) {
    return new Promise<void>(function (resolve, reject){
        fs.writeFile(outputfile, data, {flag: "a"}, function(err){
            if (err){
                reject(err);
                return;
            }
        })
    })
 }

 readdirPromise(directory).then((resolvedReaddir) => {
    resolvedReaddir.forEach(element => {
          readFilePromise(element)
          .then(resolvedReadFile => {
              console.log(resolvedReadFile.toString())
            const contenString = resolvedReadFile.toString();
            const lines = contenString.split("\n")
            const toFile = `File(${element}): ${lines[0]} \n`;
            writeFilePromise("output.txt", toFile, {flag: "a"}).catch((err) => {
                console.log(err);
            })
          }).catch((err) => {console.log(err);
        });
      });
 })