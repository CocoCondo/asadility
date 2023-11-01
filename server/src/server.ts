import express from 'express';
import userApi from "./user-api.ts";
import autenticacion from "./autenticacion.ts";
import mongoose from 'mongoose';
import bodyParser from "body-parser";

var app = express();
app.use(express.json());
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

//Conectar a MongoDB
const portDB = 3000;
// mongoose.connect('mongodb://localhost:27017/base_asadility');

//Rutas de la API
app.use("/api", userApi);
app.use(autenticacion);

// app.get('/', function(req: Request, res: Response) {
//     res.send('Hello World')
// });

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});