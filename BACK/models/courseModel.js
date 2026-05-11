// models/courseModel.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default mongoose.model("Course", courseSchema);