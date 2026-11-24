"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 48,
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    }, scope);
    return () => context.revert();
  }, []);

  return scope;
}
