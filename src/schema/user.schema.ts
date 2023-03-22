import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      firstName: z.string({
        required_error: "first name is required",
      }),
      lastName: z.string({
        required_error: "last name is required",
      }),
      mobileNo: z.number({
        required_error: "mobile number is required",
      }),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    }),
});

// const userWithId = userSchema.merge(HasId);

// export type User = z.infer<typeof userWithId>;

// export type createuserDTO = z.infer<typeof userSchema>["body"];

// export type UserId = z.infer<typeof HasId>;
// export const PartialUserSchema = userSchema.deepPartial();
// export type updateUserDTO = z.infer<typeof PartialUserSchema>["body"];

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
