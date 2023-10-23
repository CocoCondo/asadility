import express from 'express';

const router = express.Router();

// Donde guardamos las salas
let rooms = [];

//Agregar rooms a la DB
router.post('/rooms', (req, res) => {
    const room = req.body;
    rooms.push(room);
    console.log(room);
    res.send('Room was added to the database');
});

//Agregar users a un room
router.post('/rooms/:room', (req,res) => {
    const user = req.body;
    console.log(user);
});

router.get('/', (req,res) => {
    console.log("aca ta pegando",req);
    res.send('pum00}');
});

export default router;