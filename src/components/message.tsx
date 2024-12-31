import React from "react";
import { cn } from "@/lib/utils";
import { Message as MessageProps } from "ai/react";
import { DebugDrawer } from "@/components/debug-drawer";

const Message = ({
  role,
  children,
  className,
  meta,
  ...props
}: React.ComponentProps<"div"> & {
  role: MessageProps["role"];
  meta?: any;
}) => (
  <div
    className={cn(
      "flex py-1",
      role === "user" ? "justify-end" : "justify",
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        " flex",
        role === "user" ? "sm:w-2/3 justify-end" : "sm:w-5/6 justify",
      )}
    >
      <div
        className={cn(
          "rounded-xl",
          role === "user"
            ? "px-2 sm:px-4 py-1 sm:py-4 bg-zinc-100 text-zinc-950 font-medium"
            : "",
        )}
      >
        <div>{children}</div>

        {role === "assistant" && meta && (
          <div className="flex mt-1">
            <DebugDrawer metadata={meta} />
          </div>
        )}
      </div>
    </div>
  </div>
);
export default Message;
