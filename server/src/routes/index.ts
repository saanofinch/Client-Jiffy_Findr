import { Router } from "express";
import { getCategories, getLocations } from "../controllers/public.controller";
import auth from "./auth.routes";
import { searchListings, getListingBySlug } from "../controllers/listing.controller";

const r = Router();

r.get("/health", (_req, res) => res.json({ ok: true, api: "v1" }));
r.use("/auth", auth);

r.get("/categories", getCategories);
r.get("/locations", getLocations);

r.get("/listings", searchListings);
r.get("/listings/:slug", getListingBySlug);

export default r;
