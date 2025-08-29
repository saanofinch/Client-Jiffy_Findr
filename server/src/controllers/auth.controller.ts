import { Request, Response } from "express";
import { z } from "zod";
import { validate } from "../utils/validate";
import { asyncH } from "../utils/errors";
import { createUser, loginUser } from "../services/auth.service";

const signupSchema = z.object({
  email: z.string().email().min(5).max(254),
  password: z.string().min(8).max(72)
});
const loginSchema = signupSchema;

export const signup = asyncH(async (req: Request, res: Response) => {
  const { email, password } = validate(signupSchema, req.body);
  const data = await createUser(email, password);
  res.status(201).json({ user: data });
});

export const login = asyncH(async (req: Request, res: Response) => {
  const { email, password } = validate(loginSchema, req.body);
  const data = await loginUser(email, password);
  res.json(data);
});
