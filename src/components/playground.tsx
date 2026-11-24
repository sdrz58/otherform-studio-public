"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useReveal } from "@/hooks/use-reveal";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };

export function Playground() {
  const scope = useReveal<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [energy, setEnergy] = useState(46);
  const [density, setDensity] = useState(64);
  const [paused, setPaused] = useState(false);
  const settings = useRef({ energy, density, paused });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    settings.current = { energy, density, paused };
  }, [energy, density, paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    const pointer = { x: -1000, y: -1000 };
    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.004, vy: (Math.random() - 0.5) * 0.004, radius: 1 + Math.random() * 1.8,
    }));

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const { energy: currentEnergy, density: currentDensity, paused: isPaused } = settings.current;
      context.clearRect(0, 0, width, height);
      const count = Math.round((currentDensity / 100) * particles.length);
      const speed = reducedMotion ? 0 : currentEnergy / 50;
      const active = particles.slice(0, count);

      active.forEach((particle) => {
        if (!isPaused && !reducedMotion) {
          const px = particle.x * width;
          const py = particle.y * height;
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120 && distance > 0) {
            particle.vx += (dx / distance) * 0.00008 * currentEnergy;
            particle.vy += (dy / distance) * 0.00008 * currentEnergy;
          }
          particle.vx *= 0.985;
          particle.vy *= 0.985;
          particle.x += particle.vx * speed;
          particle.y += particle.vy * speed;
          if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
          if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
          particle.x = Math.max(0, Math.min(1, particle.x));
          particle.y = Math.max(0, Math.min(1, particle.y));
        }
      });

      active.forEach((particle, index) => {
        const x = particle.x * width;
        const y = particle.y * height;
        for (let otherIndex = index + 1; otherIndex < active.length; otherIndex += 1) {
          const other = active[otherIndex];
          const ox = other.x * width;
          const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 105) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.strokeStyle = `rgba(210,255,63,${(1 - distance / 105) * 0.22})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
        context.beginPath();
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = index % 7 === 0 ? "#d2ff3f" : "rgba(240,242,233,0.72)";
        context.fill();
      });
    };

    const loop = () => {
      if (!visible) return;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => { resize(); draw(); });
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
      else if (visible) draw();
    });
    intersectionObserver.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000; };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <section ref={scope} id="playground" className="section-pad" aria-labelledby="playground-title">
      <div className="page-shell">
        <div data-reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mono-label mb-6 text-signal">Open experiment · Field 001</p>
            <h2 id="playground-title" className="display-type text-6xl md:text-8xl lg:text-9xl">A LITTLE<br /><span className="font-serif font-normal italic tracking-[-0.04em]">controlled chaos.</span></h2>
          </div>
          <p className="max-w-sm text-muted-foreground md:col-span-3 md:col-start-10">Move your pointer through the field. Then tune the system and see what happens.</p>
        </div>

        <div data-reveal className="mt-12 grid border border-line md:mt-16 lg:grid-cols-12">
          <div className="relative min-h-[360px] overflow-hidden bg-surface lg:col-span-9 lg:min-h-[540px]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-pan-y" aria-hidden="true" />
            <div className="pointer-events-none absolute top-5 left-5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">GENERATIVE PARTICLE STUDY / LIVE</div>
          </div>
          <div className="flex flex-col justify-between gap-10 border-t border-line p-6 md:p-8 lg:col-span-3 lg:border-t-0 lg:border-l">
            <div className="space-y-9">
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="energy-slider" className="mono-label">Energy</label>
                  <output className="font-mono text-xs text-signal" htmlFor="energy-slider">{energy}%</output>
                </div>
                <Slider id="energy-slider" min={0} max={100} step={1} value={[energy]} onValueChange={([value]) => setEnergy(value)} aria-label="Particle energy" />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="density-slider" className="mono-label">Density</label>
                  <output className="font-mono text-xs text-signal" htmlFor="density-slider">{density}%</output>
                </div>
                <Slider id="density-slider" min={20} max={100} step={1} value={[density]} onValueChange={([value]) => setDensity(value)} aria-label="Particle density" />
              </div>
            </div>
            <div>
              <Button variant="outline" className="w-full" onClick={() => setPaused((value) => !value)} aria-pressed={paused} disabled={Boolean(reducedMotion)}>
                {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                {paused ? "Resume field" : "Pause field"}
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {reducedMotion ? "Static mode respects your reduced-motion preference." : "Built with Canvas 2D. No two moments are quite the same."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
