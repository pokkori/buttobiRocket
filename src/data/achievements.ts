import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_launch', name: 'はじめの一歩', description: '初めてロケットを発射', icon: '🚀', targetValue: 1, rewardCoins: 10, category: 'launch' },
  { id: 'launches_50', name: 'ロケットマニア', description: '50回ロケットを発射', icon: '🔥', targetValue: 50, rewardCoins: 50, category: 'launch' },
  { id: 'launches_200', name: 'ロケットマスター', description: '200回ロケットを発射', icon: '💫', targetValue: 200, rewardCoins: 200, category: 'launch' },
  { id: 'launches_1000', name: '伝説のパイロット', description: '1000回ロケットを発射', icon: '🌟', targetValue: 1000, rewardCoins: 500, category: 'launch' },
  { id: 'first_clear', name: '初クリア', description: '初めてステージをクリア', icon: '⭐', targetValue: 1, rewardCoins: 10, category: 'clear' },
  { id: 'clear_20', name: '太陽系制覇', description: '20ステージクリア', icon: '🌍', targetValue: 20, rewardCoins: 100, category: 'clear' },
  { id: 'clear_50', name: '銀河の探検家', description: '50ステージクリア', icon: '🌌', targetValue: 50, rewardCoins: 200, category: 'clear' },
  { id: 'clear_100', name: '宇宙の覇者', description: '全100ステージクリア', icon: '🏆', targetValue: 100, rewardCoins: 1000, category: 'clear' },
  { id: 'stars_50', name: 'スターコレクター', description: '星を50個集める', icon: '⭐', targetValue: 50, rewardCoins: 100, category: 'star' },
  { id: 'stars_150', name: 'スターハンター', description: '星を150個集める', icon: '🌟', targetValue: 150, rewardCoins: 300, category: 'star' },
  { id: 'all_stars_100', name: 'パーフェクトスター', description: '全300星を獲得', icon: '💎', targetValue: 300, rewardCoins: 2000, rewardSkinId: 'gold', category: 'star' },
  { id: 'star3_streak_5', name: '完璧主義者', description: '5連続で星3クリア', icon: '🔥', targetValue: 5, rewardCoins: 100, category: 'star' },
  { id: 'star3_streak_10', name: 'ゴッドハンド', description: '10連続で星3クリア', icon: '🌈', targetValue: 10, rewardCoins: 300, category: 'star' },
  { id: 'wormhole_use', name: 'ワープ初体験', description: 'ワームホールを初めて使う', icon: '🌀', targetValue: 1, rewardCoins: 30, category: 'special' },
  { id: 'wormhole_10', name: 'ワープの達人', description: 'ワームホールを10回使う', icon: '🕳', targetValue: 10, rewardCoins: 100, category: 'special' },
  { id: 'blackhole_survive', name: 'ブラックホール生還者', description: 'ブラックホールの横をかすめてクリア', icon: '🕳', targetValue: 1, rewardCoins: 200, category: 'special' },
  { id: 'booster_10', name: 'ブーストマニア', description: 'ブースターを10回使う', icon: '⚡', targetValue: 10, rewardCoins: 50, category: 'special' },
  { id: 'daily_3', name: '3日坊主じゃない', description: 'デイリーチャレンジ3日連続', icon: '📅', targetValue: 3, rewardCoins: 50, category: 'daily' },
  { id: 'daily_7', name: '1週間の挑戦者', description: 'デイリーチャレンジ7日連続', icon: '🔥', targetValue: 7, rewardCoins: 100, category: 'daily' },
  { id: 'daily_14', name: '2週間の鉄人', description: 'デイリーチャレンジ14日連続', icon: '💪', targetValue: 14, rewardCoins: 200, category: 'daily' },
  { id: 'daily_30', name: '月間チャンピオン', description: 'デイリーチャレンジ30日連続', icon: '👑', targetValue: 30, rewardCoins: 500, rewardSkinId: 'cosmic', category: 'daily' },
  { id: 'world2_unlock', name: '星雲への扉', description: 'ワールド2をアンロック', icon: '🌌', targetValue: 1, rewardCoins: 50, category: 'clear' },
  { id: 'world3_unlock', name: '暗黒の入り口', description: 'ワールド3をアンロック', icon: '🕳', targetValue: 1, rewardCoins: 100, category: 'clear' },
  { id: 'world4_unlock', name: '時空の狭間', description: 'ワールド4をアンロック', icon: '🌀', targetValue: 1, rewardCoins: 150, category: 'clear' },
  { id: 'world5_unlock', name: '最後の領域', description: 'ワールド5をアンロック', icon: '🌟', targetValue: 1, rewardCoins: 200, category: 'clear' },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}
