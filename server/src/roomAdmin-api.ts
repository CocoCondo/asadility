import express from 'express';
var mongo = require('mongodb');
import { modeloRooms } from './models/rooms';
import { modeloActivity } from './models/activities';
var crypto = require("crypto");

 const router = express.Router();

router.post('/rooms', async function(req, res) {
    const code = crypto.randomBytes(10).toString('hex');
    let actividadesIds = req.body;

    try {
        let actividades = await Promise.all(
            actividadesIds.map(async (actividadId: String, index: number) => {
                const dbActividad: any = await modeloActivity.findById(new mongo.ObjectId(actividadId));
                return {
                    _id: index,
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
        res.status(500).send({error: 'No se pudo crear la sala'});
    }
});


export default router;