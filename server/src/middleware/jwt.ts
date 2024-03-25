import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

import createError from "../utils/createError";
import logger from "../utils/logger";

configDotenv();

interface JwtPayload {
  id: string;
}

const jwtSecret = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next(createError(401, 3, "You are not authenticated!"));

  try {
    const decoded = jwt.verify(token, jwtSecret!) as JwtPayload;

    if (!decoded) return next(createError(403, 3, "You are not authorized!"));
    res.locals.userId = decoded.id;
    next();
  } catch (error: any) {
    logger.error(error);
    next(createError(403, 3, "You are not authorized!"));
  }
};

export const generateToken = (id: string) =>
  jwt.sign({ id }, jwtSecret!, {
    expiresIn: EXPIRES_IN,
  });
