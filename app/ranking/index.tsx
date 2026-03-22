import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useProgressStore } from '../../src/stores/progressStore';
import { COLORS } from '../../src/constants/colors';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';

export default function RankingScreen() {
  const router = useRouter();
  const entries = useProgressStore(s => s.rankingEntries ?? []);
  const coins = useProgressStore(s => s.coins);
  const streak = useProgressStore(s => s.dailyChallenge.streak);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const today = new Date().toISOString().split("T")[0];
  const todayCount = entries.filter(e => e.date?.startsWith(today)).length;
  const top10 = entries.slice(0, 10);
  const WORLD_BENCHMARK = { s: 3500, a: 3000, b: 2500 };
  const bestScore = top10[0]?.score ?? 0;
  const rankLabel = bestScore >= WORLD_BENCHMARK.s ? '世界上位10%相当' : bestScore >= WORLD_BENCHMARK.a ? '世界上位30%相当' : '世界上位50%相当';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'\u2190 \u623B\u308B'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{'\uD83C\uDFC6 \u30E9\u30F3\u30AD\u30F3\u30B0'}</Text>
        <CoinDisplay amount={coins} size={13} />
      </View>
      <Text style={styles.sub}>{'\u30CF\u30A4\u30B9\u30B3\u30A2 TOP10'}</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {/* 今日の成績サマリー */}
        <View style={styles.todaySummary}>
          <Text style={styles.todayTitle}>{'\u4ECA\u65E5\u306E\u6210\u7E3E'}</Text>
          <Text style={styles.todayStat}>{`\u30AF\u30EA\u30A2\u6570: ${todayCount}\u30B9\u30C6\u30FC\u30B8`}</Text>
          <Text style={styles.todayStat}>{`\u9023\u7D9A: ${streak}\u65E5\uD83D\uDD25`}</Text>
        </View>
        {top10.length > 0 && (
          <View style={styles.worldRank}>
            <Text style={styles.worldRankText}>{`🌍 ベストスコア: ${top10[0].score.toLocaleString()} (${rankLabel})`}</Text>
          </View>
        )}
        {top10.map((entry, i) => (
          <View key={i} style={[styles.row, i === 0 && styles.rowGold, i === 1 && styles.rowSilver, i === 2 && styles.rowBronze]}>
            <Text style={styles.rank}>#{i + 1}</Text>
            <Text style={styles.score}>{entry.score.toLocaleString()}</Text>
            <Text style={styles.stars}>{'\u2B50'.repeat(entry.stars)}</Text>
            <Text style={styles.stage}>Stage {entry.stageId}</Text>
            <Text style={styles.date}>{entry.date.slice(0, 10)}</Text>
          </View>
        ))}
        {top10.length === 0 && (
          <Text style={styles.empty}>{'\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093' + '\n' + '\u30B9\u30C6\u30FC\u30B8\u3092\u30AF\u30EA\u30A2\u3057\u3088\u3046\uFF01'}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  back: { color: COLORS.primary, fontSize: 16 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: 'bold' },
  sub: { color: COLORS.textSecondary, textAlign: 'center', marginBottom: 8 },
  list: { padding: 16, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardBg, borderRadius: 8, padding: 12, gap: 8, borderWidth: 1, borderColor: COLORS.cardBorder },
  rowGold: { borderColor: '#FFD700' },
  rowSilver: { borderColor: '#C0C0C0' },
  rowBronze: { borderColor: '#CD7F32' },
  rank: { color: COLORS.accent, fontWeight: 'bold', width: 36, fontSize: 16 },
  score: { color: COLORS.text, fontWeight: 'bold', flex: 1, fontSize: 16 },
  stars: { fontSize: 14 },
  stage: { color: COLORS.textSecondary, fontSize: 12 },
  date: { color: COLORS.textSecondary, fontSize: 11 },
  empty: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 40, lineHeight: 28 },
  todaySummary: { backgroundColor: 'rgba(0,191,255,0.1)', borderRadius: 12, padding: 12, marginHorizontal: 16, marginBottom: 8 },
  todayTitle: { color: '#00BFFF', fontSize: 14, fontWeight: 'bold' },
  todayStat: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  worldRank: { backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: 12, padding: 10, marginHorizontal: 16, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)' },
  worldRankText: { color: '#FFD700', fontSize: 13, textAlign: 'center', fontWeight: 'bold' },
});
