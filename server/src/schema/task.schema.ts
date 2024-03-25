import { number, object, string, TypeOf } from "zod";

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
