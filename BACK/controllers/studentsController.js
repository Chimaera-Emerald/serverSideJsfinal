// controllers/studentsController.js
import {
  findAllStudents,
  findStudentById,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  signupService,
  loginService,
} from "../services/studentServiceMongoDB.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await findAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params; // extracts :id from the URL
    const student = await findStudentById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
};

export const createStudent = async (req, res) => {
  try {
    // Destructure only what the model needs from the request body
    const { name, email, password, gpa, major } = req.body;
    const newStudent = await createStudentService({ name, email, password, gpa, major });
    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await updateStudentService(id, req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStudentService(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SIGNUP - Create new user account
export const signup = async (req, res) => {
  try {
    const { name, email, password, gpa, major } = req.body;

    // Validate required fields
    if (!name || !email || !password || gpa === undefined || !major) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await signupService({ name, email, password, gpa, major });
    res.status(201).json({ message: "Signup successful", token: result.token, user: result.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN - Authenticate user and return token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await loginService(email, password);
    res.status(200).json({ message: "Login successful", token: result.token, user: result.user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};