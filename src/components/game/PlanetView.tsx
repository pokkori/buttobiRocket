import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Planet } from '../../types';

interface PlanetViewProps {
  planet: Planet;
  screenWidth: number;
  screenHeight: number;
}

export function PlanetView({ planet, screenWidth, screenHeight }: PlanetViewProps) {
  const cx = planet.position.nx * screenWidth;
  const cy = planet.position.ny * screenHeight;
  const r = planet.radius * Math.min(screenWidth, screenHeight);

  return (
    <View
      style={[
        styles.planet,
        {
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          backgroundColor: planet.color,
          shadowColor: planet.color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: r * 0.5,
        },
      ]}
    >
      {planet.hasRing && (
        <View
          style={[
            styles.ring,
            {
              width: r * 2.8,
              height: r * 0.5,
              borderRadius: r * 1.4,
              borderColor: `${planet.color}88`,
              left: -r * 0.4,
              top: r - r * 0.25,
            },
          ]}
        />
      )}
      {/* Surface detail */}
      <View
        style={{
          position: 'absolute',
          width: r * 0.6,
          height: r * 0.6,
          borderRadius: r * 0.3,
          backgroundColor: 'rgba(0,0,0,0.15)',
          top: r * 0.3,
          left: r * 0.5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  planet: {
    position: 'absolute',
    overflow: 'visible',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});
