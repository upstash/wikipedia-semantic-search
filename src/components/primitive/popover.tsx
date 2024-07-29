import React from "react";
import type {
  PopoverContentProps,
  PopoverProps,
} from "@radix-ui/react-popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = ({ ...props }: PopoverProps & {}) => (
  <PopoverPrimitive.Root {...props} />
);

const PopoverTrigger = ({
  ...props
}: PopoverProps & {
  className?: string;
}) => <PopoverPrimitive.Trigger asChild {...props} />;

const PopoverContent = ({
  className,
  children,
  ...props
}: PopoverContentProps & {
  className?: string;
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      className={cn("rounded-xl p-5 w-[260px] bg-white shadow-2xl", className)}
      sideOffset={5}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent };
