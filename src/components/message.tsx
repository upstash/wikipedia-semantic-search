import React from "react";
import { cn } from "@/lib/utils";
import { Message as MessageProps } from "ai/react";

const Message = ({
  role,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  role: MessageProps["role"];
}) => (
  <div
    className={cn(
      "flex",
      role === "user" ? "justify-end pl-5" : "justify pr-10",
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        "px-3 py-2 rounded-md",
        role === "user" ? "bg-yellow-500/20" : "bg-yellow-500/30",
      )}
    >
      {children}
    </div>
  </div>
);
export default Message;
