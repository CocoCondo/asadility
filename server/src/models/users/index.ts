import mongoose from 'mongoose';

const schemaUsers = new mongoose.Schema({
    name: String,
});

export const modeloUsers = mongoose.model('users', schemaUsers);