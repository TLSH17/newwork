import express from "express";
import expressSession from "express-session";
import path from "path";

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
/////
app.use(
  expressSession({
    secret: "XXXX",
    resave: true,
    saveUninitialized: true,
  })
);
//middleware

app.get("/", (req, res, next) => {
  const counter = req.session["counter"];
  if(!req.session["counter"]){
    req.session["counter"] = 1
  } else {
      req.session["counter"] += 1;
  }
  console.log(counter);
  next();
});


//getcard content

app.post('/content',(req,res,next)=>{
  console.log(req.body.mytext);
  res.end("Hi");
  // next();
});



const PORT = 8080


app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})

app.use((req, res) => {
  res.sendFile(path.resolve('./public/404.html'))
})

//192.168.1.112