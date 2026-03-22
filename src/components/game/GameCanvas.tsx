import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useGameStore } from '../../stores/gameStore';
import { StarField } from './StarField';
import { PlanetView } from './PlanetView';
import { GoalStarView } from './GoalStarView';
import { RocketView } from './RocketView';
import { TrailView } from './TrailView';
import { BlackHoleView } from './BlackHoleView';
import { WormholeView } from './WormholeView';
import { AsteroidBeltView } from './AsteroidBeltView';
import { BoosterView } from './BoosterView';
import { SlingshotOverlay } from './SlingshotOverlay';
import { PredictionDots } from './PredictionDots';
import { Vector2D } from '../../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ---- Star field (parallax) seed data ----
function generateStars(count: number): { x: number; y: number; size: number; opacity: number }[] {
  const result: { x: number; y: number; size: number; opacity: number }[] = [];
  for (let i = 0; i < count; i++) {
    const seed = (i * 16807 + 1) % 2147483647;
    const x = (seed % 1000) / 1000;
    const y = ((seed * 7 + 3) % 1000) / 1000;
    const size = 1 + (seed % 3);
    const opacity = 0.3 + (seed % 7) / 10;
    result.push({ x, y, size, opacity });
  }
  return result;
}
const STAR_DATA = generateStars(100);

// ---- Canvas drawing helpers ----

function drawStarField(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rocketVel: Vector2D,
  frameCount: number,
) {
  const parallaxFactor = 1 / 20;
  const offsetX = rocketVel.x * frameCount * parallaxFactor;
  const offsetY = rocketVel.y * frameCount * parallaxFactor;

  for (const star of STAR_DATA) {
    let sx = (star.x * w - offsetX * w) % w;
    let sy = (star.y * h - offsetY * h) % h;
    if (sx < 0) sx += w;
    if (sy < 0) sy += h;
    ctx.globalAlpha = star.opacity;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(sx, sy, star.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawRocket(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  position: Vector2D,
  rotation: number,
  isLaunched: boolean,
  frameCount: number,
  skinId?: string,
) {
  const cx = position.x * w;
  const cy = position.y * h;
  const rot = rotation + Math.PI / 2; // adjust so 0 = pointing up

  let bodyColor = '#E8E8E8';
  let noseColor = '#FF4444';
  let strokeColor = '#CCCCCC';
  let trailColor = '#ff8800';

  switch (skinId) {
    case 'gold':
      bodyColor = '#FFD700';
      noseColor = '#FF8C00';
      strokeColor = '#FFA500';
      trailColor = '#FFD700';
      break;
    case 'cosmic':
      bodyColor = '#A855F7';
      noseColor = '#00FFFF';
      strokeColor = '#7C3AED';
      trailColor = '#9400D3';
      break;
    case 'fire':
      bodyColor = '#FF4500';
      noseColor = '#FF8C00';
      strokeColor = '#8B0000';
      trailColor = '#FF6347';
      break;
    case 'ice':
      bodyColor = '#00BFFF';
      noseColor = '#87CEEB';
      strokeColor = '#4682B4';
      trailColor = '#00CED1';
      break;
    case 'thunder':
      bodyColor = '#FFD700';
      noseColor = '#FFF44F';
      strokeColor = '#8B6914';
      trailColor = '#FFFF00';
      break;
    case 'rainbow':
      bodyColor = '#FF69B4';
      noseColor = '#FF1493';
      strokeColor = '#C71585';
      trailColor = '#FF69B4';
      break;
    case 'ghost':
      bodyColor = 'rgba(255,255,255,0.85)';
      noseColor = '#9370DB';
      strokeColor = '#D3D3D3';
      trailColor = 'rgba(200,200,255,0.7)';
      break;
    case 'neon_pink':
      bodyColor = '#FF1493';
      noseColor = '#FF69B4';
      strokeColor = '#C71585';
      trailColor = '#FF1493';
      break;
    case 'emerald':
      bodyColor = '#50C878';
      noseColor = '#00A36C';
      strokeColor = '#2E8B57';
      trailColor = '#50C878';
      break;
    default:
      bodyColor = '#E8E8E8';
      noseColor = '#FF4444';
      strokeColor = '#CCCCCC';
      trailColor = '#ff8800';
  }

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);

  // Glow
  ctx.shadowBlur = 12;
  ctx.shadowColor = '#00BFFF';

  // Rocket body: triangle (Path2D)
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(-8, 10);
  ctx.lineTo(8, 10);
  ctx.closePath();
  ctx.fillStyle = bodyColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Nose cone
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(-5, -4);
  ctx.lineTo(5, -4);
  ctx.closePath();
  ctx.fillStyle = noseColor;
  ctx.fill();

  // Window
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#4A90D9';
  ctx.fill();
  ctx.strokeStyle = '#6BB5FF';
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Exhaust flame particles (when flying)
  if (isLaunched) {
    const seed = frameCount;
    for (let i = 0; i < 5; i++) {
      const rng = ((seed * (i + 1) * 16807 + i) % 2147483647) / 2147483647;
      const rng2 = ((seed * (i + 3) * 48271 + i) % 2147483647) / 2147483647;
      const px = (rng - 0.5) * 8;
      const py = 12 + rng2 * 12;
      const size = 2 + rng * 4;
      // Random triangle particle
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - size / 2, py + size);
      ctx.lineTo(px + size / 2, py + size);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? trailColor : noseColor;
      ctx.globalAlpha = 0.7 + rng * 0.3;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  trail: Vector2D[],
) {
  const len = trail.length;
  if (len < 2) return;

  // Draw trail with bezier curves, lineWidth fading from thick to thin
  for (let i = 1; i < len; i++) {
    const progress = i / len;
    const alpha = 0.1 + progress * 0.7;
    const lineWidth = 1 + progress * 4;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,191,255,${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    const prev = trail[i - 1];
    const curr = trail[i];

    if (i > 1 && i < len - 1) {
      // Bezier curve using midpoints
      const next = trail[Math.min(i + 1, len - 1)];
      const cpx = curr.x * w;
      const cpy = curr.y * h;
      const midX = (prev.x * w + curr.x * w) / 2;
      const midY = (prev.y * h + curr.y * h) / 2;
      const midX2 = (curr.x * w + next.x * w) / 2;
      const midY2 = (curr.y * h + next.y * h) / 2;
      ctx.moveTo(midX, midY);
      ctx.quadraticCurveTo(cpx, cpy, midX2, midY2);
    } else {
      ctx.moveTo(prev.x * w, prev.y * h);
      ctx.lineTo(curr.x * w, curr.y * h);
    }
    ctx.stroke();
  }

  // Bright head glow
  if (len > 0) {
    const head = trail[len - 1];
    const hx = head.x * w;
    const hy = head.y * h;
    const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 8);
    grad.addColorStop(0, 'rgba(0,191,255,0.9)');
    grad.addColorStop(1, 'rgba(0,191,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(hx, hy, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  nx: number,
  ny: number,
  radius: number,
  color: string,
  hasRing: boolean,
) {
  const cx = nx * w;
  const cy = ny * h;
  const r = radius * Math.min(w, h);

  // Radial gradient for sphere effect
  const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
  grad.addColorStop(0, lightenColor(color, 40));
  grad.addColorStop(0.7, color);
  grad.addColorStop(1, darkenColor(color, 40));

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Ring (elliptical arc)
  if (hasRing) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = color + '88';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

function drawBlackHole(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  nx: number,
  ny: number,
  visualRadius: number,
  eventHorizonRadius: number,
  frameCount: number,
) {
  const cx = nx * w;
  const cy = ny * h;
  const vr = visualRadius * Math.min(w, h);
  const ehr = eventHorizonRadius * Math.min(w, h);

  // Accretion disk: radial gradient black→purple→transparent with frame rotation
  const angle = (frameCount * 0.02) % (Math.PI * 2);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Outer accretion gradient
  const diskGrad = ctx.createRadialGradient(0, 0, ehr, 0, 0, vr);
  diskGrad.addColorStop(0, 'rgba(0,0,0,0.9)');
  diskGrad.addColorStop(0.4, 'rgba(128,0,255,0.4)');
  diskGrad.addColorStop(0.7, 'rgba(200,50,255,0.2)');
  diskGrad.addColorStop(1, 'rgba(128,0,255,0)');
  ctx.fillStyle = diskGrad;
  ctx.beginPath();
  ctx.arc(0, 0, vr, 0, Math.PI * 2);
  ctx.fill();

  // Rotating ring segments
  const colors = ['#FF6B35', '#FFD700', '#00D4FF', '#FF1493'];
  for (let i = 0; i < 4; i++) {
    const ringR = vr * (0.6 + i * 0.12);
    ctx.beginPath();
    ctx.arc(0, 0, ringR, (i * Math.PI) / 2, (i * Math.PI) / 2 + Math.PI / 3);
    ctx.strokeStyle = colors[i] + '66';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();

  // Event horizon core (solid black)
  ctx.beginPath();
  ctx.arc(cx, cy, ehr, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Rim light
  ctx.beginPath();
  ctx.arc(cx, cy, ehr, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawGoalStar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  nx: number,
  ny: number,
  radius: number,
  frameCount: number,
) {
  const cx = nx * w;
  const cy = ny * h;
  const r = radius * Math.min(w, h);

  // Pulse effect
  const pulse = 1 + 0.3 * Math.sin(frameCount * 0.05);
  const pulsedR = r * pulse;

  // Outer glow (radial gradient)
  const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulsedR * 2);
  glowGrad.addColorStop(0, 'rgba(255,215,0,0.6)');
  glowGrad.addColorStop(0.5, 'rgba(255,215,0,0.2)');
  glowGrad.addColorStop(1, 'rgba(255,215,0,0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, pulsedR * 2, 0, Math.PI * 2);
  ctx.fill();

  // 5-point star path
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = cx + Math.cos(outerAngle) * pulsedR;
    const oy = cy + Math.sin(outerAngle) * pulsedR;
    const ix = cx + Math.cos(innerAngle) * pulsedR * 0.4;
    const iy = cy + Math.sin(innerAngle) * pulsedR * 0.4;
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fillStyle = '#FFD700';
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#FFD700';
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawWormhole(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  entryNx: number,
  entryNy: number,
  exitNx: number,
  exitNy: number,
  entryRadius: number,
  exitRadius: number,
  frameCount: number,
) {
  const minDim = Math.min(w, h);
  const ex = entryNx * w;
  const ey = entryNy * h;
  const er = entryRadius * minDim;
  const xx = exitNx * w;
  const xy = exitNy * h;
  const xr = exitRadius * minDim;
  const angle = (frameCount * 0.03) % (Math.PI * 2);

  // Entry portal (cyan, rotating)
  ctx.save();
  ctx.translate(ex, ey);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.arc(0, 0, er, 0, Math.PI * 2);
  ctx.strokeStyle = '#00FFFF';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#00FFFF';
  ctx.globalAlpha = 0.8;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Exit portal (magenta)
  ctx.beginPath();
  ctx.arc(xx, xy, xr, 0, Math.PI * 2);
  ctx.strokeStyle = '#FF00FF';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(xx, xy, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#FF00FF';
  ctx.globalAlpha = 0.8;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Connecting dots
  for (let i = 0; i < 8; i++) {
    const t = (i + 0.5) / 8;
    const dx = ex + (xx - ex) * t;
    const dy = ey + (xy - ey) * t;
    ctx.beginPath();
    ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fill();
  }
}

function drawAsteroidBelt(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  data: { points: { nx: number; ny: number }[]; width: number; density: number; id: string },
) {
  const count = data.density * 10;
  let seed = 42 + data.id.charCodeAt(0);
  const minDim = Math.min(w, h);

  for (let i = 0; i < count; i++) {
    seed = (seed * 16807) % 2147483647;
    const t = i / count;
    const totalSegments = data.points.length - 1;
    const segIdx = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
    const segT = (t * totalSegments) - segIdx;
    const p0 = data.points[segIdx];
    const p1 = data.points[Math.min(segIdx + 1, data.points.length - 1)];
    const baseX = (p0.nx + (p1.nx - p0.nx) * segT) * w;
    const baseY = (p0.ny + (p1.ny - p0.ny) * segT) * h;

    const halfW = (data.width / 2) * minDim;
    const offsetX = ((seed % 1000) / 1000 - 0.5) * halfW * 2;
    seed = (seed * 16807) % 2147483647;
    const offsetY = ((seed % 1000) / 1000 - 0.5) * halfW * 2;
    seed = (seed * 16807) % 2147483647;
    const size = 3 + (seed % 6);
    seed = (seed * 16807) % 2147483647;
    const gray = 128 + (seed % 40);

    ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
    ctx.beginPath();
    ctx.arc(baseX + offsetX, baseY + offsetY, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBooster(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  nx: number,
  ny: number,
  radius: number,
  direction: number,
  frameCount: number,
) {
  const cx = nx * w;
  const cy = ny * h;
  const r = radius * Math.min(w, h);

  // Pulse
  const pulse = 1 + 0.4 * Math.sin(frameCount * 0.08);

  // Outer pulse ring
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.5 * pulse, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(127,255,0,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#7FFF00';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Inner icon circle
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#7FFF00';
  ctx.fill();

  // Arrow
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(direction);
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(6, 0);
  ctx.lineTo(3, -3);
  ctx.moveTo(6, 0);
  ctx.lineTo(3, 3);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawSlingshotOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rocketPos: Vector2D,
  dragPos: Vector2D,
  power: number,
) {
  const rx = rocketPos.x * w;
  const ry = rocketPos.y * h;
  const dx = dragPos.x * w;
  const dy = dragPos.y * h;

  const r = Math.round(power * 255);
  const g = Math.round((1 - power) * 255);
  const powerColor = `rgb(${r},${g},0)`;

  // Drag line dots
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const x = rx + (dx - rx) * t;
    const y = ry + (dy - ry) * t;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();
  }

  // Direction arrow
  const arrowLen = power * 60;
  const dirX = rx - dx;
  const dirY = ry - dy;
  const dirLen = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const nDirX = dirX / dirLen;
  const nDirY = dirY / dirLen;
  const arrowEndX = rx + nDirX * arrowLen;
  const arrowEndY = ry + nDirY * arrowLen;

  for (let i = 0; i < 5; i++) {
    const t = (i + 1) / 5;
    const x = rx + (arrowEndX - rx) * t;
    const y = ry + (arrowEndY - ry) * t;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = powerColor;
    ctx.globalAlpha = 0.6 + t * 0.4;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Power ring
  ctx.beginPath();
  ctx.arc(rx, ry, 20, 0, Math.PI * 2);
  ctx.strokeStyle = powerColor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.6;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawPredictionDots(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: Vector2D[],
) {
  for (let i = 0; i < points.length; i++) {
    const opacity = 0.5 - (i / points.length) * 0.4;
    const p = points[i];
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fill();
  }
}

function drawGoalParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  particles: { x: number; y: number; vx: number; vy: number; color: string; life: number; maxLife: number }[],
) {
  for (const p of particles) {
    if (p.life <= 0) continue;
    const alpha = p.life / p.maxLife;
    const size = 3 + (1 - alpha) * 4;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ---- Color helpers ----
function lightenColor(hex: string, amount: number): string {
  const c = hexToRgb(hex);
  return `rgb(${Math.min(255, c.r + amount)},${Math.min(255, c.g + amount)},${Math.min(255, c.b + amount)})`;
}

function darkenColor(hex: string, amount: number): string {
  const c = hexToRgb(hex);
  return `rgb(${Math.max(0, c.r - amount)},${Math.max(0, c.g - amount)},${Math.max(0, c.b - amount)})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

// ===========================================================
// Main Component
// ===========================================================

export function GameCanvas() {
  const stage = useGameStore(s => s.currentStage);
  const phase = useGameStore(s => s.phase);
  const rocket = useGameStore(s => s.rocket);
  const slingshot = useGameStore(s => s.slingshotState);
  const usedBoosters = useGameStore(s => s.usedBoosters);
  const goalParticles = useGameStore(s => s.goalParticles);
  const tick = useGameStore(s => s.tick);
  const startDrag = useGameStore(s => s.startDrag);
  const updateDrag = useGameStore(s => s.updateDrag);
  const endDrag = useGameStore(s => s.endDrag);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // ---- Web Canvas rendering (Platform.OS === 'web') ----
  const isWeb = Platform.OS === 'web';

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    frameCountRef.current++;
    const fc = frameCountRef.current;

    // Clear with background
    const bgColor = stage.bgColor || '#0A0E27';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // 1. Star field (parallax)
    drawStarField(ctx, w, h, rocket.velocity, fc);

    // 2. Special objects (behind planets)
    for (let i = 0; i < stage.specialObjects.length; i++) {
      const obj = stage.specialObjects[i];
      switch (obj.type) {
        case 'blackhole':
          drawBlackHole(ctx, w, h, obj.data.position.nx, obj.data.position.ny, obj.data.visualRadius, obj.data.eventHorizonRadius, fc);
          break;
        case 'wormhole':
          drawWormhole(ctx, w, h, obj.data.entryPosition.nx, obj.data.entryPosition.ny, obj.data.exitPosition.nx, obj.data.exitPosition.ny, obj.data.entryRadius, obj.data.exitRadius, fc);
          break;
        case 'asteroidBelt':
          drawAsteroidBelt(ctx, w, h, obj.data);
          break;
        case 'booster':
          if (!usedBoosters.has(obj.data.id)) {
            drawBooster(ctx, w, h, obj.data.position.nx, obj.data.position.ny, obj.data.radius, obj.data.direction, fc);
          }
          break;
      }
    }

    // 3. Planets
    for (const planet of stage.planets) {
      drawPlanet(ctx, w, h, planet.position.nx, planet.position.ny, planet.radius, planet.color, planet.hasRing);
    }

    // 4. Goal star
    drawGoalStar(ctx, w, h, stage.goalStar.position.nx, stage.goalStar.position.ny, stage.goalStar.radius, fc);

    // 5. Trail
    if (rocket.trail.length > 1) {
      drawTrail(ctx, w, h, rocket.trail);
    }

    // 6. Prediction dots (aiming)
    if (phase === 'aiming' && slingshot.predictedTrajectory.length > 0) {
      drawPredictionDots(ctx, w, h, slingshot.predictedTrajectory);
    }

    // 7. Slingshot overlay
    if (phase === 'aiming' && slingshot.isDragging && slingshot.dragCurrent) {
      drawSlingshotOverlay(ctx, w, h, rocket.position, slingshot.dragCurrent, slingshot.power);
    }

    // 8. Rocket
    if (rocket.isAlive) {
      drawRocket(ctx, w, h, rocket.position, rocket.rotation, rocket.isLaunched, fc, rocket.skinId);
    }

    // 9. Goal particles
    if (goalParticles && goalParticles.length > 0) {
      drawGoalParticles(ctx, w, h, goalParticles);
    }

    // 10. Crash/absorbed flash
    if (phase === 'crashed' || phase === 'absorbed') {
      ctx.fillStyle = phase === 'absorbed' ? 'rgba(128,0,255,0.3)' : 'rgba(255,0,0,0.3)';
      ctx.fillRect(0, 0, w, h);
    }
  }, [stage, phase, rocket, slingshot, usedBoosters, goalParticles]);

  // Game loop
  const gameLoop = useCallback((time: number) => {
    if (lastTime.current === 0) lastTime.current = time;
    const delta = time - lastTime.current;
    if (delta >= 16) { // ~60fps
      tick();
      lastTime.current = time;
    }
    if (isWeb) {
      renderCanvas();
    }
    animRef.current = requestAnimationFrame(gameLoop);
  }, [tick, renderCanvas, isWeb]);

  useEffect(() => {
    if (isWeb) {
      // Always run animation frame for Canvas rendering
      lastTime.current = 0;
      animRef.current = requestAnimationFrame(gameLoop);
    } else if (phase === 'flying') {
      lastTime.current = 0;
      animRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase, gameLoop, isWeb]);

  // Resize canvas to match screen
  useEffect(() => {
    if (!isWeb) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SCREEN_WIDTH * dpr;
    canvas.height = SCREEN_HEIGHT * dpr;
    canvas.style.width = `${SCREEN_WIDTH}px`;
    canvas.style.height = `${SCREEN_HEIGHT}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, [isWeb]);

  const toNormalized = useCallback((x: number, y: number) => {
    return { x: x / SCREEN_WIDTH, y: y / SCREEN_HEIGHT };
  }, []);

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      if (phase !== 'aiming') return;
      startDrag(toNormalized(e.x, e.y));
    })
    .onUpdate((e) => {
      if (phase !== 'aiming') return;
      updateDrag(toNormalized(e.x, e.y));
    })
    .onEnd(() => {
      endDrag();
    })
    .minDistance(0);

  if (!stage) return null;

  // ---- Web: Canvas-based rendering ----
  if (isWeb) {
    return (
      <GestureDetector gesture={panGesture}>
        <View style={[styles.container, { backgroundColor: '#000' }]}>
          {/* Canvas element for web */}
          <canvas
            ref={canvasRef as any}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
          />
        </View>
      </GestureDetector>
    );
  }

  // ---- Non-web fallback: original View-based rendering ----
  const bgColor = stage.bgColor || '#0A0E27';

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <StarField />

        {stage.specialObjects.map((obj, i) => {
          switch (obj.type) {
            case 'blackhole':
              return <BlackHoleView key={`bh-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'wormhole':
              return <WormholeView key={`wh-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'asteroidBelt':
              return <AsteroidBeltView key={`ab-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'booster':
              return !usedBoosters.has(obj.data.id) ? (
                <BoosterView key={`bo-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
              ) : null;
            default:
              return null;
          }
        })}

        {stage.planets.map(planet => (
          <PlanetView key={planet.id} planet={planet} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        ))}

        <GoalStarView goal={stage.goalStar} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />

        {rocket.trail.length > 1 && (
          <TrailView trail={rocket.trail} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {phase === 'aiming' && slingshot.predictedTrajectory.length > 0 && (
          <PredictionDots points={slingshot.predictedTrajectory} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {phase === 'aiming' && slingshot.isDragging && (
          <SlingshotOverlay
            rocketPos={rocket.position}
            dragPos={slingshot.dragCurrent!}
            power={slingshot.power}
            angle={slingshot.angle}
            screenWidth={SCREEN_WIDTH}
            screenHeight={SCREEN_HEIGHT}
          />
        )}

        {rocket.isAlive && (
          <RocketView rocket={rocket} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {(phase === 'crashed' || phase === 'absorbed') && (
          <View style={[styles.flash, { backgroundColor: phase === 'absorbed' ? 'rgba(128,0,255,0.3)' : 'rgba(255,0,0,0.3)' }]} />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'hidden',
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
});
