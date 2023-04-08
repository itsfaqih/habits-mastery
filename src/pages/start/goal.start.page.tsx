import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { Goal } from "@/schemas/goal.schema";

export function GoalStartPage() {
  const navigate = useNavigate();
  const { register, watch } = useFormContext<Goal>();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 36 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -36 }}
    >
      <div className="flex">
        <Link
          to="/"
          className="flex items-center gap-2 -ml-6 text-lg text-slate-600"
        >
          <ArrowLeft />
          Back to home
        </Link>
      </div>
      <form
        onSubmit={() => {
          navigate("/start/step");
        }}
        className="mt-8"
      >
        <Title>What is your goal?</Title>
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Input
              {...register("title")}
              label="My goal"
              srOnlyLabel
              hintText="E.g. Become rich, lose weight, get a job"
              autoFocus
            />
            <IconButton
              icon={ArrowRight}
              type="submit"
              disabled={watch("title") === ""}
              className="-mt-10"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
