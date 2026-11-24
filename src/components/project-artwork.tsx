import type { ProjectVariant } from "@/data/projects";

export function ProjectArtwork({ variant }: { variant: ProjectVariant }) {
  if (variant === "aster") {
    return (
      <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden="true">
        <rect width="800" height="600" fill="#d2ff3f" />
        <g className="art-orbit" fill="none" stroke="#171a13">
          {Array.from({ length: 7 }, (_, index) => (
            <ellipse key={index} cx="430" cy="300" rx={75 + index * 43} ry={42 + index * 25} transform={`rotate(${index * 13 - 35} 430 300)`} strokeWidth={index === 3 ? 3 : 1.2} />
          ))}
        </g>
        <circle cx="430" cy="300" r="82" fill="#171a13" />
        <circle cx="402" cy="268" r="21" fill="#f0f2e9" />
        <path d="M40 70h150M40 88h92" stroke="#171a13" strokeWidth="2" />
        <text x="42" y="550" fill="#171a13" fontFamily="monospace" fontSize="15" letterSpacing="3">INTELLIGENCE / IN ORBIT</text>
      </svg>
    );
  }

  if (variant === "relay") {
    return (
      <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden="true">
        <rect width="800" height="600" fill="#ee6547" />
        <g stroke="#171a13" strokeOpacity="0.28">
          {Array.from({ length: 13 }, (_, index) => <path key={`v${index}`} d={`M${index * 66.67} 0v600`} />)}
          {Array.from({ length: 10 }, (_, index) => <path key={`h${index}`} d={`M0 ${index * 66.67}h800`} />)}
        </g>
        <g className="art-drift">
          <text x="56" y="465" fill="#171a13" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="430" letterSpacing="-55">R</text>
          <path d="M450 120h250v48H450zM450 192h172v48H450z" fill="#f0f2e9" />
          <circle cx="670" cy="450" r="75" fill="none" stroke="#f0f2e9" strokeWidth="26" />
        </g>
        <text x="48" y="65" fill="#171a13" fontFamily="monospace" fontSize="15" letterSpacing="3">MONEY / IN MOTION</text>
      </svg>
    );
  }

  if (variant === "noma") {
    const lines = Array.from({ length: 25 }, (_, index) => {
      const y = 70 + index * 19;
      const amplitude = 45 + index * 2.5;
      const path = Array.from({ length: 17 }, (__, point) => {
        const x = point * 50;
        const py = y + Math.sin(point * 0.65 + index * 0.23) * amplitude;
        return `${point === 0 ? "M" : "L"}${x} ${py}`;
      }).join(" ");
      return <path key={index} d={path} fill="none" stroke={index % 5 === 0 ? "#d2ff3f" : "#f0f2e9"} strokeWidth={index % 5 === 0 ? 3 : 1.2} />;
    });
    return (
      <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden="true">
        <rect width="800" height="600" fill="#252b51" />
        <g className="art-drift">{lines}</g>
        <circle cx="590" cy="270" r="105" fill="#ee6547" style={{ mixBlendMode: "screen" }} />
        <text x="42" y="550" fill="#f0f2e9" fontFamily="monospace" fontSize="15" letterSpacing="3">OBJECTS / WITH A SOUL</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden="true">
      <rect width="800" height="600" fill="#e6e1d4" />
      <g className="art-orbit">
        {Array.from({ length: 8 }, (_, index) => (
          <rect
            key={index}
            x={100 + index * 38}
            y={70 + index * 24}
            width={420 - index * 26}
            height={390 - index * 18}
            rx={210 - index * 13}
            fill={index % 2 === 0 ? "#171a13" : "#b9c5ff"}
            transform={`rotate(${index * 4 - 16} 400 300)`}
          />
        ))}
      </g>
      <path d="M44 70h150M44 88h92" stroke="#171a13" strokeWidth="2" />
      <text x="44" y="550" fill="#171a13" fontFamily="monospace" fontSize="15" letterSpacing="3">CULTURE / UNFOLDED</text>
    </svg>
  );
}
