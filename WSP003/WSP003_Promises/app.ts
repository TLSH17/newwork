// import fs from 'fs';


// console.log("Step 1");
// fs.promises.writeFile('quotes-dijkstra.txt',
//                     "Simplicity is prerequisite for reliability.\n",
//                     {flag:'w'})
//             .then(function(){
//                    console.log("Step 3");
//                   console.log("Return the nothing from write");
//                   return 12345;
//             })
//             .then(function(returnValue){
//                 console.log("Step 4");
//                 console.log("returnValue here same as return value of step 3 promise")
//                 return returnValue;
//             })
//             .catch(function(error){
//                 console.log("Step 5");
//                 console.log(error);
//             });
// console.log("Step 2");


const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(5);

const promiseAll = Promise.all([promise1, promise2])

promiseAll.then(function(values){
    console.log(values[0]) // -> 3
    console.log(values[1]) // -> 5
})