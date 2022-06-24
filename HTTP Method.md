##HTTP Method
```
1. Get : Retriev Resource
2. Post : create new resource
3. Put : update existing resource
4. Delete : deleting existing resource
```
##Insomnia
Tool for testing HTTP Request/Response (4 HTTP method)


##Request
```
1. body 
    放json string 入個body -> Server
    CANNOT use with HTTP "GET"!!
    
    E.g(Server):
    app.post('/name',(req,res)=>{
        cons myBody = req.body;
        console.log(myBody)
    }

```

```
2. params (一定要provide data 的地方)
    係url 後面打

    E.g(browser):
    /name/Tecky/loc/HK
    /name/Tecky.io/loc/JP

    Serverside:
    app.get("/name/:name/loc/:location",...)
    const myName = req.params.name
    const myLocation = req.params.location
```    

```
3. query
    - Only use on "Get" method
    係url後面打(?)
    XXXX?key=value   key是自己改
    XXXX?key1=value&key2=value

    E.g(browser):
    XXX?name=Tecky&location=HK

    Serverside:
    const myName = req.query.name
    const myLocation = req.query.location
```
##Response
```
200 OK: Successful result
201 Created: just created new instance
400: error
401 : target unauthorized
500: internal server error
```
Server side reply to user
```ts

res.status(200).json({message:"Meow})
```
**普遍用JSON 去作為API 溝通(之前用xml)

##Form Submission
Input multiple values and submit at the same time
Eg. login form (id, password)

On HTML:
-action (想send 去邊條route/pattern) 
-method (HTML method)

-input type='submit' text,password....

```html
<form action="/contact" method="POST" id="contact-form">
    ...
    <input type='submit' value="Submit">
</form>
```
Transfer to form-urlencoded -> Server

##Express處理
```ts
app.use(express.urlencoded({extended:ture})); // need this for form submissions
app.use(express.json());      

app.post('/contact',(req,res) => {
    ...
    res.redirect("/other-page.html")//Redirect to other page
})
```
##MULTER (Middleware - Upload files)
enctype="multipart/form-data"
transfer to multipart<type>, boundary="boundary"
要裝Multer 去處理files
install multer & @types/multer

html:
```html
<form action="/contact" method="POST" id="contact-form"
enctype="multipart/form-data">
...
</form>
```

ts:
```ts
import multer from 'multer';
const upload = multer(...) //...configuration

app.post('/contact', upload.single('profile'), (reg,res) =>{ 
    //中間位置: .single & profile 隨意修改不過影響front-end處理
    console.log(req.file.key); //get the name of the file
    console.log(req.body); //other fields are in req.body

})
```