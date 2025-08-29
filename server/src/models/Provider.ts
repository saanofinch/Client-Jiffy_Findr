import { Schema, model, Types } from "mongoose";

const ProviderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: false, unique: false },
    display_name: { type: String, required: true, minlength: 2, maxlength: 120, index: true },
    contact_email: { type: String, minlength: 5, maxlength: 254 },
    contact_phone: { type: String, minlength: 7, maxlength: 15 },
    website_url: { type: String, maxlength: 2048 },
    rating_avg: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    current_plan_name: { type: String, enum: ["Basic","Professional","Premium"], default: "Basic" },
    verification_status: { type: String, enum: ["unverified","pending","verified","rejected"], default: "unverified", index: true }
  },
  { timestamps: true }
);

export default model("Provider", ProviderSchema);
