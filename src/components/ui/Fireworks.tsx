import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: SW, height: SH } = Dimensions.get('window');

interface Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  anim: Animated.Value;
  dx: number;
  dy: number;
  delay: number;
}

const COLORS = ['#FFD700', '#FF6B6B', '#00BFFF', '#7CFC00', '#FF69B4', '#FFA500', '#BA55D3'];

function createParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  // Create several burst points
  const bursts = [
    { x: SW * 0.3, y: SH * 0.25 },
    { x: SW * 0.7, y: SH * 0.2 },
    { x: SW * 0.5, y: SH * 0.35 },
    { x: SW * 0.2, y: SH * 0.4 },
    { x: SW * 0.8, y: SH * 0.3 },
  ];

  for (let b = 0; b < bursts.length; b++) {
    const burst = bursts[b];
    const perBurst = Math.floor(count / bursts.length);
    for (let i = 0; i < perBurst; i++) {
      const angle = (Math.PI * 2 * i) / perBurst + Math.random() * 0.3;
      const speed = 40 + Math.random() * 80;
      particles.push({
        x: burst.x,
        y: burst.y,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 3 + Math.random() * 5,
        anim: new Animated.Value(0),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        delay: b * 300 + Math.random() * 100,
      });
    }
  }
  return particles;
}

interface FireworksProps {
  active: boolean;
}

export function Fireworks({ active }: FireworksProps) {
  const particles = useRef<Particle[]>(createParticles(40)).current;

  useEffect(() => {
    if (!active) return;
    particles.forEach(p => {
      Animated.timing(p.anim, {
        toValue: 1,
        duration: 1200,
        delay: p.delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  }, [active]);

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p, i) => {
        const translateX = p.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.dx],
        });
        const translateY = p.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.dy + 40], // gravity pull
        });
        const opacity = p.anim.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 1, 1, 0],
        });
        const scale = p.anim.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0, 1.2, 0.3],
        });

        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: p.color,
              opacity,
              transform: [{ translateX }, { translateY }, { scale }],
              shadowColor: p.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
