import express from "express";
import type { Request, Response } from "express";
import path from "path";
import jsonfile from "jsonfile";
import formidable from "formidable"
import fs from "fs";


const app = express();

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') ||part.mimetype?.startsWith('application/pdf') || false,
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("middleware 1");
  console.log(`method: ${req.method} path: ${req.path} ip: ${req.ip}`);
  next();
});

//
// ############
// Request Demo
// ############
//
// Query
app.get("/", function (req: Request, res: Response) {
  console.log("one");
  const name = req.query.name;
  const location = req.query.location;
  res.end(`Name is ${name}, Location is ${location}`);
});

// Param
app.get("/name/:name/loc/:location", (req, res) => {
  console.log("two");
  const name = req.params.name;
  const location = req.params.location;
  res.end(`Name is ${name}, Location is ${location}`);
});

app.get("/addName/:name/loc/:location", (req, res) => {
  console.log("three");
  const name = req.params.name;
  const location = req.params.location;

  // write something into Database

  res.end(`Name is ${name}, Location is ${location}`);
});

// Body
app.post("/name", (req, res) => {
  console.log("hi");
  const { name, location } = req.body;
  // const input_name = req.body.name;
  // const input_location = req.body.location;
  res.end(`Name is ${name}, Location is ${location}`);
});

//
// ###############
// Response Demo
// ###############
//
app.post("/addUser", async (req, res) => {
  console.log("bye");
  const { name, location, age } = req.body;

  let users = await jsonfile.readFile(path.join(__dirname, "users.json"));
  users.push({
    username: name,
    location: location,
    age: age,
  });
  await jsonfile.writeFile(path.join(__dirname, "users.json"), users, {
    spaces: 2,
  });



  res.send("success");
});

app.get('/users',async (req,res)=>{
    const users = await jsonfile.readFile(path.join(__dirname,"users.json"));
    res.json(users);
});
app.get('/usersFile',(req,res)=>{
    res.sendFile(path.join(__dirname,"users.json"))
})
app.get('/candy',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","candy_add_oil.gif"))

})

app.get('/redirect',(req,res)=>{
    res.redirect('/users')
})



//
// ###############
// Form Demo
// ###############
//
// app.post('/contact', (req, res) => {
//   // Console log the request body to see what is inside!
//   console.log('contact hihihi')
//   console.log(req.body)
//   let {firstName, lastName} = req.body;
//   console.log("hi this is", firstName, lastName)
//   res.end('Hello World')
// })

//
// ###############
// File Upload Demo
// ###############
//
app.post('/contact', (req, res) => {
  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files })
    
    res.send(fields.firstName)
  })
})

// PUT IT AT THE BOTTOM!!!
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});
