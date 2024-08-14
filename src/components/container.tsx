import React from "react";
import { cn } from "@/lib/utils";

const Container = ({
  className,
  ...props
}: React.ComponentProps<"div"> & {}) => (
  <div
    className={cn("max-w-screen-md mx-auto px-4 sm:px-6", className)}
    {...props}
  />
);
export default Container;
