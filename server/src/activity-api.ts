import express, { Request, Response } from 'express';
import { modeloActivity } from './models/activities';
import { modeloRooms } from './models/rooms';

const router = express.Router();

// Obtener lista de actividdes del sistema
router.get('/actividades',  async (req, res) => {
    try {
        const actividades = await modeloActivity.find();

        // Verificar si se encontró la sala
        if (!actividades) {
            return res.status(404).json({ mensaje: `Actividades no encontradas` });
        }
        res.json({ actividades });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener lista de actividdes de una propuesta
router.get('/rooms/:code/actividades', async function(req: Request, res: Response) {
    try{
      const roomCode = req.params.code;
      const room = await modeloRooms.findOne({ code: roomCode });
      if (room) {
        res.status(200).json(room.actividades);
      } else {
        res.status(400).json('Sala no existe');
      }
    } 
    catch(error: any) {
        res.status(500).json({ error: error.message });
    }
  })
  
  // Agregar actividad
  router.post('/actividades', function(req: Request, res: Response) {
    const newActividad = new modeloActivity(req.body);
      newActividad.save().then(actividad => {
        res.send('Actividad agregada');
      }).catch(error => res.status(500).json({ error: error.message }))
  });

export default router;
