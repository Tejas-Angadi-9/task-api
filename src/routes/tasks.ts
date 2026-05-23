import { Router } from "express";

const taskRouter = Router();

let tasks: any[] = [];

taskRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    tasks,
    message: "Fetched all tasks successfully",
  });
});

export default taskRouter;
