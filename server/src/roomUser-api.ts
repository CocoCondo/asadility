import express from 'express';
import { modeloRooms } from './models/rooms';

const router = express.Router();

router.get('/rooms/:code/activities', async function(req, res) {
  const roomCode = req.params.code;
  console.log("Este es el roomCode que me llegó: " + roomCode);
  try{
    const room = await modeloRooms.findOne({ code:roomCode });

    if (!room) {
      return res.status(404).json({mensaje: `Sala con código ${roomCode} no encontrada`})
    }

    const activities = room.actividades;

    res.json({activities});
  }catch (error: any){
    res.status(500).json({error: error.message})
  }
})

export default router;