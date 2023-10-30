import mongoose from 'mongoose';

//Definir un esquema
const schemaUsers = new mongoose.Schema({
    name: String,
});

//Crear un modelo basado en el esquema
export const modeloUsers = mongoose.model('users', schemaUsers);