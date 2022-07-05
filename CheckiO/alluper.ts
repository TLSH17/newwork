import assert from "assert";

function isAllUpper(text: string): boolean {
    // let splittext = text.split("")
    let jointext = text.replace(/\s/g, '')
    let withoutNum = /[0-9]/g

    if (text === "" || text.match(withoutNum)) {
        return true;
    }
    for (let up of jointext) {
        console.log(up)
        if (up == up.toLowerCase()) {
            return false;
        }
    }
    return true;
}
console.log('Example:');
console.log(isAllUpper('123'));

// These "asserts" are used for self-checking
assert.equal(isAllUpper('ALL UPPER'), true);
assert.equal(isAllUpper('all lower'), false);
assert.equal(isAllUpper('mixed UPPER and lower'), false);
assert.equal(isAllUpper(''), true);

console.log("Coding complete? Click 'Check' to earn cool rewards!");