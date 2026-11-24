export type ProjectVariant = "aster" | "relay" | "noma" | "fold";

export type Project = {
  id: string;
  title: string;
  discipline: string;
  year: string;
  summary: string;
  challenge: string;
  response: string;
  outcome: string;
  services: string[];
  stat: { value: string; label: string };
  variant: ProjectVariant;
};

export const projects: Project[] = [
  {
    id: "aster",
    title: "Aster Intelligence",
    discipline: "Brand system · Digital product",
    year: "2026",
    summary: "Making complex AI infrastructure feel remarkably human.",
    challenge: "Aster had deep technical credibility, but its story felt like every other AI platform. The studio needed to reveal the useful, human layer beneath a complex orchestration product.",
    response: "We built an identity around constellations of small decisions, then carried that logic into a modular product story, an interactive model explorer, and a flexible launch system.",
    outcome: "A clearer category position and a product narrative that gives every audience—from developers to executives—a reason to lean in.",
    services: ["Positioning", "Visual identity", "Product storytelling", "Creative development"],
    stat: { value: "3.2×", label: "more qualified product explorations" },
    variant: "aster",
  },
  {
    id: "relay",
    title: "Relay Financial",
    discipline: "Digital flagship · Motion",
    year: "2026",
    summary: "A new rhythm for modern business banking.",
    challenge: "Relay was growing beyond its startup roots. Its digital presence needed to earn enterprise trust without losing the momentum and directness that made the brand distinctive.",
    response: "An editorial design system pairs precise typography with a living transaction grid. Every animation explains flow, speed, or control—never decoration for its own sake.",
    outcome: "A high-performance flagship that turns an invisible financial infrastructure into a tangible, confident experience.",
    services: ["Digital strategy", "UX/UI design", "Motion language", "Next.js engineering"],
    stat: { value: "48%", label: "lift in completed demo journeys" },
    variant: "relay",
  },
  {
    id: "noma",
    title: "Noma Objects",
    discipline: "E-commerce · 3D experience",
    year: "2025",
    summary: "Sculptural objects, curated in a digital gallery.",
    challenge: "Noma's objects are tactile and expressive, but its old storefront reduced them to a conventional product grid. The experience needed to preserve material curiosity and still sell with clarity.",
    response: "We designed a gallery-like commerce journey with configurable materials, cinematic transitions, and close-up 3D studies—all balanced by a direct, frictionless buying path.",
    outcome: "A richer product experience that gives collectors room to explore while keeping every decision simple.",
    services: ["Art direction", "Commerce UX", "3D interaction", "Design system"],
    stat: { value: "1.8s", label: "largest contentful paint on mobile" },
    variant: "noma",
  },
  {
    id: "fold",
    title: "Fold Culture",
    discipline: "Campaign · Interactive editorial",
    year: "2025",
    summary: "An archive that moves at the speed of culture.",
    challenge: "Fold's annual report brought together hundreds of voices across music, fashion, and independent publishing. It needed a point of view without flattening the diversity inside it.",
    response: "A kinetic editorial system treats every story as a fold in one continuous surface. Readers can follow a curated thread or cut their own path through the archive.",
    outcome: "A living cultural document designed for return visits, unexpected connections, and effortless sharing.",
    services: ["Creative concept", "Editorial design", "Interaction design", "Creative code"],
    stat: { value: "26", label: "markets reached during launch week" },
    variant: "fold",
  },
];
