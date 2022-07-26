import { fizzbuzz } from "./fizzbuzz";

test('test fizzbuzz', () => {
    // Need to put function into a variable, otherewise will error
    const number = 15;
    let actual = fizzbuzz(number);
    let expected: string = "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz"
    expect(actual).toEqual(expected);
});