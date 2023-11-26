import mongoose from 'mongoose';

const schemaRooms = new mongoose.Schema({
    code: String,
    players: [],
    actividades: []
});

export const modeloRooms = mongoose.model('rooms', schemaRooms);