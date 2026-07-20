import mongoose from "mongoose"
import { ENV } from "./env"

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Mongodb connected successfuly")

    } catch (error) {
        console.error("Mongodb connection failed", error);
        process.exit(1)
    }
}