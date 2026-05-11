// routes/studentsRoute.js
import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  signup,
  login,
} from "../controllers/studentsController.js";

const studentRouter = express.Router();

// AUTH ROUTES (no protection needed)
studentRouter.post("/signup", signup);
studentRouter.post("/login", login);

// CRUD ROUTES (protected would go here if needed)
// GET /api/students        → getAllStudents
studentRouter.get("/", getAllStudents);

// GET /api/students/:id    → getStudentById
studentRouter.get("/:id", getStudentById);

// POST /api/students       → createStudent
studentRouter.post("/", createStudent);

studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;