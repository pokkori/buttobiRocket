/**
 * OGP Share Card Generator
 * Creates a 1200x630 offscreen canvas with the clear trajectory
 */
import { Vector2D, StageData } from '../types';

export interface ShareCardOptions {
  trail: Vector2D[];
  stage: StageData;
  stars: 1 | 2 | 3;
  worldId: number;
  stageInWorld: number;
  perfectCount?: number;
  totalCleared?: number;
}

export async function generateShareCard(options: ShareCardOptions): Promise<Blob | null> {
  const { trail, stage, stars, worldId, stageInWorld, perfectCount, totalCleared } = options;
  const W = 1200;
  const H = 630;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // ---- Background gradient: #0A0E27 → #1a1a3e → #0A0E27 ----
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#0A0E27');
  bgGrad.addColorStop(0.5, '#1a1a3e');
  bgGrad.addColorStop(1, '#0A0E27');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ---- Stars background ----
  for (let i = 0; i < 60; i++) {
    const seed = (i * 16807 + 1) % 2147483647;
    const x = (seed % 1000) / 1000 * W;
    const y = ((seed * 7 + 3) % 1000) / 1000 * H;
    const size = 1 + (seed % 2);
    ctx.globalAlpha = 0.2 + (seed % 5) / 10;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // ---- Planets/BH: draw small ----
  const minDim = Math.min(W, H);
  for (const planet of stage.planets) {
    const cx = planet.position.nx * W;
    const cy = planet.position.ny * H;
    const r = planet.radius * minDim * 0.7; // smaller
    const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    grad.addColorStop(0, lighten(planet.color, 30));
    grad.addColorStop(1, planet.color);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const obj of stage.specialObjects) {
    if (obj.type === 'blackhole') {
      const bh = obj.data;
      const cx = bh.position.nx * W;
      const cy = bh.position.ny * H;
      const r = bh.visualRadius * minDim * 0.6;
      const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      grad.addColorStop(0, 'rgba(0,0,0,0.9)');
      grad.addColorStop(0.5, 'rgba(128,0,255,0.3)');
      grad.addColorStop(1, 'rgba(128,0,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ---- Goal: gold starburst ----
  const gx = stage.goalStar.position.nx * W;
  const gy = stage.goalStar.position.ny * H;
  const gr = stage.goalStar.radius * minDim;

  // Starburst rays
  ctx.save();
  ctx.translate(gx, gy);
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * gr * 3, Math.sin(angle) * gr * 3);
    ctx.strokeStyle = 'rgba(255,215,0,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  // Gold star
  const starGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr * 1.5);
  starGrad.addColorStop(0, '#FFD700');
  starGrad.addColorStop(0.5, '#FFA500');
  starGrad.addColorStop(1, 'rgba(255,215,0,0)');
  ctx.fillStyle = starGrad;
  ctx.beginPath();
  ctx.arc(gx, gy, gr * 1.5, 0, Math.PI * 2);
  ctx.fill();

  // ---- Trail: neon blue bezier + glow ----
  if (trail.length > 1) {
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00BFFF';

    for (let i = 1; i < trail.length; i++) {
      const progress = i / trail.length;
      const alpha = 0.2 + progress * 0.8;
      const lineWidth = 1 + progress * 3;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(0,191,255,${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      const prev = trail[i - 1];
      const curr = trail[i];

      if (i > 1 && i < trail.length - 1) {
        const next = trail[Math.min(i + 1, trail.length - 1)];
        const cpx = curr.x * W;
        const cpy = curr.y * H;
        const midX = (prev.x * W + curr.x * W) / 2;
        const midY = (prev.y * H + curr.y * H) / 2;
        const midX2 = (curr.x * W + next.x * W) / 2;
        const midY2 = (curr.y * H + next.y * H) / 2;
        ctx.moveTo(midX, midY);
        ctx.quadraticCurveTo(cpx, cpy, midX2, midY2);
      } else {
        ctx.moveTo(prev.x * W, prev.y * H);
        ctx.lineTo(curr.x * W, curr.y * H);
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  // ---- Text overlay ----
  // Stage name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Stage ${worldId}-${stageInWorld} ${stage.name}`, 40, 50);

  // Star rating
  const starStr = '\u2605'.repeat(stars) + '\u2606'.repeat(3 - stars);
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText(starStr, 40, 110);

  // Perfect clear rate badge (top-right)
  if (perfectCount !== undefined && totalCleared !== undefined && totalCleared > 0) {
    ctx.fillStyle = 'rgba(255,215,0,0.15)';
    ctx.fillRect(W - 280, 20, 240, 50);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`\u2B50${perfectCount}/${totalCleared} Perfect`, W - 30, 55);
  }

  // Hashtag
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('#\u3076\u3063\u98DB\u3073\u30ED\u30B1\u30C3\u30C8', W - 40, H - 30);

  // App name bottom-left
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('\u3076\u3063\u98DB\u3073\u30ED\u30B1\u30C3\u30C8', 40, H - 30);

  // ---- Export as blob ----
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}

function lighten(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  const r = Math.min(255, parseInt(h.substring(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(h.substring(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(h.substring(4, 6), 16) + amount);
  return `rgb(${r},${g},${b})`;
}
