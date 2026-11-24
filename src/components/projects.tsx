"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { ProjectArtwork } from "@/components/project-artwork";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReveal } from "@/hooks/use-reveal";

export function Projects() {
  const scope = useReveal<HTMLElement>();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [open, setOpen] = useState(false);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(projects.length - 1, index));
    const container = track.current;
    const card = container?.children[next] as HTMLElement | undefined;
    if (!container || !card) return;
    container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: "smooth" });
    setActive(next);
  };

  const openProject = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <section ref={scope} id="work" className="section-pad overflow-hidden" aria-labelledby="work-title">
      <div className="page-shell">
        <div data-reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mono-label mb-6 text-signal">Selected work · 2025—2026</p>
            <h2 id="work-title" className="display-type text-6xl md:text-8xl lg:text-9xl">
              MADE TO<br /><span className="font-serif font-normal italic tracking-[-0.04em]">move people.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground md:col-span-3 md:col-start-10">
            A selection of identities, products, and digital places built for ambitious teams at moments of change.
          </p>
        </div>
      </div>

      <div data-reveal className="mt-14 md:mt-20">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-10 xl:px-16"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected projects"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); goTo(active + 1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active - 1); }
          }}
          onScroll={(event) => {
            const container = event.currentTarget;
            const cards = Array.from(container.children) as HTMLElement[];
            const nearest = cards.reduce((best, card, index) => {
              const distance = Math.abs(card.offsetLeft - container.offsetLeft - container.scrollLeft);
              return distance < best.distance ? { index, distance } : best;
            }, { index: 0, distance: Number.POSITIVE_INFINITY });
            setActive(nearest.index);
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group w-[86vw] max-w-5xl shrink-0 snap-start sm:w-[72vw] lg:w-[64vw]"
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <button
                type="button"
                className="block w-full text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                onClick={() => openProject(project)}
                aria-label={`View ${project.title} case study`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-surface md:aspect-[16/9]">
                  <ProjectArtwork variant={project.variant} />
                  <span className="absolute right-4 bottom-4 inline-flex size-12 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:rotate-45 md:right-6 md:bottom-6 md:size-14">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </span>
                <span className="grid gap-4 border-b border-line py-5 md:grid-cols-12 md:py-6">
                  <span className="block md:col-span-6">
                    <span className="block text-2xl font-semibold tracking-[-0.045em] md:text-4xl">{project.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{project.discipline}</span>
                  </span>
                  <span className="block max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-8 md:text-base">{project.summary}</span>
                  <span className="block font-mono text-xs md:col-span-1 md:text-right">{project.year}</span>
                </span>
              </button>
            </article>
          ))}
        </div>

        <div className="page-shell mt-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous project">
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => goTo(active + 1)} disabled={active === projects.length - 1} aria-label="Next project">
              <ArrowRight aria-hidden="true" />
            </Button>
            <span className="ml-2 font-mono text-xs text-muted-foreground" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="h-px flex-1 bg-line">
            <div className="h-px origin-left bg-signal transition-transform duration-200" style={{ transform: `scaleX(${(active + 1) / projects.length})` }} />
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-[4/3] lg:sticky lg:top-0 lg:aspect-auto lg:min-h-full">
              <ProjectArtwork variant={selected.variant} />
            </div>
            <div className="p-6 md:p-10 lg:p-12">
              <p className="mono-label pr-12 text-signal">{selected.discipline} · {selected.year}</p>
              <DialogTitle className="mt-6 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">{selected.title}</DialogTitle>
              <DialogDescription className="mt-5 text-lg leading-relaxed text-muted-foreground">{selected.summary}</DialogDescription>
              <div className="mt-10 border-y border-line py-8">
                <span className="display-type text-7xl text-signal">{selected.stat.value}</span>
                <p className="mt-2 text-sm text-muted-foreground">{selected.stat.label}</p>
              </div>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="mono-label mb-3">The challenge</h3>
                  <p className="leading-relaxed text-muted-foreground">{selected.challenge}</p>
                </div>
                <div>
                  <h3 className="mono-label mb-3">Our response</h3>
                  <p className="leading-relaxed text-muted-foreground">{selected.response}</p>
                </div>
                <div>
                  <h3 className="mono-label mb-3">The outcome</h3>
                  <p className="leading-relaxed text-muted-foreground">{selected.outcome}</p>
                </div>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Services provided">
                {selected.services.map((service) => <li key={service} className="rounded-full border border-line px-4 py-2 text-xs">{service}</li>)}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
