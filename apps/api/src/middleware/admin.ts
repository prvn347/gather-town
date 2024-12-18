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
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  console.log(token);

  if (!token) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token) as JwtPayload;
    if (payload.role !== "Admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: "Unauthorized" });
  }
};
