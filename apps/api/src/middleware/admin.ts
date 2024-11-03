import { NextFunction, Request, RequestHandler, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import cookie from "cookie";
import { verifyToken } from "../utils/jwtUtils";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const admin: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const cookies = req.headers.cookie;

  if (typeof cookies !== "string") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Parse cookies safely since cookies is now guaranteed to be a string
  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.token;
  console.log(token);

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
