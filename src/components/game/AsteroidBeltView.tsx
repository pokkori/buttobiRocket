import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsteroidBelt } from '../../types';

interface AsteroidBeltViewProps {
  data: AsteroidBelt;
  screenWidth: number;
  screenHeight: number;
}

export function AsteroidBeltView({ data, screenWidth, screenHeight }: AsteroidBeltViewProps) {
  const asteroids = useMemo(() => {
    const result: { x: number; y: number; size: number; color: string }[] = [];
    const count = data.density * 10;
    let seed = 42 + data.id.charCodeAt(0);

    for (let i = 0; i < count; i++) {
      seed = (seed * 16807) % 2147483647;
      const t = i / count;
      // Interpolate along the points
      const totalSegments = data.points.length - 1;
      const segIdx = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
      const segT = (t * totalSegments) - segIdx;
      const p0 = data.points[segIdx];
      const p1 = data.points[Math.min(segIdx + 1, data.points.length - 1)];
      const baseX = (p0.nx + (p1.nx - p0.nx) * segT) * screenWidth;
      const baseY = (p0.ny + (p1.ny - p0.ny) * segT) * screenHeight;

      // Random offset within width
      const halfW = (data.width / 2) * Math.min(screenWidth, screenHeight);
      const offsetX = ((seed % 1000) / 1000 - 0.5) * halfW * 2;
      seed = (seed * 16807) % 2147483647;
      const offsetY = ((seed % 1000) / 1000 - 0.5) * halfW * 2;
      seed = (seed * 16807) % 2147483647;
      const size = 3 + (seed % 6);
      seed = (seed * 16807) % 2147483647;
      const gray = 128 + (seed % 40);
      result.push({
        x: baseX + offsetX,
        y: baseY + offsetY,
        size,
        color: `rgb(${gray},${gray},${gray})`,
      });
    }
    return result;
  }, [data, screenWidth, screenHeight]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {asteroids.map((a, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: a.x - a.size / 2,
            top: a.y - a.size / 2,
            width: a.size,
            height: a.size,
            borderRadius: a.size / 3,
            backgroundColor: a.color,
          }}
        />
      ))}
    </View>
  );
}
