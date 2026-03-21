/**
 * Web Audio API sound effects for Rocket Fling
 * All sounds are generated programmatically - no audio files needed.
 * Only runs on web platform (Platform.OS === 'web').
 */
import { Platform } from 'react-native';

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (Platform.OS !== 'web') return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume if suspended (autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ---- Volume getters (lazy-imported from settingsStore) ----
let _getSfxVolume: (() => number) | null = null;
let _getBgmVolume: (() => number) | null = null;

function getSfxVolume(): number {
  if (!_getSfxVolume) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSettingsStore } = require('../stores/settingsStore');
      _getSfxVolume = () => useSettingsStore.getState().sfxVolume;
    } catch {
      return 1.0;
    }
  }
  return _getSfxVolume();
}

function getBgmVolume(): number {
  if (!_getBgmVolume) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useSettingsStore } = require('../stores/settingsStore');
      _getBgmVolume = () => useSettingsStore.getState().bgmVolume;
    } catch {
      return 0.8;
    }
  }
  return _getBgmVolume();
}

// ---- Helpers ----

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function playNoise(
  ctx: AudioContext,
  duration: number,
  volume: number,
  startTime?: number,
): { source: AudioBufferSourceNode; gain: GainNode } {
  const t = startTime ?? ctx.currentTime;
  const buffer = createNoiseBuffer(ctx, duration);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
  source.stop(t + duration);
  return { source, gain };
}

function playTone(
  ctx: AudioContext,
  type: OscillatorType,
  freqStart: number,
  freqEnd: number,
  duration: number,
  volume: number,
  startTime?: number,
): { osc: OscillatorNode; gain: GainNode } {
  const t = startTime ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, t);
  osc.frequency.linearRampToValueAtTime(freqEnd, t + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration);
  return { osc, gain };
}

// =============================================
// Sound Effects
// =============================================

/** Launch: "シュッ!" - white noise burst + sine sweep */
export function playLaunchSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playNoise(ctx, 0.05, 0.3 * vol);
  playTone(ctx, 'sine', 400, 800, 0.15, 0.2 * vol);
}

/** Flying loop: "ヒューー" - soft continuous sine */
let flyingOsc: OscillatorNode | null = null;
let flyingGain: GainNode | null = null;

export function startFlyingSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getBgmVolume();
  if (vol <= 0) return;
  stopFlyingSound();

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.03 * vol, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  flyingOsc = osc;
  flyingGain = gain;
}

export function stopFlyingSound(): void {
  if (flyingOsc) {
    try { flyingOsc.stop(); } catch { /* already stopped */ }
    flyingOsc = null;
  }
  flyingGain = null;
}

/** Gravity sound: "ブオオオン" - low sine proportional to distance */
export function playGravitySound(distNormalized: number): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  // Only play when close (distance < 0.2)
  if (distNormalized > 0.2) return;
  const intensity = Math.max(0, 1 - distNormalized / 0.2);
  playTone(ctx, 'sine', 80, 120, 0.2, 0.15 * intensity * vol);
}

/** Black hole: ominous beat frequency (40Hz + 42Hz = 2Hz beat) */
export function playBlackHoleSound(distNormalized: number): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  if (distNormalized > 0.25) return;
  const intensity = Math.max(0, 1 - distNormalized / 0.25);
  const t = ctx.currentTime;
  playTone(ctx, 'sine', 40, 40, 0.3, 0.12 * intensity * vol, t);
  playTone(ctx, 'sine', 42, 42, 0.3, 0.12 * intensity * vol, t);
}

/** Wormhole: "シュワッ!" - noise sweep + descending sine */
export function playWormholeSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playNoise(ctx, 0.15, 0.2 * vol);
  playTone(ctx, 'sine', 1000, 200, 0.2, 0.2 * vol);
}

/** Booster: "ビュン!" - sawtooth sweep up */
export function playBoosterSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playTone(ctx, 'sawtooth', 200, 800, 0.1, 0.15 * vol);
}

/** Goal: "キラーン!" - C-E-G-highC arpeggio */
export function playGoalSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5-E5-G5-C6
  const t = ctx.currentTime;
  notes.forEach((freq, i) => {
    playTone(ctx, 'sine', freq, freq, 0.3, 0.2 * vol, t + i * 0.08);
  });
}

/** Crash: "ドカーン!" - noise burst + low sine decay */
export function playCrashSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playNoise(ctx, 0.1, 0.4 * vol);
  playTone(ctx, 'sine', 100, 40, 0.3, 0.25 * vol);
}

/** Star collect: "チリン" - high short sine */
export function playStarSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playTone(ctx, 'sine', 1500, 1200, 0.08, 0.15 * vol);
}

/** Absorbed by black hole: eerie descending */
export function playAbsorbedSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const vol = getSfxVolume();
  if (vol <= 0) return;
  playTone(ctx, 'sine', 200, 20, 0.5, 0.3 * vol);
  playTone(ctx, 'sine', 204, 22, 0.5, 0.3 * vol);
}
