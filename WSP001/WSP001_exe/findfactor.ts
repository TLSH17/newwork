//Q1
export function findFactors(num:number):number[]{
    let factors = [];
    for(let factor = 2; factor <= num / 2 ; factor++){
        if(num % factor === 0){
           factors.push(factor);
        }
    }
    return factors;
 }

//Q2
export function leapYear(year:number):boolean{
    if (year % 400 === 0) {
        console.log("Leap Year");
        return true;
    } else if (year % 100 === 0) {
        console.log("Not a Leap Year");
        return false;
    } else if (year % 4 === 0) {
        console.log("Leap Year");
        return true;
    } else {
        console.log("Not a Leap Year");
        return false;
    }
}
//Q3
export function rnaTranscription(dna:string){
    let rna = "";
    for(let nucleotide of dna){
        switch(nucleotide){
            case "G":
                rna+= "C";
                break;
            case "C":
                rna+= "G";
                break;
            case "T":
                rna+= "A";
                break;
            case "A":
                rna+= "U";
                break;
            default:
                throw new Error(`The nucleotide ${nucleotide} does not exist`)
        }
    }
    return rna;
}
//Q4

export function factorial(num:number):number{
    if(num === 0 || num === 1){
       return 1;
    }
 
    return factorial(num - 1) * num
 }

//Q5

type Teacher = {
    name : string,
    age: number,
    students: Array<student>,
}

type student = {
    name : string,
    age : number,
    exercises? : Array<mark>
}

type mark = {
    score: number,
    date: Date,
}


export const peter: Teacher = {
    name: "Peter",
    age: 50,
    students:[
       { name:"Andy", age:20},
       { name:"Bob", age:23},
       { name: "Charlie", age:25 , exercises:[
           { score: 60 , date: new Date("2019-01-05") }
       ]}
    ]
}

//Q6

// type TimeoutHandler = () => void

export const timeoutHandler = (): void =>{
    console.log("Timeout happens!");
};

const timeout:number = 2000;

setTimeout(timeoutHandler,timeout);

//Q7
const someValue:number| null = Math.random() > 0.5? 12: null;