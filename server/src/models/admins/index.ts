import mongoose from 'mongoose';

//Definir un esquema
const schemaAdmins = new mongoose.Schema({
    name: String,
    password: String
});

//Crear un modelo basado en el esquema
export const modeloAdmins = mongoose.model('admins', schemaAdmins);