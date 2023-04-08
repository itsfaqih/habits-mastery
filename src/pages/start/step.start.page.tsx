import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowRight } from "@phosphor-icons/react";
import { Goal } from "@/schemas/goal.schema";
import { BackButton } from "@/components/ui/back-button";

export function StepStartPage() {
  const navigate = useNavigate();
  const { register, getValues, watch } = useFormContext<Goal>();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 36 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -36 }}
    >
      <BackButton text="Change goal" to="/start" />

      <form
        onSubmit={() => {
          navigate("/start/tasks");
        }}
        className="mt-8"
      >
        <Title>What is the first step to achieve "{getValues("title")}"?</Title>
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Input
              {...register("steps.0.title")}
              label="First step"
              hintText="Anything that will move you closer to your goal"
              placeholder="E.g. Invest, exercise, practice"
              srOnlyLabel
              autoFocus
            />
            <IconButton
              icon={ArrowRight}
              type="submit"
              disabled={watch("steps.0.title") === ""}
              className="-mt-10"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
