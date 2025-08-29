import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 2, maxlength: 80 },
  slug: { type: String, required: true, unique: true, lowercase: true, minlength: 2, maxlength: 80 },
  icon_key: { type: String, maxlength: 64 },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 }, { unique: true });

export default model("Category", CategorySchema);
