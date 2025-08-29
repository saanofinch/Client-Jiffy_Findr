import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api/v1", routes);

// bare health for quick probe
app.get("/health", (_req, res) => res.json({ ok: true }));
