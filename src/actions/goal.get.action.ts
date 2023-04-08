import { Goal, GoalSchema } from "@/schemas/goal.schema";
import localforage from "localforage";

export async function getGoalsAction() {
  const localGoals =
    (await localforage.getItem("goals").catch((error) => {
      console.error("Error getting goals from localforage", error);
      return [];
    })) ?? [];

  const goals = await GoalSchema.array()
    .parseAsync(localGoals)
    .catch((error) => {
      console.error("Error parsing goals from localforage", error);
      return [] as Goal[];
    });

  return goals;
}
