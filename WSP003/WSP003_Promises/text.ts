// import assert from "assert";

function removeAllBefore(values: number[], b: number): number[] {
    let checkNotInclude = values.find(e => e ===b)

    if (values !== null && checkNotInclude !== undefined) {
        for (let i = 1; i < values.length; i++){
            console.log(values + "  loop : " + i)
            if (values[i] <= b){
                values.splice(0,i)
            }
        }
    } 
    return values;
}

console.log('Example:');
console.log(removeAllBefore([10,9,5,4,3], 5));
console.log(removeAllBefore([1,2,3,4,5], 4));
console.log(removeAllBefore([1,2,3,4,5], 2));

// // These "asserts" are used for self-checking
// assert.deepEqual(removeAllBefore([1, 2, 3, 4, 5], 3), [3, 4, 5]);
// assert.deepEqual(removeAllBefore([1, 1, 2, 2, 3, 3], 2), [2, 2, 3, 3]);
// assert.deepEqual(removeAllBefore([1, 1, 2, 4, 2, 3, 4], 2), [2, 4, 2, 3, 4]);
// assert.deepEqual(removeAllBefore([1, 1, 5, 6, 7], 2), [1, 1, 5, 6, 7]);
// assert.deepEqual(removeAllBefore([], 0), []);
// assert.deepEqual(removeAllBefore([7, 7, 7, 7, 7, 7, 7, 7, 7], 7), [7, 7, 7, 7, 7, 7, 7, 7, 7]);

// console.log("Coding complete? Click 'Check' to earn cool rewards!");