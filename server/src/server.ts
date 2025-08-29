import { config } from "dotenv";
config();
import http from "http";
import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

(async () => {
  await connectDB(MONGO_URI);
  http.createServer(app).listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
})();
