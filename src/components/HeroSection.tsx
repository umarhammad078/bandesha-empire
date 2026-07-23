"use client";

import { useEffect, useRef, useState } from "react";

const WELCOME_MESSAGE = "Welcome to Bandesha Empire";

function revealStyle(delayMs: number) {
  return { "--reveal-delay": `${delayMs}ms` } as React.CSSProperties;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M4 9h10M10 5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BabyRobot() {
  return (
    <svg
      viewBox="0 0 520 600"
      className="hero-babybot-svg"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="babybot-shell" x1="170" y1="118" x2="372" y2="478" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.18" stopColor="#EEF2F4" />
          <stop offset="0.42" stopColor="#AEB8BF" />
          <stop offset="0.58" stopColor="#F9FBFC" />
          <stop offset="0.78" stopColor="#C3CBD0" />
          <stop offset="1" stopColor="#8F9AA1" />
        </linearGradient>
        <linearGradient id="babybot-shell-edge" x1="188" y1="166" x2="360" y2="376" gradientUnits="userSpaceOnUse">
          <stop stopColor="#88949B" />
          <stop offset="0.32" stopColor="#E7EBEE" />
          <stop offset="0.58" stopColor="#FFFFFF" />
          <stop offset="0.8" stopColor="#B1BBC1" />
          <stop offset="1" stopColor="#727E85" />
        </linearGradient>
        <linearGradient id="babybot-rim" x1="174" y1="121" x2="365" y2="301" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFB" />
          <stop offset="0.22" stopColor="#8C989F" />
          <stop offset="0.5" stopColor="#4E5A61" />
          <stop offset="0.76" stopColor="#C9D1D5" />
          <stop offset="1" stopColor="#68747B" />
        </linearGradient>
        <linearGradient id="babybot-screen-bezel" x1="180" y1="140" x2="358" y2="275" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7ECEF" />
          <stop offset="0.16" stopColor="#78848A" />
          <stop offset="0.48" stopColor="#30383C" />
          <stop offset="0.82" stopColor="#9BA6AC" />
          <stop offset="1" stopColor="#59646A" />
        </linearGradient>
        <linearGradient id="babybot-glass" x1="211" y1="150" x2="313" y2="265" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="0.36" stopColor="#FFFFFF" stopOpacity="0.035" />
          <stop offset="0.72" stopColor="#82D78A" stopOpacity="0.045" />
          <stop offset="1" stopColor="#0A0D0B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="babybot-brushed" x1="211" y1="349" x2="333" y2="448" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E999F" />
          <stop offset="0.2" stopColor="#E9EDF0" />
          <stop offset="0.42" stopColor="#A9B3B9" />
          <stop offset="0.67" stopColor="#F7F9FA" />
          <stop offset="1" stopColor="#929DA4" />
        </linearGradient>
        <linearGradient id="babybot-dark-metal" x1="225" y1="365" x2="317" y2="435" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A555B" />
          <stop offset="0.48" stopColor="#1B2225" />
          <stop offset="1" stopColor="#6D787E" />
        </linearGradient>
        <linearGradient id="babybot-green" x1="214" y1="300" x2="330" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6DD875" />
          <stop offset="1" stopColor="#32983B" />
        </linearGradient>
        <radialGradient id="babybot-face" cx="0" cy="0" r="1" gradientTransform="translate(250 180) rotate(52) scale(183 145)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2C332D" />
          <stop offset="0.65" stopColor="#161A17" />
          <stop offset="1" stopColor="#0B0D0C" />
        </radialGradient>
        <radialGradient id="babybot-eye" cx="0" cy="0" r="1" gradientTransform="translate(0.45 0.35) rotate(42) scale(0.8)" gradientUnits="objectBoundingBox">
          <stop stopColor="#F5FFF4" />
          <stop offset="0.45" stopColor="#8CE591" />
          <stop offset="1" stopColor="#46B84F" />
        </radialGradient>
        <radialGradient id="babybot-core" cx="0" cy="0" r="1" gradientTransform="translate(0.38 0.3) rotate(48) scale(0.85)" gradientUnits="objectBoundingBox">
          <stop stopColor="#F4FFF3" />
          <stop offset="0.38" stopColor="#8CE591" />
          <stop offset="1" stopColor="#32983B" />
        </radialGradient>
        <filter id="babybot-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="23" stdDeviation="19" floodColor="#172019" floodOpacity="0.22" />
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#20282B" floodOpacity="0.18" />
          <feDropShadow dx="-4" dy="-5" stdDeviation="8" floodColor="#FFFFFF" floodOpacity="0.34" />
        </filter>
        <filter id="babybot-soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#172019" floodOpacity="0.22" />
        </filter>
        <filter id="babybot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        className="babybot-floor-shadow"
        cx="278"
        cy="558"
        rx="151"
        ry="25"
        fill="#1B2220"
        opacity="0.16"
      />
      <ellipse cx="278" cy="552" rx="92" ry="10" fill="white" opacity="0.3" />

      <g className="babybot-character" filter="url(#babybot-shadow)">
        <g className="babybot-antenna">
          <path d="M270 102V70" stroke="url(#babybot-shell-edge)" strokeWidth="10" strokeLinecap="round" />
          <circle cx="270" cy="59" r="17" fill="url(#babybot-shell)" stroke="#929DA4" strokeWidth="4" />
          <circle
            className="babybot-antenna-light"
            cx="270"
            cy="59"
            r="7"
            fill="#46B84F"
            filter="url(#babybot-glow)"
          />
        </g>

        <g className="babybot-ear babybot-ear-left">
          <rect x="134" y="169" width="43" height="84" rx="20" fill="url(#babybot-shell-edge)" />
          <rect x="143" y="187" width="18" height="48" rx="9" fill="#768188" />
          <path d="M149 194V228" stroke="#D9DEE1" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <circle cx="152" cy="211" r="5" fill="#46B84F" />
        </g>
        <g className="babybot-ear babybot-ear-right">
          <rect x="363" y="169" width="43" height="84" rx="20" fill="url(#babybot-shell-edge)" />
          <rect x="379" y="187" width="18" height="48" rx="9" fill="#768188" />
          <path d="M385 194V228" stroke="#D9DEE1" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <circle cx="388" cy="211" r="5" fill="#46B84F" />
        </g>

        <rect
          x="164"
          y="119"
          width="224"
          height="192"
          rx="79"
          fill="url(#babybot-rim)"
          opacity="0.72"
        />
        <rect
          x="158"
          y="111"
          width="224"
          height="192"
          rx="79"
          fill="url(#babybot-shell)"
          stroke="#939EA5"
          strokeWidth="4"
        />
        <path
          d="M192 132C218 113 315 105 351 143"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.74"
        />
        <path d="M184 167C175 192 175 229 185 253" stroke="#7F8A91" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M356 167C365 192 365 229 355 253" stroke="#7F8A91" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <circle cx="186" cy="151" r="4.5" fill="#737F86" />
        <circle cx="354" cy="151" r="4.5" fill="#737F86" />
        <circle cx="186" cy="264" r="4.5" fill="#737F86" />
        <circle cx="354" cy="264" r="4.5" fill="#737F86" />
        <path d="M219 122H321" stroke="#8B969C" strokeWidth="3" strokeLinecap="round" opacity="0.46" />
        <path
          d="M190 268C222 292 318 295 351 263"
          stroke="#5D696F"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.42"
        />
        <rect x="171" y="132" width="198" height="148" rx="64" fill="url(#babybot-screen-bezel)" />
        <rect x="179" y="140" width="182" height="132" rx="55" fill="url(#babybot-face)" />
        <rect x="175.5" y="136.5" width="189" height="139" rx="59" stroke="#F3F6F7" strokeWidth="2" opacity="0.48" />
        <path
          d="M197 158C228 137 299 138 334 164"
          stroke="#4A544C"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          className="babybot-metal-sheen"
          d="M199 159C231 143 307 143 339 170C302 158 247 162 211 188C203 181 198 170 199 159Z"
          fill="url(#babybot-glass)"
        />
        <path
          d="M196 240C231 263 308 266 343 237"
          stroke="#84C88A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.11"
        />

        <g className="babybot-eyes">
          <ellipse cx="229" cy="204" rx="25" ry="31" fill="#070908" stroke="#52605A" strokeWidth="3" />
          <ellipse cx="311" cy="204" rx="25" ry="31" fill="#070908" stroke="#52605A" strokeWidth="3" />
          <ellipse className="babybot-eye babybot-eye-left" cx="229" cy="203" rx="17" ry="22" fill="url(#babybot-eye)" />
          <ellipse className="babybot-eye babybot-eye-right" cx="311" cy="203" rx="17" ry="22" fill="url(#babybot-eye)" />
          <circle cx="223" cy="195" r="5" fill="white" opacity="0.86" />
          <circle cx="305" cy="195" r="5" fill="white" opacity="0.86" />
          <ellipse cx="232" cy="210" rx="7" ry="10" fill="#1A4E1E" opacity="0.32" />
          <ellipse cx="314" cy="210" rx="7" ry="10" fill="#1A4E1E" opacity="0.32" />
        </g>

        <circle cx="202" cy="231" r="8" fill="#46B84F" opacity="0.2" />
        <circle cx="338" cy="231" r="8" fill="#46B84F" opacity="0.2" />
        <path
          className="babybot-smile"
          d="M246 237C258 249 281 249 294 237"
          stroke="#8CE591"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M230 294H310V326C310 340 298 351 284 351H256C242 351 230 340 230 326V294Z"
          fill="url(#babybot-shell-edge)"
        />
        <path d="M243 301H297V324C297 333 290 340 281 340H259C250 340 243 333 243 324V301Z" fill="#68747B" />
        <path d="M251 307H289" stroke="#E7EBEE" strokeWidth="3" strokeLinecap="round" opacity="0.48" />

        <g className="babybot-body">
          <rect x="184" y="327" width="184" height="183" rx="66" fill="url(#babybot-rim)" opacity="0.72" />
          <rect
            x="178"
            y="318"
            width="184"
            height="183"
            rx="66"
            fill="url(#babybot-shell)"
            stroke="#939EA5"
            strokeWidth="4"
          />
          <path
            d="M204 342C233 319 310 319 339 346"
            stroke="white"
            strokeWidth="11"
            strokeLinecap="round"
            opacity="0.72"
          />
          <path d="M190 379V439" stroke="#7B878E" strokeWidth="3" strokeLinecap="round" opacity="0.46" />
          <path d="M350 379V439" stroke="#7B878E" strokeWidth="3" strokeLinecap="round" opacity="0.46" />
          <path d="M194 387H202M194 400H202M194 413H202" stroke="#657178" strokeWidth="4" strokeLinecap="round" />
          <path d="M338 387H346M338 400H346M338 413H346" stroke="#657178" strokeWidth="4" strokeLinecap="round" />
          <path d="M204 472C236 493 305 496 337 469" stroke="#5D696F" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
          <rect x="215" y="357" width="120" height="97" rx="37" fill="#455057" opacity="0.48" />
          <rect x="210" y="351" width="120" height="97" rx="37" fill="url(#babybot-brushed)" stroke="#7F8B92" strokeWidth="3" />
          <rect x="225" y="365" width="90" height="68" rx="28" fill="url(#babybot-dark-metal)" />
          <path d="M240 374H298" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.22" />
          <circle cx="270" cy="399" r="25" fill="url(#babybot-shell)" stroke="#727E85" strokeWidth="3" />
          <circle cx="270" cy="399" r="16" fill="#151A1C" />
          <circle cx="266" cy="395" r="10" fill="white" opacity="0.07" />
          <circle className="babybot-chest-core" cx="270" cy="399" r="9" fill="url(#babybot-core)" filter="url(#babybot-glow)" />
          <circle cx="229" cy="370" r="3.5" fill="#DDE2E5" />
          <circle cx="311" cy="370" r="3.5" fill="#DDE2E5" />
          <circle cx="229" cy="429" r="3.5" fill="#657178" />
          <circle cx="311" cy="429" r="3.5" fill="#657178" />
          <circle className="babybot-chest-light" cx="331" cy="460" r="6" fill="#46B84F" />
          <circle cx="310" cy="460" r="6" fill="#89949B" />
        </g>

        <g className="babybot-rest-arm">
          <circle cx="370" cy="355" r="28" fill="url(#babybot-shell-edge)" stroke="#7F8B92" strokeWidth="3" />
          <circle cx="370" cy="355" r="13" fill="#67737A" stroke="#DDE2E5" strokeWidth="3" />
          <path d="M392 369C415 388 419 425 399 453" stroke="#4E595F" strokeWidth="42" strokeLinecap="round" opacity="0.42" />
          <path
            d="M387 365C410 383 414 423 394 450"
            stroke="url(#babybot-shell-edge)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <circle cx="390" cy="458" r="22" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="3" />
          <path d="M380 454C388 447 397 448 403 455" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.52" />
        </g>

        <g className="babybot-raised-arm">
          <circle cx="169" cy="355" r="28" fill="url(#babybot-shell-edge)" stroke="#7F8B92" strokeWidth="3" />
          <circle cx="169" cy="355" r="13" fill="#67737A" stroke="#DDE2E5" strokeWidth="3" />
          <path d="M160 351C139 333 122 308 117 284" stroke="#4E595F" strokeWidth="42" strokeLinecap="round" opacity="0.42" />
          <path
            d="M155 347C134 329 117 304 112 280"
            stroke="url(#babybot-shell-edge)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <circle cx="111" cy="278" r="23" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="3" />
          <circle cx="111" cy="278" r="10" fill="#68747B" stroke="#DDE2E5" strokeWidth="2.5" />

          <g className="babybot-wave-forearm">
            <path d="M113 275C104 250 106 224 113 202" stroke="#4E595F" strokeWidth="38" strokeLinecap="round" opacity="0.42" />
            <path
              d="M108 271C99 246 101 220 108 198"
              stroke="url(#babybot-shell-edge)"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <g className="babybot-wave-hand" filter="url(#babybot-soft-shadow)">
              <rect x="88" y="162" width="45" height="50" rx="20" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="3" />
              <rect x="89" y="130" width="12" height="47" rx="6" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="2" />
              <rect x="106" y="123" width="12" height="52" rx="6" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="2" />
              <rect x="123" y="133" width="12" height="46" rx="6" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="2" />
              <path d="M95 139V163M112 132V162M129 141V164" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.58" />
              <circle cx="110" cy="188" r="7" fill="#46B84F" opacity="0.82" />
            </g>
          </g>
        </g>

        <g className="babybot-legs">
          <path d="M231 488V530" stroke="#4E595F" strokeWidth="39" strokeLinecap="round" opacity="0.42" />
          <path d="M320 488V530" stroke="#4E595F" strokeWidth="39" strokeLinecap="round" opacity="0.42" />
          <path d="M226 484V526" stroke="url(#babybot-shell-edge)" strokeWidth="35" strokeLinecap="round" />
          <path d="M315 484V526" stroke="url(#babybot-shell-edge)" strokeWidth="35" strokeLinecap="round" />
          <rect x="191" y="525" width="82" height="38" rx="19" fill="#4E595F" opacity="0.46" />
          <rect x="279" y="525" width="82" height="38" rx="19" fill="#4E595F" opacity="0.46" />
          <rect x="186" y="519" width="82" height="38" rx="19" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="3" />
          <rect x="274" y="519" width="82" height="38" rx="19" fill="url(#babybot-shell)" stroke="#87939A" strokeWidth="3" />
          <path d="M201 542H252" stroke="#68747B" strokeWidth="4" strokeLinecap="round" />
          <path d="M290 542H341" stroke="#68747B" strokeWidth="4" strokeLinecap="round" />
          <path d="M205 525H246M293 525H334" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let characterIndex = 0;
    let typingInterval: ReturnType<typeof setInterval> | undefined;

    const typingStart = setTimeout(() => {
      typingInterval = setInterval(() => {
        characterIndex += 1;
        setTypedMessage(WELCOME_MESSAGE.slice(0, characterIndex));

        if (characterIndex >= WELCOME_MESSAGE.length && typingInterval) {
          clearInterval(typingInterval);
        }
      }, 72);
    }, 860);

    return () => {
      clearTimeout(typingStart);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [inView]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene || event.pointerType === "touch") return;

    const rect = scene.getBoundingClientRect();
    const horizontal = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const vertical = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

    scene.style.setProperty("--robot-shift-x", `${(horizontal - 0.5) * 10}px`);
    scene.style.setProperty("--robot-shift-y", `${(vertical - 0.5) * 7}px`);
    scene.style.setProperty("--robot-tilt-x", `${(0.5 - vertical) * 2.8}deg`);
    scene.style.setProperty("--robot-tilt-y", `${(horizontal - 0.5) * 3.8}deg`);
  }

  function resetPointerEffect() {
    const scene = sceneRef.current;
    if (!scene) return;

    scene.style.setProperty("--robot-shift-x", "0px");
    scene.style.setProperty("--robot-shift-y", "0px");
    scene.style.setProperty("--robot-tilt-x", "0deg");
    scene.style.setProperty("--robot-tilt-y", "0deg");
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`hero-robot-section relative w-full overflow-hidden ${
        inView ? "hero-in-view" : ""
      }`}
    >
      <div className="hero-robot-background" aria-hidden="true" />
      <div className="hero-robot-dots" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-9 pt-11 sm:px-8 md:pb-11 md:pt-14 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
          <div className="relative z-10 max-w-[760px]">
            <div
              className="hero-reveal mb-7 inline-flex items-center gap-3 rounded-full bg-white/82 py-2 pl-2 pr-4 shadow-[0_10px_35px_rgba(28,38,27,0.06)] ring-1 ring-[#111111]/8 backdrop-blur-sm"
              style={revealStyle(70)}
            >
              <span className="hero-robot-eyebrow" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#111111]/58 sm:text-[0.7rem]">
                Strategy / Design / Engineering / Automation
              </span>
            </div>

            <h1
              id="hero-heading"
              className="max-w-[780px] text-[clamp(3.7rem,5.95vw,6.35rem)] font-semibold leading-[0.88] tracking-[-0.078em] text-[#111111]"
            >
              <span className="hero-reveal block" style={revealStyle(135)}>
                A smarter
              </span>
              <span className="hero-reveal block text-[#111111]/42" style={revealStyle(205)}>
                digital partner
              </span>
              <span
                className="hero-reveal hero-robot-headline-accent mt-[0.08em] block text-accent"
                style={revealStyle(275)}
              >
                for what comes next.
              </span>
            </h1>

            <p
              className="hero-reveal mt-8 max-w-[630px] text-[1.03rem] leading-7 text-[#111111]/58 sm:text-[1.1rem] sm:leading-8"
              style={revealStyle(350)}
            >
              We bring strategy, high-performance websites, intelligent automation,
              and connected systems together—so your business can move with clarity
              and grow with confidence.
            </p>

            <div
              className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={revealStyle(425)}
            >
              <a
                href="#contact"
                className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#111111] px-7 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(17,17,17,0.14)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#242622] hover:shadow-[0_20px_55px_rgba(17,17,17,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-dark"
              >
                Start a Project
                <span className="grid size-8 place-items-center rounded-full bg-accent text-[#071008] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
              <a
                href="#services"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white/72 px-7 text-sm font-semibold text-[#111111] shadow-[0_10px_35px_rgba(28,38,27,0.055)] ring-1 ring-[#111111]/10 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_15px_42px_rgba(28,38,27,0.09)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-dark"
              >
                Explore What We Build
                <ArrowIcon />
              </a>
            </div>

            <div
              className="hero-reveal mt-7 flex max-w-[630px] flex-wrap gap-2.5"
              style={revealStyle(500)}
            >
              {["Senior-led thinking", "Purpose-built systems", "Long-term evolution"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/67 px-4 py-2 text-[0.61rem] font-semibold uppercase tracking-[0.11em] text-[#111111]/48 shadow-[0_8px_24px_rgba(28,38,27,0.04)] ring-1 ring-[#111111]/7"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="hero-reveal relative z-10" style={revealStyle(210)}>
            <div
              ref={sceneRef}
              className="hero-robot-scene"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointerEffect}
            >
              <div className="hero-robot-aura" aria-hidden="true" />
              <div className="hero-robot-halo hero-robot-halo-one" aria-hidden="true" />
              <div className="hero-robot-halo hero-robot-halo-two" aria-hidden="true" />

              <div
                className="hero-robot-speech"
                role="status"
                aria-label="Welcome to Bandesha Empire"
              >
                <div className="hero-robot-speech-meta">
                  <span>
                    <i />
                    Bandesha Assistant
                  </span>
                  <span>Online</span>
                </div>
                <div className="hero-robot-type-row">
                  <span className="hero-robot-bubble-text">
                    {typedMessage}
                  </span>
                  {typedMessage.length < WELCOME_MESSAGE.length ? (
                    <i className="hero-robot-type-caret" aria-hidden="true" />
                  ) : null}
                </div>
              </div>

              <div className="hero-robot-character-wrap">
                <BabyRobot />
              </div>

              <div className="hero-robot-scene-label hero-robot-scene-label-top">
                Friendly intelligence / Human direction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
