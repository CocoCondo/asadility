import express from 'express';
var mongo = require('mongodb');
import { modeloRooms } from './models/rooms';
import { modeloActivity } from './models/activities';
var crypto = require("crypto");

 const router = express.Router();

// Agregar rooms a la DB
// espera propiedad actividades como array de ids (ids de la base de Mongo)
router.post('/rooms', async function(req, res) {
    const code = crypto.randomBytes(10).toString('hex');
    let actividadesIds = req.body.actividades;

    try {
        let actividades = await Promise.all(
            actividadesIds.map(async (actividadId: String, index: number) => {
                const dbActividad: any = await modeloActivity.findById(new mongo.ObjectId(actividadId));
                return {
                    id: index,
                    name: dbActividad.name,
                    description: dbActividad.description,
                    img: dbActividad.img,
                    votes: 0
                };
            })
        );

        const roomInfo = new modeloRooms({ code: code, players: [], actividades: actividades });
        await roomInfo.save();
        res.json({ code: code });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;