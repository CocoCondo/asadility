import express from 'express';
import { modeloActivity } from './models/activities';

const router = express.Router();

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

export default router;
