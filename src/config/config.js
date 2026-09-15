import dotenv from "dotenv";

const envFile = `.env.${(process.env.NODE_ENV || "dev").toLowerCase()}`;
dotenv.config({ path: envFile });

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
export const DB_NAME = process.env.DB_NAME || "assignment7_db";
