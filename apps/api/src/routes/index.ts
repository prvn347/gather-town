import { Application, Request, Response, Router } from "express";
import userRoutes from "./user";
import spaceRoutes from "./space";
import adminRoutes from "./admin";
const app = Router();

app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});
app.use("/", userRoutes);
app.use("/space", spaceRoutes);
app.use("/admin", adminRoutes);

export default app;
