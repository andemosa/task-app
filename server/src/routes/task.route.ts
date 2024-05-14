import express from "express";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";
import taskController from "../controllers/task.controller";
import { CreateTaskSchema } from "../schema/task.schema";

/**
 * @openapi
 * tags:
 *   name: Task
 *   description: The Task API provides endpoints for managing tasks, including creating, updating, retrieving, and deleting user's tasks.
 */
const taskRouter = express.Router();

/**
 * @openapi
 * '/api/tasks':
 *  post:
 *    tags: [Task]
 *    summary: Create a task
 *    description: This endpoint is used when a user wants to create a task.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTaskSchema'
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTaskResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
taskRouter.post(
  "/",
  verifyToken,
  validate(CreateTaskSchema),
  taskController.createTask
);

/**
 * @openapi
 * '/api/tasks':
 *  get:
 *    tags: [Task]
 *    summary: Return a list of tasks
 *    description: This endpoint is used to return a list of tasks. It accepts query filters.
 *    parameters:
 *      - in: query
 *        name: date
 *        schema:
 *          type: string
 *          default: 2024-03-25
 *        description: The date for which asks should be gotten
 *      - in: query
 *        name: limit
 *        schema:
 *          type: number
 *          default: 10
 *        description: The number of tasks shown per page
 *      - in: query
 *        name: page
 *        schema:
 *          type: number
 *          default: 1
 *        description: The current page
 *    responses:
 *      200:
 *        description: Returns a list of tasks for the user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetTasksResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
taskRouter.get("/", verifyToken, taskController.getTasks);

/**
 * @openapi
 * '/api/tasks/{taskId}':
 *  patch:
 *    tags: [Task]
 *    summary: Update a task
 *    description: This endpoint is used when a user wants to update a task.
 *    parameters:
 *     - name: taskId
 *       in: path
 *       description: The id of the task
 *       required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTaskSchema'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateTaskResponse'
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Task not found
 *  delete:
 *    tags: [Task]
 *    summary: Delete a task
 *    description: This endpoint is used when a user wants to delete a task.
 *    parameters:
 *     - name: taskId
 *       in: path
 *       description: The id of the task
 *       required: true
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteTaskResponse'
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Task not found
 */

taskRouter.patch("/:id", verifyToken, taskController.updateTask);
taskRouter.delete("/:id", verifyToken, taskController.deleteTask);

export default taskRouter;
