import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  country_code: { type: String, required: true, uppercase: true, minlength: 2, maxlength: 2 },
  city_name: { type: String, required: true, minlength: 1, maxlength: 80 },
  lat: { type: Number },
  lng: { type: Number }
}, { timestamps: true });

LocationSchema.index({ country_code: 1, city_name: 1 }, { unique: true });

export default model("Location", LocationSchema);
