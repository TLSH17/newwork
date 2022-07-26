import filter from './filter';


// function printNumbers() {
//     const oddNumbers = filter([1, 2, 3, 4, 5], (num) => num % 2 != 0)

//     // 正常唔會拎console.log 做test
//     console.log(oddNumbers);

//     //1. call filter?
//     //2. log result?
// }




export class Person {
    constructor(public age: number) { }

    drink() {
        console.log("I am drunk")
    }
}

export function goToBar(people: Person[]) {
    const adults = people.filter(person => person.age >= 18);
    adults.forEach((adult) => adult.drink());
}

function printNumbers() {
    const oddNumbers = filter([1, 2, 3, 4, 5], (num) => num % 2 != 0)
    setTimeout(() => {
        console.log(oddNumbers);
    }, 5000);
}



export default printNumbers;