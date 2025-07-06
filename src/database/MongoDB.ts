import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("Please define the DB_URI environment variable in .env");
}

type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  __mongoose: MongooseCache;
};

if (!globalWithMongoose.__mongoose) {
  globalWithMongoose.__mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.__mongoose;

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose
      .connect(DB_URI as string, opts)
      .then((mongoose) => {
        console.log("DataBase connected successfully");
        return mongoose.connection;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
