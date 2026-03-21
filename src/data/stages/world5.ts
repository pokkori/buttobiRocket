import { StageData } from '../../types';

const bg = '#1A0A00';

export const WORLD5_STAGES: StageData[] = [
  // === All gimmick combos, easier (81-84) ===
  {
    id: 81, worldId: 5, name: '最後の旅路', difficulty: 4,
    hint: '全ギミックの総復習！惑星→BH→ゴール',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.55 }, mass: 22, radius: 0.045, color: '#F39C12', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.6, ny: 0.35 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.75, ny: 0.2 }, radius: 0.02, direction: -Math.PI / 4, power: 90 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.2, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 82, worldId: 5, name: '銀河の渦', difficulty: 4,
    hint: 'ワープ→惑星スイングバイ→ブースターで一直線！',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.55, ny: 0.35 }, mass: 25, radius: 0.05, color: '#E74C3C', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.25, ny: 0.5 }, exitPosition: { nx: 0.4, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.7, ny: 0.45 }, radius: 0.02, direction: 0, power: 100 } },
    ],
    initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.2, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 83, worldId: 5, name: '超新星', difficulty: 4,
    hint: '惑星2つ+BH+ワープ！全ての引力を味方にせよ',
    rocketStart: { nx: 0.5, ny: 0.9 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 20, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
      { id: 'p2', position: { nx: 0.7, ny: 0.4 }, mass: 20, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.3 }, exitPosition: { nx: 0.55, ny: 0.15 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 84, worldId: 5, name: '暗黒星団', difficulty: 4,
    hint: '3つのBHに囲まれた迷路！ブースターで脱出ルートを作れ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.85 }, radius: 0.025, pulseSpeed: 1.5 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.3, ny: 0.4 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.6, ny: 0.5 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.45, ny: 0.7 }, mass: 180, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.2 }, radius: 0.02, direction: Math.PI / 4, power: 120 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.75, ny: 0.65 }, radius: 0.02, direction: Math.PI / 6, power: 100 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },

  // === High-precision puzzles (85-88): Narrow gaps ===
  {
    id: 85, worldId: 5, name: '針の穴', difficulty: 5,
    hint: '2つのBHの極小隙間を通り抜けろ！ミリ単位の精度',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.38 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.5, ny: 0.62 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 86, worldId: 5, name: '重力の壁', difficulty: 5,
    hint: '惑星3つが壁のように配置！隙間を正確に通せ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.2 }, mass: 25, radius: 0.05, color: '#F1C40F', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#D35400', hasRing: true, type: 'lava' },
      { id: 'p3', position: { nx: 0.5, ny: 0.8 }, mass: 25, radius: 0.05, color: '#D4AC0D', hasRing: false, type: 'gas' },
    ],
    specialObjects: [],
    initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 87, worldId: 5, name: 'レーザー精度', difficulty: 5,
    hint: '小惑星帯の隙間+BH+ワープ！全て精密に通せ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#A04000', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.35, ny: 0.0 }, { nx: 0.35, ny: 0.35 }], width: 0.04, density: 4, speed: 0 } },
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.65, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.4, ny: 0.25 }, exitPosition: { nx: 0.75, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.0 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 88, worldId: 5, name: 'スナイパー', difficulty: 5,
    hint: '極小ゴールを狙え！ブースターの方向とBH引力を計算',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.7 }, mass: 18, radius: 0.04, color: '#F4D03F', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.55, ny: 0.45 }, mass: 230, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.4, ny: 0.3 }, radius: 0.02, direction: -Math.PI / 4, power: 110 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },

  // === Multi-stage puzzles (89-92): Planet→BH→Wormhole→Booster→Goal ===
  {
    id: 89, worldId: 5, name: 'コスモストーム', difficulty: 5,
    hint: '惑星→BH→ワームホール→ゴール！4段階の計算が必要',
    rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.9, ny: 0.9 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.25, ny: 0.65 }, mass: 22, radius: 0.045, color: '#E59866', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.45, ny: 0.4 }, mass: 230, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.6, ny: 0.2 }, exitPosition: { nx: 0.75, ny: 0.75 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: Math.PI / 4, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.65, starThresholds: { star3: 0.3, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 90, worldId: 5, name: '重力の海', difficulty: 5,
    hint: '4つの惑星+2つのBH！重力場の海を泳ぎ切れ',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.7 }, mass: 15, radius: 0.035, color: '#E74C3C', hasRing: false, type: 'lava' },
      { id: 'p2', position: { nx: 0.8, ny: 0.65 }, mass: 15, radius: 0.035, color: '#3498DB', hasRing: false, type: 'ice' },
      { id: 'p3', position: { nx: 0.2, ny: 0.35 }, mass: 15, radius: 0.035, color: '#2ECC71', hasRing: false, type: 'rocky' },
      { id: 'p4', position: { nx: 0.8, ny: 0.3 }, mass: 15, radius: 0.035, color: '#F39C12', hasRing: false, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.4, ny: 0.5 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.6, ny: 0.5 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
    ],
    initialFuel: 0.6, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 91, worldId: 5, name: '次元の裂け目', difficulty: 5,
    hint: 'ワープ3連鎖+BH！正しい順序で全てのワープを通れ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#D35400', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.7, ny: 0.55 }, mass: 220, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.6 }, exitPosition: { nx: 0.4, ny: 0.3 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.55, ny: 0.3 }, exitPosition: { nx: 0.6, ny: 0.7 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 3, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w3', entryPosition: { nx: 0.65, ny: 0.8 }, exitPosition: { nx: 0.8, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.3 } },
    ],
    initialFuel: 0.6, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 92, worldId: 5, name: '暗黒のダンス', difficulty: 5,
    hint: 'ブースター4個の連鎖！各方向転換を正確に計算せよ',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 30, radius: 0.055, color: '#F1C40F', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.25, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 2, power: 90 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.35, ny: 0.2 }, radius: 0.02, direction: 0, power: 90 } },
      { type: 'booster', data: { id: 'b3', position: { nx: 0.65, ny: 0.25 }, radius: 0.02, direction: Math.PI / 2, power: 90 } },
      { type: 'booster', data: { id: 'b4', position: { nx: 0.75, ny: 0.45 }, radius: 0.02, direction: 0, power: 100 } },
    ],
    initialFuel: 0.6, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },

  // === Fuel efficiency puzzles (93-96): Tight fuel limits ===
  {
    id: 93, worldId: 5, name: '燃料危機', difficulty: 5,
    hint: '燃料が少ない！最短ルートを見つけろ',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 30, radius: 0.05, color: '#E74C3C', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.3, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
    ],
    initialFuel: 0.5, starThresholds: { star3: 0.25, star2: 0.1, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 94, worldId: 5, name: '省エネ航路', difficulty: 5,
    hint: '全ての引力を利用して燃料を節約！ブースター必須',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.35, ny: 0.35 }, mass: 22, radius: 0.045, color: '#D4AC0D', hasRing: false, type: 'gas' },
      { id: 'p2', position: { nx: 0.65, ny: 0.65 }, mass: 22, radius: 0.045, color: '#A04000', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.5 }, radius: 0.02, direction: 0, power: 80 } },
    ],
    initialFuel: 0.45, starThresholds: { star3: 0.2, star2: 0.08, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 95, worldId: 5, name: '最小推力', difficulty: 5,
    hint: '最小限の燃料でワープ+BH利用のコンビネーション！',
    rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
    goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.55 }, mass: 230, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.65, ny: 0.6 }, exitPosition: { nx: 0.45, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 1.3 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.75 }, radius: 0.02, direction: -Math.PI / 4, power: 100 } },
    ],
    initialFuel: 0.45, starThresholds: { star3: 0.2, star2: 0.08, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 96, worldId: 5, name: 'エコノミー', difficulty: 5,
    hint: '燃料が極限！重力とブースターだけで距離を稼げ',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 28, radius: 0.05, color: '#F39C12', hasRing: true, type: 'gas' },
      { id: 'p2', position: { nx: 0.7, ny: 0.35 }, mass: 20, radius: 0.04, color: '#E59866', hasRing: false, type: 'rocky' },
    ],
    specialObjects: [
      { type: 'booster', data: { id: 'b1', position: { nx: 0.45, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 4, power: 120 } },
    ],
    initialFuel: 0.4, starThresholds: { star3: 0.18, star2: 0.06, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },

  // === Final challenges (97-100): Complex gravity navigation ===
  {
    id: 97, worldId: 5, name: '銀河核', difficulty: 5,
    hint: '超巨大BHの周りを全ギミックで攻略！最終テストの序章',
    rocketStart: { nx: 0.15, ny: 0.85 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.85, ny: 0.15 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.4 }, mass: 20, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
      { id: 'p2', position: { nx: 0.8, ny: 0.55 }, mass: 20, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 350, eventHorizonRadius: 0.05, visualRadius: 0.08 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.35, ny: 0.2 }, exitPosition: { nx: 0.7, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.2 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.6, ny: 0.15 }, radius: 0.02, direction: -Math.PI / 4, power: 110 } },
    ],
    initialFuel: 0.55, starThresholds: { star3: 0.2, star2: 0.08, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 98, worldId: 5, name: '時空の嵐', difficulty: 5,
    hint: '移動する小惑星帯+BH3つ+ワープ！動的パズルの極致',
    rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.5, ny: 0.3 }, mass: 20, radius: 0.04, color: '#D35400', hasRing: false, type: 'lava' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.35, ny: 0.5 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.55, ny: 0.65 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.7, ny: 0.4 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.2, ny: 0.7 }, { nx: 0.8, ny: 0.7 }], width: 0.04, density: 5, speed: 1.0 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.4 }, exitPosition: { nx: 0.6, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.2 } },
    ],
    initialFuel: 0.55, starThresholds: { star3: 0.2, star2: 0.08, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 99, worldId: 5, name: '最終防衛線', difficulty: 5,
    hint: '全ギミック+燃料制限！1度のミスも許されない',
    rocketStart: { nx: 0.05, ny: 0.95 }, rocketAngle: -Math.PI / 4,
    goalStar: { position: { nx: 0.95, ny: 0.05 }, radius: 0.015, pulseSpeed: 2.0 },
    planets: [
      { id: 'p1', position: { nx: 0.25, ny: 0.65 }, mass: 22, radius: 0.045, color: '#F39C12', hasRing: true, type: 'gas' },
      { id: 'p2', position: { nx: 0.75, ny: 0.35 }, mass: 18, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'ice' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 280, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.35, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.45 }, exitPosition: { nx: 0.6, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.7, ny: 0.15 }, radius: 0.02, direction: -Math.PI / 4, power: 120 } },
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.6, ny: 0.55 }, { nx: 0.9, ny: 0.55 }], width: 0.04, density: 4, speed: 0.5 } },
    ],
    initialFuel: 0.5, starThresholds: { star3: 0.18, star2: 0.06, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
  {
    id: 100, worldId: 5, name: 'ビッグバン', difficulty: 5,
    hint: '宇宙の全てを超えろ！100ステージの集大成',
    rocketStart: { nx: 0.05, ny: 0.5 }, rocketAngle: 0,
    goalStar: { position: { nx: 0.95, ny: 0.5 }, radius: 0.012, pulseSpeed: 2.5 },
    planets: [
      { id: 'p1', position: { nx: 0.2, ny: 0.3 }, mass: 22, radius: 0.045, color: '#E74C3C', hasRing: false, type: 'lava' },
      { id: 'p2', position: { nx: 0.3, ny: 0.7 }, mass: 20, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
      { id: 'p3', position: { nx: 0.75, ny: 0.25 }, mass: 18, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'rocky' },
      { id: 'p4', position: { nx: 0.8, ny: 0.7 }, mass: 25, radius: 0.05, color: '#F39C12', hasRing: true, type: 'gas' },
    ],
    specialObjects: [
      { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.45, ny: 0.45 }, mass: 300, eventHorizonRadius: 0.045, visualRadius: 0.075 } },
      { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.6, ny: 0.6 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.065 } },
      { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.15, ny: 0.45 }, exitPosition: { nx: 0.35, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: 0, speedMultiplier: 1.0 } },
      { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.55, ny: 0.2 }, exitPosition: { nx: 0.7, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.3 } },
      { type: 'booster', data: { id: 'b1', position: { nx: 0.4, ny: 0.15 }, radius: 0.02, direction: 0, power: 100 } },
      { type: 'booster', data: { id: 'b2', position: { nx: 0.85, ny: 0.45 }, radius: 0.02, direction: 0, power: 110 } },
      { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.5, ny: 0.75 }, { nx: 0.9, ny: 0.75 }], width: 0.04, density: 5, speed: 0.8 } },
    ],
    initialFuel: 0.45, starThresholds: { star3: 0.15, star2: 0.05, star1: 0 },
    maxTrailLength: 400, bgColor: bg,
  },
];
