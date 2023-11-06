import express, { Request, Response } from 'express';
import { modeloActividades } from './models/actividades';
import { modeloRooms } from './models/rooms';

const router = express.Router();

// Obtener lista de actividdes del sistema
router.get('/actividades', async function(req: Request, res: Response) {
  const actividades = await modeloActividades.find();
  res.send(actividades);
})

// Obtener lista de actividdes de una propuesta
router.get('rooms/:room/actividades', async function(req: Request, res: Response) {
  try{
    const roomCode = req.params.code;
    const room = await modeloRooms.findOne({ code: roomCode });
    if (room) {
      res.send(room.actividades);
    } else {
      res.status(400).send('Sala no existe');
    }
  } 
  catch {
    console.log("No se encontraron actividades para esta sala")
  }
})

// Agregar actividad
router.post('/actividades', function(req: Request, res: Response) {
  const newActividad = new modeloActividades(req.body);
    newActividad.save().then(actividad => {
        console.log(actividad)
    }).catch(error => console.error(error))
    res.send('Actividad agregada');
});

export default router;