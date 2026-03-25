import express from "express";
import {
  getAllStudents,
  getStudentById,
} from "../controllers/studentsController.js";

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", getAllStudents);
studentRouter.put("/:id", getAllStudents);
studentRouter.delete("/:id", getAllStudents);

export default studentRouter;
