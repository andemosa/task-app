import express from "express";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";
import taskController from "../controllers/task.controller";
import { CreateTaskSchema } from "../schema/task.schema";

const taskRouter = express.Router();

taskRouter.post(
  "/",
  verifyToken,
  validate(CreateTaskSchema),
  taskController.createTask
);
taskRouter.get("/", verifyToken, taskController.getTasks);

taskRouter.patch("/:id", verifyToken, taskController.updateTask);
taskRouter.delete("/:id", verifyToken, taskController.deleteTask);

export default taskRouter;
