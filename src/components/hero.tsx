"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { MagneticLink } from "@/components/magnetic-link";

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from("[data-hero-line] > span", {
        yPercent: 112,
        duration: 1.05,
        stagger: 0.09,
        delay: 0.82,
        ease: "power4.out",
      });
      gsap.from("[data-hero-detail]", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        delay: 1.12,
        ease: "power3.out",
      });
    }, scope);
    return () => context.revert();
  }, []);

  return (
    <section ref={scope} className="relative min-h-[100svh] overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="scene-poster absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 opacity-70 md:opacity-100" aria-hidden="true">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/25 to-transparent md:hidden" aria-hidden="true" />

      <div className="page-shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-6 pt-28 md:pb-8 md:pt-32">
        <div className="pointer-events-none flex flex-1 flex-col justify-center py-8">
          <p data-hero-detail className="mono-label mb-7 text-signal md:mb-10">
            Independent creative studio · Paris / Worldwide
          </p>
          <h1 id="hero-title" className="display-type text-[16.5vw] md:text-[15vw] xl:text-[13rem]">
            <span data-hero-line className="block overflow-hidden pb-[0.06em]">
              <span className="block">WE MAKE</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-[0.06em] md:pl-[8vw]">
              <span className="block">DIGITAL</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-[0.1em]">
              <span className="block">FEEL <em className="font-serif font-normal tracking-[-0.04em] text-signal">ALIVE.</em></span>
            </span>
          </h1>
        </div>

        <div className="grid items-end gap-7 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
          <p data-hero-detail className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:text-lg">
            Strategy, design, and code for brands that refuse to blend in. We turn ambitious ideas into experiences people can feel.
          </p>
          <div data-hero-detail className="md:col-span-4 md:col-start-7">
            <MagneticLink href="#work" direction="down" className="w-full md:w-auto">
              Explore selected work
            </MagneticLink>
          </div>
          <a
            href="#studio"
            data-hero-detail
            className="group hidden min-h-14 items-center justify-end gap-3 text-xs text-muted-foreground transition-colors hover:text-foreground md:col-span-2 md:col-start-11 md:flex"
          >
            Scroll to discover
            <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
