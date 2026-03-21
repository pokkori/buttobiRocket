import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FuelGaugeProps {
  fuel: number;
}

export function FuelGauge({ fuel }: FuelGaugeProps) {
  const percent = Math.round(fuel * 100);
  const barColor = fuel > 0.5 ? '#00FF7F' : fuel > 0.25 ? '#FFD700' : '#FF4444';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>FUEL</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.percent, { color: barColor }]}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: '#FFFFFF88',
    fontSize: 11,
    fontWeight: '600',
  },
  barBg: {
    width: 80,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  percent: {
    fontSize: 11,
    fontWeight: '700',
    width: 32,
    textAlign: 'right',
  },
});
