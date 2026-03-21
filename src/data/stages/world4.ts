import { StageData } from '../../types';

const bg = '#0A2E2E';

export const WORLD4_STAGES: StageData[] = [
  // === Booster basics (61-64): Single booster ===
  {
    id: 61, worldId: 4, name: '初めてのブースト', difficulty: 3,
    hint: 'ブースターに触れると加速するよ！方向に注意',
    rocketStart: { nx: 0.15, ny: 0.8 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.2 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.5 }, radius: 0.025, direction: -Math.PI / 4, power: 100 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 62, worldId: 4, name: 'ブースト方向転換', difficulty: 3,
    hint: 'ブースターで90度方向転換！ゴールは横にある',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.5 }, radius: 0.025, direction: 0, power: 120 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 63, worldId: 4, name: 'ブースト&惑星', difficulty: 3,
    hint: '惑星で曲がってからブースターで加速！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [
      { id: 'p1', position: { nx: 0.4, ny: 0.4 }, mass: 20, radius: 0.045, color: '#1ABC9C', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.65, ny: 0.25 }, radius: 0.025, direction: -Math.PI / 6, power: 90 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 64, worldId: 4, name: 'ブースト逆転', difficulty: 3,
    hint: 'ブースターで反対方向へ飛ばされる！進入角度がカギ',
    rocketStart: { nx: 0.15, ny: 0.15 }, rocketAngle: Math.PI / 4,
    goalStar: { position: { nx: 0.15, ny: 0.85 }, radius: 0.03, pulseSpeed: 1.2 },
    planets: [],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.6, ny: 0.55 }, radius: 0.025, direction: Math.PI * 3 / 4, power: 110 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Booster chains (65-68) ===
  {
    id: 65, worldId: 4, name: 'ダブルブースト', difficulty: 3,
    hint: '2つのブースターを連続で使え！加速に次ぐ加速',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.3, ny: 0.6 }, radius: 0.025, direction: -Math.PI / 4, power: 80 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.65, ny: 0.35 }, radius: 0.025, direction: -Math.PI / 4, power: 80 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 66, worldId: 4, name: 'ブーストジグザグ', difficulty: 4,
    hint: 'ブースターでジグザグに方向転換しながら進め！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: -Math.PI / 6,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 15, radius: 0.04, color: '#48C9B0', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.3, ny: 0.3 }, radius: 0.02, direction: Math.PI / 4, power: 90 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.5, ny: 0.7 }, radius: 0.02, direction: -Math.PI / 4, power: 90 } },
      { type: 'booster', data: { id: 'b3', position: { nx: 0.7, ny: 0.35 }, radius: 0.02, direction: 0, power: 80 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 67, worldId: 4, name: 'ブーストスパイラル', difficulty: 4,
    hint: 'ブースターで螺旋状に加速！惑星の引力で円軌道',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 30, radius: 0.055, color: '#45B39D', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.3, ny: 0.65 }, radius: 0.02, direction: -Math.PI / 2, power: 100 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.7, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 2, power: 100 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 68, worldId: 4, name: 'トリプルブースト', difficulty: 4,
    hint: '3連ブースターで超高速！最後のカーブに注意',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.8, ny: 0.55 }, mass: 22, radius: 0.045, color: '#2ECC71', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.25, ny: 0.45 }, radius: 0.02, direction: 0, power: 80 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.45, ny: 0.4 }, radius: 0.02, direction: 0, power: 80 } },
      { type: 'booster', data: { id: 'b3', position: { nx: 0.65, ny: 0.45 }, radius: 0.02, direction: Math.PI / 4, power: 90 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Booster + BH/Wormhole (69-72) ===
  {
    id: 69, worldId: 4, name: 'ブースト脱出', difficulty: 4,
    hint: 'BHの引力圏からブースターで脱出せよ！',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.6, ny: 0.3 }, radius: 0.025, direction: -Math.PI / 4, power: 150 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 70, worldId: 4, name: 'ワープ→ブースト', difficulty: 4,
    hint: 'ワームホールで移動してからブースターで加速！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.35, ny: 0.5 }, exitPosition: { nx: 0.6, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI / 4, speedMultiplier: 1.0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.75, ny: 0.7 }, radius: 0.025, direction: Math.PI / 6, power: 100 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 71, worldId: 4, name: 'ブースト→ワープ', difficulty: 4,
    hint: 'ブースターで加速してワームホールに突入！出口で着地',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 3,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.45 }, mass: 18, radius: 0.04, color: '#27AE60', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.2, ny: 0.65 }, radius: 0.02, direction: -Math.PI / 3, power: 110 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.45, ny: 0.25 }, exitPosition: { nx: 0.75, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 72, worldId: 4, name: 'トリプルコンボ', difficulty: 4,
    hint: 'BH引力→ブースター→ワームホール！3段階のコンボ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.3, ny: 0.35 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.45, ny: 0.2 }, radius: 0.02, direction: Math.PI / 4, power: 100 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.55, ny: 0.4 }, exitPosition: { nx: 0.8, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Asteroid belt + booster breakthrough (73-76) ===
  {
    id: 73, worldId: 4, name: '小惑星帯突破', difficulty: 4,
    hint: 'ブースターの勢いで小惑星帯を突き抜けろ！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.3, ny: 0.5 }, radius: 0.025, direction: 0, power: 130 } },
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.55, ny: 0.0 }, { nx: 0.55, ny: 1.0 }], width: 0.05, density: 4, speed: 0 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 74, worldId: 4, name: 'ブースト回廊', difficulty: 4,
    hint: '小惑星帯の隙間を縫ってブースターを拾え！',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 20, radius: 0.04, color: '#16A085', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.3, ny: 0.0 }, { nx: 0.3, ny: 0.4 }], width: 0.04, density: 3, speed: 0 } },
      { type: 'asteroidBelt', data: { id: 'a2', points: [{ nx: 0.7, ny: 0.6 }, { nx: 0.7, ny: 1.0 }], width: 0.04, density: 3, speed: 0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.3 }, radius: 0.02, direction: -Math.PI / 4, power: 100 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 75, worldId: 4, name: '回転する壁', difficulty: 5,
    hint: '移動する小惑星帯をブースターで突破せよ！タイミングが命',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.1 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.2, ny: 0.5 }, { nx: 0.8, ny: 0.5 }], width: 0.04, density: 5, speed: 0.8 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.7 }, radius: 0.025, direction: -Math.PI / 2, power: 140 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 76, worldId: 4, name: 'ダブル小惑星帯', difficulty: 5,
    hint: '2つの小惑星帯を2つのブースターで連続突破！',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 18, radius: 0.04, color: '#17A589', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.35, ny: 0.0 }, { nx: 0.35, ny: 0.5 }], width: 0.04, density: 4, speed: 0 } },
      { type: 'asteroidBelt', data: { id: 'a2', points: [{ nx: 0.65, ny: 0.5 }, { nx: 0.65, ny: 1.0 }], width: 0.04, density: 4, speed: 0.5 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.2, ny: 0.65 }, radius: 0.02, direction: -Math.PI / 4, power: 110 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.5, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 4, power: 110 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === All gimmick mix hard stages (77-80) ===
  {
    id: 77, worldId: 4, name: '全部入り', difficulty: 5,
    hint: 'BH+ワームホール+ブースター+惑星！全て活用せよ',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.25, ny: 0.45 }, mass: 22, radius: 0.045, color: '#58D68D', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.55, ny: 0.55 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.4, ny: 0.25 }, exitPosition: { nx: 0.75, ny: 0.3 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.2 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.8, ny: 0.2 }, radius: 0.02, direction: -Math.PI / 6, power: 100 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 78, worldId: 4, name: '重力渦巻き', difficulty: 5,
    hint: '中央の大惑星の周りをブースターとワープで制御せよ！',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 40, radius: 0.06, color: '#82E0AA', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.3, ny: 0.7 }, radius: 0.02, direction: -Math.PI / 2, power: 110 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.7, ny: 0.35 }, exitPosition: { nx: 0.45, ny: 0.15 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.0 } },
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.25, ny: 0.35 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 79, worldId: 4, name: '嵐の前の静けさ', difficulty: 5,
    hint: '小惑星帯+BH+ブースター！安全ルートは非常に狭い',
    rocketStart: { nx: 0.05, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.95, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.7, ny: 0.35 }, mass: 20, radius: 0.04, color: '#1ABC9C', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.4, ny: 0.5 }, mass: 230, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.6, ny: 0.0 }, { nx: 0.6, ny: 0.35 }], width: 0.04, density: 4, speed: 0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.55, ny: 0.55 }, radius: 0.02, direction: 0, power: 130 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 80, worldId: 4, name: 'ブースターマスター', difficulty: 5,
    hint: '全ギミック連携の究極パズル！ブースター3個を全て使え',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 20, radius: 0.04, color: '#48C9B0', hasRing: false, type: 'ice' },
      { id: 'p2', position: { nx: 0.75, ny: 0.3 }, mass: 18, radius: 0.04, color: '#58D68D', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.55, ny: 0.5 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.2, ny: 0.75 }, radius: 0.02, direction: -Math.PI / 3, power: 100 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.45, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 4, power: 110 } },
      { type: 'booster', data: { id: 'b3', position: { nx: 0.7, ny: 0.2 }, radius: 0.02, direction: -Math.PI / 6, power: 100 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.35, ny: 0.4 }, exitPosition: { nx: 0.6, ny: 0.15 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.6, starThresholds: { star3: 0.25, star2: 0.08, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
];
