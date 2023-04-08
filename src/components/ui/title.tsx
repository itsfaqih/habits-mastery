import * as React from "react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/libs/cn";

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  ratio?: number;
};

export function Title({ ratio, children, className, ...props }: TitleProps) {
  return (
    <h1
      className={cn(
        "sm:text-left text-center text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 max-w-2xl",
        className
      )}
      {...props}
    >
      <Balancer ratio={ratio}>{children}</Balancer>
    </h1>
  );
}
