# jest

```ts
test("hi", () => {
  expect(a(1, 2)).toBe(3);
});
```

> yarn jest

run test

## .not

```ts
test("hi", () => {
  expect(a(1, 2)).not.toBe(4);
});
```

## .toEqual

if we need to test object, dont use the toBe, must use toEqual
toBe will only check the object key, not checking the value
toEqual will check the value of the object key.

```ts
test("HI", () => {
  const a = { name: "Alex" };
  const b = { name: "Tommy" };
  expect(a).toEqual(b); // false, a.name value =/= b.name value
});
```

```ts
test("HI", () => {
  const a = { name: "Alex" };
  const b = { name: "Tommy" };
  expect(a).toBe(b); // Pass, a.name = b.name
});
```
