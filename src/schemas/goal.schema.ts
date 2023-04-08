import { z } from "zod";
import { StepSchema } from "./step.schema";

export const GoalSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  steps: StepSchema.array(),
});

export type Goal = z.infer<typeof GoalSchema>;
