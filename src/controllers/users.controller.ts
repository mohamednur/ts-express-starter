import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { User } from "@prisma/client";
class UsersController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next();
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const findOneUserData: User | null = await this.userService.findUserById(
        userId
      );

      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData:User<Omit id>= req.body;

      const createUserData: User = await this.userService.createUser(userData);

      res.status(200).json({ data: createUserData, message: "created" });
    } catch (error) {
      next();
    }
  };
}

export default UsersController;
