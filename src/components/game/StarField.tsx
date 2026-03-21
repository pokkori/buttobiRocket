import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export function StarField() {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i++) {
      const seed = (i * 16807 + 1) % 2147483647;
      const x = (seed % 1000) / 1000 * width;
      const y = ((seed * 7 + 3) % 1000) / 1000 * height;
      const size = 1 + (seed % 3);
      const opacity = 0.3 + (seed % 7) / 10;
      result.push({ x, y, size, opacity, key: i });
    }
    return result;
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map(s => (
        <View
          key={s.key}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: `rgba(255,255,255,${s.opacity})`,
          }}
        />
      ))}
    </View>
  );
}
