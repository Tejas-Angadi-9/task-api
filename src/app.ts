import express from "express";

const PORT: number = 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
