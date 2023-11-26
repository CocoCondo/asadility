import express from 'express';
import { modeloRooms } from './models/rooms';

const router = express.Router();

router.get('/rooms/:code/players', async function(req, res) {
  const roomCode = req.params.code;
  try{
    const room = await modeloRooms.findOne({ code:roomCode });

    if (!room) {
      return res.status(404).json({mensaje: `Sala con código ${roomCode} no encontrada`})
    }

    const players = room.players;

    res.json({players});
  }catch (error: any){
    res.status(500).json({error: error.message})
  }
})

export default router;