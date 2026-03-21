import { StageData, SpecialObject } from '../../types';

const bg = '#1A0A00';

const W5_NAMES = [
  '最後の旅路','銀河の渦','超新星','暗黒星団','時間の果て',
  '銀河衝突','ダークエネルギー','量子重力','事象の先','銀河の壁',
  'コスモストーム','重力の海','次元の裂け目','暗黒のダンス','銀河核',
  '時空の嵐','無限の彼方','最終防衛線','銀河の心臓','ビッグバン',
];

export const WORLD5_STAGES: StageData[] = W5_NAMES.map((name, i) => {
  const id = 81 + i;
  const diff = i < 2 ? 4 : 5;
  const fuel = 0.7 - i * 0.018;
  const goalR = i < 2 ? 0.02 : 0.015;
  const s3 = 0.35 - i * 0.01;
  const s2 = 0.15 - i * 0.005;

  const planets = [];
  const specials: SpecialObject[] = [];
  const colors = ['#F39C12','#E74C3C','#3498DB','#2ECC71','#F1C40F','#D35400','#D4AC0D','#A04000','#F4D03F','#E59866'];
  const types: Array<'rocky'|'gas'|'ice'|'lava'> = ['gas','lava','ice','rocky'];

  // All stages have multiple planets
  const pCount = 2 + Math.floor(i / 5);
  for (let p = 0; p < Math.min(pCount, 5); p++) {
    const a = (p / pCount) * Math.PI * 2 + i * 0.4;
    const r = 0.2 + (p % 2) * 0.1;
    planets.push({
      id: `p${p+1}`,
      position: { nx: 0.5 + Math.cos(a) * r, ny: 0.5 + Math.sin(a) * r },
      mass: 18 + i * 1.5 + p * 3,
      radius: 0.04 + (p === 0 && i > 8 ? 0.015 : p === 0 ? 0.005 : 0),
      color: colors[(i + p) % colors.length],
      hasRing: p === 0 || (i > 14 && p === 1),
      type: types[p % 4],
    });
  }

  // Black holes
  const bhCount = 1 + Math.floor(i / 4);
  for (let b = 0; b < Math.min(bhCount, 3); b++) {
    const a = (b / bhCount) * Math.PI * 2 + i * 0.6 + Math.PI / 4;
    specials.push({
      type: 'blackhole',
      data: {
        id: `bh${b+1}`,
        position: { nx: 0.5 + Math.cos(a) * 0.2, ny: 0.5 + Math.sin(a) * 0.2 },
        mass: 200 + i * 15,
        eventHorizonRadius: 0.035 + (i > 15 ? 0.005 : 0),
        visualRadius: 0.06 + (i > 15 ? 0.01 : 0),
      },
    });
  }

  // Wormholes for most stages
  if (i > 0) {
    const whCount = 1 + Math.floor(i / 6);
    for (let w = 0; w < Math.min(whCount, 2); w++) {
      specials.push({
        type: 'wormhole',
        data: {
          id: `w${w+1}`,
          entryPosition: { nx: 0.2 + w * 0.3, ny: 0.7 - w * 0.4 },
          exitPosition: { nx: 0.5 + w * 0.2, ny: 0.15 + w * 0.1 },
          entryRadius: 0.025,
          exitRadius: 0.025,
          exitAngle: -Math.PI / 3 - w * Math.PI / 6,
          speedMultiplier: 1.2 + w * 0.3,
        },
      });
    }
  }

  // Asteroid belts
  if (i > 4) {
    const abCount = 1 + Math.floor((i - 4) / 5);
    for (let a = 0; a < Math.min(abCount, 2); a++) {
      specials.push({
        type: 'asteroidBelt',
        data: {
          id: `a${a+1}`,
          points: [
            { nx: 0.0 + a * 0.5, ny: 0.45 + a * 0.1 },
            { nx: 0.5 + a * 0.1, ny: 0.5 - a * 0.05 },
            { nx: 1.0 - a * 0.5, ny: 0.45 + a * 0.1 },
          ],
          width: 0.04,
          density: 5,
          speed: (a === 0 ? 1.0 : -1.0) * (1 + i * 0.05),
        },
      });
    }
  }

  // Boosters
  if (i > 2) {
    const bCount = 1 + (i > 14 ? 1 : 0);
    for (let b = 0; b < bCount; b++) {
      specials.push({
        type: 'booster',
        data: {
          id: `b${b+1}`,
          position: { nx: 0.2 + b * 0.6, ny: 0.55 - b * 0.35 },
          radius: 0.02,
          direction: -Math.PI / 2,
          power: 120 + i * 3,
        },
      });
    }
  }

  return {
    id, worldId: 5, name, difficulty: diff as 1|2|3|4|5,
    rocketStart: { nx: i % 2 === 0 ? 0.15 : 0.5, ny: 0.95 - (i % 2) * 0.1 },
    rocketAngle: i % 2 === 0 ? -Math.PI / 4 : -Math.PI / 2,
    goalStar: { position: { nx: i % 2 === 0 ? 0.85 : 0.5, ny: i % 2 === 0 ? 0.15 : 0.05 }, radius: goalR, pulseSpeed: 2.0 },
    planets, specialObjects: specials,
    initialFuel: Math.max(fuel, 0.35), starThresholds: { star3: Math.max(s3, 0.15), star2: Math.max(s2, 0.05), star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  };
});
