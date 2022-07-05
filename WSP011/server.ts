import express from 'express';
import pg from 'pg';
import { expressSessionMiddleware } from "./session";



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(expressSessionMiddleware);

app.get('/', (req, res) => {
    if (!req.session["user"]) {
        console.log("you are here first time");
        req.session["user"] = "old user";
    } else {
        console.log("gg")
    }
    res.send("success");
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log("listening at http://localhost:${PORT}");
})