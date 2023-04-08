import { cn } from "@/libs/cn";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

type BackButtonProps = {
  text: string;
  to: string;
  className?: string;
};

export function BackButton({ text, to, className }: BackButtonProps) {
  return (
    <div className={cn("flex", className)}>
      <Link
        to={to}
        className="flex items-center gap-2 p-1 text-lg transition-all sm:-ml-7 text-slate-600 hover:text-slate-800 group"
      >
        <ArrowLeft />
        <span className="pb-1 -mb-1.5 border-b-2 border-transparent group-hover:border-slate-600">
          {text}
        </span>
      </Link>
    </div>
  );
}
