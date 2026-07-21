type DelayVars = React.CSSProperties & {
  "--reveal-delay"?: string;
  "--flow-delay"?: string;
  "--pulse-delay"?: string;
  "--path-length"?: string;
};

function delayStyle(
  reveal: number,
  extra?: { flow?: number; pulse?: number; pathLength?: number },
): DelayVars {
  return {
    "--reveal-delay": `${reveal}ms`,
    ...(extra?.flow !== undefined ? { "--flow-delay": `${extra.flow}ms` } : {}),
    ...(extra?.pulse !== undefined ? { "--pulse-delay": `${extra.pulse}ms` } : {}),
    ...(extra?.pathLength !== undefined
      ? { "--path-length": `${extra.pathLength}` }
      : {}),
  };
}

const MATERIALS = {
  brick: "#B8674B",
  brickShadow: "#8E4936",
  brickHighlight: "#D58A6B",
  glass: "#9FB7C4",
  glassDark: "#637E8C",
  glassReflection: "#DCE8ED",
  concrete: "#D8D1C5",
  stoneLight: "#EEE9E1",
  concreteShadow: "#AAA297",
  metal: "#30373A",
  metalSecondary: "#596266",
  warmLight: "#EFCB93",
};

type WinState = "day" | "dark" | "warm";
type FloorSpec = { y: number; h: number; groups: WinState[][] };

const winFill = (state: WinState, alt: boolean) => {
  if (state === "warm") return MATERIALS.warmLight;
  if (state === "dark") return MATERIALS.glassDark;
  return alt ? MATERIALS.glassDark : MATERIALS.glass;
};

// Six main tower floors, bottom to top, brick core beside the glass spine.
const CORE_FLOORS: FloorSpec[] = [
  { y: 456, h: 50, groups: [["day", "warm", "day"], ["dark", "day"]] },
  { y: 406, h: 50, groups: [["dark", "day", "dark"], ["day", "warm"]] },
  { y: 356, h: 50, groups: [["day", "day", "dark"], ["dark", "day"]] },
  { y: 306, h: 50, groups: [["warm", "day", "day"], ["day", "dark"]] },
  { y: 256, h: 50, groups: [["day", "dark", "day"], ["warm", "day"]] },
  { y: 206, h: 50, groups: [["dark", "day", "warm"], ["day", "dark"]] },
];

// Projecting brick wing, aligned with the bottom four core floors.
const WING_FLOORS: FloorSpec[] = [
  { y: 456, h: 50, groups: [["day", "dark"]] },
  { y: 406, h: 50, groups: [["dark", "day"]] },
  { y: 356, h: 50, groups: [["day", "warm"]] },
  { y: 306, h: 50, groups: [["dark", "day"]] },
];

// The single upper setback.
const TOP_FLOOR: FloorSpec = { y: 160, h: 46, groups: [["day", "dark"]] };

const SPINE_X = 330;
const SPINE_W = 55;
const CORE_X = 175;
const CORE_W = 230;
const CORE_BRICK_W = SPINE_X - CORE_X; // 155
const PIER_X = SPINE_X + SPINE_W; // 385
const PIER_W = CORE_X + CORE_W - PIER_X; // 20
const WING_X = 115;
const WING_W = CORE_X - WING_X; // 60

function Windows({
  floor,
  x,
  width,
  windowDelay,
  lightDelayBase,
}: {
  floor: FloorSpec;
  x: number;
  width: number;
  windowDelay: number;
  lightDelayBase: number;
}) {
  const pad = 10;
  const pier = 12;
  const innerGap = 3;
  const totalWindows = floor.groups.reduce((n, g) => n + g.length, 0);
  const innerGaps = floor.groups.reduce((n, g) => n + (g.length - 1) * innerGap, 0);
  const pierGaps = (floor.groups.length - 1) * pier;
  const winW = (width - pad * 2 - innerGaps - pierGaps) / totalWindows;
  const winH = floor.h * 0.5;
  const winY = floor.y + floor.h * 0.28;
  const perimeter = Math.round(2 * (winW + winH));

  let cursor = x + pad;
  let windowIndex = 0;
  const nodes: React.ReactNode[] = [];

  floor.groups.forEach((group, groupIndex) => {
    const groupDelay = windowDelay + groupIndex * 90;
    group.forEach((state, i) => {
      const wx = cursor;
      const showReflection = state === "dark" || (state === "day" && windowIndex % 3 === 0);
      nodes.push(
        <g key={`${groupIndex}-${i}`}>
          <rect
            x={wx}
            y={winY}
            width={winW}
            height={winH}
            fill={winFill(state, windowIndex % 2 === 0)}
            className="bld-window"
            style={delayStyle(groupDelay)}
          />
          {state === "warm" && (
            <rect
              x={wx}
              y={winY}
              width={winW}
              height={winH}
              fill={MATERIALS.warmLight}
              className="bld-light"
              style={delayStyle(lightDelayBase + windowIndex * 40, {
                pulse: lightDelayBase + windowIndex * 40 + 600,
              })}
            />
          )}
          {showReflection && (
            <polygon
              points={`${wx + winW * 0.12},${winY + winH * 0.85} ${wx + winW * 0.32},${winY + winH * 0.85} ${wx + winW * 0.55},${winY + winH * 0.1} ${wx + winW * 0.35},${winY + winH * 0.1}`}
              fill={MATERIALS.glassReflection}
              opacity="0.3"
              className="bld-window"
              style={delayStyle(groupDelay)}
            />
          )}
          <rect
            x={wx}
            y={winY}
            width={winW}
            height={winH}
            fill="none"
            stroke={MATERIALS.metal}
            strokeWidth={1.25}
            strokeDasharray={perimeter}
            className="bld-frame"
            style={delayStyle(groupDelay, { pathLength: perimeter })}
          />
        </g>,
      );
      cursor += winW + innerGap;
      windowIndex += 1;
    });
    cursor += pier - innerGap;
  });

  return <>{nodes}</>;
}

function Floor({
  floor,
  x,
  width,
  index,
  pierRight,
}: {
  floor: FloorSpec;
  x: number;
  width: number;
  index: number;
  pierRight?: boolean;
}) {
  const slabDelay = 420 + index * 130;
  const brickDelay = slabDelay + 70;
  const windowDelay = slabDelay + 150;
  const lightDelayBase = 2500 + index * 30;

  return (
    <g>
      <rect
        x={x}
        y={floor.y}
        width={width}
        height={floor.h}
        fill={MATERIALS.concrete}
        className="bld-floor"
        style={delayStyle(slabDelay)}
      />
      <rect
        x={x}
        y={floor.y}
        width={width}
        height={floor.h}
        fill="url(#bldBrick)"
        className="bld-brick"
        style={delayStyle(brickDelay)}
      />
      <rect
        x={x}
        y={floor.y}
        width={width}
        height={floor.h}
        fill={index % 3 === 0 ? MATERIALS.brickHighlight : MATERIALS.brickShadow}
        opacity={index % 3 === 1 ? 0.06 : 0.04}
        className="bld-brick"
        style={delayStyle(brickDelay)}
      />
      <rect
        x={x}
        y={floor.y + floor.h}
        width={width}
        height={2}
        fill={MATERIALS.concreteShadow}
        className="bld-floor"
        style={delayStyle(slabDelay)}
      />
      {pierRight && (
        <>
          <rect
            x={PIER_X}
            y={floor.y}
            width={PIER_W}
            height={floor.h}
            fill={MATERIALS.concrete}
            className="bld-floor"
            style={delayStyle(slabDelay)}
          />
          <rect
            x={PIER_X}
            y={floor.y}
            width={PIER_W}
            height={floor.h}
            fill="url(#bldBrick)"
            className="bld-brick"
            style={delayStyle(brickDelay)}
          />
          <rect x={PIER_X} y={floor.y} width="2" height={floor.h} fill={MATERIALS.brickHighlight} opacity="0.4" className="bld-brick" style={delayStyle(brickDelay)} />
          <rect x={PIER_X + PIER_W - 2} y={floor.y} width="2" height={floor.h} fill={MATERIALS.brickShadow} opacity="0.5" className="bld-brick" style={delayStyle(brickDelay)} />
        </>
      )}
      <Windows
        floor={floor}
        x={x}
        width={width}
        windowDelay={windowDelay}
        lightDelayBase={lightDelayBase}
      />
    </g>
  );
}

/**
 * Bandesha Empire Digital Headquarters — a custom-silhouette commercial
 * building: two-storey podium, brick core with a projecting wing, a
 * continuous glass spine, one upper setback and a stepped rooftop crown.
 */
export default function EmpireTower({ inView }: { inView: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto w-full max-w-[305px] sm:max-w-[330px] md:max-w-[375px] lg:max-w-[455px] xl:max-w-[512px] ${
        inView ? "hero-in-view" : ""
      }`}
    >
      <div
        className="bld-grid pointer-events-none absolute inset-[3%] opacity-35 sm:opacity-50 md:opacity-80 lg:opacity-100"
        style={delayStyle(100)}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 40px)",
            maskImage: "radial-gradient(circle at 52% 55%, black 0%, transparent 66%)",
            WebkitMaskImage:
              "radial-gradient(circle at 52% 55%, black 0%, transparent 66%)",
            opacity: 0.5,
          }}
        />
      </div>

      <svg viewBox="0 0 560 648" width="100%" height="auto" className="relative">
        <defs>
          <pattern id="bldBrick" width="22" height="11" patternUnits="userSpaceOnUse">
            <rect width="22" height="11" fill={MATERIALS.brick} />
            <rect x="1" y="1" width="8" height="3" fill={MATERIALS.brickHighlight} opacity="0.35" />
            <path d="M0 0H22 M0 5.5H22" stroke={MATERIALS.brickShadow} strokeWidth="0.6" opacity="0.45" />
            <path
              d="M11 0V5.5 M0 5.5V11 M22 5.5V11"
              stroke={MATERIALS.brickShadow}
              strokeWidth="0.5"
              opacity="0.35"
              className="hidden md:block"
            />
          </pattern>
        </defs>

        {/* Site marker arc — faint always, hidden below tablet */}
        <circle
          cx="290"
          cy="570"
          r="230"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.35"
          className="bld-ground hidden sm:block"
          style={delayStyle(0)}
        />

        {/* Ground shadow + site line */}
        <ellipse cx="290" cy="634" rx="220" ry="9" fill="var(--foreground)" opacity="0.06" className="bld-ground" style={delayStyle(0)} />
        <line x1="70" y1="628" x2="510" y2="628" stroke="var(--border)" strokeWidth="1" opacity="0.5" className="bld-ground" style={delayStyle(30)} />

        {/* Architectural measurement lines — desktop only */}
        <g className="bld-detail hidden lg:block" style={delayStyle(1600)}>
          <line x1="120" y1="632" x2="460" y2="632" stroke="var(--muted)" strokeWidth="0.75" opacity="0.4" />
          <line x1="120" y1="628" x2="120" y2="636" stroke="var(--muted)" strokeWidth="0.75" opacity="0.4" />
          <line x1="460" y1="628" x2="460" y2="636" stroke="var(--muted)" strokeWidth="0.75" opacity="0.4" />
          <line x1="175" y1="200" x2="405" y2="200" stroke="var(--muted)" strokeWidth="0.75" opacity="0.35" />
          <line x1="175" y1="196" x2="175" y2="204" stroke="var(--muted)" strokeWidth="0.75" opacity="0.35" />
          <line x1="405" y1="196" x2="405" y2="204" stroke="var(--muted)" strokeWidth="0.75" opacity="0.35" />
        </g>

        {/* Side facades for 2.5D depth — widened, with floor slabs wrapping around */}
        <polygon
          points="405,506 438,494 432,206 405,206"
          fill={MATERIALS.concreteShadow}
          opacity="0.6"
          className="bld-rise"
          style={delayStyle(1450)}
        />
        <polygon
          points="385,206 415,196 410,160 385,160"
          fill={MATERIALS.concreteShadow}
          opacity="0.6"
          className="bld-rise"
          style={delayStyle(1450)}
        />
        <polygon
          points="115,506 88,494 92,306 115,306"
          fill={MATERIALS.brickShadow}
          opacity="0.45"
          className="bld-rise"
          style={delayStyle(1450)}
        />
        {/* Facade shadow seam where the front plane meets the side plane */}
        <rect x="403" y="206" width="4" height="300" fill="var(--foreground)" opacity="0.12" className="bld-rise" style={delayStyle(1470)} />
        {[...CORE_FLOORS].map((floor, i) => (
          <g key={`side-${floor.y}`}>
            <polygon
              points={`405,${floor.y} 405,${floor.y + floor.h} ${434 - i * 1.1},${floor.y + floor.h - 10} ${434 - i * 1.1},${floor.y - 10}`}
              fill={MATERIALS.brickShadow}
              opacity={i % 2 === 0 ? 0.22 : 0.14}
              className="bld-rise"
              style={delayStyle(1450)}
            />
            <line
              x1="405"
              y1={floor.y}
              x2={434 - i * 1.1}
              y2={floor.y - 10}
              stroke={MATERIALS.brickShadow}
              strokeWidth="0.75"
              opacity="0.35"
              className="bld-rise"
              style={delayStyle(1450)}
            />
          </g>
        ))}

        {/* Contact shadow beneath the projecting wing and tower core */}
        <rect x="112" y="504" width="66" height="5" fill="var(--foreground)" opacity="0.1" className="bld-rise" style={delayStyle(1460)} />
        <rect x="172" y="504" width="236" height="5" fill="var(--foreground)" opacity="0.08" className="bld-rise" style={delayStyle(1460)} />

        {/* Structural core spine (mostly hidden, sliver above the setback) */}
        <rect x="352" y="150" width="8" height="12" fill={MATERIALS.metal} opacity="0.5" className="bld-rise" style={delayStyle(320)} />

        {/* Podium foundation */}
        <rect x="110" y="610" width="360" height="14" rx="2" fill={MATERIALS.concrete} stroke={MATERIALS.concreteShadow} strokeWidth="1" className="bld-rise-heavy" style={delayStyle(80)} />

        {/* Front steps, each tier with a soft contact shadow for perspective */}
        <rect x="170" y="609" width="240" height="2" fill={MATERIALS.concreteShadow} opacity="0.3" className="bld-detail" style={delayStyle(1545)} />
        <rect x="170" y="606" width="240" height="4" fill={MATERIALS.stoneLight} className="bld-detail" style={delayStyle(1550)} />
        <rect x="180" y="604" width="220" height="2" fill={MATERIALS.concreteShadow} opacity="0.25" className="bld-detail" style={delayStyle(1515)} />
        <rect x="180" y="601" width="220" height="4" fill={MATERIALS.stoneLight} className="bld-detail" style={delayStyle(1520)} />
        <rect x="190" y="599" width="200" height="2" fill={MATERIALS.concreteShadow} opacity="0.2" className="bld-detail" style={delayStyle(1485)} />
        <rect x="190" y="596" width="200" height="4" fill={MATERIALS.stoneLight} className="bld-detail" style={delayStyle(1490)} />

        {/* Podium columns, with a recessed shadow behind each for depth */}
        <rect x="127" y="510" width="10" height="106" fill={MATERIALS.metal} opacity="0.5" className="bld-rise-heavy" style={delayStyle(200)} />
        <rect x="130" y="506" width="16" height="110" fill={MATERIALS.metalSecondary} className="bld-rise-heavy" style={delayStyle(220)} />
        <rect x="427" y="510" width="10" height="106" fill={MATERIALS.metal} opacity="0.5" className="bld-rise-heavy" style={delayStyle(200)} />
        <rect x="430" y="506" width="16" height="110" fill={MATERIALS.metalSecondary} className="bld-rise-heavy" style={delayStyle(220)} />

        {/* Podium body (two storeys) */}
        <rect x="120" y="506" width="340" height="104" rx="2" fill={MATERIALS.stoneLight} stroke={MATERIALS.concreteShadow} strokeWidth="1" className="bld-rise-heavy" style={delayStyle(240)} />
        <rect x="120" y="558" width="340" height="2" fill={MATERIALS.concreteShadow} opacity="0.6" className="bld-rise-heavy" style={delayStyle(260)} />

        {/* Grand lobby glazing — slightly more transparent, stronger reflection */}
        <rect x="180" y="520" width="220" height="86" fill={MATERIALS.glass} opacity="0.42" className="bld-rise" style={delayStyle(280)} />
        <polygon points="190,524 234,524 208,600 190,600" fill={MATERIALS.glassReflection} opacity="0.32" className="bld-rise" style={delayStyle(300)} />
        <polygon points="340,524 366,524 350,600 330,600" fill={MATERIALS.glassReflection} opacity="0.18" className="bld-rise" style={delayStyle(320)} />

        {/* Double entrance doors */}
        <rect x="264" y="562" width="24" height="48" fill={MATERIALS.glassDark} stroke={MATERIALS.metal} strokeWidth="1.5" className="bld-rise" style={delayStyle(300)} />
        <rect x="292" y="562" width="24" height="48" fill={MATERIALS.glassDark} stroke={MATERIALS.metal} strokeWidth="1.5" className="bld-rise" style={delayStyle(300)} />
        <circle cx="288" cy="588" r="1.75" fill={MATERIALS.metal} className="bld-detail" style={delayStyle(1750)} />
        <circle cx="292" cy="588" r="1.75" fill={MATERIALS.metal} className="bld-detail" style={delayStyle(1770)} />
        <rect x="264" y="562" width="24" height="48" fill="none" stroke={MATERIALS.glassReflection} strokeWidth="0.75" opacity="0.4" className="bld-detail" style={delayStyle(1780)} />
        <rect x="292" y="562" width="24" height="48" fill="none" stroke={MATERIALS.glassReflection} strokeWidth="0.75" opacity="0.4" className="bld-detail" style={delayStyle(1780)} />

        {/* Entrance canopy, with a thin charcoal metal edge */}
        <rect x="244" y="514" width="92" height="6" fill={MATERIALS.metalSecondary} className="bld-detail" style={delayStyle(1650)} />
        <rect x="244" y="519.5" width="92" height="1.25" fill={MATERIALS.metal} className="bld-detail" style={delayStyle(1670)} />
        <ellipse cx="290" cy="524" rx="48" ry="3" fill="var(--foreground)" opacity="0.05" className="bld-detail" style={delayStyle(1660)} />

        {/* Planters — minimal, architectural, no colour accent */}
        <rect x="196" y="592" width="18" height="14" rx="1" fill={MATERIALS.concreteShadow} className="bld-detail" style={delayStyle(1580)} />
        <rect x="196" y="590" width="18" height="2" fill={MATERIALS.metalSecondary} opacity="0.6" className="bld-detail" style={delayStyle(1600)} />
        <rect x="366" y="592" width="18" height="14" rx="1" fill={MATERIALS.concreteShadow} className="bld-detail" style={delayStyle(1580)} />
        <rect x="366" y="590" width="18" height="2" fill={MATERIALS.metalSecondary} opacity="0.6" className="bld-detail" style={delayStyle(1600)} />

        {/* The one tiny green brand indicator near the entrance */}
        <circle cx="337" cy="536" r="2.5" fill="var(--accent)" className="bld-detail" style={delayStyle(1720)} />

        {/* Projecting brick wing */}
        {WING_FLOORS.map((floor, i) => (
          <Floor key={`wing-${floor.y}`} floor={floor} x={WING_X} width={WING_W} index={i} />
        ))}

        {/* Main brick core, six floors */}
        {CORE_FLOORS.map((floor, i) => (
          <Floor key={`core-${floor.y}`} floor={floor} x={CORE_X} width={CORE_BRICK_W} index={i} pierRight />
        ))}

        {/* Upper setback */}
        <Floor floor={TOP_FLOOR} x={195} width={135} index={CORE_FLOORS.length} />

        {/* Continuous glass spine — darker edges, lighter central reflection,
            connecting the podium through the tower to the setback */}
        <g className="bld-spine" style={delayStyle(1250)}>
          {[...CORE_FLOORS, TOP_FLOOR].map((floor, i) => {
            const w = floor.y === TOP_FLOOR.y ? 55 : SPINE_W;
            return (
              <g key={`spine-${floor.y}`}>
                <rect
                  x={SPINE_X}
                  y={floor.y}
                  width={w}
                  height={floor.h}
                  fill={i % 2 === 0 ? MATERIALS.glass : MATERIALS.glassDark}
                  stroke={MATERIALS.metal}
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                />
                <rect x={SPINE_X} y={floor.y} width="4" height={floor.h} fill={MATERIALS.glassDark} opacity="0.5" />
                <rect x={SPINE_X + w - 4} y={floor.y} width="4" height={floor.h} fill={MATERIALS.glassDark} opacity="0.5" />
              </g>
            );
          })}
          <rect x={SPINE_X + 20} y="160" width="14" height="346" fill={MATERIALS.glassReflection} opacity="0.3" />
        </g>

        {/* Data path traveling beside the spine + branch toward upper floors */}
        <line x1="322" y1="506" x2="322" y2="150" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" className="bld-datapath" style={delayStyle(1900, { flow: 2550, pathLength: 356 })} />
        <path
          d="M322,356 L400,356 L400,210"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="5 5"
          className="bld-datapath"
          style={delayStyle(2000, { flow: 2600, pathLength: 189 })}
        />
        {[506, 406, 306, 210, 150].map((cy, i) => (
          <circle
            key={cy}
            cx={cy === 210 || cy === 150 ? 400 : 322}
            cy={cy}
            r="2.25"
            fill="var(--accent-dark)"
            className="bld-detail"
            style={delayStyle(2100 + i * 60)}
          />
        ))}

        {/* Rooftop crown — concrete parapet, charcoal metal penthouse, thin glazed band */}
        <g className="bld-crown" style={delayStyle(2500)}>
          <rect x="205" y="142" width="170" height="18" fill={MATERIALS.concrete} stroke={MATERIALS.concreteShadow} strokeWidth="1" />
          <rect x="250" y="126" width="80" height="16" fill={MATERIALS.metalSecondary} stroke={MATERIALS.metal} strokeWidth="1" />
          <rect x="258" y="130" width="64" height="6" fill={MATERIALS.glass} opacity="0.6" />
          <rect x="258" y="130" width="20" height="6" fill={MATERIALS.glassReflection} opacity="0.35" />
        </g>

        {/* Rooftop signal — activates only once the crown has settled */}
        <circle cx="290" cy="122" r="4" fill="var(--accent)" className="bld-signal" style={delayStyle(3100)} />

        {/* One-shot scanning sweep after construction settles */}
        <rect x="175" y="480" width="230" height="4" fill="var(--accent)" opacity="0" className="bld-scan" />
      </svg>
    </div>
  );
}
