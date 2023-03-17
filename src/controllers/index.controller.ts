import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/httpExecptions";

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("This is the index route");
    } catch (error: any) {
      throw new HttpExceptions(400, error);
    }
  };
  public postData = (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      res.status(200).json(data);
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new HttpExceptions(400, error.message);
      }
    }
  };
}

export default IndexController;
