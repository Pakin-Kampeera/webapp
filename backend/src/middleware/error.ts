import { ErrorHandle } from "../utils/error.utils";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: ErrorHandle,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = error.message || "Something went wrong";
  const status = error.status || 500;
  response.status(status).json({
    status,
    message,
  });
};
