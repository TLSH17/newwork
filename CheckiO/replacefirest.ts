import assert from "assert";

function replaceFirst(values: number[]): number[] {
    let numStr = []
    for (let str of values) {
        numStr.push(str)
    }
    numStr.splice(numStr.length, 0, numStr[0])
    numStr.shift()
    return numStr;
}

console.log('Example:');
console.log(replaceFirst([]));

// These "asserts" are used for self-checking
assert.deepEqual(replaceFirst([1, 2, 3, 4]), [2, 3, 4, 1]);
assert.deepEqual(replaceFirst([1]), [1]);
assert.deepEqual(replaceFirst([]), []);

console.log("Coding complete? Click 'Check' to earn cool rewards!");