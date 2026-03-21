import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { useProgressStore } from '../../src/stores/progressStore';
import { getStageById } from '../../src/data/stages';
import { getWorldForStage } from '../../src/data/worlds';
import { COLORS } from '../../src/constants/colors';
import { formatPercent } from '../../src/utils/math';

export default function ResultScreen() {
  const router = useRouter();
  const { stageId, stars: starsParam, fuel: fuelParam } = useLocalSearchParams<{ stageId: string; stars: string; fuel: string }>();
  const sId = parseInt(stageId ?? '1', 10);
  const stars = parseInt(starsParam ?? '1', 10) as 1 | 2 | 3;
  const fuel = parseFloat(fuelParam ?? '0');
  const stage = getStageById(sId);
  const world = getWorldForStage(sId);
  const clearStage = useProgressStore(s => s.clearStage);
  const coins = useProgressStore(s => s.coins);

  // Star animations
  const starAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    if (stage) {
      clearStage(sId, stars, fuel, null);
    }

    // Animate stars appearing
    starAnims.forEach((anim, i) => {
      if (i < stars) {
        Animated.timing(anim, {
          toValue: 1,
          delay: i * 300,
          duration: 400,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }).start();
      }
    });
  }, []);

  if (!stage || !world) return null;

  const stageInWorld = stage.id - world.stageIds[0] + 1;
  const coinReward = stars === 3 ? 30 : stars === 2 ? 20 : 10;
  const nextStageId = sId + 1;
  const hasNext = nextStageId <= 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CoinDisplay amount={coins} />
      </View>

      <View style={styles.center}>
        <Text style={styles.clearText}>✨ CLEAR! ✨</Text>
        <Text style={styles.stageName}>
          Stage {world.id}-{stageInWorld} 「{stage.name}」
        </Text>

        <View style={styles.starsRow}>
          {[0, 1, 2].map(i => (
            <Animated.Text
              key={i}
              style={[
                styles.starText,
                {
                  opacity: starAnims[i],
                  transform: [
                    { scale: starAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) },
                    { rotate: starAnims[i].interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) },
                  ],
                  color: i < stars ? COLORS.star : COLORS.starEmpty,
                },
              ]}
            >
              {i < stars ? '\u2605' : '\u2606'}
            </Animated.Text>
          ))}
        </View>

        <View style={styles.stats}>
          <Text style={styles.statText}>残り燃料: {formatPercent(fuel)}</Text>
          <Text style={styles.statText}>獲得コイン: +{coinReward}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        {hasNext && (
          <Button
            title="次のステージ"
            onPress={() => router.replace(`/game/${nextStageId}`)}
            size="large"
            icon="▶"
            style={styles.nextBtn}
          />
        )}
        <View style={styles.bottomBtns}>
          <Button
            title="リトライ"
            onPress={() => router.replace(`/game/${sId}`)}
            variant="secondary"
            icon="🔄"
          />
          <Button
            title="ステージ選択"
            onPress={() => router.replace(`/stages/${world.id}`)}
            variant="secondary"
            icon="🏠"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 8,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontSize: 28, fontWeight: '900', color: COLORS.accent, marginBottom: 12 },
  stageName: { fontSize: 16, color: COLORS.text, fontWeight: '600', marginBottom: 24 },
  starsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  starText: { fontSize: 48 },
  stats: { gap: 8 },
  statText: { color: COLORS.textSecondary, fontSize: 16, textAlign: 'center' },
  buttons: { paddingHorizontal: 32, paddingBottom: 40, gap: 12 },
  nextBtn: { width: '100%' },
  bottomBtns: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
});
