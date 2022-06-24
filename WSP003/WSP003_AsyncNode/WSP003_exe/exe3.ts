import fs from 'fs';


setTimeout(function(){
    // Logic here
},1000);




// Promisify the fsWriteFile
function fsWriteFilePromise(file:string,content:string,options:{flag:string}){
    return new Promise(function(resolve,reject){
        fs.writeFile(file,content,options,function(err:Error){
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
}


// Using the promisfied version just like fs.promises.writeFile.
fsWriteFilePromise('quotes-dijkstra.txt',
                    "Simplicity is prerequisite for reliability.\n",
                    {flag:'w'})
            .then(function(){
                console.log("Content is written!");
            })
            .catch(function(err){
                console.log(err);
            })