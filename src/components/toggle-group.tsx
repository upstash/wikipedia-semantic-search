import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ToggleGroupSingleProps } from "@radix-ui/react-toggle-group";

const toggleGroupItemClasses =
  "hover:bg-emerald-50 data-[state=on]:bg-emerald-100 " +
  "data-[state=on]:text-emerald-700 flex h-10 w-10 " +
  "items-center justify-center bg-white text-base leading-4 " +
  "first:rounded-l last:rounded-r focus:z-10";

export default function ToggleGroupDemo({
  className,
  ...props
}: ToggleGroupSingleProps & {
  className?: string;
}) {
  return (
    <ToggleGroup.Root
      className="inline-flex bg-mauve6 border border-emerald-400 rounded space-x-px"
      {...props}
      type="single"
    >
      <ToggleGroup.Item className={toggleGroupItemClasses} value="5">
        5
      </ToggleGroup.Item>
      <ToggleGroup.Item className={toggleGroupItemClasses} value="10">
        10
      </ToggleGroup.Item>
      <ToggleGroup.Item className={toggleGroupItemClasses} value="20">
        20
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
