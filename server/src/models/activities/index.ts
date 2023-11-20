import mongoose from 'mongoose';

//Definir un esquema
const schemaActivities = new mongoose.Schema({
    name: String,
    description:String,
    img:String
});

//Crear un modelo basado en el esquema
export const modeloActivity = mongoose.model('activities', schemaActivities);