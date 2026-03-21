import { StageData, SpecialObject } from '../../types';

const bg = '#000000';

const W3_NAMES = [
  '暗黒の始まり','吸引の罠','ブラックホール・スイングバイ','双子の闇','闇と光',
  '事象の地平線','ブラックホール三角','闇の回廊','重力レンズ','ハーフウェイ',
  '漆黒の海','スリングショット・マスター','闇の迷宮','パルサー','ダークマター',
  '重力波','ダークトンネル','ブラックホール回廊','特異点','ブラックホールマスター',
];

export const WORLD3_STAGES: StageData[] = W3_NAMES.map((name, i) => {
  const id = 41 + i;
  const diff = i < 5 ? 3 : i < 15 ? 4 : 5;
  const fuel = 0.85 - i * 0.018;
  const goalR = i < 5 ? 0.025 : 0.02;
  const s3 = 0.55 - i * 0.018;
  const s2 = 0.25 - i * 0.008;

  const planets = [];
  const specials: SpecialObject[] = [];
  const colors = ['#5D6D7E','#5DADE2','#AEB6BF','#F4D03F','#7F8C8D','#BFC9CA','#E8DAEF','#D5F5E3','#F0B27A','#D5DBDB'];
  const types: Array<'rocky'|'gas'|'ice'|'lava'> = ['rocky','ice','rocky','gas'];

  // Add planets based on stage index
  if (i % 3 !== 1) {
    const pCount = 1 + Math.floor(i / 7);
    for (let p = 0; p < Math.min(pCount, 3); p++) {
      const a = (p / Math.max(pCount, 1)) * Math.PI * 2 + i * 0.5;
      planets.push({
        id: `p${p+1}`,
        position: { nx: 0.5 + Math.cos(a) * (0.15 + p * 0.1), ny: 0.5 + Math.sin(a) * (0.15 + p * 0.05) },
        mass: 15 + i,
        radius: 0.04 + (i > 10 ? 0.005 : 0),
        color: colors[i % colors.length],
        hasRing: i > 12 && p === 0,
        type: types[p % 4],
      });
    }
  }

  // Add black holes (the main feature of world 3)
  const bhCount = 1 + Math.floor(i / 5);
  for (let b = 0; b < Math.min(bhCount, 4); b++) {
    const a = (b / Math.max(bhCount, 1)) * Math.PI * 2 + i * 0.3;
    specials.push({
      type: 'blackhole',
      data: {
        id: `bh${b+1}`,
        position: { nx: 0.5 + Math.cos(a) * (0.15 + b * 0.05), ny: 0.5 + Math.sin(a) * (0.15 + b * 0.05) },
        mass: 200 + i * 15,
        eventHorizonRadius: 0.035 + (i > 10 ? 0.005 : 0),
        visualRadius: 0.06 + (i > 10 ? 0.01 : 0),
      },
    });
  }

  // Add boosters for some stages
  if (i % 4 === 1 || i > 14) {
    specials.push({
      type: 'booster',
      data: { id: 'b1', position: { nx: 0.5, ny: 0.7 }, radius: 0.02, direction: -Math.PI / 2, power: 100 + i * 5 },
    });
  }

  // Add asteroid belts for later stages
  if (i > 7) {
    specials.push({
      type: 'asteroidBelt',
      data: { id: 'a1', points: [{ nx: 0.2, ny: 0.3 + (i % 3) * 0.1 }, { nx: 0.8, ny: 0.3 + (i % 3) * 0.1 }], width: 0.035, density: 3, speed: i > 12 ? 0.5 : 0 },
    });
  }

  return {
    id, worldId: 3, name, difficulty: diff as 1|2|3|4|5,
    rocketStart: { nx: i % 2 === 0 ? 0.15 : 0.5, ny: i % 2 === 0 ? 0.8 : 0.95 },
    rocketAngle: i % 2 === 0 ? -Math.PI / 4 : -Math.PI / 2,
    goalStar: { position: { nx: i % 2 === 0 ? 0.85 : 0.5, ny: i % 2 === 0 ? 0.2 : 0.05 }, radius: goalR, pulseSpeed: 1.5 },
    planets, specialObjects: specials,
    initialFuel: Math.max(fuel, 0.5), starThresholds: { star3: Math.max(s3, 0.15), star2: Math.max(s2, 0.05), star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  };
});
