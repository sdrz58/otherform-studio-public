"use client";

import { MagneticLink } from "@/components/magnetic-link";
import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { number: "01", title: "Find the signal", text: "We ask better questions, listen closely, and get to the one idea that makes the rest fall into place.", detail: "Discovery · Research · Alignment" },
  { number: "02", title: "Make it tangible", text: "We prototype early. Not a presentation about the experience—the experience itself, ready to react to and refine.", detail: "Direction · Design · Prototypes" },
  { number: "03", title: "Build the real thing", text: "Design and engineering move as one team, turning the strongest direction into a fast, accessible, resilient product.", detail: "Development · Motion · QA" },
  { number: "04", title: "Release, learn, repeat", text: "Launch is a beginning. We measure what matters, improve what we made, and leave your team with a system that grows.", detail: "Launch · Measurement · Evolution" },
];

export function Process() {
  const scope = useReveal<HTMLElement>();
  return (
    <section ref={scope} id="process" className="section-pad bg-paper text-ink" aria-labelledby="process-title">
      <div className="page-shell grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p data-reveal className="mono-label">How we work</p>
            <h2 id="process-title" data-reveal className="display-type mt-6 text-6xl md:text-7xl lg:text-8xl">
              SMALL TEAM.<br />BIG <span className="font-serif font-normal italic tracking-[-0.04em]">swings.</span>
            </h2>
            <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
              A direct, collaborative process with enough structure to keep momentum and enough space to discover something unexpected.
            </p>
            <div data-reveal className="mt-8">
              <MagneticLink href="#contact" className="bg-ink text-paper hover:bg-signal hover:text-ink">Work with us</MagneticLink>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {steps.map((step) => (
            <article key={step.number} data-reveal className="border-t border-ink/25 py-8 first:border-t-0 first:pt-0 md:py-12">
              <div className="flex items-start gap-6 md:gap-10">
                <span className="font-mono text-xs">{step.number}</span>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] md:text-5xl">{step.title}</h3>
                  <p className="mt-5 max-w-lg leading-relaxed text-ink/70">{step.text}</p>
                  <p className="mono-label mt-6 text-ink/60">{step.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
