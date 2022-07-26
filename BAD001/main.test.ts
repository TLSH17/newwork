import { printPosNumbers } from "./main";

test("test object", () => {
    const actual = { name: "jason" };
    const expected = { name: "peter" };
    expect(actual).not.toBe(expected);
});

test("test object 2", () => {
    //don't use toBe on object
    const actual = { name: "jason" };
    const expected = actual;
    expected.name = "peter";
    expect(actual).toBe(expected);
})


//toBe on objects -> Objectis 

// test("test array of odd numbers", () => {
//     const len = 4;
//     const actual = generateOddNumbers(len);
//     for (let i = 0; i < len; i++) {
//         expect(actual[i] % 2).toEqual(1);
//     }
// });

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3);           //This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});


test('test returnPosNum - neg number input', () => {
    // Need to put function into a variable, otherewise will error
    const actual = () => printPosNumbers(-1);
    expect(actual).toThrow();
});