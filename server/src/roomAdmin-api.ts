import express from 'express';
import { modeloRooms } from './models/rooms';


 const router = express.Router();

//Agregar rooms a la DB
router.post('/rooms', (req, res) => {
    const roomInfo = new modeloRooms(req.body);
    roomInfo.save().then(room => {
        console.log(room)
    }).catch(error => console.error(error))
    res.send('room was added to the database');
});

export default router;