import { WorldData } from '../types';

export const WORLDS: WorldData[] = [
  {
    id: 1,
    name: '太陽系',
    description: '最初の冒険。基本操作を覚えよう',
    themeColor: '#4A90D9',
    bgGradient: ['#0A0E27', '#1A2151'],
    requiredStars: 0,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 1),
    icon: '🌍',
  },
  {
    id: 2,
    name: '星雲帯',
    description: '輝くガスの海を越えて',
    themeColor: '#9B59B6',
    bgGradient: ['#1A0A2E', '#2D1B69'],
    requiredStars: 25,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 21),
    icon: '🌌',
  },
  {
    id: 3,
    name: 'ブラックホール地帯',
    description: '暗黒の重力に飲み込まれるな',
    themeColor: '#2C3E50',
    bgGradient: ['#000000', '#1A1A2E'],
    requiredStars: 60,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 41),
    icon: '🕳',
  },
  {
    id: 4,
    name: 'ワームホール回廊',
    description: '空間のねじれを利用せよ',
    themeColor: '#1ABC9C',
    bgGradient: ['#0A2E2E', '#162D50'],
    requiredStars: 110,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 61),
    icon: '🌀',
  },
  {
    id: 5,
    name: '銀河の果て',
    description: '全ての要素が牙をむく最終領域',
    themeColor: '#F39C12',
    bgGradient: ['#1A0A00', '#2E1A0A'],
    requiredStars: 180,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 81),
    icon: '🌟',
  },
];

export function getWorldById(id: number): WorldData | undefined {
  return WORLDS.find(w => w.id === id);
}

export function getWorldForStage(stageId: number): WorldData | undefined {
  return WORLDS.find(w => w.stageIds.includes(stageId));
}
