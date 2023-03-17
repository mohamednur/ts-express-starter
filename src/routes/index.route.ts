import { indexSchema } from "./../schema/index.schema";
import { Router } from "express";
import IndexController from "../controllers/index.controller";
import { validate } from "../middlewares/validate";
import { Routes } from "./../types/routes";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initiliazeRoutes();
  }

  private initiliazeRoutes = () => {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.post(
      `${this.path}`,
      validate(indexSchema),
      this.indexController.postData
    );
  };
}

export default IndexRoute;
