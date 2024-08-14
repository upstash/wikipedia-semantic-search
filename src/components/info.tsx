import React from "react";
import { cn } from "@/lib/utils";

export const Info = ({ children, className }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "text-emerald-900 rounded-lg grid gap-4 bg-emerald-50 p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
