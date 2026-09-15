import dns from "dns";
import { MongoClient } from "mongodb";
import { MONGO_URI, DB_NAME } from "../config/config.js";

// Use public DNS to resolve MongoDB Atlas SRV records reliably on Windows/ISPs
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient(MONGO_URI);
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`MongoDB connected successfully to database: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not connected. Please connect to MongoDB first.");
  }
  return db;
}
