"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down";
  onClick?: () => void;
};

export function MagneticLink({
  href,
  children,
  className,
  direction = "up",
  onClick,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.25 });
  const Icon = direction === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex min-h-14 items-center justify-between gap-8 rounded-full bg-signal px-6 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal md:px-7",
        className,
      )}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <span>{children}</span>
      <Icon className="size-5 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
    </motion.a>
  );
}
