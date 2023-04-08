import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Goal } from "@/schemas/goal.schema";

export function StepStartPage() {
  const navigate = useNavigate();
  const { register, getValues, watch } = useFormContext<Goal>();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 36 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -36 }}
    >
      <div className="flex">
        <Link
          to="/start"
          className="flex items-center gap-2 -ml-6 text-lg text-slate-600"
        >
          <ArrowLeft />
          Change goal
        </Link>
      </div>

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
