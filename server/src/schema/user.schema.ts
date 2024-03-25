import { object, string, TypeOf } from "zod";

export const RegisterSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(1, { message: "Name is required" }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    })
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
  }),
});

export const LoginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).min(1, { message: "Email is required" }),
    password: string({
      required_error: "Password is required",
    })
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export const UpdateUserSchema = object({
  body: object({
    name: string({
      invalid_type_error: "Name must be a string",
    })
      .min(2, { message: "Name must be longer than 1 character" })
      .optional(),
    password: string({
      invalid_type_error: "Name must be a string",
    })
      .min(6, "Password too short - should be 6 chars minimum")
      .optional(),
    avatar: string({
      invalid_type_error: "Avatar must be a string",
    }).optional(),
  }),
});

export type RegisterInput = TypeOf<typeof RegisterSchema>;

export type LoginInput = TypeOf<typeof LoginSchema>;

export type UpdateUserInput = TypeOf<typeof UpdateUserSchema>;
