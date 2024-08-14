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
  <TabsPrimitive.List
    className={cn("flex gap-2 bg-yellow-100", className)}
    {...props}
  />
);

const TabsTrigger = ({
  className,
  ...props
}: TabsTriggerProps & {
  className?: string;
}) => (
  <TabsPrimitive.Trigger
    className={cn(
      "h-10 grow sm:grow-0 px-4 rounded-t-lg opacity-80 border border-transparent border-b-0",
      "data-[state=active]:font-bold",
      "data-[state=active]:opacity-100",
      "data-[state=active]:bg-white",
      "data-[state=active]:border-yellow-700/20",
      className,
    )}
    {...props}
  />
);

const TabsContent = ({
  className,
  ...props
}: TabsContentProps & {
  className?: string;
}) => <TabsPrimitive.Content className={cn("grow", className)} {...props} />;

export { Tabs, TabsList, TabsTrigger, TabsContent };
