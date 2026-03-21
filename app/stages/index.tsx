import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { WORLDS } from '../../src/data/worlds';
import { useProgressStore } from '../../src/stores/progressStore';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { COLORS } from '../../src/constants/colors';

export default function WorldSelectScreen() {
  const router = useRouter();
  const totalStars = useProgressStore(s => s.totalStars);
  const unlockedWorlds = useProgressStore(s => s.unlockedWorlds);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const coins = useProgressStore(s => s.coins);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <CoinDisplay amount={coins} />
      </View>

      <Text style={styles.title}>ワールド選択</Text>
      <Text style={styles.starCount}>⭐ 総獲得星: {totalStars}/300</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {WORLDS.map(world => {
          const isUnlocked = unlockedWorlds.includes(world.id);
          const clearedCount = world.stageIds.filter(id => clearedStages[id]?.stars > 0).length;

          return (
            <TouchableOpacity
              key={world.id}
              style={[
                styles.worldCard,
                {
                  borderColor: isUnlocked ? world.themeColor : COLORS.locked,
                  opacity: isUnlocked ? 1 : 0.5,
                },
              ]}
              onPress={() => isUnlocked && router.push(`/stages/${world.id}`)}
              disabled={!isUnlocked}
            >
              <View style={[styles.cardGradient, { backgroundColor: world.bgGradient[0] + '88' }]}>
                <Text style={styles.worldIcon}>{world.icon}</Text>
                <View style={styles.worldInfo}>
                  <Text style={styles.worldName}>W{world.id}: {world.name}</Text>
                  {isUnlocked ? (
                    <Text style={styles.worldProgress}>{clearedCount}/20 クリア</Text>
                  ) : (
                    <Text style={styles.worldLocked}>🔒 星{world.requiredStars}個でアンロック</Text>
                  )}
                  <Text style={styles.worldDesc}>{world.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  title: { color: COLORS.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  starCount: { color: COLORS.accent, fontSize: 14, textAlign: 'center', marginTop: 4, marginBottom: 16 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40, gap: 12 },
  worldCard: {
    borderRadius: 16, borderWidth: 2, overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row', padding: 16, alignItems: 'center', gap: 16,
  },
  worldIcon: { fontSize: 40 },
  worldInfo: { flex: 1 },
  worldName: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  worldProgress: { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },
  worldLocked: { color: COLORS.locked, fontSize: 13, marginTop: 2 },
  worldDesc: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
});
