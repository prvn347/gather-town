import { Router, Request, Response } from "express";
import { adminControllers } from "../controllers/admin";
import { admin } from "../middleware/admin";

const router = Router();
//TODO:add middleware

router.use(admin);
const adminController = new adminControllers();
router.post("/map", async (req: Request, res: Response) => {
  try {
    const result = await adminController.createMap(req.body);
    if (result instanceof Error) {
      res.status(500).json({ msg: "error in map creation" });
      return;
    }
    res.status(200).json({
      id: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
});

router.post("/avatar", async (req: Request, res: Response) => {
  try {
    const result = await adminController.addAvatar(req.body);
    if (result instanceof Error) {
      res.status(500).json({ msg: "error in avatar creation" });
      return;
    }
    res.status(200).json({
      avatarId: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
});
router.post("/element", async (req: Request, res: Response) => {
  try {
    const result = await adminController.addElement(req.body);

    if (result instanceof Error) {
      res.status(500).json({ msg: "error in element creation" });
      return;
    }
    res.status(200).json({ id: result });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put("/element/:elementId", async (req: Request, res: Response) => {
  try {
    const elementId = req.params.elementId as string;

    const result = await adminController.updateElement(elementId, req.body);
    if (result instanceof Error) {
      res.status(500).json({ msg: "error in element creation" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error);
  }
});

export default router;
