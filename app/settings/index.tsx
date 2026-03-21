import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { COLORS } from '../../src/constants/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const settings = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>⚙ 設定</Text>
        <View style={{ width: 48 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.section}>サウンド</Text>
        <View style={styles.row}>
          <Text style={styles.label}>BGM</Text>
          <View style={styles.sliderRow}>
            {[0, 0.25, 0.5, 0.75, 1.0].map(v => (
              <TouchableOpacity
                key={v}
                style={[styles.volDot, { backgroundColor: settings.bgmVolume >= v ? COLORS.primary : COLORS.locked }]}
                onPress={() => settings.update({ bgmVolume: v })}
              />
            ))}
            <Text style={styles.volText}>{Math.round(settings.bgmVolume * 100)}%</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>効果音</Text>
          <View style={styles.sliderRow}>
            {[0, 0.25, 0.5, 0.75, 1.0].map(v => (
              <TouchableOpacity
                key={v}
                style={[styles.volDot, { backgroundColor: settings.sfxVolume >= v ? COLORS.primary : COLORS.locked }]}
                onPress={() => settings.update({ sfxVolume: v })}
              />
            ))}
            <Text style={styles.volText}>{Math.round(settings.sfxVolume * 100)}%</Text>
          </View>
        </View>

        <Text style={styles.section}>ゲーム</Text>
        <View style={styles.row}>
          <Text style={styles.label}>振動</Text>
          <Switch
            value={settings.hapticsEnabled}
            onValueChange={v => settings.update({ hapticsEnabled: v })}
            trackColor={{ false: COLORS.locked, true: COLORS.primary }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>予測軌道</Text>
          <Switch
            value={settings.showTrajectoryPreview}
            onValueChange={v => settings.update({ showTrajectoryPreview: v })}
            trackColor={{ false: COLORS.locked, true: COLORS.primary }}
          />
        </View>

        <Text style={styles.section}>その他</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
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
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  content: { paddingHorizontal: 24, paddingTop: 16 },
  section: { fontSize: 14, fontWeight: '700', color: COLORS.textSecondary, marginTop: 20, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder,
  },
  label: { color: COLORS.text, fontSize: 16 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  volDot: { width: 16, height: 16, borderRadius: 8 },
  volText: { color: COLORS.textSecondary, fontSize: 13, width: 40, textAlign: 'right' },
  version: { color: COLORS.locked, fontSize: 13, textAlign: 'center', marginTop: 40 },
});
