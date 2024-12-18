import { MongoClient } from "mongodb";
import "dotenv/config";

const clientDb = new MongoClient(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
});

export async function connectDB() {
  try {
    await clientDb.connect();
    console.log("Successfully connected to mobile-app DMS_db!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export { clientDb };
