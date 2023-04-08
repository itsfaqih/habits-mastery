import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/libs/cn";
import { CaretDown, Check } from "@phosphor-icons/react";

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "text-xl gap-3 flex w-full items-center justify-between border-b-2 border-slate-300 bg-transparent py-3 px-2 placeholder:text-slate-400 focus:outline-none focus:border-slate-700 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <CaretDown weight="bold" className="w-5 h-5 opacity-50" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position="popper"
      className={cn(
        "animate-in fade-in-80 relative z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-md border border-slate-100 bg-white text-slate-700 shadow-md",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pr-2 pl-8 text-sm font-semibold text-slate-900",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-xl font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check weight="bold" className="w-5 h-5" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

type SelectOptionType = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOptionType[];
  label: string;
  placeholder: string;
  id?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  inline?: boolean;
  srOnlyLabel?: boolean;
  triggerClassName?: string;
};

const Select = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  SelectProps
>(
  (
    {
      options,
      placeholder,
      id,
      label,
      name,
      onBlur,
      onChange,
      defaultValue,
      value,
      inline,
      srOnlyLabel,
      triggerClassName,
    },
    ref
  ) => {
    const elementId = id || name || React.useId();

    return (
      <div
        className={cn("flex", {
          "flex-col gap-1.5": !inline,
          "items-center gap-3": inline,
        })}
      >
        <label
          htmlFor={elementId}
          className={cn({
            "sr-only": srOnlyLabel,
          })}
        >
          {label}
        </label>
        <SelectRoot
          name={name}
          defaultValue={defaultValue}
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger
            ref={ref}
            id={elementId}
            onBlur={onBlur}
            className={triggerClassName}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
    );
  }
);

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
