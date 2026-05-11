// index.js
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./config/db.js";
import studentRouter from "./routes/studentsRoute.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB BEFORE starting the server
connectToMongoDB();

// Middleware — order matters: parse before routing
app.use(express.json());               // parses JSON request bodies into req.body
app.use(express.urlencoded({ extended: true })); // parses form data
app.use(cors());                       // allows cross-origin requests (FRONT can call BACK)
app.use(express.static("public"));     // serves files in /public as static assets

// Mount the student router
app.use("/api/students", studentRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});