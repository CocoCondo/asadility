import userApi from "./user-api.ts";
import adminApi from "./admin-api.ts"
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

var app = express();
const portDB = 3000;

app.use(bodyParser.json());

//Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/base_asadility');

//Rutas de la API
//console.log(adminApi);
app.use("/api", userApi);
app.use("/api", adminApi);

var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})