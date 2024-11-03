import { Router, Request, Response } from "express";
import express from "express";
import { userControllers } from "../controllers/user";
import { cookieConfig } from "../configs/cookieConfig";
import { verifyToken } from "../utils/jwtUtils";
import { admin, AuthRequest } from "../middleware/admin";

const router: Router = express.Router();

const userController = new userControllers();
router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const result = (await userController.createUser(req.body)) as {
      user: any;
      token: any;
    };

    res.cookie("token", result.token, cookieConfig);

    if (result instanceof Error) {
      return res.status(403).json({ error: "Error while  creating new user" });
    }
    const { user } = result;
    return res.status(201).json({
      user: "user created",
      user_detail: user,
    });
  } catch (error) {
    res.status(403).json({ error: error });
  }
});

router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies || !cookies.includes("token=")) {
      const result = await userController.findUser(req.body);
      if (result instanceof Error) {
        return res.status(403).json({ error: "Error new while finding user" });
      }
      const { user, token } = result as any;

      res.cookie("token", token, cookieConfig);
      return res.status(201).json({ user });
    } else {
      const token = cookies.split("=")[1];
      const verifiedUser = verifyToken(token);
      return res.status(201).json({ user: verifiedUser });
    }
  } catch (error) {
    console.error("Error in /signin route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/avatar/me", admin, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { avatarId } = req.body;
    console.log(userId);
  } catch (error) {}
});
export default router;
