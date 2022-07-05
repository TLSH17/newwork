// import assert from "assert";

function maxDigit(value: number): number {
    let numStr = value.toString();
    let numArr = [];
    for (let num of numStr) {
        numArr.push(num);
    }

    let maxNum = numArr.reduce(function (previousValue, currentValue) {
        return previousValue > currentValue ? previousValue : currentValue
    })

    return parseInt(maxNum);
}

console.log('Example:');
console.log(maxDigit(124351));

// // These "asserts" are used for self-checking
// assert.equal(maxDigit(0), 0);
// assert.equal(maxDigit(52), 5);
// assert.equal(maxDigit(634), 6);
// assert.equal(maxDigit(1), 1);
// assert.equal(maxDigit(10000), 1);

// console.log("Coding complete? Click 'Check' to earn cool rewards!");