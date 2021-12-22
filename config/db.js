import mongoose from 'mongoose';

// const URL = process.env.MONGODB_URL
const URL = 'mongodb://localhost:27017/instagram-clone-v2';

export const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected on host: ${mongoDB.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}