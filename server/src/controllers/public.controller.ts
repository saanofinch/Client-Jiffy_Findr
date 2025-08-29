import { Request, Response } from "express";
import Category from "../models/Category";
import Location from "../models/Location";

export async function getCategories(_req: Request, res: Response) {
  const cats = await Category.find({ is_active: true })
    .select("name slug icon_key")
    .sort({ name: 1 })
    .lean();
  res.json(cats);
}

export async function getLocations(req: Request, res: Response) {
  const { country, city = "" } = req.query as { country?: string; city?: string };
  const q: any = {};
  if (country) q.country_code = String(country).toUpperCase();
  if (city) q.city_name = new RegExp(`^${String(city)}`, "i");
  const locs = await Location.find(q).limit(25).sort({ city_name: 1 }).lean();
  res.json(locs);
}
