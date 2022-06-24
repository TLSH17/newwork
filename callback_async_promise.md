##call back

在 JavaScript 中，callback 被當成事件迴圈回頭執行某個已在佇列中進行的程式的目標。再次舉 A、B、C 三件工作的例子，其中 B 必須等待 C 做完才能執行，於是我們將 B 放到 C 的 callback 中，讓宿主環境在收到 C 完成的回應時後 B 放到佇列中準備執行。

- Pass the mission to Worker Threads then the result come back via Callback



而使用 callback 有兩個主要缺點：(1)「回呼地域 callback hell」和 (2)「控制權轉移Inversion of Control」所造成的信任問題。

###1. Callback hell
層次太深的巢狀 callback，讓程式變得更複雜，難以預測和追蹤。

###2. Inversion of Control
使用 callback 讓我們把控制權從某個函式移到另外一個函式，這種非預期的出錯狀況主要發生於使用第三方的工具程式。



##Promise 是什麼？
我們都有這個經驗...在午餐時間、人滿為患的餐廳裡排隊等候點餐，點餐完畢後，服務生給我們一個小圓盤，告知當小圓盤開始發光震動的時候，就可以來取餐了。

Promise 可說是這個小圓盤，當先前承諾的工作完成時，就來通知我們「工作完成了！來進行下一步的任務吧」。

e.g
fs.promise.readdir
fs. 一定要跟promise,否則是call back






##Async 用法
- import fs from 'fs' 
fs = file system 讀/改file package

Reading file
```ts
import fs from 'fs';

async function readQuotes(){
    const data = await fs.promises.readFile('quotes.txt')
    console.log(data.toString('utf8')); 
}
```
1. fs.promises:
Use promises support a method "readFile(filename)"

2. await:
    解開promise

3. function名前放async
    function body 放await

##Error Handling
```ts
import fs from 'fs';

async function readQuotes(){
    try{
        const data = await fs.promises.readFile('notExist.txt')
        console.log(data.toString('utf8'));
    }catch(err){
        console.log(err)
    }
}
```
##Writing File
```ts

async function writeFile(){

    const dijkstraQuote1 = "Computer science is no more about computers than astronomy is about telescopes.\n";
    const dijkstraQuote2 = "Simplicity is prerequisite for reliability.\n";

    try{
        // Flag w overwrites the original content and create the if it does not exist
        await fs.promises.writeFile('quotes-dijkstra.txt',dijkstraQuote1,{flag:'w'})
        // Flag a+ appends to the content and create the file if it does not exist
        await fs.promises.writeFile('quotes-dijkstra.txt',dijkstraQuote2,{flag:'a+'})
    }catch(err){
        console.log(err)
    }
}
```
1. writeFile(file,content,options)

2. 落flag係option
-  Flag w overwrites the original content and create the if it does not exist
- Flag a+ "appends"附加 to the content and create the file if it does not exist