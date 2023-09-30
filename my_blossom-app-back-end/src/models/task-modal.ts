import mongoose, { Schema } from "mongoose";
import { type } from "os";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true
    },
    isEditable: {
        type: Boolean,
        default: false
      },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task=mongoose.model("Task" , taskSchema)

export default Task