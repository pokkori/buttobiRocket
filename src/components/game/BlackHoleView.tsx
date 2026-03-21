import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { BlackHole } from '../../types';

interface BlackHoleViewProps {
  data: BlackHole;
  screenWidth: number;
  screenHeight: number;
}

export function BlackHoleView({ data, screenWidth, screenHeight }: BlackHoleViewProps) {
  const cx = data.position.nx * screenWidth;
  const cy = data.position.ny * screenHeight;
  const vr = data.visualRadius * Math.min(screenWidth, screenHeight);
  const ehr = data.eventHorizonRadius * Math.min(screenWidth, screenHeight);
  const rotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotAnim, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: false })
    ).start();
  }, []);

  const rotate = rotAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={[styles.container, { left: cx - vr, top: cy - vr, width: vr * 2, height: vr * 2 }]}>
      {/* Accretion disk rings */}
      {[0, 1, 2, 3].map(i => {
        const ringR = vr * (0.6 + i * 0.15);
        const colors = ['#FF6B35', '#FFD700', '#00D4FF', '#FF1493'];
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: vr - ringR,
              top: vr - ringR,
              width: ringR * 2,
              height: ringR * 2,
              borderRadius: ringR,
              borderWidth: 2,
              borderColor: colors[i] + '66',
              transform: [{ rotate }],
            }}
          />
        );
      })}
      {/* Event horizon */}
      <View
        style={[styles.core, {
          left: vr - ehr,
          top: vr - ehr,
          width: ehr * 2,
          height: ehr * 2,
          borderRadius: ehr,
        }]}
      />
      {/* Rim light */}
      <View
        style={{
          position: 'absolute',
          left: vr - ehr - 1,
          top: vr - ehr - 1,
          width: ehr * 2 + 2,
          height: ehr * 2 + 2,
          borderRadius: ehr + 1,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  core: {
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
