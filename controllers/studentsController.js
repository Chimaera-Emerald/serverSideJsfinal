import { findAllUsers, findUser } from "../services/studentsService.js";

export const getAllStudents = (req, res) => {
  try {
    const students = findAllUsers();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  //const student = students.find((student) => student.id === id);
  try {
    const student = findUser(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
    return;
  }
};
