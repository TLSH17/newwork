import fs from 'fs';


async function writeFile(){

    const dijkstraQuote1 = "Computer science is no more about computers than astronomy is about telescopes.\n";
    const dijkstraQuote2 = "Simplicity is prerequisite for reliability.\n";

    try{
        // Flag w overwrites the original content and create the if it does not exist
        await fs.promises.writeFile('quotes-dijkstra.txt',dijkstraQuote1,{flag:'w'})
        // Flag a+ appends to the content and create the file if it does not exist
        await fs.promises.writeFile('quotes-dijkstra.txt',dijkstraQuote2,{flag:'a+'})
    }catch(err){
        console.log(err)
    }
}

writeFile()