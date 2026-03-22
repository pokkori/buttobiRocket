import React, { useEffect, useCallback, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GameCanvas } from '../../src/components/game/GameCanvas';
import { FuelGauge } from '../../src/components/game/FuelGauge';
import { TutorialOverlay } from '../../src/components/game/TutorialOverlay';
import { useGameStore } from '../../src/stores/gameStore';
import { useProgressStore } from '../../src/stores/progressStore';
import { getStageById } from '../../src/data/stages';
import { getWorldForStage } from '../../src/data/worlds';
import { COLORS } from '../../src/constants/colors';
import {
  playLaunchSound,
  startFlyingSound,
  stopFlyingSound,
  playGravitySound,
  playBlackHoleSound,
  playWormholeSound,
  playBoosterSound,
  playGoalSound,
  playCrashSound,
  playAbsorbedSound,
  startBGM,
  stopBGM,
} from '../../src/utils/sound';

const { width: SW } = Dimensions.get('window');

export default function GameScreen() {
  const router = useRouter();
  const { stageId } = useLocalSearchParams<{ stageId: string }>();
  const sId = parseInt(stageId ?? '1', 10);
  const stage = getStageById(sId);
  const world = getWorldForStage(sId);

  const phase = useGameStore(s => s.phase);
  const fuel = useGameStore(s => s.rocket.fuel);
  const rocket = useGameStore(s => s.rocket);
  const setStage = useGameStore(s => s.setStage);
  const reset = useGameStore(s => s.reset);
  const setPaused = useGameStore(s => s.setPaused);
  const isPaused = useGameStore(s => s.isPaused);
  const lastCollisionEvent = useGameStore(s => s.lastCollisionEvent);
  const failCount = useGameStore(s => s.failCount);
  const proximity = useGameStore(s => s.proximity);
  const incrementLaunches = useProgressStore(s => s.incrementLaunches);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const spendCoins = useProgressStore(s => s.spendCoins);
  const [launched, setLaunched] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const gravitySoundCooldown = useRef(0);
  const blackHoleSoundCooldown = useRef(0);

  useEffect(() => {
    if (stage) {
      setStage(stage);
      // Show tutorial on first play of each stage (or always for stage 1)
      const isFirstPlay = !clearedStages[sId];
      if (isFirstPlay && (sId === 1 || stage.hint)) {
        setShowTutorial(true);
      }
      // Start BGM for this world
      if (Platform.OS === 'web' && world) {
        startBGM(world.id);
      }
    }
  }, [sId]);

  useEffect(() => {
    if (phase === 'flying' && !launched) {
      incrementLaunches();
      setLaunched(true);
      // Sound: launch + start flying loop
      if (Platform.OS === 'web') {
        playLaunchSound();
        startFlyingSound();
      }
    }
    if (phase === 'aiming') {
      setLaunched(false);
      if (Platform.OS === 'web') {
        stopFlyingSound();
      }
    }
  }, [phase]);

  // Play goal sound when collision event fires (during slow-mo, before phase changes)
  useEffect(() => {
    if (lastCollisionEvent === 'goal' && Platform.OS === 'web') {
      stopFlyingSound();
      playGoalSound();
    }
  }, [lastCollisionEvent]);

  useEffect(() => {
    if (phase === 'goal' && stage) {
      // Phase transitions to 'goal' after slow-motion finishes
      // Fade out BGM
      if (Platform.OS === 'web') {
        stopBGM();
      }
      const stars = calculateStars(fuel, stage.starThresholds);
      const timeout = setTimeout(() => {
        router.replace(`/result/${sId}?stars=${stars}&fuel=${fuel}`);
      }, 300); // shorter delay since slow-mo already played
      return () => clearTimeout(timeout);
    }
    if (phase === 'crashed') {
      if (Platform.OS === 'web') {
        stopFlyingSound();
        playCrashSound();
      }
      const timeout = setTimeout(() => reset(), 1000);
      return () => clearTimeout(timeout);
    }
    if (phase === 'absorbed') {
      if (Platform.OS === 'web') {
        stopFlyingSound();
        playAbsorbedSound();
      }
      const timeout = setTimeout(() => reset(), 1000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Sound: wormhole / booster collision events
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (lastCollisionEvent === 'wormhole') {
      playWormholeSound();
    } else if (lastCollisionEvent === 'booster') {
      playBoosterSound();
    }
  }, [lastCollisionEvent]);

  // Sound: proximity-based gravity and black hole sounds (throttled)
  useEffect(() => {
    if (Platform.OS !== 'web' || phase !== 'flying') return;
    // Throttle: play at most once every 15 frames (~250ms)
    if (proximity.closestPlanetDist < 0.2) {
      if (gravitySoundCooldown.current <= 0) {
        playGravitySound(proximity.closestPlanetDist);
        gravitySoundCooldown.current = 15;
      } else {
        gravitySoundCooldown.current--;
      }
    } else {
      gravitySoundCooldown.current = 0;
    }
    if (proximity.closestBlackHoleDist < 0.25) {
      if (blackHoleSoundCooldown.current <= 0) {
        playBlackHoleSound(proximity.closestBlackHoleDist);
        blackHoleSoundCooldown.current = 20;
      } else {
        blackHoleSoundCooldown.current--;
      }
    } else {
      blackHoleSoundCooldown.current = 0;
    }
  }, [proximity, phase]);

  // Cleanup flying sound and BGM on unmount
  useEffect(() => {
    return () => {
      if (Platform.OS === 'web') {
        stopFlyingSound();
        stopBGM();
      }
    };
  }, []);

  const handleRetry = useCallback(() => {
    if (Platform.OS === 'web') {
      stopFlyingSound();
    }
    setShowHint(false);
    reset();
  }, [reset]);

  const handleHintPurchase = useCallback(() => {
    const coins = useProgressStore.getState().coins;
    if (coins >= 20) {
      spendCoins(20);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    } else {
      if (Platform.OS === 'web') {
        window.alert('\u30B3\u30A4\u30F3\u4E0D\u8DB3\n\u30C7\u30A4\u30EA\u30FC\u3092\u30AF\u30EA\u30A2\u3057\u3066\u30B3\u30A4\u30F3\u3092\u7372\u5F97\u3057\u3088\u3046\uFF01');
      }
    }
  }, [spendCoins]);

  const handlePause = useCallback(() => {
    setPaused(!isPaused);
  }, [isPaused, setPaused]);

  if (!stage || !world) return null;

  const stageInWorld = stage.id - world.stageIds[0] + 1;

  return (
    <View style={styles.container}>
      <GameCanvas />

      {/* HUD overlay */}
      <SafeAreaView style={styles.hud} pointerEvents="box-none">
        <View style={styles.hudTop}>
          <TouchableOpacity onPress={handlePause} style={styles.pauseBtn}>
            <Text style={styles.pauseText}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>
          <Text style={styles.stageLabel}>
            {world.id}-{stageInWorld} {stage.name}
          </Text>
          <FuelGauge fuel={fuel} />
          <Text style={styles.rankBadge}>
            {Math.round(fuel * 100) >= 90 ? '🥇S' : Math.round(fuel * 100) >= 70 ? '🥈A' : Math.round(fuel * 100) >= 50 ? '🥉B' : Math.round(fuel * 100) >= 30 ? 'C' : 'D'}
          </Text>
        </View>

        {/* Retry button */}
        {phase !== 'aiming' && (
          <TouchableOpacity onPress={handleRetry} style={styles.retryBtn}>
            <Text style={styles.retryText}>🔄 リトライ</Text>
          </TouchableOpacity>
        )}

        {/* Hint purchase button (shown on crashed/absorbed phase) */}
        {(phase === 'crashed' || phase === 'absorbed' || phase === 'aiming') && stage && (
          <TouchableOpacity onPress={handleHintPurchase} style={styles.hintBtn}>
            <Text style={styles.hintText}>🔍 軌跡ヒントを見る（-20コイン）</Text>
          </TouchableOpacity>
        )}

        {/* Hint trail overlay */}
        {showHint && stage && (
          <View style={styles.hintOverlay} pointerEvents="none">
            <View style={styles.hintCard}>
              <Text style={styles.hintCardTitle}>{'💡 ヒント'}</Text>
              <Text style={styles.hintOverlayText}>
                {'\u30D2\u30F3\u30C8: \u30B4\u30FC\u30EB\u65B9\u5411\u3078\u5F37\u3081\u306B\u6253\u3061\u4E0A\u3052\u3066\u307F\u3088\u3046\uFF01'}
              </Text>
            </View>
          </View>
        )}

        {/* Tutorial overlay */}
        {showTutorial && phase === 'aiming' && (
          <TutorialOverlay
            stageId={sId}
            hint={stage.hint}
            onDismiss={() => setShowTutorial(false)}
          />
        )}

        {/* Auto hint banner after 3 failures */}
        {failCount >= 3 && phase === 'aiming' && stage?.hint && (
          <View style={styles.autoHintBanner}>
            <Text style={styles.autoHintText}>💡 {stage.hint}</Text>
          </View>
        )}

        {/* Back button (shown when paused) */}
        {isPaused && (
          <View style={styles.pauseOverlay}>
            <Text style={styles.pauseTitle}>PAUSED</Text>
            <TouchableOpacity onPress={handlePause} style={styles.resumeBtn}>
              <Text style={styles.resumeText}>▶ 再開</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.quitBtn}>
              <Text style={styles.quitText}>🏠 ステージ選択</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

function calculateStars(fuel: number, thresholds: { star3: number; star2: number }): 1 | 2 | 3 {
  if (fuel >= thresholds.star3) return 3;
  if (fuel >= thresholds.star2) return 2;
  return 1;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  hud: { ...StyleSheet.absoluteFillObject },
  hudTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, paddingTop: 8,
  },
  pauseBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  pauseText: { color: COLORS.text, fontSize: 16 },
  stageLabel: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  rankBadge: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    minWidth: 28,
    textAlign: 'center',
  },
  retryBtn: {
    position: 'absolute', bottom: 40, right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
  },
  retryText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  hintBtn: {
    position: 'absolute', bottom: 90, right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,215,0,0.5)',
  },
  hintText: { color: '#FFD700', fontSize: 12, fontWeight: '600' },
  hintOverlay: {
    position: 'absolute', top: '45%', left: 0, right: 0,
    alignItems: 'center',
  },
  hintCard: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'flex-start',
    maxWidth: '80%',
  },
  hintCardTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  hintOverlayText: {
    color: '#FFFFFF', fontSize: 14, fontWeight: '700',
  },
  autoHintBanner: {
    position: 'absolute', top: 60, left: 16, right: 16,
    backgroundColor: 'rgba(0,100,255,0.85)',
    borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: '#4488FF',
    alignItems: 'center',
  },
  autoHintText: {
    color: '#FFFFFF', fontSize: 14, fontWeight: '700', textAlign: 'center',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center', justifyContent: 'center', gap: 20,
  },
  pauseTitle: { color: COLORS.text, fontSize: 36, fontWeight: '900', letterSpacing: 6 },
  resumeBtn: {
    backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12,
  },
  resumeText: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  quitBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12,
  },
  quitText: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '600' },
});
