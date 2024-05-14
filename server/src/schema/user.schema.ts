import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterSchema:
 *      type: object
 *      additionalProperties: false
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *    RegisterResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        success:
 *          type: boolean
 *        user:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            token:
 *              type: string
 *    LoginSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      additionalProperties: false
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        user:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            token:
 *              type: string
 *    UpdateUserSchema:
 *      type: object
 *      additionalProperties: false
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *        avatar:
 *          type: string
 *          default: http://res.cloudinary.com/test/image/upload/qtltmsivf8n1bh9.jpg
 *    UpdateUserResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        user:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 */

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
