import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTaskSchema:
 *      type: object
 *      required:
 *        - title
 *        - date
 *        - startTime
 *      properties:
 *        title:
 *          type: string
 *          default: Create Wireframe
 *        date:
 *          type: string
 *          default: 2024-03-25
 *        startTime:
 *          type: string
 *          default: 10:30
 *        endTime:
 *          type: string
 *          default: 11:30
 *    CreateTaskResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        title:
 *          type: string
 *        date:
 *          type: string
 *        startTime:
 *          type: string
 *        endTime:
 *          type: string
 *        completed:
 *          type: boolean
 *        startTimeISO:
 *          type: string
 *        endTimeISO:
 *          type: string
 *        user:
 *          type: string
 *    GetTasksResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        page:
 *          type: string
 *        limit:
 *          type: string
 *        total:
 *          type: string
 *        tasks:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              createdAt:
 *                type: string
 *              updatedAt:
 *                type: string
 *              title:
 *                type: string
 *              date:
 *                type: string
 *              startTime:
 *                type: string
 *              endTime:
 *                type: string
 *              completed:
 *                type: boolean
 *              startTimeISO:
 *                type: string
 *              endTimeISO:
 *                type: string
 *              user:
 *                type: string
 *    UpdateTaskResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        task:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            startTime:
 *              type: string
 *            endTime:
 *              type: string
 *            startTimeISO:
 *              type: string
 *            endTimeISO:
 *              type: string
 *            user:
 *              type: string
 *            completed:
 *              type: boolean
 *    DeleteTaskResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        message:
 *          type: string
 *          default: Task has been deleted!
 *
 */
export const CreateTaskSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }).min(1, { message: "Title is required" }),
    date: string({
      required_error: "Date is required",
    }).min(1, { message: "Date is required" }),
    startTime: string({
      required_error: "Start time is required",
    }).min(1, { message: "Start time is required" }),
    endTime: string({
      invalid_type_error: "End Time must be a string",
    }).optional(),
    reminderTime: number({
      invalid_type_error: "Reminder Time must be a number",
    }).optional(),
  }).refine(
    (data) => !data.endTime || (data.endTime && data.endTime > data.startTime),
    {
      message: "End time must be later than start time",
      path: ["endTime"],
    }
  ),
});

export type CreateTaskInput = TypeOf<typeof CreateTaskSchema>;
