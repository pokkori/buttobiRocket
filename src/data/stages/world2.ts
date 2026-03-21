import { StageData, SpecialObject } from '../../types';

const bg = '#1A0A2E';

export const WORLD2_STAGES: StageData[] = [
  {
    id: 21, worldId: 2, name: '星雲の入り口', difficulty: 2,
    rocketStart: { nx: 0.15, ny: 0.8 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.2 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 18, radius: 0.045, color: '#9B59B6', hasRing: false, type: 'gas' }],
    specialObjects: [{ type: 'booster', data: { id: 'b1', position: { nx: 0.7, ny: 0.4 }, radius: 0.02, direction: -Math.PI / 4, power: 80 } }],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 22, worldId: 2, name: '最初の小惑星帯', difficulty: 2,
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.35 }, mass: 15, radius: 0.04, color: '#8E44AD', hasRing: false, type: 'gas' }],
    specialObjects: [{ type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.5, ny: 0.6 }, { nx: 0.5, ny: 0.8 }], width: 0.04, density: 3, speed: 0 } }],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 23, worldId: 2, name: 'ブーストカーブ', difficulty: 2,
    rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 6,
    goalStar: { position: { nx: 0.1, ny: 0.1 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 22, radius: 0.05, color: '#6C3483', hasRing: false, type: 'gas' }],
    specialObjects: [{ type: 'booster', data: { id: 'b1', position: { nx: 0.75, ny: 0.35 }, radius: 0.02, direction: Math.PI, power: 100 } }],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 24, worldId: 2, name: '小惑星回廊', difficulty: 3,
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.3, ny: 0.0 }, { nx: 0.3, ny: 0.35 }], width: 0.04, density: 3, speed: 0 } },
      { type: 'asteroidBelt', data: { id: 'a2', points: [{ nx: 0.6, ny: 0.65 }, { nx: 0.6, ny: 1.0 }], width: 0.04, density: 3, speed: 0 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 25, worldId: 2, name: 'ガスジャイアント', difficulty: 3,
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.4 }, mass: 40, radius: 0.07, color: '#A569BD', hasRing: true, type: 'gas' },
      { id: 'p2', position: { nx: 0.3, ny: 0.7 }, mass: 10, radius: 0.03, color: '#5DADE2', hasRing: false, type: 'ice' },
    ],
    specialObjects: [],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 26, worldId: 2, name: 'ダブルブースト', difficulty: 3,
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.6 }, mass: 20, radius: 0.045, color: '#AF7AC5', hasRing: false, type: 'gas' }],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.35, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 3, power: 80 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.7, ny: 0.2 }, radius: 0.02, direction: -Math.PI / 6, power: 80 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 27, worldId: 2, name: '渦巻き星雲', difficulty: 3,
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 18, radius: 0.04, color: '#BB8FCE', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.7, ny: 0.4 }, mass: 18, radius: 0.04, color: '#85C1E9', hasRing: false, type: 'ice' },
    ],
    specialObjects: [{ type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.2, ny: 0.5 }, { nx: 0.5, ny: 0.45 }, { nx: 0.8, ny: 0.5 }], width: 0.035, density: 4, speed: 0.5 } }],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 28, worldId: 2, name: '壁越え', difficulty: 3,
    rocketStart: { nx: 0.1, ny: 0.8 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.8 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.3 }, mass: 25, radius: 0.05, color: '#7D3C98', hasRing: false, type: 'gas' }],
    specialObjects: [{ type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.5, ny: 0.5 }, { nx: 0.5, ny: 1.0 }], width: 0.05, density: 4, speed: 0 } }],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 29, worldId: 2, name: 'ブーストスルー', difficulty: 3,
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.35 }, mass: 15, radius: 0.04, color: '#C39BD3', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.7, ny: 0.65 }, mass: 15, radius: 0.04, color: '#AED6F1', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.5, ny: 0.0 }, { nx: 0.5, ny: 0.4 }], width: 0.04, density: 3, speed: 0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.55 }, radius: 0.02, direction: 0, power: 120 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 30, worldId: 2, name: '星雲の渦', difficulty: 3,
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.5 }, mass: 20, radius: 0.045, color: '#D2B4DE', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.7, ny: 0.5 }, mass: 20, radius: 0.045, color: '#A9CCE3', hasRing: false, type: 'ice' },
      { id: 'p3', position: { nx: 0.5, ny: 0.3 }, mass: 15, radius: 0.04, color: '#F5B7B1', hasRing: false, type: 'lava' },
    ],
    specialObjects: [],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  // Stages 31-40 with increasing complexity
  ...generateStages31to40(),
];

function generateStages31to40(): StageData[] {
  const names = ['フローティング','ブースト迷路','ねじれ飛行','流星群','惑星の壁','スパイラル','ブーストチェイン','ダブルスパイラル','星雲の試練','星雲マスター'];
  const stages: StageData[] = [];
  for (let i = 0; i < 10; i++) {
    const id = 31 + i;
    const diff = i < 3 ? 3 : i < 7 ? 4 : 5;
    const fuel = 0.75 - i * 0.015;
    const goalR = i < 5 ? 0.025 : 0.02;
    const s3 = 0.4 - i * 0.015;
    const s2 = 0.15 - i * 0.005;
    const planetCount = 1 + (i % 3);
    const planets = [];
    const colors = ['#E74C3C','#3498DB','#2ECC71','#F39C12','#9B59B6','#8E44AD','#BB8FCE','#AED6F1'];
    const types: Array<'rocky'|'gas'|'ice'|'lava'> = ['rocky','gas','ice','lava'];
    for (let p = 0; p < planetCount; p++) {
      const angle = (p / planetCount) * Math.PI * 2;
      planets.push({
        id: `p${p+1}`,
        position: { nx: 0.5 + Math.cos(angle) * 0.2, ny: 0.5 + Math.sin(angle) * 0.2 },
        mass: 15 + i * 2,
        radius: 0.04,
        color: colors[(i + p) % colors.length],
        hasRing: i > 5 && p === 0,
        type: types[(i + p) % 4],
      });
    }
    const specials: SpecialObject[] = [];
    if (i % 3 === 0) specials.push({ type: 'booster', data: { id: 'b1', position: { nx: 0.6, ny: 0.3 }, radius: 0.02, direction: -Math.PI / 4, power: 80 + i * 5 } });
    if (i > 2) specials.push({ type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.2, ny: 0.5 + (i % 2) * 0.1 }, { nx: 0.8, ny: 0.5 - (i % 2) * 0.1 }], width: 0.035, density: 3 + Math.floor(i / 3), speed: i > 5 ? 0.5 + i * 0.1 : 0 } });
    stages.push({
      id, worldId: 2, name: names[i], difficulty: diff as 1|2|3|4|5,
      rocketStart: { nx: i % 2 === 0 ? 0.1 : 0.5, ny: i % 2 === 0 ? 0.9 : 0.95 },
      rocketAngle: i % 2 === 0 ? -Math.PI / 4 : -Math.PI / 2,
      goalStar: { position: { nx: i % 2 === 0 ? 0.9 : 0.5, ny: i % 2 === 0 ? 0.1 : 0.05 }, radius: goalR, pulseSpeed: 1.5 },
      planets, specialObjects: specials,
      initialFuel: fuel, starThresholds: { star3: Math.max(s3, 0.15), star2: Math.max(s2, 0.05), star1: 0 },
      maxTrailLength: 300, bgColor: bg,
    });
  }
  return stages;
}
