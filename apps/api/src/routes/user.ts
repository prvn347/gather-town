import { Router, Request, Response } from "express";
import express from "express";
import { userControllers } from "../controllers/user";
import { cookieConfig } from "../configs/cookieConfig";
import { verifyToken } from "../utils/jwtUtils";
import { admin, AuthRequest } from "../middleware/admin";
import { avatarControllers } from "../controllers/avatar";
import { user } from "../middleware/user";

const router: Router = express.Router();

const userController = new userControllers();
const avatarController = new avatarControllers();
router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const result = (await userController.createUser(req.body)) as {
      user: any;
      token: any;
    };

    if (result instanceof Error) {
      return res.status(400).json({ error: "Error while  creating new user" });
    }
    const { user } = result;
    return res.status(200).json({
      user: "user created",
      user_detail: user,
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  try {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
      const result = await userController.findUser(req.body);
      if (result instanceof Error) {
        return res.status(403).json({ error: "Error new while finding user" });
      }
      const { user, token } = result as any;

      return res.status(200).json({ user, token });
    } else {
      const verifiedUser = verifyToken(token);
      return res.status(200).json({ user: verifiedUser, token });
    }
  } catch (error) {
    console.error("Error in /signin route:", error);
    res.status(403).json({ error: "Internal server error" });
  }
});

router.post(
  "/user/metadata",
  user,
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const id = req.user as { userId: string; role: string };
      console.log(JSON.stringify(id));

      const result = await userController.selectAvatar(id.userId, req.body);
      if (result instanceof Error) {
        return res
          .status(400)
          .json({ message: "Error while selecting avatar" });
      }

      return res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
router.get(
  "/user/metadata/bulk",

  async (req: AuthRequest, res: Response) => {
    try {
      const userIdString = (req.query.ids ?? "[]") as string;
      console.log("users are " + userIdString);
      const userIds = userIdString
        .slice(1, userIdString?.length - 1)
        .split(",");

      console.log(userIds);

      const result = await avatarController.getAvatars(
        userIds as Array<string>
      );
      if (result instanceof Error) {
        res.status(400).json("error while selecting avatar");
      }
      res.status(201).json({
        avatars: result,
      });
    } catch (error) {
      res.status(403).json({
        error: error,
      });
    }
  }
);
router.get("/avatars", async (req: Request, res: Response) => {
  try {
    const result = await avatarController.getAllAvatars();
    if (!result) {
      res.status(403).json({ msg: "avatar table is empty" });
      return;
    }
    res.status(200).json({ avatars: result });
  } catch (error) {
    res.status(403).json(error);
  }
});
export default router;
