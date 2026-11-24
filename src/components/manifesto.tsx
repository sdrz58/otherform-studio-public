"use client";

import { useReveal } from "@/hooks/use-reveal";

const principles = [
  { title: "One senior team", text: "The people in the room are the people making the work. No mystery layers, no handoff into the unknown." },
  { title: "Form follows feeling", text: "Every visual and interaction has a job: make the idea clearer, the brand sharper, or the experience more human." },
  { title: "Built in the open", text: "Short loops, working prototypes, honest conversations. You see the work take shape and help make it better." },
];

export function Manifesto() {
  const scope = useReveal<HTMLElement>();
  return (
    <section ref={scope} id="studio" className="section-pad" aria-labelledby="studio-title">
      <div className="page-shell">
        <p data-reveal className="mono-label text-signal">A different kind of digital studio</p>
        <h2 id="studio-title" data-reveal className="mt-8 max-w-[14ch] text-[13vw] font-semibold leading-[0.92] tracking-[-0.07em] md:text-[8.5vw]">
          The internet has enough <span className="text-stroke">ordinary.</span> We’re here for the <span className="font-serif font-normal italic text-signal">other.</span>
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:mt-24">
          <p data-reveal className="max-w-xl text-xl leading-relaxed md:col-span-5 md:col-start-7 md:text-2xl">
            OTHER/FORM is an independent team of strategists, designers, and creative developers. We work where brand, product, and technology meet—because that’s where the interesting things happen.
          </p>
        </div>
        <div className="mt-16 grid border-t border-line md:grid-cols-3 md:mt-24">
          {principles.map((principle, index) => (
            <div key={principle.title} data-reveal className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0">
              <span className="font-mono text-xs text-signal">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{principle.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
