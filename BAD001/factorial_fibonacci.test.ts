import { factorial, fibonacci } from "./factorial_fibonacci";

test("check factorial", () => {
    const actual = factorial(10);
    const expected = 3628800;
    expect(actual).toBe(expected);
});





test("check fibonacci", () => {
    const actual = fibonacci(7);
    const expected = 13;
    expect(actual).toBe(expected);
});