import { type } from "os";
import { z } from "zod";

const commonUserSchema = {
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
  firstname: z.string({
    required_error: "first name is required",
  }),
  lastname: z.string({
    required_error: "last name is required",
  }),
  phonenumber: z.number({
    required_error: "mobile number is required",
  }),
  password: z.string(),
  role: z.enum(["ADMIN", "USER"]).optional(),
};
export const createUserSchema = z.object({
  body: z
    .object({
      ...commonUserSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    }),
});

export const updateUserSchema = z.object({
  body: z
    .object({
      ...commonUserSchema,
    })
    .partial(),

  params: z.object({
    id: z.string(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UserUpdateInput = z.infer<typeof updateUserSchema>["body"];
export type UserUpdateParam = z.infer<typeof updateUserSchema>["params"];
