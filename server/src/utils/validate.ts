import { ZodSchema } from "zod";
import { HttpError } from "./errors";

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const r = schema.safeParse(data);
  if (!r.success) throw new HttpError(400, r.error.issues.map(i => i.path.join(".")+": "+i.message).join("; "));
  return r.data;
}
