import { Router } from "express";
import { ITask } from "../interfaces/task.interface";

const taskRouter = Router();

// Mock Tasks DB
let tasks: ITask[] = [];

// Helper function
const findTask = (id: string): ITask | undefined => {
  const foundTask = tasks.find((task: ITask) => task.id === id);
  return foundTask;
};

// Routes with logic
taskRouter.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    tasks,
    message: "Fetched all tasks successfully",
  });
});

taskRouter.post("/", (req, res) => {
  const { title, description } = req.body;
  const newTask: ITask = {
    id: Date.now().toString(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  return res.status(201).json({
    sucess: true,
    task: newTask,
    message: "Created task successfully",
  });
});

taskRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundTask: ITask | undefined = findTask(id);

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

taskRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const foundTask: ITask | undefined = findTask(id);

  if (!foundTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  tasks = tasks.filter((task) => task.id !== id);
  return res.status(200).json({
    success: true,
    task: foundTask,
    message: "Deleted task successfully",
  });
});

export default taskRouter;
