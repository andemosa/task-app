import { Model, Schema, Types, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ITask {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  startTimeISO: string;
  endTimeISO: string;
  completed: boolean;
  reminderTime: number;
  user: Types.ObjectId;
  _doc: Omit<this, "_doc">;
}

interface TaskModel extends Model<ITask> {}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
    },
    startTimeISO: {
      type: String,
      required: true,
    },
    endTimeISO: {
      type: String,
    },
    reminderTime: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Task = model<ITask, TaskModel>("Task", schema);

export { Task, ITask };
