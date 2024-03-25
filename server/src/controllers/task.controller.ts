import { NextFunction, Request, Response } from "express";

import createError from "../utils/createError";
import { CreateTaskInput } from "../schema/task.schema";
import { Task } from "../models/task.model";

interface IQuery {
  date?: string;
  limit?: number;
  page?: number;
}

const createUtcStrings = (body: Partial<CreateTaskInput["body"]>) => {
  const { date, startTime, endTime } = body;
  const startDateTimeString = `${date}T${startTime}:00`;
  const startTimeISO = new Date(startDateTimeString).toISOString();
  if (endTime) {
    const endDateTimeString = `${date}T${endTime}:00`;
    const endTimeISO = new Date(endDateTimeString).toISOString();
    return {
      ...body,
      startTimeISO,
      endTimeISO,
    };
  }
  return {
    ...body,
    startTimeISO,
  };
};

const createTask = async (
  req: Request<{}, {}, CreateTaskInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const newTask = new Task({
    user: res.locals.userId,
    ...createUtcStrings(req.body),
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) next(createError(404, 5, "Task not found!"));

    if (task && task.user.toString() !== res.locals.userId)
      return next(createError(403, 3, "You can delete only your tasks!"));

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task has been deleted!",
    });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10, date } = req.query;
  const filters = {
    ...(date && { date: date }),
    user: res.locals.userId,
  };
  try {
    const tasks = Task.find(filters)
      .sort({ startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = Task.countDocuments(filters);

    const result = await Promise.all([tasks, total]);

    res.status(200).json({
      success: true,
      tasks: result[0],
      page,
      limit,
      total: result[1],
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (
  req: Request<{ id: string }, {}, Partial<CreateTaskInput["body"]>, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) next(createError(404, 5, "Task not found!"));

    if (task && task.user.toString() !== res.locals.userId)
      return next(createError(403, 3, "You can only edit your tasks!"));

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { ...createUtcStrings(req.body) },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

export default { createTask, getTasks, updateTask, deleteTask };
