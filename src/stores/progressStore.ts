import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerProgress, StageResult, AchievementProgress } from '../types';
import { STORAGE_KEYS } from '../constants/storage';
import { WORLDS } from '../data/worlds';

const DEFAULT_PROGRESS: PlayerProgress = {
  totalStars: 0,
  clearedStages: {},
  unlockedWorlds: [1],
  coins: 0,
  unlockedSkins: ['default'],
  equippedSkinId: 'default',
  achievements: {},
  dailyChallenge: {
    lastPlayedDate: '',
    streak: 0,
    todayCleared: false,
    todayStars: 0,
  },
  totalLaunches: 0,
  totalPlayTimeMs: 0,
};

interface ProgressStore extends PlayerProgress {
  loaded: boolean;
  load: () => Promise<void>;
  save: () => Promise<void>;
  clearStage: (stageId: number, stars: 1 | 2 | 3, fuelRemaining: number, trajectory: { x: number; y: number }[] | null) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  unlockSkin: (skinId: string) => void;
  equipSkin: (skinId: string) => void;
  incrementLaunches: () => void;
  updateAchievement: (id: string, value: number) => void;
  unlockAchievement: (id: string) => void;
  updateDailyChallenge: (date: string, stars: 0 | 1 | 2 | 3) => void;
  checkWorldUnlocks: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...DEFAULT_PROGRESS,
  loaded: false,

  load: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.PLAYER_PROGRESS);
      if (raw) {
        const data = JSON.parse(raw) as PlayerProgress;
        set({ ...data, loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch {
      set({ loaded: true });
    }
  },

  save: async () => {
    try {
      const state = get();
      const data: PlayerProgress = {
        totalStars: state.totalStars,
        clearedStages: state.clearedStages,
        unlockedWorlds: state.unlockedWorlds,
        coins: state.coins,
        unlockedSkins: state.unlockedSkins,
        equippedSkinId: state.equippedSkinId,
        achievements: state.achievements,
        dailyChallenge: state.dailyChallenge,
        totalLaunches: state.totalLaunches,
        totalPlayTimeMs: state.totalPlayTimeMs,
      };
      await AsyncStorage.setItem(STORAGE_KEYS.PLAYER_PROGRESS, JSON.stringify(data));
    } catch {
      // silently fail
    }
  },

  clearStage: (stageId, stars, fuelRemaining, trajectory) => {
    const state = get();
    const existing = state.clearedStages[stageId];
    const isFirstClear = !existing || existing.stars === 0;
    const isStarUpgrade = existing && stars > existing.stars;

    let coinReward = 0;
    if (isFirstClear) {
      coinReward = stars === 3 ? 30 : stars === 2 ? 20 : 10;
    } else {
      coinReward = stars === 3 ? 5 : stars === 2 ? 3 : 2;
      if (isStarUpgrade) {
        coinReward += stars === 3 ? 15 : 10;
      }
    }

    const newResult: StageResult = {
      stageId,
      stars: existing ? Math.max(existing.stars, stars) as 0 | 1 | 2 | 3 : stars,
      bestFuelRemaining: existing ? Math.max(existing.bestFuelRemaining, fuelRemaining) : fuelRemaining,
      clearCount: (existing?.clearCount ?? 0) + 1,
      bestTrajectory: trajectory,
    };

    const newCleared = { ...state.clearedStages, [stageId]: newResult };
    const totalStars = Object.values(newCleared).reduce((sum, r) => sum + r.stars, 0);

    set({
      clearedStages: newCleared,
      totalStars,
      coins: state.coins + coinReward,
    });

    get().checkWorldUnlocks();
    get().save();
  },

  addCoins: (amount) => {
    set(state => ({ coins: state.coins + amount }));
    get().save();
  },

  spendCoins: (amount) => {
    const state = get();
    if (state.coins < amount) return false;
    set({ coins: state.coins - amount });
    get().save();
    return true;
  },

  unlockSkin: (skinId) => {
    set(state => ({
      unlockedSkins: state.unlockedSkins.includes(skinId) ? state.unlockedSkins : [...state.unlockedSkins, skinId],
    }));
    get().save();
  },

  equipSkin: (skinId) => {
    set({ equippedSkinId: skinId });
    get().save();
  },

  incrementLaunches: () => {
    set(state => ({ totalLaunches: state.totalLaunches + 1 }));
  },

  updateAchievement: (id, value) => {
    set(state => ({
      achievements: {
        ...state.achievements,
        [id]: {
          achievementId: id,
          currentValue: Math.max(state.achievements[id]?.currentValue ?? 0, value),
          isUnlocked: state.achievements[id]?.isUnlocked ?? false,
          unlockedAt: state.achievements[id]?.unlockedAt ?? null,
        },
      },
    }));
  },

  unlockAchievement: (id) => {
    set(state => ({
      achievements: {
        ...state.achievements,
        [id]: {
          ...(state.achievements[id] ?? { achievementId: id, currentValue: 0 }),
          isUnlocked: true,
          unlockedAt: Date.now(),
        } as AchievementProgress,
      },
    }));
    get().save();
  },

  updateDailyChallenge: (date, stars) => {
    set(state => {
      const prev = state.dailyChallenge;
      const isNewDay = prev.lastPlayedDate !== date;
      const isConsecutive = isNewDay && isDateConsecutive(prev.lastPlayedDate, date);
      return {
        dailyChallenge: {
          lastPlayedDate: date,
          streak: isConsecutive ? prev.streak + 1 : isNewDay ? 1 : prev.streak,
          todayCleared: stars > 0,
          todayStars: Math.max(prev.todayStars, stars) as 0 | 1 | 2 | 3,
        },
      };
    });
    get().save();
  },

  checkWorldUnlocks: () => {
    const state = get();
    const newWorlds = [...state.unlockedWorlds];
    for (const world of WORLDS) {
      if (!newWorlds.includes(world.id) && state.totalStars >= world.requiredStars) {
        newWorlds.push(world.id);
      }
    }
    if (newWorlds.length !== state.unlockedWorlds.length) {
      set({ unlockedWorlds: newWorlds });
    }
  },
}));

function isDateConsecutive(prev: string, current: string): boolean {
  if (!prev) return false;
  const p = new Date(prev);
  const c = new Date(current);
  const diff = c.getTime() - p.getTime();
  return diff >= 86400000 && diff < 172800000;
}
