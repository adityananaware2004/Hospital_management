import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Hospital_management",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};