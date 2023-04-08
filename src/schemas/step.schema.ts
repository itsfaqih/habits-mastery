import { z } from "zod";
import { TaskSchema } from "./task.schema";

export const StepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  tasks: TaskSchema.array(),
});

export type Step = z.infer<typeof StepSchema>;
