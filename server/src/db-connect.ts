import mongoose from 'mongoose';

const uri = "mongodb+srv://server-app:wBtKMnn4b3aJfH1H@asadilitycluster.upyiygz.mongodb.net/asadility?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
        });
        console.log('MongoDB conectado');
    } catch(error){
        console.error('Error conectando al mongo', error);
    }
}

export default connectDB;