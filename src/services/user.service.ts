import { NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import HttpExceptions from "../exceptions/httpExecptions";

class UserService {
  public users = new PrismaClient().user;

  public findAllUser = async (): Promise<User[]> => {
    const allUsers: User[] = await this.users.findMany();
    return allUsers;
  };

  public findUserById = async (userId: string): Promise<User | null> => {
    if (!userId) throw new HttpExceptions(400, "UserId is empty");

    const findUser: User | null = await this.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUser) throw new HttpExceptions(409, "User does not exist");
    return findUser;
  };

  public createUser = () => {};
}

export default UserService;
