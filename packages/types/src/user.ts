import { string, z } from "zod";

export type userMeta = {
  password: string;
  username: string;
  type: "admin" | "user";
};
export type signinUserMeta = {
  username: string;
  password: string;
};

export const userSignupSchema = z.object({
  type: z.string(),
  password: z.string().min(5),
  username: z.string(),
});

export const userSigninSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});
