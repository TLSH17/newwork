import express from "express";
import path from "path";
import jsonfile from "jsonfile";

export const responseDemoRoutes = express.Router()

//
// ###############
// Response Demo
// ###############
//
responseDemoRoutes.post("/addUser", async (req, res) => {
    console.log("bye");
    const { name, location, age } = req.body;
  
    let users = await jsonfile.readFile(path.join(__dirname, "../users.json"));
    users.push({
      username: name,
      location: location,
      age: age,
    });
    await jsonfile.writeFile(path.join(__dirname, "../users.json"), users, {
      spaces: 2,
    });
  
    res.send("success");
  });
  
  responseDemoRoutes.get('/users',async (req,res)=>{
      const users = await jsonfile.readFile(path.join(__dirname,"../users.json"));
      res.json(users);
  });
  responseDemoRoutes.get('/usersFile',(req,res)=>{
      res.sendFile(path.join(__dirname,"../users.json"))
  })
  responseDemoRoutes.get('/candy',(req,res)=>{
      res.sendFile(path.join(__dirname,"../public/img","candy_add_oil.gif"))
  
  })
  
  responseDemoRoutes.get('/redirect',(req,res)=>{
      res.redirect('/users')
  })
  