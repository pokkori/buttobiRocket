import { StageData, SpecialObject } from '../../types';

const bg = '#0A2E2E';

const W4_NAMES = [
  '初めてのワープ','ワープ&カーブ','逆方向ワープ','ダブルワープ','ワープ&ブラックホール',
  '加速ワープ','トリプルワープ','ワープ迷路','減速ワープ','ワームホール&ブースト',
  '時空のねじれ','パラレルワープ','ループ','ワープクロス','時空の十字路',
  'カオスフィールド','ワームホール連鎖','反転ワープ','終わりなき回廊','ワームホールマスター',
];

export const WORLD4_STAGES: StageData[] = W4_NAMES.map((name, i) => {
  const id = 61 + i;
  const diff = i < 5 ? 3 : i < 13 ? 4 : 5;
  const fuel = 0.9 - i * 0.02;
  const goalR = i < 5 ? 0.025 : i < 13 ? 0.02 : 0.015;
  const s3 = 0.6 - i * 0.023;
  const s2 = 0.3 - i * 0.013;

  const planets = [];
  const specials: SpecialObject[] = [];
  const colors = ['#1ABC9C','#48C9B0','#45B39D','#2ECC71','#27AE60','#16A085','#17A589','#58D68D','#82E0AA','#1ABC9C'];
  const types: Array<'rocky'|'gas'|'ice'|'lava'> = ['ice','rocky','lava','gas'];

  // Planets for some stages
  if (i > 0 && i % 2 !== 0) {
    const pCount = 1 + Math.floor(i / 6);
    for (let p = 0; p < Math.min(pCount, 2); p++) {
      planets.push({
        id: `p${p+1}`,
        position: { nx: 0.3 + p * 0.4, ny: 0.4 + (i % 2) * 0.2 },
        mass: 15 + i,
        radius: 0.04 + (p === 0 && i > 10 ? 0.005 : 0),
        color: colors[i % colors.length],
        hasRing: i > 14 && p === 0,
        type: types[p % 4],
      });
    }
  }

  // Wormholes (main feature of world 4)
  const whCount = 1 + Math.floor(i / 4);
  for (let w = 0; w < Math.min(whCount, 3); w++) {
    const entryX = 0.2 + w * 0.2 + (i % 3) * 0.05;
    const entryY = 0.3 + w * 0.2;
    const exitX = entryX + 0.2 + (i % 2) * 0.1;
    const exitY = entryY - 0.1 + (i % 3) * 0.1;
    specials.push({
      type: 'wormhole',
      data: {
        id: `w${w+1}`,
        entryPosition: { nx: Math.min(entryX, 0.8), ny: Math.min(entryY, 0.8) },
        exitPosition: { nx: Math.min(exitX, 0.9), ny: Math.max(exitY, 0.1) },
        entryRadius: 0.025,
        exitRadius: 0.025,
        exitAngle: -Math.PI / 4 - w * Math.PI / 6,
        speedMultiplier: 1.0 + (i > 5 ? 0.2 : 0) + (i > 12 ? 0.3 : 0),
      },
    });
  }

  // Black holes for later stages
  if (i > 3) {
    const bhCount = 1 + Math.floor((i - 4) / 5);
    for (let b = 0; b < Math.min(bhCount, 2); b++) {
      specials.push({
        type: 'blackhole',
        data: {
          id: `bh${b+1}`,
          position: { nx: 0.5 + (b === 0 ? -0.2 : 0.2), ny: 0.5 + (i % 2 === 0 ? 0.15 : -0.15) },
          mass: 200 + i * 10,
          eventHorizonRadius: 0.035,
          visualRadius: 0.06,
        },
      });
    }
  }

  // Boosters
  if (i > 8 || i % 5 === 4) {
    specials.push({
      type: 'booster',
      data: { id: 'b1', position: { nx: 0.7, ny: 0.25 }, radius: 0.02, direction: -Math.PI / 6, power: 100 + i * 3 },
    });
  }

  // Asteroid belts for later stages
  if (i > 12) {
    specials.push({
      type: 'asteroidBelt',
      data: { id: 'a1', points: [{ nx: 0.6, ny: 0.1 }, { nx: 0.9, ny: 0.1 }], width: 0.04, density: 4, speed: 0 },
    });
  }

  return {
    id, worldId: 4, name, difficulty: diff as 1|2|3|4|5,
    rocketStart: { nx: i % 3 === 0 ? 0.15 : i % 3 === 1 ? 0.1 : 0.5, ny: i % 3 === 2 ? 0.95 : 0.85 },
    rocketAngle: i % 3 === 2 ? -Math.PI / 2 : -Math.PI / 4,
    goalStar: { position: { nx: i % 3 === 2 ? 0.5 : 0.85, ny: i % 3 === 2 ? 0.05 : 0.15 }, radius: goalR, pulseSpeed: 1.5 },
    planets, specialObjects: specials,
    initialFuel: Math.max(fuel, 0.5), starThresholds: { star3: Math.max(s3, 0.15), star2: Math.max(s2, 0.05), star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  };
});
