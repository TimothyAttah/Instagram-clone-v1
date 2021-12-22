const mongoose = require('mongoose');
const keys = require('./dev'); 

// const URL = process.env.MONGODB_URL

const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(keys.mongoURL, {
			useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    } );
    console.log(`MongoDB connected on host: ${mongoDB.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = { connectDB };