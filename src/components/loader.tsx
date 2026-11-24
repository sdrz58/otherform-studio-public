"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function Loader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      const reducedFrame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(reducedFrame);
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - start) / 800) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setVisible(false), 80);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-signal p-5 text-ink md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label={`Loading website, ${progress}%`}
        >
          <div className="flex items-center justify-between font-mono text-xs font-medium tracking-[0.12em]">
            <span>OTHER/FORM®</span>
            <span>LOADING EXPERIENCE</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="display-type text-[20vw] leading-[0.72] md:text-[12vw]">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="mb-2 font-serif text-3xl italic md:text-5xl">Stay curious.</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
