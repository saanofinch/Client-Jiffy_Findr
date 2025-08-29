import { Request, Response } from "express";
import Listing from "../models/Listing";
import Location from "../models/Location";
import { computeScore } from "../utils/scoring";

export async function searchListings(req: Request, res: Response) {
  const { q = "", category, country, city, page = "1", page_size = "12" } = req.query as any;
  const filter: any = { status: "published" };
  if (q) filter.$text = { $search: String(q) };
  if (category) filter.category = category;
  if (country || city) {
    const locQ: any = {};
    if (country) locQ.country_code = String(country).toUpperCase();
    if (city) locQ.city_name = String(city);
    const locIds = await Location.find(locQ).select("_id").lean();
    filter.location = { $in: locIds.map((l) => l._id) };
  }

  const skip = (Number(page) - 1) * Number(page_size);
  const docs = await Listing.find(filter)
    .skip(skip).limit(Number(page_size))
    .populate("provider")
    .lean();

  const scored = docs.map((d) => ({ ...d, _score: computeScore(d) }))
                     .sort((a, b) => b._score - a._score);

  res.json({ page: Number(page), page_size: Number(page_size), total: scored.length, results: scored });
}

export async function getListingBySlug(req: Request, res: Response) {
  const { slug } = req.params as { slug: string };
  const doc = await Listing.findOne({ slug }).populate("provider category location").lean();
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json(doc);
}
