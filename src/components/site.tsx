"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Manifesto } from "@/components/manifesto";
import { Projects } from "@/components/projects";
import { Interlude } from "@/components/interlude";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { Playground } from "@/components/playground";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export function Site() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <ScrollProgress />
      <Navigation />
      <main id="top">
        <Hero />
        <Marquee />
        <Manifesto />
        <Projects />
        <Interlude />
        <Capabilities />
        <Process />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
