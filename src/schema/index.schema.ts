import { z } from "zod";

export const indexSchema = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: "Full Name is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
    })
    .strict(),
});
