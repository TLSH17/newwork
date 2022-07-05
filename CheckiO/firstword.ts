import assert from "assert";

function firstWord(text: string): string {
    let str = text
    let reg = /\W/g
    let notreg = /\w/g
    let startuseless = []
    let firsword = []

    //clear everything before the first word
    for (let i = 0; i < str.length; i++) {
        if ((str[i].match(reg)) || str[i] === " ") {
            startuseless.push(str[i])
        } else {
            break
        }
    }

    let sliceArr = text.slice(startuseless.length)

    // loop the first word
    for (let result of sliceArr) {
        if ((result.match(notreg)) || result === "'") {
            firsword.push(result)
        } else {
            break
        }
    }


    return firsword.join('')
}


console.log('Example:')
console.log(firstWord(" //...@ /abbasdsad,,  word "))

// These "asserts" using for self-checking and not for auto-testing
assert.equal(firstWord("Hello world"), "Hello")
assert.equal(firstWord(" a word "), "a")
assert.equal(firstWord("don't touch it"), "don't")
assert.equal(firstWord("greetings, friends"), "greetings")
assert.equal(firstWord("... and so on ..."), "and")
assert.equal(firstWord("hi"), "hi")
console.log("Coding complete? Click 'Check' to earn cool rewards!");