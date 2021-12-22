import mongoose from 'mongoose';
import { keys } from './keys.js';

// const URL = process.env.MONGODB_URL

export const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(keys.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected on host: ${mongoDB.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}