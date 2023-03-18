import { createuserDTO, updateUserDTO } from "./../schema/user.schema";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { User } from "@prisma/client";
import HttpExceptions from "../exceptions/httpExecptions";
class UsersController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("get all users");
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
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
      const userData: createuserDTO["body"] = req.body;

      const createUserData: User = await this.userService.createUser(userData);

      res.status(200).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const userData: updateUserDTO["body"] = req.body;

      const updateUserData: User = await this.userService.updateUser(
        userId,
        userData
      );

      res.status(200).json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
