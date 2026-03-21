import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Vector2D } from '../../types';

interface SlingshotOverlayProps {
  rocketPos: Vector2D;
  dragPos: Vector2D;
  power: number;
  angle: number;
  screenWidth: number;
  screenHeight: number;
}

export function SlingshotOverlay({ rocketPos, dragPos, power, screenWidth, screenHeight }: SlingshotOverlayProps) {
  const rx = rocketPos.x * screenWidth;
  const ry = rocketPos.y * screenHeight;
  const dx = dragPos.x * screenWidth;
  const dy = dragPos.y * screenHeight;

  // Power color: green -> yellow -> red
  const r = Math.round(power * 255);
  const g = Math.round((1 - power) * 255);
  const powerColor = `rgb(${r},${g},0)`;

  // Draw dots along the drag line
  const dotCount = 8;
  const dots = [];
  for (let i = 0; i <= dotCount; i++) {
    const t = i / dotCount;
    const x = rx + (dx - rx) * t;
    const y = ry + (dy - ry) * t;
    dots.push({ x, y, key: i });
  }

  // Arrow on the opposite side
  const arrowLen = power * 60;
  const dirX = rx - dx;
  const dirY = ry - dy;
  const dirLen = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const nDirX = dirX / dirLen;
  const nDirY = dirY / dirLen;
  const arrowEndX = rx + nDirX * arrowLen;
  const arrowEndY = ry + nDirY * arrowLen;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Drag line dots */}
      {dots.map(d => (
        <View
          key={d.key}
          style={{
            position: 'absolute',
            left: d.x - 2,
            top: d.y - 2,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        />
      ))}

      {/* Direction arrow dots */}
      {Array.from({ length: 5 }).map((_, i) => {
        const t = (i + 1) / 5;
        const x = rx + (arrowEndX - rx) * t;
        const y = ry + (arrowEndY - ry) * t;
        return (
          <View
            key={`a-${i}`}
            style={{
              position: 'absolute',
              left: x - 3,
              top: y - 3,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: powerColor,
              opacity: 0.6 + t * 0.4,
            }}
          />
        );
      })}

      {/* Power indicator at rocket */}
      <View
        style={{
          position: 'absolute',
          left: rx - 20,
          top: ry - 20,
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: powerColor,
          opacity: 0.6,
        }}
      />
    </View>
  );
}
