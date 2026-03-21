import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RocketState } from '../../types';

interface RocketViewProps {
  rocket: RocketState;
  screenWidth: number;
  screenHeight: number;
}

export function RocketView({ rocket, screenWidth, screenHeight }: RocketViewProps) {
  const cx = rocket.position.x * screenWidth;
  const cy = rocket.position.y * screenHeight;
  const rotation = (rocket.rotation * 180) / Math.PI + 90; // Adjust to point upward

  return (
    <View
      style={[
        styles.container,
        {
          left: cx - 14,
          top: cy - 14,
          transform: [{ rotate: `${rotation}deg` }],
        },
      ]}
    >
      <Text style={styles.emoji}>🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
});
