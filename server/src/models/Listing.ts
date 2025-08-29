import { Schema, model, Types } from "mongoose";

const ContactPreview = new Schema({
  phone: { type: String, maxlength: 15 },
  email: { type: String, maxlength: 254 }
},{ _id:false });

const ContactFull = new Schema({
  phone: { type: String, maxlength: 15 },
  email: { type: String, maxlength: 254 },
  whatsapp: { type: String, maxlength: 15 },
  website: { type: String, maxlength: 2048 }
},{ _id:false });

const Badges = new Schema({
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }
},{ _id:false });

const ListingSchema = new Schema(
  {
    provider: { type: Types.ObjectId, ref: "Provider", required: true, index: true },
    title: { type: String, required: true, minlength: 2, maxlength: 120 },
    slug:  { type: String, required: true, unique: true, lowercase: true, minlength: 3, maxlength: 80 },
    category: { type: Types.ObjectId, ref: "Category", required: true, index: true },
    location: { type: Types.ObjectId, ref: "Location", required: true, index: true },
    short_description: { type: String, maxlength: 240 },
    full_description: { type: String, maxlength: 4000 },
    contact_preview_masked: { type: ContactPreview, default: {} },
    contact_full: { type: ContactFull, default: {} },
    status: { type: String, enum: ["draft","published","suspended"], default: "published", index: true },
    badges: { type: Badges, default: {} },
    sort_boost: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// text search on title + short_description
ListingSchema.index({ title: "text", short_description: "text" });

export default model("Listing", ListingSchema);
