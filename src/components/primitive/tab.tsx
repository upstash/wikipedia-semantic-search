"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Tab = ({
  className,
  children,
  active,
  onClick,
}: ComponentProps<"button"> & {
  active: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer border-b-2 px-2 py-1 transition-all bg-transparent rounded-none",
        {
          "hover:bg-amber-100 rounded-lg": !active,
          "border-b-amber-700": active,
          "border-b-transparent": !active,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
