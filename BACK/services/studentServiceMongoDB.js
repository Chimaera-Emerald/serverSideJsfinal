// services/studentServiceMongoDB.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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