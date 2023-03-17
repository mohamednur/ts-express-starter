import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/httpExecptions";
import { logger } from "../utils/logger";

const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    );
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
