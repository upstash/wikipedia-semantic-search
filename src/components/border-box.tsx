import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const BorderBox = ({
  children,
  className = "",
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn(
        "p-8 border border-zinc-200 bg-white  rounded-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
};
