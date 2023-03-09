import { Router } from "express";
import { Routes } from "./../types/routes";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initiliazeRoutes();
  }

  private initiliazeRoutes = () => {
    this.router.get(`${this.path}`, (req, res) => {
      res.send("index route");
    });
  };
}

export default IndexRoute;
