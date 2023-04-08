import { cn } from "@/libs/cn";
import * as React from "react";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ElementType;
};

export const IconButton = ({
  icon: Icon,
  type = "button",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full text-slate-700 transition-all",
        "disabled:text-slate-300",
        "enabled:hover:bg-slate-100",
        className
      )}
      {...props}
    >
      <Icon weight="bold" className="w-7 h-7" />
    </button>
  );
};
