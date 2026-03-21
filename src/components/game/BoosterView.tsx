import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Booster } from '../../types';

interface BoosterViewProps {
  data: Booster;
  screenWidth: number;
  screenHeight: number;
}

export function BoosterView({ data, screenWidth, screenHeight }: BoosterViewProps) {
  const cx = data.position.nx * screenWidth;
  const cy = data.position.ny * screenHeight;
  const r = data.radius * Math.min(screenWidth, screenHeight);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const scale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] });
  const opacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.8] });
  const rotation = (data.direction * 180) / Math.PI;

  return (
    <View style={[styles.container, { left: cx - r * 1.5, top: cy - r * 1.5, width: r * 3, height: r * 3 }]}>
      <Animated.View style={[styles.pulse, { width: r * 3, height: r * 3, borderRadius: r * 1.5, transform: [{ scale }], opacity }]} />
      <View style={[styles.icon, { transform: [{ rotate: `${rotation}deg` }] }]}>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    backgroundColor: 'rgba(127,255,0,0.2)',
    borderWidth: 1,
    borderColor: '#7FFF00',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7FFF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
});
