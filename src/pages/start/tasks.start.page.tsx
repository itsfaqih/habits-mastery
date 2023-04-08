import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowLeft, Plus, Trash } from "@phosphor-icons/react";
import { Goal } from "@/schemas/goal.schema";
import { Task, TaskFrequencyEnum } from "@/schemas/task.schema";
import { Link } from "react-router-dom";

export function TasksStartPage() {
  const mainForm = useFormContext<Goal>();

  const { prepend, fields, remove } = useFieldArray({
    control: mainForm.control,
    name: "steps.0.tasks",
  });

  const taskForm = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      frequency: "once",
    },
  });

  const onSubmitNewTask = taskForm.handleSubmit((data) => {
    prepend(data, { shouldFocus: false });
    taskForm.reset();

    queueMicrotask(() => {
      taskForm.setFocus("title");
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 36 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -36 }}
    >
      <div className="flex">
        <Link
          to="/start/step"
          className="flex items-center gap-2 -ml-6 text-lg text-slate-600"
        >
          <ArrowLeft />
          Change step
        </Link>
      </div>
      <div className="mt-8">
        <Title>
          What should you do to "{mainForm.getValues("steps.0.title")}
          "?
        </Title>
        <div className="mt-6">
          <form onSubmit={onSubmitNewTask} className="flex items-center gap-2">
            <Input
              {...taskForm.register("title")}
              label="New Task"
              srOnlyLabel
              autoFocus
            />
            <Controller
              control={taskForm.control}
              name="frequency"
              render={({ field: { name, onBlur, onChange, ref, value } }) => (
                <Select
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label="Frequency"
                  options={TaskFrequencyEnum.options.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  placeholder="Frequency"
                  srOnlyLabel
                  triggerClassName="w-36"
                />
              )}
            />
            <IconButton
              type="submit"
              icon={Plus}
              disabled={!taskForm.formState.isDirty}
            />
          </form>
          <div className="flex flex-col gap-2 mt-2">
            <AnimatePresence>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, translateY: -12 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateX: 12 }}
                  className="flex items-center gap-2 group"
                >
                  <Input
                    {...mainForm.register(`steps.0.tasks.${index}.title`)}
                    label={`Task #${index + 1}`}
                    srOnlyLabel
                  />
                  <Controller
                    control={mainForm.control}
                    name={`steps.0.tasks.${index}.frequency`}
                    shouldUnregister
                    render={({
                      field: { name, onBlur, onChange, ref, value },
                    }) => (
                      <Select
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        label="Frequency"
                        options={TaskFrequencyEnum.options.map((option) => ({
                          label: option,
                          value: option,
                        }))}
                        placeholder="Frequency"
                        srOnlyLabel
                        triggerClassName="w-36"
                      />
                    )}
                  />
                  <IconButton
                    icon={Trash}
                    onClick={() => remove(index)}
                    className="text-transparent group-hover:text-red-500 group-focus-within:text-red-500"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
