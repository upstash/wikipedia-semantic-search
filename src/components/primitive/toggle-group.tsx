import React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import {
  ToggleGroupItemProps,
  ToggleGroupSingleProps,
} from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = ({
  className,
  ...props
}: ToggleGroupSingleProps & {
  className?: string;
}) => {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "inline-flex bg-mauve6 border border-emerald-400 rounded space-x-px",
        className,
      )}
      {...props}
    />
  );
};

const toggleGroupItemClasses =
  "hover:bg-emerald-50 data-[state=on]:bg-emerald-100 " +
  "data-[state=on]:text-emerald-700 flex h-10 w-10 " +
  "items-center justify-center bg-white text-base leading-4 " +
  "first:rounded-l last:rounded-r focus:z-10";

const ToggleGroupItem = ({
  className,
  ...props
}: ToggleGroupItemProps & {
  className?: string;
}) => {
  return (
    <ToggleGroupPrimitive.Item
      className={cn("", toggleGroupItemClasses)}
      {...props}
    />
  );
};

export { ToggleGroup, ToggleGroupItem };
