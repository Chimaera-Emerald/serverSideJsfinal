// services/courseService.js
import Course from "../models/courseModel.js";

export const findAllCourses = async () => {
  return Course.find({});
};

export const findCourseById = async (id) => {
  return Course.findById(id);
};

export const createCourseService = async (data) => {
  return Course.create(data);
};

export const updateCourseService = async (id, data) => {
  return Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourseService = async (id) => {
  return Course.findByIdAndDelete(id);
};