import { Application, Request, Response, Router } from "express";
import userRoutes from "./user";
import spaceRoutes from "./space";
import avatarRoutes from "./avatar";
import adminRoutes from "./admin";
const app = Router();

app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/space", spaceRoutes);
app.use("/avatar", avatarRoutes);

export default app;
