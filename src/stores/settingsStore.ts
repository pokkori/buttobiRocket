import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../types';
import { STORAGE_KEYS } from '../constants/storage';

const DEFAULT_SETTINGS: AppSettings = {
  bgmVolume: 0.8,
  sfxVolume: 1.0,
  hapticsEnabled: true,
  showTrajectoryPreview: true,
  language: 'ja',
};

interface SettingsStore extends AppSettings {
  loaded: boolean;
  load: () => Promise<void>;
  save: () => Promise<void>;
  update: (partial: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_SETTINGS,
  loaded: false,

  load: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (raw) {
        const data = JSON.parse(raw) as AppSettings;
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
      const data: AppSettings = {
        bgmVolume: state.bgmVolume,
        sfxVolume: state.sfxVolume,
        hapticsEnabled: state.hapticsEnabled,
        showTrajectoryPreview: state.showTrajectoryPreview,
        language: state.language,
      };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
    } catch {
      // silently fail
    }
  },

  update: (partial) => {
    set(partial);
    get().save();
  },
}));
