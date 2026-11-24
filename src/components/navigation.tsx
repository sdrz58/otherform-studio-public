"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Playground", href: "#playground" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled && "border-line bg-background/85 backdrop-blur-xl",
      )}
    >
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <a
          href="#top"
          className="relative z-10 inline-flex min-h-11 items-center text-sm font-bold tracking-[-0.04em]"
          aria-label="OTHER/FORM home"
        >
          OTHER/FORM<span className="ml-1 text-signal">®</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors duration-200 hover:border-signal hover:text-signal md:inline-flex"
        >
          Start a project <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </DialogTrigger>
          <DialogContent className="menu-dialog inset-0 top-0 left-0 flex h-[100dvh] max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col border-0 bg-signal text-ink">
            <div className="flex h-20 items-center justify-between border-b border-ink/20">
              <DialogTitle className="text-sm font-bold tracking-[-0.04em]">OTHER/FORM®</DialogTitle>
              <DialogDescription className="sr-only">Site navigation</DialogDescription>
            </div>
            <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <DialogClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-16 items-center justify-between border-b border-ink/20 py-4 text-4xl font-semibold tracking-[-0.06em]"
                  >
                    {link.label}
                    <span className="font-mono text-xs tracking-normal">0{index + 1}</span>
                  </a>
                </DialogClose>
              ))}
            </nav>
            <DialogClose asChild>
              <a
                href="#contact"
                className="mb-[max(1rem,env(safe-area-inset-bottom))] inline-flex min-h-14 items-center justify-between rounded-full bg-ink px-6 text-paper"
              >
                Start a project <ArrowUpRight className="size-5" aria-hidden="true" />
              </a>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
