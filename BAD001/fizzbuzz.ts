// let numArr: string[] = []

export function fizzbuzz(number: number) {

    let numArr: string[] = [];

    for (let i = 1; i < number + 1; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            numArr.push(" Fizz Buzz")
        } else if (i % 3 === 0) {
            numArr.push(" Fizz")
        } else if (i % 5 === 0) {
            numArr.push(" Buzz")
        } else {
            numArr.push(` ${i}`)
        }
    }

    let str = ((numArr).toString()).slice(1);
    return str;
}

fizzbuzz(15);

// console.log((numArr).toString());
