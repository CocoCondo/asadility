import express, { Request, Response } from 'express';
import userApi from "./user-api.ts";
import authentication from "./authentication.ts";

var app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

app.use("/", userApi);
app.use(authentication);

// app.get('/', function(req: Request, res: Response) {
//     res.send('Hello World')
// });

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});