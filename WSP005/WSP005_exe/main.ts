import express from "express";
import expressSession from "express-session";
import path from "path";
import { format } from 'date-fns';
import chalk from "chalk"; // need to change the version in package.json 4.1.2
import type { Request, Response } from "express";
// import { readJsonConfigFile } from "typescript";
// import fs from "fs";

// console.log(chalk.cyan("HI"));
const app = express()
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

////new Memo



app.get('/',function(req:Request,res:Response){
  console.log('hihihihihi')
  const name = req.query.fname;
  const location = req.query.lanme
  res.end(`Name is ${name}, Location is ${location}`);
})









// const users =  jsonfile.readFile(path.join(__dirname,"users.json"));
// users.push({
//     username:"peter",
//     password:"peter",
//     level:"user"
// });
//  jsonfile.writeFile(path.join(__dirname,"users.json"),users,{spaces:2});



///
app.get("/",(req, res, next) => {
  let today = format(new Date(), 'yyyy-MM-dd kk:mm:ss')
    console.log(`Refresh time: ${today}`)
    next();
  },
);

app.use((req, res, next) => {  
  let time = format(new Date(), 'yyyy-MM-dd kk:mm:ss')
  let bluetime = chalk.cyan(time)

  console.log(` [${bluetime}] : Request ${req.path}`);
  next();
});


const PORT = 8080


app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})

app.use((req, res) => {
  res.sendFile(path.resolve('./public/404.html'))
})

//192.168.1.112