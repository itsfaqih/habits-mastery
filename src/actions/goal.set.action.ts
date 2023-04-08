import { Goal } from "@/schemas/goal.schema";
import localforage from "localforage";

export async function setGoalAction(newGoal: Goal) {
  await localforage.setItem("goals", [newGoal]).catch((error) => {
    console.error("Error setting goals in localforage", error);
  });

  return newGoal;
}
