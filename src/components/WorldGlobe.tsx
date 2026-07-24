"use client";

import { useEffect, useRef } from "react";

type Coordinate = readonly [longitude: number, latitude: number];
type Polygon = readonly Coordinate[];

const LAND_POLYGONS: readonly Polygon[] = [
  [
    [-168, 71], [-151, 72], [-139, 67], [-130, 58], [-123, 51],
    [-125, 42], [-117, 32], [-106, 24], [-97, 19], [-88, 20],
    [-82, 26], [-81, 32], [-75, 40], [-66, 46], [-58, 54],
    [-67, 61], [-83, 65], [-98, 72], [-124, 77], [-151, 75],
  ],
  [
    [-117, 31], [-105, 22], [-96, 15], [-88, 12], [-82, 8],
    [-78, 9], [-82, 18], [-92, 22], [-103, 29],
  ],
  [
    [-81, 12], [-69, 11], [-58, 7], [-48, 1], [-36, -8],
    [-39, -19], [-47, -29], [-54, -39], [-64, -54], [-72, -50],
    [-76, -37], [-79, -21], [-81, -6],
  ],
  [
    [-54, 59], [-44, 60], [-28, 69], [-22, 79], [-38, 84],
    [-55, 81], [-68, 72], [-62, 63],
  ],
  [
    [-11, 36], [3, 36], [13, 39], [24, 37], [34, 42],
    [30, 50], [24, 58], [17, 66], [6, 71], [-5, 64],
    [-10, 55], [-17, 49],
  ],
  [
    [-18, 35], [-5, 37], [11, 37], [26, 33], [38, 27],
    [51, 12], [46, -5], [40, -17], [32, -34], [18, -35],
    [8, -28], [1, -17], [-8, -5], [-15, 10], [-18, 24],
  ],
  [
    [28, 38], [40, 44], [51, 53], [62, 60], [77, 69],
    [97, 75], [121, 74], [145, 70], [169, 61], [160, 51],
    [143, 46], [132, 35], [122, 24], [111, 19], [105, 9],
    [96, 7], [88, 20], [78, 8], [68, 22], [57, 26],
    [48, 31], [38, 32],
  ],
  [
    [36, 30], [49, 29], [58, 22], [55, 14], [46, 12],
    [40, 18],
  ],
  [
    [68, 24], [77, 31], [88, 27], [92, 20], [85, 7],
    [78, 8], [73, 16],
  ],
  [
    [96, 20], [105, 18], [113, 9], [122, 3], [130, -5],
    [122, -9], [111, -5], [102, 4],
  ],
  [
    [112, -12], [128, -10], [144, -13], [154, -24], [151, -38],
    [137, -44], [122, -39], [114, -31],
  ],
  [
    [47, -13], [51, -17], [50, -27], [46, -25], [44, -17],
  ],
  [
    [129, 34], [136, 36], [143, 44], [142, 51], [137, 47],
    [132, 40],
  ],
  [
    [-9, 51], [-4, 50], [1, 54], [-2, 59], [-7, 58],
  ],
] as const;

const HUBS = [
  { longitude: -74, latitude: 40.7 },
  { longitude: -0.1, latitude: 51.5 },
  { longitude: 55.3, latitude: 25.2 },
  { longitude: 67, latitude: 24.9 },
  { longitude: 103.8, latitude: 1.35 },
  { longitude: -46.6, latitude: -23.5 },
  { longitude: 151.2, latitude: -33.9 },
] as const;

function pointInPolygon(longitude: number, latitude: number, polygon: Polygon) {
  let inside = false;

  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const [currentX, currentY] = polygon[index];
    const [previousX, previousY] = polygon[previous];
    const intersects =
      currentY > latitude !== previousY > latitude &&
      longitude <
        ((previousX - currentX) * (latitude - currentY)) /
          (previousY - currentY) +
          currentX;

    if (intersects) inside = !inside;
  }

  return inside;
}

function seededFraction(value: number) {
  const noise = Math.sin(value * 12.9898) * 43758.5453;
  return noise - Math.floor(noise);
}

const LAND_POINTS = (() => {
  const points: Array<{
    longitude: number;
    latitude: number;
    emphasis: number;
  }> = [];

  for (let latitude = -56; latitude <= 80; latitude += 3) {
    for (let longitude = -178; longitude <= 178; longitude += 3) {
      if (!LAND_POLYGONS.some((polygon) => pointInPolygon(longitude, latitude, polygon))) {
        continue;
      }

      const seed = longitude * 1.71 + latitude * 2.37;
      const longitudeJitter = (seededFraction(seed) - 0.5) * 1.45;
      const latitudeJitter = (seededFraction(seed + 19.4) - 0.5) * 1.2;

      points.push({
        longitude: longitude + longitudeJitter,
        latitude: latitude + latitudeJitter,
        emphasis: seededFraction(seed + 51.7),
      });
    }
  }

  return points;
})();

function projectPoint(
  latitude: number,
  longitude: number,
  rotation: number,
  tilt: number,
) {
  const latitudeRadians = (latitude * Math.PI) / 180;
  const longitudeRadians = ((longitude + rotation) * Math.PI) / 180;
  const tiltRadians = (tilt * Math.PI) / 180;

  const x = Math.cos(latitudeRadians) * Math.sin(longitudeRadians);
  const initialY = -Math.sin(latitudeRadians);
  const initialZ = Math.cos(latitudeRadians) * Math.cos(longitudeRadians);
  const y =
    initialY * Math.cos(tiltRadians) -
    initialZ * Math.sin(tiltRadians);
  const z =
    initialY * Math.sin(tiltRadians) +
    initialZ * Math.cos(tiltRadians);

  return { x, y, z };
}

export default function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let deviceScale = 1;
    let animationFrame = 0;
    let visible = true;

    function resizeCanvas() {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * deviceScale);
      canvas.height = Math.round(height * deviceScale);
    }

    function render(time: number) {
      if (!visible && !reduceMotion) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.365;
      const rotation = reduceMotion ? 18 : 18 + time * 0.0044;
      const tilt = -10;

      const atmosphere = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.55,
      );
      atmosphere.addColorStop(0, "rgba(70, 184, 79, 0.055)");
      atmosphere.addColorStop(0.55, "rgba(70, 184, 79, 0.14)");
      atmosphere.addColorStop(1, "rgba(70, 184, 79, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.shadowColor = "rgba(48, 148, 56, 0.34)";
      context.shadowBlur = radius * 0.16;
      const sphere = context.createRadialGradient(
        centerX - radius * 0.36,
        centerY - radius * 0.38,
        radius * 0.05,
        centerX,
        centerY,
        radius,
      );
      sphere.addColorStop(0, "#24532a");
      sphere.addColorStop(0.35, "#102c15");
      sphere.addColorStop(0.72, "#061008");
      sphere.addColorStop(1, "#020503");
      context.fillStyle = sphere;
      context.fill();
      context.restore();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
      context.clip();

      context.lineWidth = 0.8;
      context.strokeStyle = "rgba(124, 226, 130, 0.13)";

      for (let latitude = -60; latitude <= 60; latitude += 30) {
        context.beginPath();
        let drawing = false;

        for (let longitude = -180; longitude <= 180; longitude += 3) {
          const projected = projectPoint(latitude, longitude, rotation, tilt);
          if (projected.z <= 0) {
            drawing = false;
            continue;
          }

          const x = centerX + projected.x * radius * 0.94;
          const y = centerY + projected.y * radius * 0.94;
          if (!drawing) context.moveTo(x, y);
          else context.lineTo(x, y);
          drawing = true;
        }

        context.stroke();
      }

      for (let longitude = -180; longitude < 180; longitude += 30) {
        context.beginPath();
        let drawing = false;

        for (let latitude = -84; latitude <= 84; latitude += 3) {
          const projected = projectPoint(latitude, longitude, rotation, tilt);
          if (projected.z <= 0) {
            drawing = false;
            continue;
          }

          const x = centerX + projected.x * radius * 0.94;
          const y = centerY + projected.y * radius * 0.94;
          if (!drawing) context.moveTo(x, y);
          else context.lineTo(x, y);
          drawing = true;
        }

        context.stroke();
      }

      for (const point of LAND_POINTS) {
        const projected = projectPoint(
          point.latitude,
          point.longitude,
          rotation,
          tilt,
        );
        if (projected.z <= -0.02) continue;

        const depth = Math.max(0, projected.z);
        const x = centerX + projected.x * radius * 0.935;
        const y = centerY + projected.y * radius * 0.935;
        const dotRadius =
          Math.max(0.72, radius * 0.0047) * (0.5 + depth * 0.72);
        const alpha = 0.3 + depth * 0.68;

        context.beginPath();
        context.arc(x, y, dotRadius, 0, Math.PI * 2);
        context.fillStyle =
          point.emphasis > 0.91
            ? `rgba(218, 255, 215, ${alpha})`
            : `rgba(84, 231, 95, ${alpha})`;
        context.fill();
      }

      const visibleHubs = HUBS.map((hub) => ({
        ...hub,
        projected: projectPoint(
          hub.latitude,
          hub.longitude,
          rotation,
          tilt,
        ),
      })).filter((hub) => hub.projected.z > 0.08);

      visibleHubs.forEach((hub, index) => {
        const x = centerX + hub.projected.x * radius * 0.935;
        const y = centerY + hub.projected.y * radius * 0.935;
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.003 + index * 1.4);

        context.beginPath();
        context.arc(x, y, 4 + pulse * 4, 0, Math.PI * 2);
        context.strokeStyle = `rgba(122, 232, 129, ${0.2 + pulse * 0.28})`;
        context.lineWidth = 1;
        context.stroke();

        context.beginPath();
        context.arc(x, y, 2.4, 0, Math.PI * 2);
        context.fillStyle = "rgba(190, 255, 190, 0.96)";
        context.shadowColor = "rgba(70, 184, 79, 0.96)";
        context.shadowBlur = 13;
        context.fill();
        context.shadowBlur = 0;
      });

      const sheen = context.createRadialGradient(
        centerX - radius * 0.42,
        centerY - radius * 0.5,
        0,
        centerX - radius * 0.3,
        centerY - radius * 0.35,
        radius * 0.75,
      );
      sheen.addColorStop(0, "rgba(255, 255, 255, 0.17)");
      sheen.addColorStop(0.32, "rgba(255, 255, 255, 0.04)");
      sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = sheen;
      context.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2,
      );

      context.restore();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(138, 238, 143, 0.42)";
      context.lineWidth = 1.2;
      context.shadowColor = "rgba(70, 184, 79, 0.46)";
      context.shadowBlur = 15;
      context.stroke();
      context.shadowBlur = 0;

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (reduceMotion) render(0);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    resizeCanvas();
    render(0);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="abt-world-canvas"
      role="img"
      aria-label="A continuously rotating dotted world globe with connected global nodes"
    />
  );
}
