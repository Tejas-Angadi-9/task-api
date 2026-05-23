import { Router } from "express";
import { ITask } from "../interfaces/task.interface";
import * as dynamoService from "../services/dynamo.service";

const taskRouter = Router();

// Routes with logic
taskRouter.get("/", async (req, res) => {
  const tasks: ITask[] = await dynamoService.getAllTasks();

  return res.status(200).json({
    success: true,
    tasks,
    message: "Fetched all tasks successfully",
  });
});

taskRouter.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newTask: ITask = {
    id: Date.now().toString(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  await dynamoService.createTask(newTask);

  return res.status(201).json({
    sucess: true,
    task: newTask,
    message: "Created task successfully",
  });
});

taskRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const foundTask: ITask | null = await dynamoService.getTaskById(id);

  if (!foundTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    task: foundTask,
    message: "Fetched task successfully",
  });
});

taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const foundTask = await dynamoService.getTaskById(id);

  if (!foundTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  await dynamoService.deleteTask(id);

  return res.status(200).json({
    success: true,
    task: foundTask,
    message: "Deleted task successfully",
  });
});

export default taskRouter;
