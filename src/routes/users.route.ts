import { Router } from "express";
import UsersControllers from "../controllers/users.controller";
import { Routes } from "../types/routes";

class UsersRoute implements Routes {
  public path = "/";
  public router = Router();

  userController = new UsersControllers();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute = () => {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(`${this.path}`, this.userController.createUser);
  };
}

export default UsersRoute;
