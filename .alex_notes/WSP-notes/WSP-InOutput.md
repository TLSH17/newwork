# TS 的輸出輸入

有別於 js，不能直 html 中以<script></script>直接導入，如需要跨 ts 檔導入 function 或資料，需要利用 import / export 指令

> import / export

```ts
import lib from "./lib";
// import default function or data from lib and named parameter as 'lib'

import { lib, people } from "./lib";
// import the specify named function or variables from lib

import * as libAll from "./lib";
// import all from ./lib and named as libAll
```

```ts
// ./lib
export default function mylib(){
    ...
}
```

```ts
/// ./lib
export function lib(){
    ...
}

export const people:[] = ['tommy', 'alex']
```
