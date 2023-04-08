import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Goal } from "@/schemas/goal.schema";
import { BackButton } from "@/components/ui/back-button";

export function GoalStartPage() {
  const navigate = useNavigate();
  const { register, watch } = useFormContext<Goal>();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 36 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -36 }}
    >
      <BackButton
        text="Back to home"
        to="/"
        className="justify-center sm:justify-start"
      />

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
              placeholder="E.g. Become rich, lose weight, get a job"
              hintText="Add one for now, you can add more later"
              autoFocus
              inputClassName="text-center sm:text-left"
              hintTextClassName="text-center sm:text-left"
            />
            <IconButton
              icon={ArrowRight}
              type="submit"
              disabled={watch("title") === ""}
              className="-mt-10 sr-only sm:not-sr-only"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
