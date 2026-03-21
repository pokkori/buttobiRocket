import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface CoinDisplayProps {
  amount: number;
  size?: number;
}

export function CoinDisplay({ amount, size = 16 }: CoinDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { fontSize: size }]}>&#x1F4B0;</Text>
      <Text style={[styles.text, { fontSize: size }]}>{amount.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  icon: {
    color: COLORS.accent,
  },
  text: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
