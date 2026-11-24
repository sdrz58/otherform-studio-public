"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/use-reveal";

const capabilities = [
  {
    id: "strategy",
    title: "Strategy & direction",
    description: "Find the sharp idea before making anything shiny. We align audience, ambition, and opportunity into a creative direction your whole team can use.",
    services: ["Research & positioning", "Creative strategy", "Digital roadmaps", "Content architecture"],
  },
  {
    id: "identity",
    title: "Identity systems",
    description: "Distinctive brands built to move. From the central idea to the smallest interaction, we create systems with enough character to be recognized and enough logic to scale.",
    services: ["Visual identity", "Verbal direction", "Motion identity", "Brand guidelines"],
  },
  {
    id: "digital",
    title: "Digital experiences",
    description: "Websites and products that make complicated things feel clear. We design and build together, protecting the idea all the way into the browser.",
    services: ["UX/UI design", "Creative development", "E-commerce", "Design systems"],
  },
  {
    id: "motion",
    title: "3D & motion",
    description: "Depth with a purpose. We use real-time 3D, generative systems, and motion to explain products, create atmosphere, and make key moments unforgettable.",
    services: ["Real-time 3D", "Interaction design", "Motion systems", "Launch films"],
  },
];

export function Capabilities() {
  const scope = useReveal<HTMLElement>();
  return (
    <section ref={scope} className="section-pad" aria-labelledby="capabilities-title">
      <div className="page-shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p data-reveal className="mono-label text-signal">What we do</p>
            <h2 id="capabilities-title" data-reveal className="display-type mt-6 text-6xl md:text-7xl lg:text-8xl">
              WIDE<br />RANGE.<br /><span className="font-serif font-normal italic tracking-[-0.04em]">Sharp focus.</span>
            </h2>
            <p data-reveal className="mt-8 max-w-sm leading-relaxed text-muted-foreground">
              Come to us for one piece or the whole puzzle. We shape the team around the problem, not the other way around.
            </p>
          </div>
        </div>
        <div data-reveal className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible defaultValue="strategy">
            {capabilities.map((capability, index) => (
              <AccordionItem key={capability.id} value={capability.id}>
                <AccordionTrigger>
                  <span className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    <span className="text-2xl font-semibold tracking-[-0.045em] md:text-4xl">{capability.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 md:pl-16">
                    <p className="max-w-xl leading-relaxed text-muted-foreground">{capability.description}</p>
                    <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {capability.services.map((service) => (
                        <li key={service} className="flex items-center gap-3 text-sm">
                          <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />{service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
