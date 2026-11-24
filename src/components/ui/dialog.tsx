"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

function DialogContent({
  className,
  children,
  closeLabel = "Close dialog",
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  closeLabel?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-ink/75 backdrop-blur-md" />
      <DialogPrimitive.Content
        className={cn(
          "dialog-content fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-line bg-background text-foreground shadow-2xl outline-none",
          className,
        )}
        data-lenis-prevent
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-background/90 text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
