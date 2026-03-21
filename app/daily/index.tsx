import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getDailyChallenge } from '../../src/data/dailyChallenges';
import { useProgressStore } from '../../src/stores/progressStore';
import { Button } from '../../src/components/ui/Button';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { COLORS } from '../../src/constants/colors';
import { getTodayString } from '../../src/utils/math';
import { useGameStore } from '../../src/stores/gameStore';
import { StageData } from '../../src/types';

export default function DailyScreen() {
  const router = useRouter();
  const daily = getDailyChallenge();
  const streak = useProgressStore(s => s.dailyChallenge.streak);
  const todayCleared = useProgressStore(s => s.dailyChallenge.todayCleared);
  const lastPlayed = useProgressStore(s => s.dailyChallenge.lastPlayedDate);
  const coins = useProgressStore(s => s.coins);
  const setStage = useGameStore(s => s.setStage);

  const today = getTodayString();
  const isToday = lastPlayed === today;
  const actualStreak = isToday ? streak : (lastPlayed ? streak : 0);

  const handlePlay = () => {
    // Create a virtual stage from the daily challenge config
    const virtualStage: StageData = {
      ...daily.stageConfig,
      id: 9999,
      worldId: 0,
      name: daily.name,
      difficulty: 3,
    };
    setStage(virtualStage);
    router.push('/game/9999');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>デイリーチャレンジ</Text>
        <CoinDisplay amount={coins} size={13} />
      </View>

      <View style={styles.content}>
        {actualStreak > 0 && (
          <Text style={styles.streak}>🔥 連続 {actualStreak}日目! 🔥</Text>
        )}

        <View style={styles.challengeCard}>
          <Text style={styles.challengeName}>「{daily.name}」</Text>
          <Text style={styles.challengeDesc}>{daily.description}</Text>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>報酬: {daily.bonusCoins}コイン</Text>
            <Text style={styles.rewardText}>⭐3: +{Math.round(daily.bonusCoins * 0.6)}コイン ボーナス</Text>
          </View>
          {isToday && todayCleared && (
            <Text style={styles.clearedText}>✅ 今日のチャレンジはクリア済み</Text>
          )}
        </View>

        <Button
          title={isToday && todayCleared ? 'もう一度挑戦' : 'チャレンジ開始'}
          onPress={handlePlay}
          size="large"
          icon="▶"
          style={styles.playBtn}
        />

        <View style={styles.bonusSection}>
          <Text style={styles.bonusTitle}>連続ボーナス</Text>
          <View style={styles.bonusGrid}>
            {[
              { days: 3, coins: 20 },
              { days: 7, coins: 50 },
              { days: 14, coins: 100 },
              { days: 30, coins: 0, skin: 'スキン🚀' },
            ].map(b => (
              <View key={b.days} style={[styles.bonusItem, { opacity: actualStreak >= b.days ? 1 : 0.5 }]}>
                <Text style={styles.bonusDays}>{b.days}日</Text>
                <Text style={styles.bonusReward}>
                  {b.coins ? `+${b.coins}💰` : b.skin}
                </Text>
                {actualStreak >= b.days && <Text style={styles.bonusCheck}>✅</Text>}
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
  },
  back: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  streak: { fontSize: 20, fontWeight: '800', color: COLORS.accent, textAlign: 'center', marginBottom: 20 },
  challengeCard: {
    backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: COLORS.cardBorder,
    gap: 8, marginBottom: 20,
  },
  challengeName: { fontSize: 20, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  challengeDesc: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  rewardRow: { gap: 4, marginTop: 8 },
  rewardText: { fontSize: 13, color: COLORS.accent, textAlign: 'center' },
  clearedText: { fontSize: 14, color: COLORS.success, textAlign: 'center', fontWeight: '700', marginTop: 8 },
  playBtn: { width: '100%', marginBottom: 24 },
  bonusSection: { gap: 12 },
  bonusTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  bonusGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  bonusItem: {
    flex: 1, backgroundColor: COLORS.cardBg, borderRadius: 10, padding: 10, alignItems: 'center', gap: 4,
  },
  bonusDays: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  bonusReward: { fontSize: 11, color: COLORS.accent },
  bonusCheck: { fontSize: 12 },
});
