import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String, required: true, unique: true, lowercase: true,
      minlength: 5, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    passwordHash: { type: String, required: true, minlength: 60, maxlength: 120 },
    role: { type: String, enum: ["visitor","provider_owner","admin"], default: "provider_owner", index: true },
    phone: { type: String, minlength: 7, maxlength: 15 },
    status: { type: String, enum: ["active","suspended","deleted"], default: "active" }
  },
  { timestamps: true }
);

export default model("User", UserSchema);
