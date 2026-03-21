import { DailyChallenge } from '../types';

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    dayOfWeek: 0, name: '重力迷宮', description: '惑星4つの間を縫うようにゴールへ',
    bonusCoins: 50,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 4,
      goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [
        { id: 'p1', position: { nx: 0.3, ny: 0.3 }, mass: 20, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
        { id: 'p2', position: { nx: 0.7, ny: 0.3 }, mass: 20, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
        { id: 'p3', position: { nx: 0.3, ny: 0.7 }, mass: 20, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'rocky' },
        { id: 'p4', position: { nx: 0.7, ny: 0.7 }, mass: 20, radius: 0.04, color: '#F39C12', hasRing: false, type: 'gas' },
      ],
      specialObjects: [],
      initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.25, star1: 0 },
      maxTrailLength: 300, bgColor: '#0A0E27',
    },
  },
  {
    dayOfWeek: 1, name: 'ブラックホールスラローム', description: 'ブラックホール3つを避けてゴール',
    bonusCoins: 60,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
      goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 15, radius: 0.04, color: '#AEB6BF', hasRing: false, type: 'rocky' }],
      specialObjects: [
        { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.3, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
        { type: 'blackhole', data: { id: 'bh2', position: { nx: 0.5, ny: 0.7 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
        { type: 'blackhole', data: { id: 'bh3', position: { nx: 0.7, ny: 0.3 }, mass: 200, eventHorizonRadius: 0.03, visualRadius: 0.055 } },
      ],
      initialFuel: 0.75, starThresholds: { star3: 0.4, star2: 0.2, star1: 0 },
      maxTrailLength: 300, bgColor: '#000000',
    },
  },
  {
    dayOfWeek: 2, name: 'ワームホールレース', description: 'ワームホール3つを使って最速クリア',
    bonusCoins: 50,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 4,
      goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [],
      specialObjects: [
        { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.3, ny: 0.7 }, exitPosition: { nx: 0.5, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.2 } },
        { type: 'wormhole', data: { id: 'w2', entryPosition: { nx: 0.6, ny: 0.4 }, exitPosition: { nx: 0.75, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.3 } },
      ],
      initialFuel: 0.85, starThresholds: { star3: 0.55, star2: 0.3, star1: 0 },
      maxTrailLength: 300, bgColor: '#0A2E2E',
    },
  },
  {
    dayOfWeek: 3, name: 'ブースターチェイン', description: 'ブースター3個を連続取得してクリア',
    bonusCoins: 50,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.85 }, rocketAngle: -Math.PI / 6,
      goalStar: { position: { nx: 0.9, ny: 0.15 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#9B59B6', hasRing: true, type: 'gas' }],
      specialObjects: [
        { type: 'booster', data: { id: 'b1', position: { nx: 0.25, ny: 0.6 }, radius: 0.02, direction: -Math.PI / 3, power: 80 } },
        { type: 'booster', data: { id: 'b2', position: { nx: 0.5, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 4, power: 80 } },
        { type: 'booster', data: { id: 'b3', position: { nx: 0.75, ny: 0.2 }, radius: 0.02, direction: -Math.PI / 6, power: 80 } },
      ],
      initialFuel: 0.8, starThresholds: { star3: 0.5, star2: 0.25, star1: 0 },
      maxTrailLength: 300, bgColor: '#1A0A2E',
    },
  },
  {
    dayOfWeek: 4, name: '小惑星帯突破', description: '3本の小惑星帯を突破せよ',
    bonusCoins: 55,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.5 }, rocketAngle: 0,
      goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [
        { id: 'p1', position: { nx: 0.4, ny: 0.3 }, mass: 15, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
        { id: 'p2', position: { nx: 0.6, ny: 0.7 }, mass: 15, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
      ],
      specialObjects: [
        { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.25, ny: 0.0 }, { nx: 0.25, ny: 0.35 }], width: 0.04, density: 4, speed: 0 } },
        { type: 'asteroidBelt', data: { id: 'a2', points: [{ nx: 0.5, ny: 0.6 }, { nx: 0.5, ny: 1.0 }], width: 0.04, density: 4, speed: 0 } },
        { type: 'asteroidBelt', data: { id: 'a3', points: [{ nx: 0.75, ny: 0.0 }, { nx: 0.75, ny: 0.4 }], width: 0.04, density: 4, speed: 0 } },
      ],
      initialFuel: 0.8, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
      maxTrailLength: 300, bgColor: '#0A0E27',
    },
  },
  {
    dayOfWeek: 5, name: '巨大惑星の引力', description: '超巨大惑星のスイングバイをマスターせよ',
    bonusCoins: 55,
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.9 }, rocketAngle: -Math.PI / 6,
      goalStar: { position: { nx: 0.1, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.5 },
      planets: [{ id: 'p1', position: { nx: 0.5, ny: 0.5 }, mass: 60, radius: 0.08, color: '#F1C40F', hasRing: true, type: 'gas' }],
      specialObjects: [],
      initialFuel: 0.75, starThresholds: { star3: 0.45, star2: 0.2, star1: 0 },
      maxTrailLength: 300, bgColor: '#0A0E27',
    },
  },
  {
    dayOfWeek: 6, name: '全部のせ', description: '全ての特殊オブジェクトが登場する究極ステージ',
    bonusCoins: 80,
    stageConfig: {
      rocketStart: { nx: 0.5, ny: 0.95 }, rocketAngle: -Math.PI / 2,
      goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 2.0 },
      planets: [
        { id: 'p1', position: { nx: 0.3, ny: 0.6 }, mass: 20, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
        { id: 'p2', position: { nx: 0.7, ny: 0.4 }, mass: 20, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
      ],
      specialObjects: [
        { type: 'blackhole', data: { id: 'bh1', position: { nx: 0.5, ny: 0.5 }, mass: 250, eventHorizonRadius: 0.035, visualRadius: 0.06 } },
        { type: 'wormhole', data: { id: 'w1', entryPosition: { nx: 0.2, ny: 0.75 }, exitPosition: { nx: 0.3, ny: 0.3 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.3 } },
        { type: 'asteroidBelt', data: { id: 'a1', points: [{ nx: 0.5, ny: 0.2 }, { nx: 0.8, ny: 0.2 }], width: 0.035, density: 4, speed: 0.5 } },
        { type: 'booster', data: { id: 'b1', position: { nx: 0.5, ny: 0.15 }, radius: 0.02, direction: -Math.PI / 2, power: 120 } },
      ],
      initialFuel: 0.7, starThresholds: { star3: 0.35, star2: 0.15, star1: 0 },
      maxTrailLength: 300, bgColor: '#1A0A00',
    },
  },
];

export function getDailyChallenge(): DailyChallenge {
  const dow = new Date().getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  return DAILY_CHALLENGES.find(c => c.dayOfWeek === dow) ?? DAILY_CHALLENGES[0];
}
