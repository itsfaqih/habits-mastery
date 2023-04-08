import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/libs/cn";

const inputVariants = cva(
  "px-2 py-3 sm:min-w-[28rem] w-full bg-transparent text-xl border-b-2 focus:outline-none",
  {
    variants: {
      state: {
        default: ["border-slate-300", "focus:border-slate-700"],
        invalid: ["border-red-300", " focus:border-red-700"],
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label: string;
    srOnlyLabel?: boolean;
    hintText?: string;
    inputClassName?: string;
    hintTextClassName?: string;
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      srOnlyLabel,
      hintText,
      inputClassName,
      hintTextClassName,
      state,
      id,
      name,
      className,
      ...props
    },
    ref
  ) => {
    const elementId = id || name || React.useId();

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={elementId}
          className={cn({
            "sr-only": srOnlyLabel,
          })}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={elementId}
          name={name}
          className={cn(inputVariants({ state }), inputClassName)}
          {...props}
        />
        {hintText && (
          <p className={cn("mt-4 text-lg text-slate-500", hintTextClassName)}>
            {hintText}
          </p>
        )}
      </div>
    );
  }
);
