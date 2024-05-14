import express from "express";

import authCtrl from "../controllers/auth.controller";

import validate from "../middleware/validateResource";

import { LoginSchema, RegisterSchema } from "../schema/user.schema";

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: The Auth API provides endpoints for registering and logging in a user.
 */
const authRouter = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *    tags: [Auth]
 *    summary: Register a user
 *    description: This endpoint is used when creating a user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterSchema'
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
authRouter.post("/register", validate(RegisterSchema), authCtrl.register);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *    tags: [Auth]
 *    summary: Login a user
 *    description: This endpoint is used to login a user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginSchema'
 *    responses:
 *      200:
 *        description: User logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      401:
 *        description: Unauthorized
 */
authRouter.post("/login", validate(LoginSchema), authCtrl.login);

export default authRouter;
