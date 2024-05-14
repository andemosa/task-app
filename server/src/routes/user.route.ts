import express from "express";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";
import userController from "../controllers/user.controller";
import { UpdateUserSchema } from "../schema/user.schema";

/**
 * @openapi
 * tags:
 *   name: User
 *   description: The User API provides an endpoint for updating user info.
 */
const userRouter = express.Router();

/**
 * @openapi
 * '/api/users/me':
 *  patch:
 *    tags: [User]
 *    summary: Edit user info
 *    description: This endpoint is used to edit user info. Name, password and avatar can be changed using this endpoint.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserSchema'
 *    responses:
 *      200:
 *        description: User info updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
userRouter.patch(
  "/me",
  verifyToken,
  validate(UpdateUserSchema),
  userController.updateUser
);

export default userRouter;
