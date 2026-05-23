import express from "express";
import taskRoutes from "./routes/tasks";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
