import mongoose from "mongoose";

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.log("error connecting to MongoDB: ", error);
  }
};

export default connectMongoDB;
