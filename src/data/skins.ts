import { RocketSkin } from '../types';

export const ROCKET_SKINS: RocketSkin[] = [
  {
    id: 'default', name: 'スタンダード', description: '最初のロケット。信頼と実績の白。',
    price: 0, rarity: 'common', trailColor: '#00BFFF', trailWidth: 3, glowColor: '#00BFFF',
    unlockCondition: 'default',
  },
  {
    id: 'fire', name: 'ファイアロケット', description: '炎をまとう真っ赤なロケット。軌跡が燃え上がる。',
    price: 500, rarity: 'rare', trailColor: '#FF4500', trailWidth: 4, glowColor: '#FF6347',
    unlockCondition: 'purchase',
  },
  {
    id: 'ice', name: 'アイスロケット', description: '絶対零度の蒼き軌跡。冷たく美しい。',
    price: 500, rarity: 'rare', trailColor: '#00FFFF', trailWidth: 3, glowColor: '#E0FFFF',
    unlockCondition: 'purchase',
  },
  {
    id: 'thunder', name: 'サンダーロケット', description: '稲妻をまとう電撃の軌跡。',
    price: 800, rarity: 'epic', trailColor: '#FFD700', trailWidth: 3, glowColor: '#FFFF00',
    unlockCondition: 'purchase',
  },
  {
    id: 'rainbow', name: 'レインボーロケット', description: '虹色に輝く夢のロケット。',
    price: 1200, rarity: 'legendary', trailColor: '#FF0000', trailWidth: 4, glowColor: '#FF69B4',
    unlockCondition: 'purchase',
  },
  {
    id: 'ghost', name: 'ゴーストロケット', description: '透明な幽霊ロケット。敵を惑わす。',
    price: 600, rarity: 'rare', trailColor: '#FFFFFF', trailWidth: 2, glowColor: '#FFFFFF',
    unlockCondition: 'purchase',
  },
  {
    id: 'neon_pink', name: 'ネオンピンク', description: 'サイバーパンクなピンクネオン。',
    price: 800, rarity: 'epic', trailColor: '#FF1493', trailWidth: 3, glowColor: '#FF69B4',
    unlockCondition: 'purchase',
  },
  {
    id: 'emerald', name: 'エメラルド', description: '宝石のように輝くエメラルドグリーン。',
    price: 600, rarity: 'rare', trailColor: '#50C878', trailWidth: 3, glowColor: '#00FF7F',
    unlockCondition: 'purchase',
  },
  {
    id: 'gold', name: 'ゴールドロケット', description: '黄金に輝く伝説のロケット。',
    price: 0, rarity: 'legendary', trailColor: '#FFD700', trailWidth: 4, glowColor: '#FFA500',
    unlockCondition: 'achievement', achievementId: 'all_stars_100',
  },
  {
    id: 'cosmic', name: 'コズミック', description: '宇宙の神秘を纏う究極のロケット。',
    price: 0, rarity: 'legendary', trailColor: '#9400D3', trailWidth: 5, glowColor: '#8A2BE2',
    unlockCondition: 'daily', achievementId: 'daily_30',
  },
];

export function getSkinById(id: string): RocketSkin | undefined {
  return ROCKET_SKINS.find(s => s.id === id);
}
