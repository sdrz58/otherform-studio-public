const items = ["Strategy", "Identity", "Digital", "Motion", "Technology"];

function MarqueeContent({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <span className="display-type px-6 text-5xl md:px-10 md:text-7xl">{item}</span>
          <span className="size-2 rounded-full bg-signal md:size-3" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-b border-line py-7 md:py-9" aria-label="Our disciplines">
      <div className="marquee-track flex">
        <MarqueeContent />
        <MarqueeContent hidden />
      </div>
    </div>
  );
}
