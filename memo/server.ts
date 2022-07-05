import express from 'express';
import { Request, Response } from 'express';
import expressSession from 'express-session';
// import { Session } from 'express-session'
// import session from 'express-session';

const app = express()

app.use(
    expressSession({
        secret: 'XXXXXXXXXXX',
        resave: true,
        saveUninitialized: true,
    }),
);

//middleWare
app.use("/", (req, res, next) => {
    // console.log(req.session["session"]);
    // const myObj: { [index: string]: any } = {};
    let user = req.session["session"];
    console.log(user)
    // console.log(req.session["session"]);
    next();
});



app.get('/', function (req: Request, res: Response, next) {
    // res.end('Hello World');
    next();
})



const PORT = 8080

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})

app.use(express.static("public"))
