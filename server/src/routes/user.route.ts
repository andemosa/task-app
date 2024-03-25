import express from "express";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";
import userController from "../controllers/user.controller";
import { UpdateUserSchema } from "../schema/user.schema";

const userRouter = express.Router();

userRouter.patch(
  "/me",
  verifyToken,
  validate(UpdateUserSchema),
  userController.updateUser
);

export default userRouter;
