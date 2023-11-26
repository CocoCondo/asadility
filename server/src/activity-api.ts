import express, { Request, Response } from 'express';
import { modeloActivity } from './models/activities';
import { modeloRooms } from './models/rooms';

const router = express.Router();

router.get('/actividades',  async (req, res) => {
    try {
        const actividades = await modeloActivity.find();

        if (!actividades) {
            return res.status(404).json({ mensaje: `Actividades no encontradas` });
        }
        res.json({ actividades });
    } catch (error: any) {
        res.status(500).json({message: "No se pudo obtener las actividades"});
    }
});

router.get('/rooms/:code/actividades', async function(req: Request, res: Response) {
    try{
      const roomCode = req.params.code;
      const room = await modeloRooms.findOne({ code: roomCode });
      if (room) {
        res.status(200).json(room.actividades);
      } else {
        res.status(404).json('Sala no existe');
      }
    } 
    catch(error: any) {
        res.status(500).json({message: "No se pudo obtener las actividades"});
    }
  })
  
  router.post('/actividades/crear', function(req, res) {
    const newActividad = new modeloActivity({
      name:req.body.titulo,
      description:req.body.descripcion,
      img:req.body.img   
    });
    newActividad.save()
      .then(actividad => {
        res.status(201).json({ mensaje: 'Actividad agregada con éxito', actividad: actividad });
      })
      .catch(error => res.status(500).json({message: "No se pudo crear la actividad"}));
  });

export default router;
