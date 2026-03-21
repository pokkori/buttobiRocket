import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Vector2D } from '../../types';

interface TrailViewProps {
  trail: Vector2D[];
  screenWidth: number;
  screenHeight: number;
}

export function TrailView({ trail, screenWidth, screenHeight }: TrailViewProps) {
  const len = trail.length;
  // Show every 3rd point to reduce render overhead
  const step = Math.max(1, Math.floor(len / 100));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {trail.map((p, i) => {
        if (i % step !== 0 && i !== len - 1) return null;
        const progress = i / len;
        const opacity = 0.1 + progress * 0.7;
        const size = 2 + progress * 3;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: p.x * screenWidth - size / 2,
              top: p.y * screenHeight - size / 2,
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: `rgba(0,191,255,${opacity})`,
            }}
          />
        );
      })}
      {/* Bright head */}
      {len > 0 && (
        <View
          style={{
            position: 'absolute',
            left: trail[len - 1].x * screenWidth - 5,
            top: trail[len - 1].y * screenHeight - 5,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0,191,255,0.9)',
            shadowColor: '#00BFFF',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 8,
          }}
        />
      )}
    </View>
  );
}
