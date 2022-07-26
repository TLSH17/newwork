import Calculator from './Calculator';

let calculator: Calculator;

beforeEach(() => {
    calculator = new Calculator();
});

test('it adds a number', () => {
    expect(calculator.add(5)).toBe(5);
});

test('it adds a number and go on', () => {
    expect(calculator.add(5)).toBe(5);
    expect(calculator.add(2)).toBe(7);
});

// ... and lots more