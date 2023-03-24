import { User } from "@prisma/client";
import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

function verifPassword(password: string, user: User): Boolean {
  return password !== user.password ? false : true;
}

export { hashPassword, verifPassword };
