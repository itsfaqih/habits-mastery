import * as React from "react";
import { cn } from "@/libs/cn";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-3xl mx-auto",
        className
      )}
      {...props}
    />
  );
}
