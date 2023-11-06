import express from 'express';
import userApi from "./user-api.ts";
import adminApi from "./admin-api.ts"
import autenticacion from "./autenticacion.ts";
import connectDB from './db-connect.ts';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

var app = express();
app.use(express.json());
app.use(bodyParser.json());

connectDB();

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

//Rutas de la API
app.use("/api", userApi);
app.use("/api", adminApi);
app.use(autenticacion);

// app.get('/', function(req: Request, res: Response) {
//     res.send('Hello World')
// });

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});
