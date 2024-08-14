import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = ({
  className,
  ...props
}: TabsProps & {
  className?: string;
}) => (
  <TabsPrimitive.Root className={cn("flex flex-col", className)} {...props} />
);

const TabsList = ({
  className,
  ...props
}: TabsListProps & {
  className?: string;
}) => (
  <TabsPrimitive.List className={cn("flex flex-col", className)} {...props} />
);

const TabsTrigger = ({
  className,
  ...props
}: TabsTriggerProps & {
  className?: string;
}) => (
  <TabsPrimitive.Trigger
    className={cn("flex flex-col", className)}
    {...props}
  />
);

const TabsContent = ({
  className,
  ...props
}: TabsContentProps & {
  className?: string;
}) => (
  <TabsPrimitive.Content
    className={cn("flex flex-col", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
