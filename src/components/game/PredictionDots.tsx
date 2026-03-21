import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Vector2D } from '../../types';

interface PredictionDotsProps {
  points: Vector2D[];
  screenWidth: number;
  screenHeight: number;
}

export function PredictionDots({ points, screenWidth, screenHeight }: PredictionDotsProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {points.map((p, i) => {
        const opacity = 0.5 - (i / points.length) * 0.4;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: p.x * screenWidth - 2,
              top: p.y * screenHeight - 2,
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: `rgba(255,255,255,${opacity})`,
            }}
          />
        );
      })}
    </View>
  );
}
