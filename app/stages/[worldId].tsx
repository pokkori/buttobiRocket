import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getStagesByWorldId } from '../../src/data/stages';
import { getWorldById } from '../../src/data/worlds';
import { useProgressStore } from '../../src/stores/progressStore';
import { StarRating } from '../../src/components/ui/StarRating';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { COLORS } from '../../src/constants/colors';

export default function StageSelectScreen() {
  const router = useRouter();
  const { worldId } = useLocalSearchParams<{ worldId: string }>();
  const wId = parseInt(worldId ?? '1', 10);
  const world = getWorldById(wId);
  const stages = getStagesByWorldId(wId);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const coins = useProgressStore(s => s.coins);

  if (!world) return null;

  const isStageUnlocked = (stageId: number): boolean => {
    if (stageId === world.stageIds[0]) return true; // First stage always unlocked
    const prevId = stageId - 1;
    return (clearedStages[prevId]?.stars ?? 0) > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: world.themeColor }]}>W{world.id}: {world.name}</Text>
        <CoinDisplay amount={coins} size={13} />
      </View>

      <FlatList
        data={stages}
        numColumns={4}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item: stage }) => {
          const result = clearedStages[stage.id];
          const unlocked = isStageUnlocked(stage.id);
          const cleared = (result?.stars ?? 0) > 0;

          return (
            <TouchableOpacity
              style={[
                styles.stageBtn,
                {
                  borderColor: unlocked ? (cleared ? world.themeColor : 'rgba(255,255,255,0.2)') : COLORS.locked,
                  backgroundColor: cleared ? `${world.themeColor}22` : 'rgba(255,255,255,0.05)',
                  opacity: unlocked ? 1 : 0.4,
                },
              ]}
              onPress={() => unlocked && router.push(`/game/${stage.id}`)}
              disabled={!unlocked}
            >
              <Text style={[styles.stageNum, { color: unlocked ? COLORS.text : COLORS.locked }]}>
                {unlocked ? stage.id - world.stageIds[0] + 1 : '🔒'}
              </Text>
              {cleared && result ? (
                <StarRating stars={result.stars} size={10} />
              ) : unlocked ? (
                <Text style={styles.notCleared}>-</Text>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
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
  title: { fontSize: 16, fontWeight: '700' },
  grid: { paddingHorizontal: 12, paddingTop: 16, paddingBottom: 40 },
  row: { justifyContent: 'space-between', marginBottom: 8 },
  stageBtn: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  stageNum: { fontSize: 18, fontWeight: '700' },
  notCleared: { color: COLORS.textSecondary, fontSize: 12 },
});
