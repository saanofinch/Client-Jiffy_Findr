import { config } from "dotenv";
config();
import mongoose from "mongoose";
import Category from "./models/Category";
import Location from "./models/Location";
import Provider from "./models/Provider";
import Listing from "./models/Listing";

async function main() {
  const uri = process.env.MONGO_URI || "";
  await mongoose.connect(uri, { autoIndex: true });

  // categories
  const cats = [
    ["plumbers","Plumbers"],
    ["electricians","Electricians"],
    ["mechanics","Mechanics"]
  ].map(([slug,name])=>({ slug, name, icon_key: slug }));
  for (const c of cats)
    await Category.updateOne({ slug: c.slug }, { $setOnInsert: c }, { upsert: true });

  // locations (NP)
  const cities = ["Kathmandu","Lalitpur","Pokhara"].map(city => ({ country_code: "NP", city_name: city }));
  for (const l of cities)
    await Location.updateOne({ country_code: l.country_code, city_name: l.city_name }, { $setOnInsert: l }, { upsert: true });

  const [catPlum] = await Category.find({ slug: "plumbers" }).lean();
  const [locKtm]  = await Location.find({ country_code: "NP", city_name: "Kathmandu" }).lean();

  // provider
  const prov = await Provider.findOneAndUpdate(
    { display_name: "Rajan Services" },
    { $setOnInsert: { display_name: "Rajan Services", contact_email: "info@rajan.com", current_plan_name: "Premium", verification_status: "verified", rating_avg: 4.6, rating_count: 38 } },
    { upsert: true, new: true }
  ).lean();

  // listings
  const listings = [
    {
      provider: prov?._id,
      title: "Rajan Plumbers",
      slug: "rajan-plumbers",
      category: catPlum?._id,
      location: locKtm?._id,
      short_description: "Emergency and scheduled plumbing services.",
      full_description: "Pipe repair, leak detection, bathroom fitting.",
      contact_preview_masked: { phone: "+977-98******", email: "ra***@ex.com" },
      contact_full: { phone: "+9779812345678", email: "info@rajan.com", website: "https://rajan.example" },
      status: "published",
      badges: { verified: true, featured: true },
      sort_boost: 1
    }
  ];

  for (const l of listings)
    await Listing.updateOne({ slug: l.slug }, { $setOnInsert: l }, { upsert: true });

  console.log("Seed complete");
  await mongoose.disconnect();
}
main().catch(err => { console.error(err); process.exit(1); });
