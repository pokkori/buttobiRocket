import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Wormhole } from '../../types';

interface WormholeViewProps {
  data: Wormhole;
  screenWidth: number;
  screenHeight: number;
}

export function WormholeView({ data, screenWidth, screenHeight }: WormholeViewProps) {
  const entryX = data.entryPosition.nx * screenWidth;
  const entryY = data.entryPosition.ny * screenHeight;
  const exitX = data.exitPosition.nx * screenWidth;
  const exitY = data.exitPosition.ny * screenHeight;
  const er = data.entryRadius * Math.min(screenWidth, screenHeight);
  const xr = data.exitRadius * Math.min(screenWidth, screenHeight);

  const rotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotAnim, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: false })
    ).start();
  }, []);

  const rotate = rotAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <>
      {/* Entry portal (cyan) */}
      <Animated.View
        style={[styles.portal, {
          left: entryX - er,
          top: entryY - er,
          width: er * 2,
          height: er * 2,
          borderRadius: er,
          borderColor: '#00FFFF',
          transform: [{ rotate }],
        }]}
      >
        <View style={[styles.innerDot, { backgroundColor: '#00FFFF' }]} />
      </Animated.View>

      {/* Exit portal (magenta) */}
      <View
        style={[styles.portal, {
          left: exitX - xr,
          top: exitY - xr,
          width: xr * 2,
          height: xr * 2,
          borderRadius: xr,
          borderColor: '#FF00FF',
        }]}
      >
        <View style={[styles.innerDot, { backgroundColor: '#FF00FF' }]} />
      </View>

      {/* Dashed connecting line (simplified as dotted) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const t = (i + 0.5) / 8;
          const x = entryX + (exitX - entryX) * t;
          const y = entryY + (exitY - entryY) * t;
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: x - 1.5,
                top: y - 1.5,
                width: 3,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: 'rgba(255,255,255,0.15)',
              }}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  portal: {
    position: 'absolute',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
});
