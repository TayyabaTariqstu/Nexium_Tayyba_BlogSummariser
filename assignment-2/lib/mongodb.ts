import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectMongo() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

const BlogSchema = new mongoose.Schema({
  blogUrl: String,
  fullText: String,
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
