import { Router, Request, Response } from "express";
import { spaceControllers } from "../controllers/space";
import prisma from "../prismaClient";
import { any } from "zod";
import { admin, AuthRequest } from "../middleware/admin";
import { user } from "../middleware/user";

const router = Router();
const spaceController = new spaceControllers();
router.use(user);
//TODO:add midddleware
router.post("/", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    //TODO:do validation check here
    const creatorId = req.user as { userId: string };
    const result = await spaceController.createSpace(
      req.body,
      creatorId.userId
    );

    res.status(200).json({
      spaceId: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const result = await spaceController.getAllSpaces();
    if (!result) {
      res.status(200).json({
        msg: "You have no spaces",
      });
    }
    res.status(200).json({
      spaces: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
});
router.delete("/element", async (req: Request, res: Response) => {
  try {
    const result = await spaceController.deleteElement(req.body);

    res.status(200).json({
      msg: "element deleted",
    });
  } catch (error) {
    res.status(403).json(error);
  }
});
router.get("/element", async (req: Request, res: Response) => {
  try {
    const result = await spaceController.getAllElements();
    res.status(200).json({
      elements: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
});
router.post("/element", async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await spaceController.createSpaceElement(req.body);
    if (result instanceof Error) {
      return res.status(400).json({
        msg: "error occured while adding ",
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/:id", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const spaceId = req.params.id as string;

    const user = req.user as { userId: string };
    console.log(spaceId + "and " + user);
    const result = await spaceController.deleteSpace(spaceId, user.userId);

    if (result instanceof Error) {
      return res.status(400).json({
        msg: "space does not exist",
      });
    }
    if (result === "unautherized") {
      return res.status(403).json(" You don't have permissiono to delete ");
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const spaceId = req.params.id as string;
    const result = await spaceController.getSpaceById(spaceId);
    if (result instanceof Error) {
      return res.status(400).json({
        msg: "error while fetching spaces",
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
export default router;
