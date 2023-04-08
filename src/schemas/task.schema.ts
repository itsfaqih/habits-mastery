import { z } from "zod";

export const TaskFrequencyEnum = z.enum(["once", "daily", "weekly", "monthly"]);

export type TaskFrequency = z.infer<typeof TaskFrequencyEnum>;

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  frequency: TaskFrequencyEnum,
});

export type Task = z.infer<typeof TaskSchema>;
