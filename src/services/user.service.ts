import { createuserDTO, updateUserDTO } from "./../schema/user.schema";
import { PrismaClient, User } from "@prisma/client";
import HttpExceptions from "../exceptions/httpExecptions";
import { Hash } from "crypto";

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

  public createUser = async (
    userData: createuserDTO["body"]
  ): Promise<User> => {
    const findUser: User | null = await this.users.findUnique({
      where: {
        id: userData.email,
      },
    });
    if (findUser)
      throw new HttpExceptions(
        409,
        `This email ${userData.email} alreaddy exists`
      );

    // use bycrypt to hash password

    const createUserData: User = await this.users.create({
      data: { ...userData },
    });

    return createUserData;
  };

  public updateUser = async (
    userId: string,
    userData: updateUserDTO["body"]
  ): Promise<User> => {
    const findUser: User | null = await this.users.findUnique({
      where: { id: userId },
    });
    if (!findUser) throw new HttpExceptions(409, "User doesn't exist");
    const updateUserData = await this.users.update({
      where: { id: userId },
      data: { ...userData },
    });
    return updateUserData;
  };

  public deleteUser = async (userId: string): Promise<User> => {
    const findUser: User | null = await this.users.findUnique({
      where: { id: userId },
    });

    if (!findUser) throw new HttpExceptions(409, "User does not exist");

    const deleteUserData = await this.users.delete({
      where: {
        id: userId,
      },
    });
    return deleteUserData;
  };
}

export default UserService;
