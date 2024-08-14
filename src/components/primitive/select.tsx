import React from "react";
import type {
  SelectContentProps,
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
} from "@radix-ui/react-select";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Select = ({
  className,
  ...props
}: SelectProps & {
  className?: string;
}) => <SelectPrimitive.Root {...props} />;

const SelectTrigger = ({
  className,
  children,
  ...props
}: SelectTriggerProps & {
  className?: string;
}) => (
  <SelectPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center gap-2",
      "px-2 leading-none h-10",
      "border border-yellow-700/20 rounded-lg outline-none bg-white",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon className="">
      <ChevronDownIcon />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectValue = ({
  className,
  ...props
}: SelectValueProps & {
  className?: string;
}) => <SelectPrimitive.Value {...props} />;

const SelectContent = ({
  className,
  children,
  ...props
}: SelectContentProps & {
  className?: string;
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className="overflow-hidden bg-white rounded-md shadow-xl"
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      {/**/}

      <SelectPrimitive.Viewport className="p-2">
        {children}
      </SelectPrimitive.Viewport>

      {/**/}
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
        <ChevronDownIcon />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectItem = ({
  className,
  children,
  ...props
}: SelectItemProps & {
  className?: string;
}) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        "leading-none flex items-center h-8 pr-6 pl-4 rounded-md relative select-none",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        "cursor-pointer",
        "data-[highlighted]:bg-yellow-50",
        "data-[state=checked]:bg-yellow-100",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator className="ml-2">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
