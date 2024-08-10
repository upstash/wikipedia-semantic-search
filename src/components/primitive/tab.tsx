"use client";
import { cn } from "@/lib/utils";

export const Tab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer border-b-2 px-2 py-1 transition-all bg-transparent rounded-none",
        {
          "hover:bg-amber-100 rounded-lg": !active,
          "border-b-amber-700": active,
          "border-b-transparent": !active,
        }
      )}
    >
      {label}
    </div>
  );
};
