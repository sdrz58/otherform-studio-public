import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform,opacity] duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-signal hover:text-ink",
        signal: "bg-signal text-ink hover:bg-foreground hover:text-background",
        outline: "border border-line bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        ghost: "bg-transparent text-foreground hover:bg-foreground/8",
        inverse: "bg-ink text-paper hover:bg-paper hover:text-ink",
      },
      size: {
        default: "min-h-11 px-5",
        sm: "min-h-11 px-4 text-xs",
        lg: "min-h-14 px-7 text-base",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
