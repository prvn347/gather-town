import z, { ZodError, nullable, number, optional } from "zod";

import {
  signinUserMeta,
  userMeta,
  userSigninSchema,
  userSignupSchema,
} from "@repo/types/dist/user";

export class userInputParserVarifier {
  static validateUserSignupInput(userDate: userMeta) {
    try {
      const check = userSignupSchema.parse(userDate);
      return check;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error for user input:", error.errors);
      } else {
        console.error("Unexpected error while validating user input:", error);
      }
      throw error;
    }
  }

  static validateUserSigninInput(input: signinUserMeta) {
    try {
      userSigninSchema.parse(input);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error for user input:", error.errors);
      } else {
        console.error("Unexpected error while validating user input:", error);
      }
      throw error;
    }
  }
}
