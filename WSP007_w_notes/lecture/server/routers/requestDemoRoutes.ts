import express from "express";

export const requestDemoRoutes = express.Router()

//
// ############
// Request Demo
// ############
//
// Query
requestDemoRoutes.get("/", function (req, res) {
    // console.log("one");
    // const name = req.query.name;
    // const location = req.query.location;
    // res.end(`Name is ${name}, Location is ${location}`);
    res.redirect("/index.html");
  });
  
  // Param
  requestDemoRoutes.get("/name/:name/loc/:location", (req, res) => {
    console.log("two");
    const name = req.params.name;
    const location = req.params.location;
    res.end(`Name is ${name}, Location is ${location}`);
  });
  
  requestDemoRoutes.get("/addName/:name/loc/:location", (req, res) => {
    console.log("three");
    const name = req.params.name;
    const location = req.params.location;
    
    // write something into Database
  
    res.end(`Name is ${name}, Location is ${location}`);
  });
  
  // Body
  requestDemoRoutes.post("/name", (req, res) => {
    console.log("hi");
    const { name, location } = req.body;
    // const input_name = req.body.name;
    // const input_location = req.body.location;
    res.end(`Name is ${name}, Location is ${location}`);
  });
  