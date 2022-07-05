import express from "express";
// import type { Request, Response } from "express";
import path from "path";
import formidable from "formidable";
import fs from "fs";

import  {responseDemoRoutes} from "./routers/responseDemoRoutes";
import {requestDemoRoutes} from "./routers/requestDemoRoutes";

const app = express();

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') ||part.mimetype?.startsWith('application/pdf') || false,
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(responseDemoRoutes);
app.use(requestDemoRoutes);


//
// ###############
// Form Demo
// ###############
//
// app.post('/contact', (req, res) => {
//   // Console log the request body to see what is inside!
//   console.log('contact hihihi')
//   console.log(req.headers)
//   console.log(req.body)
//   let {firstName, lastName,email,age,description} = req.body;
//   console.log("hihihihi",lastName,email,age,description)
  
//   let html_content = `<h1>Hi i am ${firstName}, my age is ${age},desc: ${description}</h1>`

//   res.json(html_content)
// })

//
// ###############
// File Upload Demo
// ###############

app.post('/contact', (req, res) => {
  console.log("check check req",req)

  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files })
    

    res.json({ success: true })
  })
})

app.use(express.static('public'))

// PUT IT AT THE BOTTOM!!!
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});
