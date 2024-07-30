import React from "react";
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "@radix-ui/react-collapsible";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const Collapsible = ({
  className,
  ...props
}: CollapsibleProps & {
  className?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <CollapsiblePrimitive.Root
      className={cn("", className)}
      open={open}
      onOpenChange={setOpen}
      {...props}
    />
  );
};

const CollapsibleTrigger = ({
  className,

  ...props
}: CollapsibleTriggerProps & {
  className?: string;
}) => {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn("text-left", className)}
      {...props}
    />
  );
};

const CollapsibleContent = ({
  className,
  ...props
}: CollapsibleContentProps & {
  className?: string;
}) => {
  return (
    <CollapsiblePrimitive.Content className={cn("", className)} {...props} />
  );
};

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
