// services/studentServiceMongoDB.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// READ — returns a Promise (the controller will await it)
export const findAllStudents = () => {
  return User.find({});
};

// READ ONE
export const findStudentById = (id) => {
  return User.findById(id);
};

// CREATE — must be async because we await bcrypt.hash() before inserting
export const createStudentService = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  return User.create({ ...data, password: hashedPassword });
};

// UPDATE — must be async because password might need hashing
export const updateStudentService = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }
  return User.findByIdAndUpdate(id, data);
};

// DELETE
export const deleteStudentService = (id) => {
  return User.findByIdAndDelete(id);
};

// SIGNUP - Create new user with password hashing
export const signupService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  const newUser = await User.create({ ...data, password: hashedPassword });
  
  // Generate JWT token
  const token = jwt.sign({ _id: newUser._id, email: newUser.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  
  return { token, user: newUser };
};

// LOGIN - Verify credentials and return token
export const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  
  // Generate JWT token
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  
  return { token, user };
};