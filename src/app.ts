import express from "express";
import taskRoutes from "./routes/tasks";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/", (req, res) => {
  const { title, description } = req.body;
  
});

export default app;
