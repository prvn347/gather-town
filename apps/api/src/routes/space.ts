import { Router, Request, Response } from "express";
import { spaceControllers } from "../controllers/space";
import prisma from "../prismaClient";
import { any } from "zod";

const router = Router();
const spaceController = new spaceControllers();
//TODO:add midddleware
router.post("/create", async (req: Request, res: Response): Promise<any> => {
  try {
    //TODO:do validation check here
    const result = await spaceController.createSpace(req.body);
    if (result instanceof Error) {
      return res.status(403).json("error whiel creating space");
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const spaceId = req.params.id as string;

    const result = await spaceController.deleteSpace(spaceId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await spaceController.getAllSpaces();
    if (!result) {
      res.status(200).json({
        msg: "You have no spaces",
      });
    }
    res.status(200).json(result);
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
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error);
  }
});
router.post("/element", async (req: Request, res: Response) => {
  try {
    const result = await spaceController.createSpaceElement(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});
export default router;
