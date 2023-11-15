import express from 'express';
import roomUserApi from "./roomUser-api.ts";
import roomAdminApi from "./roomAdmin-api.ts"
import activityApi from "./activity-api.ts";
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
app.use("/api", roomUserApi);
app.use("/api", roomAdminApi);
app.use("/api", activityApi);
app.use(autenticacion);

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});