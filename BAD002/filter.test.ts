import filter from './filter';

it("Testing filter", () => {

    // Step 1: Mock function (Not Testing Target)
    const mockPredicate = jest.fn(x => x % 2 == 0);

    // Step 2: Test function
    const filtered = filter([1, 2, 3, 4], mockPredicate);

    // Step 3: Validation - check 比人call左幾多次, 4次for 4個numbers
    expect(mockPredicate.mock.calls.length).toBe(4);

    // Another Validation - 第一次比人call ＋第一個位 應該係“1“
    expect(mockPredicate.mock.calls[0][0]).toBe(1);

    expect(filtered.length).toBe(2);
})