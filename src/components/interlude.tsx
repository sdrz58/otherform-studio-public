"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Interlude() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!section.current || !track.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(track.current, {
      xPercent: -18,
      ease: "none",
      scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 0.7 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={section} className="overflow-hidden bg-signal py-12 text-ink md:py-20" aria-label="Our attitude">
      <div ref={track} className="flex w-max items-center whitespace-nowrap">
        <span className="display-type text-[24vw] md:text-[18vw]">BOLD BY DEFAULT</span>
        <span className="mx-8 size-[5vw] rounded-full border-[2vw] border-ink md:mx-12" aria-hidden="true" />
        <span className="display-type text-[24vw] md:text-[18vw]">BOLD BY DEFAULT</span>
      </div>
    </section>
  );
}
