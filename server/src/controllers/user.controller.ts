import { NextFunction, Request, Response } from "express";

import { UpdateUserInput } from "../schema/user.schema";
import { User } from "../models/user.model";
import { generateToken } from "../middleware/jwt";
import createError from "../utils/createError";

const updateUser = async (
  req: Request<{}, {}, UpdateUserInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.userId);

    if (user) {
      Object.assign(user, req.body);
      await user.save();

      const { password, ...info } = user._doc;

      res.status(200).json({
        success: true,
        user: info,
      });
    } else {
      next(createError(404, 5, "User not found!"));
    }
  } catch (error) {
    next(error);
  }
};

export default { updateUser };
