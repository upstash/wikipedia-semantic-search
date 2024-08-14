import React from "react";
import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Dialog = ({ ...props }: DialogProps & {}) => (
  <DialogPrimitive.Root {...props} />
);

const DialogTrigger = ({ ...props }: DialogTriggerProps & {}) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

const DialogContent = ({ children, ...props }: DialogContentProps & {}) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="bg-black/70 fixed inset-0" />

    <DialogPrimitive.Content
      className={cn(
        "p-6 relative overflow-y-scroll",
        "fixed top-1/2 left-1/2",
        "-translate-x-1/2 -translate-y-1/2",
        "max-h-[85vh] w-[90vw] max-w-[650px]",
        "data-[state=open]:animate-contentShow rounded-lg bg-white",
        "shadow-2xl focus:outline-none",
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close asChild>
        <button
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <Cross2Icon />
        </button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

const DialogTitle = ({ ...props }: DialogTitleProps & {}) => (
  <DialogPrimitive.Title {...props} />
);

const DialogDescription = ({ ...props }: DialogDescriptionProps & {}) => (
  <DialogPrimitive.Description {...props} />
);

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription };
