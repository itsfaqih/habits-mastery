import { Goal, GoalSchema } from "@/schemas/goal.schema";
import localforage from "localforage";

export async function createGoalAction(newGoal: Goal) {
  const currentGoals = await GoalSchema.array()
    .parseAsync(
      (await localforage.getItem("goals").catch((error) => {
        console.error("Error getting goals from localforage", error);
        return [];
      })) ?? []
    )
    .catch((error) => {
      console.error("Error parsing goals from localforage", error);
      return [] as Goal[];
    });

  const newGoals = currentGoals.concat(newGoal);

  await localforage.setItem("goals", newGoals).catch((error) => {
    console.error("Error setting goals in localforage", error);
  });

  return newGoals;
}
