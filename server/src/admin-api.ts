import express from 'express';
import { modeloAdmins} from '../src/models/admins/index';
import { modeloRooms } from './models/rooms';


const router = express.Router();

router.post("/addAdmin", (req, res) => {
    const adminInfo = new modeloAdmins(req.body);
    adminInfo.save().then(admin => {
        console.log(admin)
    }).catch(error => console.error(error)) 
    res.send('Admin was added to the database');
});

//Agregar rooms a la DB
router.post('/rooms', (req, res) => {
    const roomInfo = new modeloRooms(req.body);
    roomInfo.save().then(room => {
        console.log(room)
    }).catch(error => console.error(error))
    res.send('room was added to the database');
});

export default router;