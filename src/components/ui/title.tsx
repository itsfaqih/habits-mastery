import * as React from "react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/libs/cn";

export function Title({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight text-slate-800 max-w-2xl",
        className
      )}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h1>
  );
}
