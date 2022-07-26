#Express

ifconig = check IP
npm i -D ts-node-dev //自動restart
npm i express //安裝Express
npm i @types/express //安裝番express types

```ts

1. import express from express; //試下入唔入到黎
2. const app = express(); //建立express application
3. const PORT = 8080; (Port)
4. app.listen(PORT, () => {
    console.log(`listening to PORT:${PORT}`)
}) 
//server 聽住個port做野,透過依個port 入黎就會去application
//會長著

5. app.get()  //HTTP method : get -> 來自http(IP, port...) request, 進而叫server處理
6. Handler for Path pattern // 如果網址事入最尾無野 default in尾位一個(/)
    app.get("/"), (req, res) =>{  //route handler
        res.send("Hello")
    }
```

###Middleware 
like function for Express
Pre-process the HTTP Request
Post-process the HTTP Request
第一種形式
無條件推, bind middleware
```ts
app.use((req, res) =>{  //Middleware中間人角色可以用next() 再去跟住middleware or 直接走人
    res.send("bye");
    next();
})    
```
第二種形式 (係route handler 之前再落middleware)
要有條件先推(path + method pattern), 處理get method的request
```ts
app.get("/", (req, res, next )=> {console.log("middleware 3");
    next();
    }, 
    (req, res) =>{
    res.send("Hello World");

})    
```
拆function
```ts
//1st function:
const jasonHandler = (req: Request, res: Response) => {
  res.send("Hello, World, Jason");
};

//2nd function:

const jasonMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("jason middleware");
  next();
};
//3rd combine
app.get("/jason", jasonMiddleware, jasonHandler);

```
404 Error (無handling on the request)
```ts
1. open html file in the public folder (404.html)
2. app.use ((req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"))     
    //__dirname 自己身處位置 + public + 404.html
    //join 埋同一個path 比番send file 比番user
})
```

##Session (HTTP)
由於每次request是獨立不能互通，不知send request 是同一個人
Session 就可以解決這問題(儲係server入面保留內容), 可以知每個user 入左黎幾多次
20個人就有20個conversation, 每個人都有自己一個session id, 利用id 比server 對番
session id 儲左係cookies到 (broswer : MoodleSession, Value(session id))
Session default save in the memory. Restart the programme will clear.

```ts
1. npm i express-session @types/express-session
2. import expressSession from "express-session";
3. 係app 之後，係middleware 之前：
    app.use(expressSession())
4. =========
app.use(
  expressSession({          //set some config here
    secret: "Jason is Handsome",
    resave: true,             // still active/update the session
    saveUninitialized: true, // False = the session still empty, will not store anything
  })
);

5.=========
app.get("/name", (req, res) => {
  const name = req.session["name"];
  if (!name) {                      // check any existing account?
    req.session["name"] = "Jason"; //if new user, then create a new session for him
    res.send("No Name !!!");
    return;
  }
  res.send(name); 
  // you will see "Jason" in 2nd time because the session already exists
});