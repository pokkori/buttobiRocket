import { StageData } from '../../types';

const bg = '#000000';

export const WORLD3_STAGES: StageData[] = [
  // === Wormhole basics (41-44): Single wormhole pair ===
  {
    id: 41, worldId: 3, name: '初めてのワープ', difficulty: 3,
    hint: 'ワームホールに入ると別の場所に出るよ！',
    rocketStart: { nx: 0.15, ny: 0.8 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.2 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.45, ny: 0.55 }, exitPosition: { nx: 0.7, ny: 0.3 }, entryRadius: 0.03, exitRadius: 0.03, exitAngle: -Math.PI / 4, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 42, worldId: 3, name: 'ワープ&カーブ', difficulty: 3,
    hint: 'ワープ出口の方向に注意！出た後の軌道を予測しよう',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.1, ny: 0.1 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.5, ny: 0.5 }, exitPosition: { nx: 0.35, ny: 0.25 }, entryRadius: 0.03, exitRadius: 0.03, exitAngle: -Math.PI * 3 / 4, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 43, worldId: 3, name: '逆方向ワープ', difficulty: 3,
    hint: 'ワームホールで反対方向へ！出口角度がポイント',
    rocketStart: { nx: 0.85, ny: 0.85 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.15, ny: 0.85 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.85, ny: 0.4 }, exitPosition: { nx: 0.3, ny: 0.6 }, entryRadius: 0.03, exitRadius: 0.03, exitAngle: Math.PI / 2, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 44, worldId: 3, name: '加速ワープ', difficulty: 3,
    hint: 'このワームホールは加速する！勢いを活かせ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 6,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.4, ny: 0.65 }, exitPosition: { nx: 0.6, ny: 0.35 }, entryRadius: 0.03, exitRadius: 0.03, exitAngle: -Math.PI / 4, speedMultiplier: 1.5 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Wormhole + planet (45-48): Exit direction calculation ===
  {
    id: 45, worldId: 3, name: 'ワープ&惑星', difficulty: 3,
    hint: 'ワープ後に惑星の引力で最終調整！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.75, ny: 0.35 }, mass: 20, radius: 0.04, color: '#5D6D7E', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.35, ny: 0.5 }, exitPosition: { nx: 0.6, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 3, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 46, worldId: 3, name: '重力→ワープ', difficulty: 3,
    hint: '惑星で方向を変えてからワームホールに入れ！',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.35, ny: 0.55 }, mass: 25, radius: 0.05, color: '#F4D03F', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.4 }, exitPosition: { nx: 0.7, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 47, worldId: 3, name: 'ワープ迂回', difficulty: 4,
    hint: '直線では無理！ワームホールで壁の向こうへ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.3 }, mass: 30, radius: 0.06, color: '#AEB6BF', hasRing: false, type: 'rocky' },
      { id: 'p2', position: { nx: 0.5, ny: 0.7 }, mass: 30, radius: 0.06, color: '#7F8C8D', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.5 }, exitPosition: { nx: 0.75, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 48, worldId: 3, name: 'スイング→ワープ→着地', difficulty: 4,
    hint: '惑星スイングバイ→ワームホール→ゴール！3段コンボ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.5 }, mass: 25, radius: 0.05, color: '#E8DAEF', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.55, ny: 0.25 }, exitPosition: { nx: 0.7, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI / 6, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Multi-wormhole chains (49-52): A→B→C→Goal ===
  {
    id: 49, worldId: 3, name: 'ダブルワープ', difficulty: 4,
    hint: '2つのワームホールを連続で通れ！A出口→B入口を狙え',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.6 }, exitPosition: { nx: 0.5, ny: 0.4 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.65, ny: 0.4 }, exitPosition: { nx: 0.8, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 50, worldId: 3, name: 'ワープ三連鎖', difficulty: 4,
    hint: '3つのワームホールを順番に通ってゴールへ！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.25, ny: 0.5 }, exitPosition: { nx: 0.35, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.5, ny: 0.25 }, exitPosition: { nx: 0.55, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w3', entryPosition: { nx: 0.7, ny: 0.7 }, exitPosition: { nx: 0.8, ny: 0.45 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 51, worldId: 3, name: 'ワープループ', difficulty: 4,
    hint: '同じワームホールを2回使う！軌道を工夫しろ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 3,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#D5F5E3', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.4 }, exitPosition: { nx: 0.7, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.7, ny: 0.35 }, exitPosition: { nx: 0.8, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 52, worldId: 3, name: 'ワープクロス', difficulty: 4,
    hint: '交差するワームホール！正しい入口を選べ',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 20, radius: 0.04, color: '#F0B27A', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.7 }, exitPosition: { nx: 0.7, ny: 0.3 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.7, ny: 0.7 }, exitPosition: { nx: 0.3, ny: 0.3 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Wormhole + blackhole mix (53-56) ===
  {
    id: 53, worldId: 3, name: 'ワープ&闇', difficulty: 4,
    hint: 'BHを避けてワームホールに飛び込め！',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.45, ny: 0.5 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.35 }, exitPosition: { nx: 0.7, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 54, worldId: 3, name: 'ダークワープ', difficulty: 4,
    hint: 'BHの引力でワームホール入口に曲がれ！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.85 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.7, ny: 0.5 }, mass: 20, radius: 0.04, color: '#BFC9CA', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.35 }, mass: 230, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.5, ny: 0.2 }, exitPosition: { nx: 0.8, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI / 4, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 55, worldId: 3, name: '闇とワープの迷宮', difficulty: 5,
    hint: 'BH2つ+ワームホール2つ！正しいルートは1つだけ',
    rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.55 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.7, ny: 0.4 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.6 }, exitPosition: { nx: 0.55, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.55, ny: 0.15 }, exitPosition: { nx: 0.85, ny: 0.15 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 56, worldId: 3, name: 'カオスフィールド', difficulty: 5,
    hint: 'BHの引力場の中にワームホール！精密射撃で突破',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.5 }, mass: 18, radius: 0.04, color: '#D5DBDB', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 280, eventHorizonRadius: 0.04, visualRadius: 0.07 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.35, ny: 0.7 }, exitPosition: { nx: 0.65, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.3 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Complex space puzzles (57-60) ===
  {
    id: 57, worldId: 3, name: '時空の十字路', difficulty: 5,
    hint: '4方向にワームホール！正解の入口を見極めろ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 30, radius: 0.05, color: '#5DADE2', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.3 }, exitPosition: { nx: 0.7, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI / 4, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.7, ny: 0.3 }, exitPosition: { nx: 0.3, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI * 3 / 4, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 58, worldId: 3, name: 'ワームホール回廊', difficulty: 5,
    hint: 'ワームホール→惑星→BH→ゴール！全て利用せよ',
    rocketStart: { nx: 0.05, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.95, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.3 }, mass: 22, radius: 0.04, color: '#F39C12', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.8, ny: 0.65 }, mass: 18, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.65, ny: 0.5 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.5 }, exitPosition: { nx: 0.4, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 59, worldId: 3, name: '特異点', difficulty: 5,
    hint: '中央の超巨大BHの周りをワームホールで跳び回れ！',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 350, eventHorizonRadius: 0.05, visualRadius: 0.08 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.25, ny: 0.6 }, exitPosition: { nx: 0.6, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.3 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.75, ny: 0.3 }, exitPosition: { nx: 0.85, ny: 0.18 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 60, worldId: 3, name: 'ワームホールマスター', difficulty: 5,
    hint: '全ギミック総動員！3ワープ+2BH+惑星の究極空間パズル',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.3 }, mass: 20, radius: 0.04, color: '#9B59B6', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.75, ny: 0.65 }, mass: 20, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 280, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.8, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.7 }, exitPosition: { nx: 0.4, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.55, ny: 0.2 }, exitPosition: { nx: 0.65, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 3, speedMultiplier: 1.2 } },
      { type: 'wormhole', data: { id: 'w3', entryPosition: { nx: 0.7, ny: 0.55 }, exitPosition: { nx: 0.9, ny: 0.1 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.3 } },
    ],
    initialFuel: 0.6, starThresholds: { star3: 0.2, star2: 0.08, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
];
