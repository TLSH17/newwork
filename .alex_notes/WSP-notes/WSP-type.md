# TS type

Type 是 ts 當中最大特色，不同形式利用 type 以達到檢測錯誤、方便程序編寫，以及限制 result 及 datatype。有助於提前 debug。

## 為 data 增加 type

```ts
const a: string = "hi"; // a will only get string
let num: number = 1; //num will only get number
let flag: boolean = true; //flag will only true or false
let b: void;
let c: Array<number | string>; // c[] will only get number or string
let d: []; //d is any array
let e: number[] = [1, 2, 3]; //e[] is number array only
let f: null = null; //f only is null
let g: 3.14 = 3.14; //g will only is 3.14
```

## 新增自訂 type

> type typeName = {}

以下是一個 object 宣告自訂 type

```ts
type Student = {
  name: string;
  age: number;
  classes?: Array<Class>; //classes? meaning may be have
};

type Class = {
  name: string;
  teacher?: Array<teacher>;
  date: Date;
};

type teacher = {
  name: string;
  age: number;
};

const peter: Student = {
  name: "Peter",
  age: 15,
  classes = [
    {
      name: "Tommy",
      teacher: [{ name: "Jason", age: 30 }],
      date: 1 / 1 / 2001,
    },
  ],
};
```

## 特殊 type

> enum

Enums is a special data type which the values are limited to several values. Good example would be direction (which is limited to East,West,South and North) and the kinds (which is limited to Club,Heart, Spade and Diamond).

A Enum can be declared as follow in Typescript:

```ts
enum Direction {
  East,
  South,
  West,
  North,
}

enum Kind {
  Diamond,
  Club,
  Heart,
  Spade,
}
```
