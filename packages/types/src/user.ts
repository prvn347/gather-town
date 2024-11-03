import { string, z } from "zod";

export type userMeta = {
  password: string;
  name: string;
  email: string;
};

export const userSignupSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
