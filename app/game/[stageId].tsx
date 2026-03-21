import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GameCanvas } from '../../src/components/game/GameCanvas';
import { FuelGauge } from '../../src/components/game/FuelGauge';
import { useGameStore } from '../../src/stores/gameStore';
import { useProgressStore } from '../../src/stores/progressStore';
import { getStageById } from '../../src/data/stages';
import { getWorldForStage } from '../../src/data/worlds';
import { COLORS } from '../../src/constants/colors';

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
  const incrementLaunches = useProgressStore(s => s.incrementLaunches);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (stage) setStage(stage);
  }, [sId]);

  useEffect(() => {
    if (phase === 'flying' && !launched) {
      incrementLaunches();
      setLaunched(true);
    }
    if (phase === 'aiming') {
      setLaunched(false);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'goal' && stage) {
      const stars = calculateStars(fuel, stage.starThresholds);
      const timeout = setTimeout(() => {
        router.replace(`/result/${sId}?stars=${stars}&fuel=${fuel}`);
      }, 800);
      return () => clearTimeout(timeout);
    }
    if (phase === 'crashed' || phase === 'absorbed') {
      const timeout = setTimeout(() => reset(), 1000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  const handleRetry = useCallback(() => {
    reset();
  }, [reset]);

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
        </View>

        {/* Retry button */}
        {phase !== 'aiming' && (
          <TouchableOpacity onPress={handleRetry} style={styles.retryBtn}>
            <Text style={styles.retryText}>🔄 リトライ</Text>
          </TouchableOpacity>
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
  retryBtn: {
    position: 'absolute', bottom: 40, right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
  },
  retryText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
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
