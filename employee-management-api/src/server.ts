import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/database";

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};
startServer();
