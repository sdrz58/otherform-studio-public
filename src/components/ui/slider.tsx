"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex min-h-11 w-full cursor-pointer touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-px w-full grow overflow-visible bg-line">
      <SliderPrimitive.Range className="absolute h-full bg-signal" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label={props["aria-label"] ?? "Adjust value"}
      className="block size-5 rounded-full border-2 border-ink bg-signal shadow-[0_0_0_6px_rgba(210,255,63,0.12)] outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";

export { Slider };
