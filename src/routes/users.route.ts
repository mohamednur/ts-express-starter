import { createUserSchema } from "./../schema/user.schema";
import { validate } from "./../middlewares/validate";
import { Router } from "express";
import UsersControllers from "../controllers/users.controller";
import { Routes } from "../types/routes";
import { Request, Response, NextFunction } from "express";
class UsersRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UsersControllers();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute = () => {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(
      `${this.path}`,
      validate(createUserSchema),
      this.userController.createUser
    );
    // this.router.put(
    //   `${this.path}/:id`,
    //   validate(PartialUserSchema),
    //   this.userController.updateUser
    // );
    // this.router.delete(
    //   `${this.path}/:id`,
    //   validate(PartialUserSchema),
    //   this.userController.deleteUser
    // );
  };

  // this.router.get(
  //   `${this.path}`,
  //   (req: Request, res: Response, next: NextFunction) => {
  //     res.status(200).json({ message: "user route" });
  //   }
  // );
}

export default UsersRoute;
