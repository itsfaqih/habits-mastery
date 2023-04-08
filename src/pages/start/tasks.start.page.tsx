import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Title } from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowRight, Plus, Trash } from "@phosphor-icons/react";
import { Goal } from "@/schemas/goal.schema";
import { Task, TaskFrequencyEnum, TaskSchema } from "@/schemas/task.schema";
import { BackButton } from "@/components/ui/back-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export function TasksStartPage() {
  const mainForm = useFormContext<Goal>();

  const { prepend, fields, remove } = useFieldArray({
    control: mainForm.control,
    name: "steps.0.tasks",
  });

  const taskForm = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
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
      <BackButton
        text="Change step"
        to="/start/step"
        className="justify-center sm:justify-start"
      />
      <div className="mt-8">
        <Title>
          What should you do to "{mainForm.getValues("steps.0.title")}
          "?
        </Title>
        <div className="flow-root mt-6">
          <ScrollArea className="w-96 lg:w-auto">
            <form
              onSubmit={onSubmitNewTask}
              className="flex items-center gap-2"
            >
              <Input
                {...taskForm.register("title")}
                label="New Task"
                placeholder="Small habits to finish the step"
                srOnlyLabel
                autoFocus
                inputClassName="min-w-[20rem]"
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
                disabled={taskForm.watch("title") === ""}
              />
            </form>
            <div className="mt-2">
              <ScrollArea className="h-72">
                <div className="flex flex-col gap-2">
                  <AnimatePresence>
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, translateY: -12 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateX: 12 }}
                        className="flex items-center gap-2 pr-3 group"
                      >
                        <Input
                          {...mainForm.register(`steps.0.tasks.${index}.title`)}
                          label={`Task #${index + 1}`}
                          srOnlyLabel
                          inputClassName="min-w-[20rem]"
                        />
                        <Controller
                          control={mainForm.control}
                          name={`steps.0.tasks.${index}.frequency`}
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
                              options={TaskFrequencyEnum.options.map(
                                (option) => ({
                                  label: option,
                                  value: option,
                                })
                              )}
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
              </ScrollArea>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex justify-center mt-6 sm:justify-end">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-1 text-lg transition-all sm:-mr-7 text-slate-600 hover:text-slate-800 group"
            >
              <span className="pb-1 -mb-1.5 border-b-2 border-transparent group-hover:border-slate-600">
                Execute your plan
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
