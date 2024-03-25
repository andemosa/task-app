import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";

import { generateToken } from "../middleware/jwt";
import { LoginInput, RegisterInput } from "../schema/user.schema";
import createError from "../utils/createError";

const register = async (
  req: Request<{}, {}, RegisterInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return next(
        createError(422, 1, "User already exists, please login instead")
      );

    const newUser = new User({
      ...req.body,
    });

    await newUser.save();

    const token = generateToken(newUser._id.toString());
    const { password, ...info } = newUser._doc;

    res.status(201).json({
      success: true,
      user: {
        token,
        ...info,
      },
      message: "User has been created.",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) return next(createError(401, 5, "User not found"));

    const passMatch = await user.comparePassword(req.body.password);

    if (!passMatch) {
      return next(createError(401, 3, "Email and password don't match."));
    }

    const token = generateToken(user._id.toString());
    const { password, ...info } = user._doc;

    res.status(200).json({
      success: true,
      user: {
        token,
        ...info,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { register, login };
