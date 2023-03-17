import { z } from "zod";

const HasId = z.object({
  id: z.string().uuid(),
});
export const userSchema = z.object({
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
  mobileNo: z
    .number({
      required_error: "mobile number is required",
    })
    .min(10)
    .max(10),
});

const userWithId = userSchema.merge(HasId);

export type User = z.infer<typeof userWithId>;

export type createuserDTO = z.infer<typeof userSchema>;

export const PartialUserSchema = userSchema.partial();

export type updateUserDTO = z.infer<typeof PartialUserSchema>;
