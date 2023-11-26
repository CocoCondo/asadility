import mongoose from 'mongoose';

const schemaActivities = new mongoose.Schema({
    name: String,
    description:String,
    img:String
});

export const modeloActivity = mongoose.model('activities', schemaActivities);