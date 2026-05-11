// index.js  (updated — only the new lines are marked)
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./config/db.js";
import studentRouter from "./routes/studentsRoute.js";
import courseRouter from "./routes/courseRoute.js";   // ← NEW

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use("/api/students", studentRouter);
app.use("/api/courses", courseRouter);               // ← NEW

app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});