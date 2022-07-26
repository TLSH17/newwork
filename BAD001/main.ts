

export function generateOddNumbers(len: number) {
    const result: Array<number> = [];
    for (let i = 0; i < len; i++) {
        result.push(i * 2 + 1);
    }
    return result;
};

export function printPosNumbers(num: number) {
    if (num < 0) {
        throw new Error("this is not a positive number");
    }
}