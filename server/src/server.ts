import express from 'express';
import roomUserApi from "./roomUser-api.ts";
import roomAdminApi from "./roomAdmin-api.ts"
import activityApi from "./activity-api.ts";
import autenticacion, { authenticateToken } from "./autenticacion.ts";
import connectDB from './db-connect.ts';
import bodyParser from "body-parser";
import { createServer } from "http";

var app = express();
app.use(express.json());
app.use(bodyParser.json());

//Inicialización del SocketIO
const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
    cors: { origin: "*" },
});
const socketPort = 3000;
let counter = 0;

app.get("/test", (req, res) => {
    console.log("hello world");
    res.send("V 1.1");
});

io.on("connection", (socket: any) => {
    console.log("a user connected");

    socket.on("message", (message: any) => {
        console.log(message);
        io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected!");
    });

    setInterval(() => {
        io.emit("message", Math.random());
        counter++;
    }, 5000);
});

httpServer.listen(socketPort);
//Fin Inicialización del Socket IO

connectDB();

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

//Rutas de la API
app.use(roomUserApi);
app.use("/api", roomAdminApi, authenticateToken);
app.use("/api", activityApi, authenticateToken);
app.use(autenticacion);

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});