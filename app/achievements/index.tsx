import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ACHIEVEMENTS } from '../../src/data/achievements';
import { useProgressStore } from '../../src/stores/progressStore';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { COLORS } from '../../src/constants/colors';

export default function AchievementsScreen() {
  const router = useRouter();
  const achievements = useProgressStore(s => s.achievements);
  const coins = useProgressStore(s => s.coins);
  const addCoins = useProgressStore(s => s.addCoins);
  const unlockSkin = useProgressStore(s => s.unlockSkin);

  const unlockedCount = Object.values(achievements).filter(a => a.isUnlocked).length;

  const handleClaim = (ach: typeof ACHIEVEMENTS[0]) => {
    addCoins(ach.rewardCoins);
    if (ach.rewardSkinId) {
      unlockSkin(ach.rewardSkinId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🏅 実績</Text>
        <CoinDisplay amount={coins} size={13} />
      </View>

      <Text style={styles.count}>達成: {unlockedCount}/{ACHIEVEMENTS.length}</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {ACHIEVEMENTS.map(ach => {
          const progress = achievements[ach.id];
          const isUnlocked = progress?.isUnlocked ?? false;
          const currentValue = progress?.currentValue ?? 0;
          const progressPct = Math.min(currentValue / ach.targetValue, 1);

          return (
            <View key={ach.id} style={[styles.card, { opacity: isUnlocked ? 1 : 0.7 }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.icon}>{ach.icon}</Text>
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{ach.name}</Text>
                    {isUnlocked && <Text style={styles.checkMark}>✅</Text>}
                  </View>
                  <Text style={styles.desc}>{ach.description}</Text>
                </View>
              </View>

              {!isUnlocked && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPct * 100}%` }]} />
                  <Text style={styles.progressText}>{currentValue}/{ach.targetValue}</Text>
                </View>
              )}

              <Text style={styles.reward}>
                報酬: {ach.rewardCoins}コイン{ach.rewardSkinId ? ' + スキン' : ''}
                {isUnlocked ? ' (達成済み)' : ''}
              </Text>
            </View>
          );
        })}
      </ScrollView>
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
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  count: { color: COLORS.textSecondary, fontSize: 14, textAlign: 'center', marginVertical: 8 },
  list: { paddingHorizontal: 16, paddingBottom: 40, gap: 10 },
  card: {
    backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.cardBorder,
    gap: 8,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { fontSize: 28 },
  cardInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  checkMark: { fontSize: 14 },
  desc: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  progressBar: {
    height: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden',
    justifyContent: 'center',
  },
  progressFill: { height: '100%', backgroundColor: COLORS.primary + '66', borderRadius: 8 },
  progressText: {
    position: 'absolute', alignSelf: 'center', color: COLORS.text, fontSize: 10, fontWeight: '600',
  },
  reward: { color: COLORS.accent, fontSize: 12 },
});
