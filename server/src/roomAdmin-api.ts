import express from 'express';
import { modeloRooms } from './models/rooms';
var crypto = require("crypto");

 const router = express.Router();

//Agregar rooms a la DB
router.post('/rooms', (req, res) => {
    const code = crypto.randomBytes(10).toString('hex');
    const roomInfo = new modeloRooms({code: code, players: req.body.players, actividades: req.body.actividades});
    roomInfo.save().then(room => {
        res.send('room was added to the database');
    }).catch(error => console.error(error))
});

export default router;