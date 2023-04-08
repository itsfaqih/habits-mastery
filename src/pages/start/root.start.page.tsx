import { AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { Container } from "@/components/ui/container";
import { Outlet } from "react-router-dom";
import { Goal, GoalSchema } from "@/schemas/goal.schema";
import { getGoalsAction } from "@/actions/goal.get.action";
import { setGoalAction } from "@/actions/goal.set.action";

export function RootStartPage() {
  const formMethods = useForm<Goal>({
    async defaultValues() {
      const goals = await getGoalsAction();

      if (goals.length > 0) {
        return goals[0];
      }

      return {
        title: "",
        steps: [],
      };
    },
  });

  formMethods.watch(async (data) => {
    const goal = GoalSchema.safeParse(data);

    if (goal.success) {
      await setGoalAction(goal.data);
    }
  });

  return (
    <Container className="flex justify-center pt-48">
      <FormProvider {...formMethods}>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </FormProvider>
    </Container>
  );
}
