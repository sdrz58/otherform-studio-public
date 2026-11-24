"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-line py-8 md:py-10">
      <div className="page-shell grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <a href="#top" className="inline-flex min-h-11 items-center text-sm font-bold tracking-[-0.04em]">OTHER/FORM<span className="ml-1 text-signal">®</span></a>
          <p className="mt-2 text-sm text-muted-foreground">Digital experiences with a pulse.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-4" aria-label="Footer navigation">
          <a className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground" href="#work">Work</a>
          <a className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground" href="#studio">Studio</a>
          <a className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground" href="#process">Process</a>
          <a className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground" href="#contact">Contact</a>
        </nav>
        <div className="flex items-end justify-between gap-6 md:col-span-3 md:col-start-10">
          <div className="font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground">
            <p>PARIS, FRANCE</p>
            <p>{time ? `${time} CET · ` : ""}© 2026</p>
          </div>
          <a href="#top" className="inline-flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:border-signal hover:text-signal" aria-label="Back to top"><ArrowUp className="size-4" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
