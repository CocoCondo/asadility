import mongoose from 'mongoose';

//Definir un esquema
const schemaRooms = new mongoose.Schema({
    code: String
});

//Crear un modelo basado en el esquema
export const modeloRooms = mongoose.model('rooms', schemaRooms);