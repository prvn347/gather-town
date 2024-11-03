import { Router, Request, Response } from "express";
import { avatarControllers } from "../controllers/avatar";

const router = Router();
const avatarContrller = new avatarControllers();
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await avatarContrller.getAllAvatars();
    if (!result) {
      res.status(403).json({ msg: "avatar table is empty" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error);
  }
});
router.get("/bulk", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    //TODO: why it is getting string instead of array.

    if (id != typeof Array<string>) {
      res.status(402).json({
        msg: "invalid json",
      });
    }
    console.log(id + typeof id);
    const result = await avatarContrller.getAvatars(id as Array<string>);

    res.status(201).json(result);
  } catch (error) {
    res.status(403).json({
      error: error,
    });
  }
});
export default router;
