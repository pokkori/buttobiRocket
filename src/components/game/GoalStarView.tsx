import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { GoalStar } from '../../types';

interface GoalStarViewProps {
  goal: GoalStar;
  screenWidth: number;
  screenHeight: number;
}

export function GoalStarView({ goal, screenWidth, screenHeight }: GoalStarViewProps) {
  const cx = goal.position.nx * screenWidth;
  const cy = goal.position.ny * screenHeight;
  const r = goal.radius * Math.min(screenWidth, screenHeight);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000 / goal.pulseSpeed, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000 / goal.pulseSpeed, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const scale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const opacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <View style={[styles.container, { left: cx - r * 2, top: cy - r * 2, width: r * 4, height: r * 4 }]}>
      <Animated.View
        style={[
          styles.glow,
          {
            width: r * 4,
            height: r * 4,
            borderRadius: r * 2,
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
      <View style={[styles.star, { width: r * 2, height: r * 2, borderRadius: r, left: r, top: r }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
