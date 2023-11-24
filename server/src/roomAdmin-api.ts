import express from 'express';
import { modeloRooms } from './models/rooms';
import { modeloActivity } from './models/activities';
import { Activity } from './activity';
var crypto = require("crypto");

 const router = express.Router();

// Agregar rooms a la DB
// espera propiedad actividades como array de ids (ids de la base de Mongo)
router.post('/rooms', async function(req, res) {
    const code = crypto.randomBytes(10).toString('hex');
    let actividadesIds = req.body.actividades;
    let actividades: Activity[] = [];
    actividadesIds.forEach(async function(activitId: String) {
        const dbActividad: any = await modeloActivity.findOne({ id: activitId });
        let actividad: Activity = {
            name: dbActividad.name,
            description: dbActividad.description,
            img: dbActividad.img,
            votes: 0
        }
        actividades.push(actividad);
    });
    const roomInfo = new modeloRooms({code: code, players: [], actividades: actividades});
    roomInfo.save().then(room => {
        res.json({code: code});
    }).catch(error => console.error(error))
});

export default router;