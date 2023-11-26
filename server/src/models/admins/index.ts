import mongoose from 'mongoose';

const schemaAdmins = new mongoose.Schema({
    username: String,
    password: String
});

export const modeloAdmins = mongoose.model('admins', schemaAdmins);