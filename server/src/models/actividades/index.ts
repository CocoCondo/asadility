import mongoose from 'mongoose';

//Definir un esquema
const schemaActividades = new mongoose.Schema({
    name: String,
});

//Crear un modelo basado en el esquema
export const modeloActividades = mongoose.model('actividades', schemaActividades);