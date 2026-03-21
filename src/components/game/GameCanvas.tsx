import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useGameStore } from '../../stores/gameStore';
import { StarField } from './StarField';
import { PlanetView } from './PlanetView';
import { GoalStarView } from './GoalStarView';
import { RocketView } from './RocketView';
import { TrailView } from './TrailView';
import { BlackHoleView } from './BlackHoleView';
import { WormholeView } from './WormholeView';
import { AsteroidBeltView } from './AsteroidBeltView';
import { BoosterView } from './BoosterView';
import { SlingshotOverlay } from './SlingshotOverlay';
import { PredictionDots } from './PredictionDots';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function GameCanvas() {
  const stage = useGameStore(s => s.currentStage);
  const phase = useGameStore(s => s.phase);
  const rocket = useGameStore(s => s.rocket);
  const slingshot = useGameStore(s => s.slingshotState);
  const usedBoosters = useGameStore(s => s.usedBoosters);
  const tick = useGameStore(s => s.tick);
  const startDrag = useGameStore(s => s.startDrag);
  const updateDrag = useGameStore(s => s.updateDrag);
  const endDrag = useGameStore(s => s.endDrag);

  const animRef = useRef<number>(0);
  const lastTime = useRef<number>(0);

  const gameLoop = useCallback((time: number) => {
    if (lastTime.current === 0) lastTime.current = time;
    const delta = time - lastTime.current;
    if (delta >= 16) { // ~60fps
      tick();
      lastTime.current = time;
    }
    animRef.current = requestAnimationFrame(gameLoop);
  }, [tick]);

  useEffect(() => {
    if (phase === 'flying') {
      lastTime.current = 0;
      animRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase, gameLoop]);

  const toNormalized = useCallback((x: number, y: number) => {
    return { x: x / SCREEN_WIDTH, y: y / SCREEN_HEIGHT };
  }, []);

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      if (phase !== 'aiming') return;
      startDrag(toNormalized(e.x, e.y));
    })
    .onUpdate((e) => {
      if (phase !== 'aiming') return;
      updateDrag(toNormalized(e.x, e.y));
    })
    .onEnd(() => {
      endDrag();
    })
    .minDistance(0);

  if (!stage) return null;

  const bgColor = stage.bgColor || '#0A0E27';

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <StarField />

        {/* Special objects (behind planets) */}
        {stage.specialObjects.map((obj, i) => {
          switch (obj.type) {
            case 'blackhole':
              return <BlackHoleView key={`bh-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'wormhole':
              return <WormholeView key={`wh-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'asteroidBelt':
              return <AsteroidBeltView key={`ab-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />;
            case 'booster':
              return !usedBoosters.has(obj.data.id) ? (
                <BoosterView key={`bo-${i}`} data={obj.data} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
              ) : null;
            default:
              return null;
          }
        })}

        {/* Planets */}
        {stage.planets.map(planet => (
          <PlanetView key={planet.id} planet={planet} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        ))}

        {/* Goal */}
        <GoalStarView goal={stage.goalStar} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />

        {/* Trail */}
        {rocket.trail.length > 1 && (
          <TrailView trail={rocket.trail} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {/* Prediction dots (aiming phase) */}
        {phase === 'aiming' && slingshot.predictedTrajectory.length > 0 && (
          <PredictionDots points={slingshot.predictedTrajectory} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {/* Slingshot UI */}
        {phase === 'aiming' && slingshot.isDragging && (
          <SlingshotOverlay
            rocketPos={rocket.position}
            dragPos={slingshot.dragCurrent!}
            power={slingshot.power}
            angle={slingshot.angle}
            screenWidth={SCREEN_WIDTH}
            screenHeight={SCREEN_HEIGHT}
          />
        )}

        {/* Rocket */}
        {rocket.isAlive && (
          <RocketView rocket={rocket} screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT} />
        )}

        {/* Crash flash */}
        {(phase === 'crashed' || phase === 'absorbed') && (
          <View style={[styles.flash, { backgroundColor: phase === 'absorbed' ? 'rgba(128,0,255,0.3)' : 'rgba(255,0,0,0.3)' }]} />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'hidden',
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
});
