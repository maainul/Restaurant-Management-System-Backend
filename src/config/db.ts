import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/rmsdb';

export const connectDB = async () => {
    try {
       console.log("Trying to Connect Mongo DB ....");
       const conn= await mongoose.connect(mongoURL as string);
       console.log( `Conneted To Mongodb Databse ${conn.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

export default connectDB
