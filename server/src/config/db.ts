import mongoose from "mongoose";

export async function connectDB(uri: string) {
  if (!uri) throw new Error("MONGO_URI missing");
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connect error:", err);
    process.exit(1);
  }
}
