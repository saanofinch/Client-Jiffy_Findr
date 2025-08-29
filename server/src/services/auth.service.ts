import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User from "../models/User";
import { HttpError } from "../utils/errors";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "change_me";
const JWT_EXPIRES = (process.env.JWT_EXPIRES || "7d") as SignOptions["expiresIn"];

export async function createUser(email: string, password: string) {
  const exists = await User.findOne({ email });
  if (exists) throw new HttpError(409, "email already registered");
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, role: "provider_owner" });
  return { id: user.id, email: user.email, role: user.role };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(401, "invalid credentials");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new HttpError(401, "invalid credentials");

  const payload = { sub: user.id, role: user.role } as const;
  const options: SignOptions = { expiresIn: JWT_EXPIRES };
  const token = jwt.sign(payload, JWT_SECRET, options);

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}
