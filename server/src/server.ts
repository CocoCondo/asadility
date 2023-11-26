import express from 'express';
import roomUserApi from "./roomUser-api.ts";
import roomAdminApi from "./roomAdmin-api.ts"
import activityApi from "./activity-api.ts";
import autenticacion, { authenticateToken } from "./autenticacion.ts";
import connectDB from './db-connect.ts';
import bodyParser from "body-parser";
import { createServer } from "http";
import { Activity } from './activity.ts';
import { Player } from './player.ts';
import { modeloRooms } from './models/rooms/index.ts';

var app = express();
app.use(express.json());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
    cors: { origin: "*" },
});
const socketPort = 3000;

var players: Player[];

io.on("connection", (socket: any) => {
    socket.on('joinroom', async function(data: any) {
        let roomId = data.roomId;
        console.log(data.player, " entro a la sala")
        socket.join(roomId);
        let newPlayer = {
            id: socket.id,
            name: data.player
        }
        await modeloRooms.updateOne(
            { code: roomId }, 
            { $push: { players: newPlayer } },
        );
        const room = await modeloRooms.findOne({ code:roomId });
        io.to(roomId).emit("playerJoined", room?.players);
    });

    socket.on("startVote",  async function(data: any) {
        let roomId = data.roomId
        const room = await modeloRooms.findOne({ code:roomId });
        let actividades: Activity[] = room?.actividades || [];
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < actividades.length) {
            const a = actividades[index];
            io.emit("nextAvtivity", a);
            index++;
            } else {
            clearInterval(intervalId);
            io.to(roomId).emit("goBackToLobby", data.roomId); //volver para mostrar resultados
            }
        }, 5000);
    });

    socket.on("vote", async function(data: any) {
        const roomId = data.roomId;
        const actividadId = data.actividadId;
        await modeloRooms.updateOne(
            { code: roomId, 'actividades.id': Number(actividadId) },
            {
                $inc: {
                'actividades.$.votes': 1,
                },
            }
        );
    });
});


httpServer.listen(socketPort);

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