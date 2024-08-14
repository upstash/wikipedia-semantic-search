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
      role === "user" ? "justify-end" : "justify",
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        " flex",
        role === "user" ? "w-2/3 justify-end" : "w-5/6 justify",
      )}
    >
      <div
        className={cn(
          "rounded-lg",
          role === "user" ? "px-3 py-2 bg-white" : "",
        )}
      >
        {children}
        {/*<DebugDrawer metadata={meta}>*/}
        {/*  <button className="text-yellow-950 hover:underline">*/}
        {/*    debug*/}
        {/*  </button>*/}
        {/*</DebugDrawer>*/}
      </div>
    </div>
  </div>
);
export default Message;
