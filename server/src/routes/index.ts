import { Router } from "express";
import { getCategories, getLocations } from "../controllers/public.controller";

const r = Router();

r.get("/health", (_req, res) => res.json({ ok: true, api: "v1" }));
r.get("/categories", getCategories);
r.get("/locations", getLocations);

export default r;
