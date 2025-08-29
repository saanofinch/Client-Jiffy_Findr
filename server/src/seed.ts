import { config } from "dotenv";
config();
import mongoose from "mongoose";
import Category from "./models/Category";
import Location from "./models/Location";

async function main() {
  const uri = process.env.MONGO_URI || "";
  await mongoose.connect(uri, { autoIndex: true });

  const categories = [
    ["plumbers","Plumbers"],
    ["electricians","Electricians"],
    ["restaurants","Restaurants"],
    ["tutors","Tutors"],
    ["mechanics","Mechanics"],
    ["salons","Salons"],
    ["doctors","Doctors"],
    ["photographers","Photographers"],
    ["cleaning","Cleaning Services"],
    ["construction","Construction"]
  ].map(([slug, name]) => ({ slug, name, icon_key: slug }));

  for (const c of categories) {
    await Category.updateOne({ slug: c.slug }, { $setOnInsert: c }, { upsert: true });
  }

  const npCities = [
    "Kathmandu","Lalitpur","Bhaktapur","Pokhara","Biratnagar","Birgunj","Bharatpur",
    "Butwal","Hetauda","Nepalgunj","Janakpur","Dhangadhi","Itahari","Dharan"
  ].map(city => ({ country_code: "NP", city_name: city }));

  for (const l of npCities) {
    await Location.updateOne(
      { country_code: l.country_code, city_name: l.city_name },
      { $setOnInsert: l },
      { upsert: true }
    );
  }

  console.log("Seed complete");
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
