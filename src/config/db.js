import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('🗄️  MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

connectDB();

export default mongoose;
