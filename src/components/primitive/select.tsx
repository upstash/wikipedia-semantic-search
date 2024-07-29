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
      "border rounded-md outline-none bg-white",
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
      className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      {/**/}

      <SelectPrimitive.Viewport className="p-[5px]">
        {children}
      </SelectPrimitive.Viewport>

      {/**/}
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
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
        "text-[13px] leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        "data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
