import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { RocketState } from '../../types';

interface RocketViewProps {
  rocket: RocketState;
  screenWidth: number;
  screenHeight: number;
}

// Simple exhaust particles
function ExhaustParticles({ isFlying }: { isFlying: boolean }) {
  const particles = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      anim: new Animated.Value(0),
      delay: i * 80,
      offsetX: (Math.random() - 0.5) * 6,
    }))
  ).current;

  useEffect(() => {
    if (!isFlying) return;
    particles.forEach(p => {
      const loop = () => {
        p.anim.setValue(0);
        Animated.timing(p.anim, {
          toValue: 1,
          duration: 400 + Math.random() * 200,
          delay: p.delay,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start(() => loop());
      };
      loop();
    });
  }, [isFlying]);

  if (!isFlying) return null;

  return (
    <View style={exhaustStyles.container}>
      {particles.map((p, i) => {
        const translateY = p.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 18 + Math.random() * 8],
        });
        const opacity = p.anim.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0.9, 0.6, 0],
        });
        const scale = p.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.2],
        });
        const size = 3 + Math.random() * 2;
        const color = i % 2 === 0 ? '#FFA500' : '#FF4444';
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              bottom: -4,
              left: 12 + p.offsetX,
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              opacity,
              transform: [{ translateY }, { scale }],
            }}
          />
        );
      })}
    </View>
  );
}

export function RocketView({ rocket, screenWidth, screenHeight }: RocketViewProps) {
  const cx = rocket.position.x * screenWidth;
  const cy = rocket.position.y * screenHeight;
  const rotation = (rocket.rotation * 180) / Math.PI + 90;

  return (
    <View
      style={[
        styles.container,
        {
          left: cx - 15,
          top: cy - 20,
          transform: [{ rotate: `${rotation}deg` }],
        },
      ]}
    >
      {/* Exhaust particles */}
      <ExhaustParticles isFlying={rocket.isLaunched} />

      {/* Nose cone (triangle via border trick) */}
      <View style={styles.noseCone} />

      {/* Body */}
      <View style={styles.body}>
        {/* Window */}
        <View style={styles.window} />
      </View>

      {/* Fins */}
      <View style={styles.finContainer}>
        <View style={[styles.fin, styles.finLeft]} />
        <View style={styles.nozzle} />
        <View style={[styles.fin, styles.finRight]} />
      </View>

      {/* Engine glow when flying */}
      {rocket.isLaunched && (
        <View style={styles.engineGlow} />
      )}
    </View>
  );
}

const exhaustStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    height: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 30,
    height: 40,
    alignItems: 'center',
  },
  noseCone: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF4444',
    zIndex: 2,
  },
  body: {
    width: 16,
    height: 18,
    backgroundColor: '#E8E8E8',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  window: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90D9',
    borderWidth: 1,
    borderColor: '#6BB5FF',
  },
  finContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 0,
  },
  fin: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: '#CC3333',
  },
  finLeft: {
    borderLeftWidth: 6,
    borderLeftColor: 'transparent',
    borderRightWidth: 0,
  },
  finRight: {
    borderRightWidth: 6,
    borderRightColor: 'transparent',
    borderLeftWidth: 0,
  },
  nozzle: {
    width: 8,
    height: 4,
    backgroundColor: '#888888',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  engineGlow: {
    position: 'absolute',
    bottom: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,165,0,0.4)',
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    alignSelf: 'center',
  },
});
