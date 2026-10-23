import { WORLD_CONTINENT_PATHS } from "@/data/worldMapPaths";

const ROUTES = [
  { d: "M762 206C625 123 410 122 244 172", endpoint: [244, 172], delay: "0s" },
  { d: "M762 206C603 238 449 317 367 362", endpoint: [367, 362], delay: "-1.15s" },
  { d: "M762 206C697 158 639 137 596 138", endpoint: [596, 138], delay: "-2.3s" },
  { d: "M762 206C704 225 652 260 611 293", endpoint: [611, 293], delay: "-3.45s" },
  { d: "M762 206C803 180 843 181 871 189", endpoint: [871, 189], delay: "-4.6s" },
  { d: "M762 206C865 266 930 341 963 396", endpoint: [963, 396], delay: "-5.75s" },
] as const;

const MAP_LABELS = [
  { name: "North America", x: 215, y: 143 },
  { name: "South America", x: 327, y: 419 },
  { name: "Europe", x: 564, y: 111 },
  { name: "Africa", x: 574, y: 335 },
  { name: "Asia", x: 875, y: 126 },
  { name: "Oceania", x: 947, y: 446 },
  { name: "Antarctica", x: 526, y: 568 },
] as const;

export default function AboutWorldReachMap() {
  return (
    <figure className="about-reach-panel about-reach-panel-color" aria-labelledby="about-reach-caption">
      <div className="about-reach-panel-head">
        <span>
          <i aria-hidden="true" />
          Global delivery network
        </span>
        <span>Pakistan / worldwide</span>
      </div>

      <div className="about-reach-map-wrap">
        <svg
          className="about-reach-map"
          viewBox="0 0 1100 620"
          role="img"
          aria-labelledby="about-reach-map-title about-reach-map-description"
        >
          <title id="about-reach-map-title">Bandesha Empire worldwide service map</title>
          <desc id="about-reach-map-description">
            An accurate, colourful world map with six animated service routes from
            Bandesha Empire in Pakistan to the world. Antarctica remains visible
            without a route.
          </desc>

          <defs>
            <linearGradient id="about-map-ocean" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#091a11" />
              <stop offset="0.48" stopColor="#10291c" />
              <stop offset="1" stopColor="#0a1c13" />
            </linearGradient>
            <radialGradient id="about-pakistan-glow">
              <stop offset="0" stopColor="#65c95d" stopOpacity="0.7" />
              <stop offset="1" stopColor="#38a947" stopOpacity="0" />
            </radialGradient>
            <filter id="about-land-shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#5b7690" floodOpacity="0.22" />
            </filter>
            <filter id="about-route-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id="about-route-arrow"
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10 2.5 5Z" fill="#278d45" />
            </marker>
          </defs>

          <rect className="about-reach-ocean" width="1100" height="620" rx="26" />

          <g className="about-reach-graticule" aria-hidden="true">
            <path d="M0 103H1100M0 206H1100M0 310H1100M0 413H1100M0 516H1100" />
            <path d="M183 0V620M367 0V620M550 0V620M733 0V620M917 0V620" />
          </g>

          <g className="about-reach-land" filter="url(#about-land-shadow)">
            {WORLD_CONTINENT_PATHS.map((continent) => (
              <path
                key={continent.name}
                className={`about-reach-continent about-reach-continent-${continent.tone}`}
                d={continent.path}
                fillRule="evenodd"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g className="about-reach-routes" aria-hidden="true">
            {ROUTES.map((route) => (
              <g key={route.d}>
                <path className="about-reach-route-base" d={route.d} />
                <path
                  className="about-reach-route-flow"
                  d={route.d}
                  markerEnd="url(#about-route-arrow)"
                  style={{ "--route-delay": route.delay } as React.CSSProperties}
                />
                <circle cx={route.endpoint[0]} cy={route.endpoint[1]} r="4.2" />
                <circle
                  className="about-reach-endpoint-pulse"
                  cx={route.endpoint[0]}
                  cy={route.endpoint[1]}
                  r="8"
                  style={{ "--route-delay": route.delay } as React.CSSProperties}
                />
              </g>
            ))}
          </g>

          <g className="about-reach-labels" aria-hidden="true">
            {MAP_LABELS.map((label) => (
              <text key={label.name} x={label.x} y={label.y}>
                {label.name}
              </text>
            ))}
          </g>

          <g className="about-reach-pakistan" transform="translate(762 206)">
            <circle className="about-reach-pakistan-glow" r="52" />
            <circle className="about-reach-pakistan-ring" r="18" />
            <circle className="about-reach-pakistan-core" r="6.5" />
            <path d="M0-29C-11-29-20-20-20-9C-20 7 0 29 0 29S20 7 20-9C20-20 11-29 0-29Zm0 28a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
          </g>

          <g className="about-reach-origin-card" transform="translate(704 238)">
            <rect width="176" height="56" rx="12" />
            <text x="16" y="21">OPERATING BASE</text>
            <text className="about-reach-origin-name" x="16" y="42">Pakistan</text>
            <circle cx="156" cy="28" r="4" />
          </g>
        </svg>
      </div>

      <figcaption id="about-reach-caption" className="about-reach-caption">
        <div>
          <span>From Pakistan to the world</span>
          <strong>One studio. Worldwide service.</strong>
        </div>
        <p>
          Bandesha Empire delivers across every continent through direct remote
          collaboration, clear ownership and a dependable system built without borders.
        </p>
        <div className="about-reach-caption-meta" aria-label="Worldwide service coverage">
          <span>Pakistan based</span>
          <i aria-hidden="true" />
          <span>Global reach</span>
          <i aria-hidden="true" />
          <span>6 active routes</span>
        </div>
      </figcaption>
    </figure>
  );
}
