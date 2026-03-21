import { StageData } from '../../types';

const bg = '#1A0A2E';

export const WORLD2_STAGES: StageData[] = [
  // === BH Basics (21-24): Single black hole, learn avoidance/usage ===
  {
    id: 21, worldId: 2, name: '闇の出会い', difficulty: 2,
    hint: 'ブラックホールを避けて通ろう！',
    rocketStart: { nx: 0.15, ny: 0.8 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.2 }, radius: 0.035, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 180, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.95, starThresholds: { star3: 0.65, star2: 0.35, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 22, worldId: 2, name: '闇をかすめろ', difficulty: 2,
    hint: 'ブラックホールの横を通ると軌道が曲がるよ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.5, ny: 0.1 }, radius: 0.035, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.55, ny: 0.4 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.95, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 23, worldId: 2, name: '闇の引力', difficulty: 2,
    hint: 'BHの引力で軌道を曲げてゴールへ！直進では届かない',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 6,
    goalStar: { position: { nx: 0.15, ny: 0.15 }, radius: 0.035, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.6, star2: 0.3, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 24, worldId: 2, name: '吸い込み回避', difficulty: 2,
    hint: 'BHの上を通って大きく回り込め！近づきすぎるな',
    rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 3,
    goalStar: { position: { nx: 0.9, ny: 0.9 }, radius: 0.03, pulseSpeed: 1.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.55 }, mass: 230, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
    ],
    initialFuel: 0.9, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === BH + Planet combos (25-28): Gravity assist then BH dodge ===
  {
    id: 25, worldId: 2, name: '惑星とBHの狭間', difficulty: 3,
    hint: '惑星でスイングバイしてBHを避けろ！',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.03, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 20, radius: 0.045, color: '#3498DB', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.65, ny: 0.35 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.25, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 26, worldId: 2, name: 'ダークカーブ', difficulty: 3,
    hint: '惑星の引力で加速してBHの引力でカーブ！',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.03, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.35, ny: 0.55 }, mass: 25, radius: 0.05, color: '#E8A87C', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.7, ny: 0.45 }, mass: 210, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 27, worldId: 2, name: '重力アシスト', difficulty: 3,
    hint: '大惑星でスピードアップしてBHを突破せよ！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.03, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.35 }, mass: 30, radius: 0.055, color: '#F39C12', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.65, ny: 0.5 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 28, worldId: 2, name: '闇と氷の回廊', difficulty: 3,
    hint: '氷惑星2つとBHで構成されたコースを読み切れ！',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [
      { id: 'p1', position: { nx: 0.25, ny: 0.55 }, mass: 15, radius: 0.04, color: '#5DADE2', hasRing: false, type: 'ice' },
      { id: 'p2', position: { nx: 0.7, ny: 0.3 }, mass: 15, radius: 0.04, color: '#85C1E9', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.45 }, mass: 210, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Multiple BH layouts (29-32): Finding safe routes ===
  {
    id: 29, worldId: 2, name: 'ツインブラックホール', difficulty: 3,
    hint: '2つのBHの間を通り抜けろ！真ん中が安全地帯',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.2 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.5, ny: 0.7 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.5, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 30, worldId: 2, name: '闇のトライアングル', difficulty: 3,
    hint: '3つのBHが三角形に配置！隙間のルートを見つけろ',
    rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.35 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.65, ny: 0.35 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.5, ny: 0.65 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
    ],
    initialFuel: 0.85, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 31, worldId: 2, name: '闇の壁', difficulty: 3,
    hint: 'BHが一列に並んでいる！上を大きく迂回せよ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: -Math.PI / 3,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.15 }, mass: 25, radius: 0.045, color: '#9B59B6', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.4, ny: 0.5 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.6, ny: 0.5 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 32, worldId: 2, name: 'ダークスラローム', difficulty: 3,
    hint: 'BHをジグザグに避けながら進め！惑星で微調整',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.3 },
    planets: [
      { id: 'p1', position: { nx: 0.15, ny: 0.5 }, mass: 12, radius: 0.035, color: '#BDC3C7', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.6 }, mass: 170, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.55, ny: 0.35 }, mass: 170, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.75, ny: 0.55 }, mass: 170, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === BH as ally (33-36): Use BH gravity to curve towards goal ===
  {
    id: 33, worldId: 2, name: '闇のスイングバイ', difficulty: 4,
    hint: 'BHの引力を利用してカーブ！吸い込まれずに横を通れ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.15, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.55, ny: 0.5 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 34, worldId: 2, name: 'ダークブーメラン', difficulty: 4,
    hint: '右に飛ばしてBHの引力で左に戻す！大胆に飛べ',
    rocketStart: { nx: 0.15, ny: 0.15 }, rocketAngle: Math.PI / 4,
    goalStar: { position: { nx: 0.15, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.75, ny: 0.75 }, mass: 18, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.65, ny: 0.45 }, mass: 260, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
    ],
    initialFuel: 0.8, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 35, worldId: 2, name: 'ダブルダーク利用', difficulty: 4,
    hint: '2つのBHを連続で利用してS字カーブ！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: -Math.PI / 6,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.3 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.65, ny: 0.7 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 36, worldId: 2, name: '闇のUターン', difficulty: 4,
    hint: 'BHで180度方向転換！惑星で最後に微調整せよ',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.7 }, mass: 15, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.25 }, mass: 280, eventHorizonRadius: 0.04, visualRadius: 0.07 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },

  // === Boss stages (37-40): Large BH central puzzles ===
  {
    id: 37, worldId: 2, name: '事象の地平線', difficulty: 4,
    hint: '巨大BHの周りを惑星で制御しながら回り込め！',
    rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.25, ny: 0.4 }, mass: 20, radius: 0.04, color: '#D35400', hasRing: false, type: 'lava' },
      { id: 'p2', position: { nx: 0.75, ny: 0.4 }, mass: 20, radius: 0.04, color: '#5DADE2', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.4 }, mass: 350, eventHorizonRadius: 0.05, visualRadius: 0.08 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 38, worldId: 2, name: '闇の四天王', difficulty: 4,
    hint: '4つのBHに囲まれた中央を通過せよ！角度が全て',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.3, ny: 0.35 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.7, ny: 0.35 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.3, ny: 0.65 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
      { type: 'blackhole', data: { id: 'bh4', position: { nx: 0.7, ny: 0.65 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.05 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.35, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 39, worldId: 2, name: '超重力迷路', difficulty: 5,
    hint: 'BHと惑星が作る重力場を読み切れ！安全ルートは1つだけ',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.3 }, mass: 18, radius: 0.04, color: '#9B59B6', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.8, ny: 0.6 }, mass: 18, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.45, ny: 0.55 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.65, ny: 0.3 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
  {
    id: 40, worldId: 2, name: 'ブラックホールマスター', difficulty: 5,
    hint: '全ての闇を味方に！巨大BH+惑星の連続カーブで突破せよ',
    rocketStart: { nx: 0.05, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.95, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.3 }, mass: 22, radius: 0.045, color: '#F39C12', hasRing: true, type: 'gas' },
      { id: 'p2', position: { nx: 0.8, ny: 0.7 }, mass: 22, radius: 0.045, color: '#3498DB', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.4, ny: 0.6 }, mass: 300, eventHorizonRadius: 0.045, visualRadius: 0.075 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.6, ny: 0.25 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.75, ny: 0.5 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 300, bgColor: bg,
  },
];
