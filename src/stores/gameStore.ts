import { create } from 'zustand';
import { GameState, GamePhase, RocketState, SlingshotState, StageData, Vector2D, Wormhole, Booster, NormalizedPosition } from '../types';
import { PHYSICS } from '../constants/physics';
import { updatePhysics } from '../engine/PhysicsEngine';
import { checkCollisions } from '../engine/CollisionDetector';
import { calculateSlingshot } from '../engine/SlingshotCalculator';
import { predictTrajectory } from '../engine/TrajectoryCalculator';
import { add, fromAngle, copy, magnitude, distance } from '../utils/vector';

export type CollisionEvent = 'none' | 'wormhole' | 'booster' | 'goal' | 'crashed' | 'absorbed';

export interface ProximityData {
  closestPlanetDist: number;
  closestBlackHoleDist: number;
}

interface GameStore extends GameState {
  frameCount: number;
  usedBoosters: Set<string>;
  wormholeCooldown: number;
  failCount: number;
  lastCollisionEvent: CollisionEvent;
  proximity: ProximityData;
  timeScale: number;
  goalSlowMoTimer: number;
  setStage: (stage: StageData) => void;
  reset: () => void;
  startDrag: (pos: Vector2D) => void;
  updateDrag: (pos: Vector2D) => void;
  endDrag: () => void;
  tick: () => void;
  setPaused: (paused: boolean) => void;
}

function npToV2(np: NormalizedPosition): Vector2D {
  return { x: np.nx, y: np.ny };
}

const defaultRocket: RocketState = {
  position: { x: 0.5, y: 0.8 },
  velocity: { x: 0, y: 0 },
  rotation: -Math.PI / 2,
  fuel: 1.0,
  isLaunched: false,
  isAlive: true,
  skinId: 'default',
  trail: [],
};

const defaultSlingshot: SlingshotState = {
  isDragging: false,
  dragStart: null,
  dragCurrent: null,
  angle: 0,
  power: 0,
  predictedTrajectory: [],
};

const defaultProximity: ProximityData = { closestPlanetDist: 999, closestBlackHoleDist: 999 };

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'aiming',
  rocket: { ...defaultRocket },
  currentStage: null,
  slingshotState: { ...defaultSlingshot },
  elapsedMs: 0,
  isPaused: false,
  frameCount: 0,
  usedBoosters: new Set(),
  wormholeCooldown: 0,
  failCount: 0,
  lastCollisionEvent: 'none',
  proximity: { ...defaultProximity },
  timeScale: 1,
  goalSlowMoTimer: 0,

  setStage: (stage) => {
    set({
      currentStage: stage,
      phase: 'aiming',
      rocket: {
        ...defaultRocket,
        position: npToV2(stage.rocketStart),
        rotation: stage.rocketAngle,
        fuel: stage.initialFuel,
      },
      slingshotState: { ...defaultSlingshot },
      elapsedMs: 0,
      frameCount: 0,
      usedBoosters: new Set(),
      wormholeCooldown: 0,
      failCount: 0,
      lastCollisionEvent: 'none',
      proximity: { ...defaultProximity },
      timeScale: 1,
      goalSlowMoTimer: 0,
    });
  },

  reset: () => {
    const stage = get().currentStage;
    if (!stage) return;
    set(state => ({
      phase: 'aiming',
      rocket: {
        ...defaultRocket,
        position: npToV2(stage.rocketStart),
        rotation: stage.rocketAngle,
        fuel: stage.initialFuel,
      },
      slingshotState: { ...defaultSlingshot },
      elapsedMs: 0,
      frameCount: 0,
      usedBoosters: new Set(),
      wormholeCooldown: 0,
      failCount: state.phase === 'crashed' || state.phase === 'absorbed' ? state.failCount + 1 : state.failCount,
      lastCollisionEvent: 'none',
      proximity: { ...defaultProximity },
      timeScale: 1,
      goalSlowMoTimer: 0,
    }));
  },

  startDrag: (pos) => {
    const state = get();
    if (state.phase !== 'aiming') return;
    set({
      slingshotState: {
        ...state.slingshotState,
        isDragging: true,
        dragStart: copy(pos),
        dragCurrent: copy(pos),
      },
    });
  },

  updateDrag: (pos) => {
    const state = get();
    if (!state.slingshotState.isDragging || state.phase !== 'aiming' || !state.currentStage) return;

    const result = calculateSlingshot(state.rocket.position, pos);
    const predicted = result.power > PHYSICS.MIN_POWER_THRESHOLD
      ? predictTrajectory(state.rocket.position, result.launchVelocity, state.currentStage)
      : [];

    set({
      slingshotState: {
        ...state.slingshotState,
        dragCurrent: copy(pos),
        angle: result.angle,
        power: result.power,
        predictedTrajectory: predicted,
      },
    });
  },

  endDrag: () => {
    const state = get();
    if (!state.slingshotState.isDragging || state.phase !== 'aiming') return;

    if (state.slingshotState.power > PHYSICS.MIN_POWER_THRESHOLD) {
      const result = calculateSlingshot(state.rocket.position, state.slingshotState.dragCurrent!);
      set({
        phase: 'flying',
        rocket: {
          ...state.rocket,
          velocity: result.launchVelocity,
          isLaunched: true,
        },
        slingshotState: { ...defaultSlingshot },
      });
    } else {
      set({
        slingshotState: { ...defaultSlingshot },
      });
    }
  },

  tick: () => {
    const state = get();
    if (state.isPaused || !state.currentStage) return;

    // Goal slow-motion countdown: keep ticking with reduced timeScale until timer expires
    if (state.goalSlowMoTimer > 0) {
      const remaining = state.goalSlowMoTimer - 1;
      if (remaining <= 0) {
        // Slow-motion finished, transition to goal phase
        set({ phase: 'goal', timeScale: 1, goalSlowMoTimer: 0 });
        return;
      }
      // Ease timeScale back toward 1.0 in the last 15 frames
      const newTimeScale = remaining < 15 ? 0.3 + 0.7 * (1 - remaining / 15) : 0.3;
      // Continue physics at slow speed
      const dt = PHYSICS.TIME_STEP * newTimeScale;
      const newRocket = updatePhysics(state.rocket, state.currentStage, dt, state.frameCount + 1);
      set({
        rocket: newRocket,
        frameCount: state.frameCount + 1,
        elapsedMs: state.elapsedMs + dt * 1000,
        timeScale: newTimeScale,
        goalSlowMoTimer: remaining,
      });
      return;
    }

    if (state.phase !== 'flying') return;

    const dt = PHYSICS.TIME_STEP;
    const newFrameCount = state.frameCount + 1;

    // Update physics
    let newRocket = updatePhysics(state.rocket, state.currentStage, dt, newFrameCount);

    // Decrease wormhole cooldown
    const newCooldown = Math.max(0, state.wormholeCooldown - 1);

    // Check collisions
    const collision = checkCollisions(newRocket, state.currentStage, state.usedBoosters, newCooldown);

    // Compute proximity to planets and black holes (before switch so goal case can use them)
    let closestPlanetDist = 999;
    for (const planet of state.currentStage.planets) {
      const d = distance(newRocket.position, npToV2(planet.position));
      if (d < closestPlanetDist) closestPlanetDist = d;
    }
    let closestBlackHoleDist = 999;
    for (const obj of state.currentStage.specialObjects) {
      if (obj.type === 'blackhole') {
        const d = distance(newRocket.position, npToV2(obj.data.position));
        if (d < closestBlackHoleDist) closestBlackHoleDist = d;
      }
    }

    let newPhase: GamePhase = 'flying';
    const newUsedBoosters = new Set(state.usedBoosters);
    let wormholeCd = newCooldown;
    let collisionEvent: CollisionEvent = 'none';

    switch (collision.type) {
      case 'goal':
        // Start slow-motion instead of immediate goal phase
        collisionEvent = 'goal';
        set({
          rocket: newRocket,
          frameCount: newFrameCount,
          elapsedMs: state.elapsedMs + dt * 1000,
          usedBoosters: newUsedBoosters,
          wormholeCooldown: wormholeCd,
          lastCollisionEvent: 'goal',
          timeScale: 0.3,
          goalSlowMoTimer: 45, // ~0.75s real time at 60fps
          proximity: { closestPlanetDist, closestBlackHoleDist },
        });
        return; // Skip the normal set() at the bottom
      case 'planet':
        newPhase = 'crashed';
        collisionEvent = 'crashed';
        newRocket = { ...newRocket, isAlive: false };
        break;
      case 'blackhole':
        newPhase = 'absorbed';
        collisionEvent = 'absorbed';
        newRocket = { ...newRocket, isAlive: false };
        break;
      case 'outOfBounds':
        newPhase = 'crashed';
        collisionEvent = 'crashed';
        newRocket = { ...newRocket, isAlive: false };
        break;
      case 'wormhole': {
        const wh = collision.wormhole;
        const exitPos = npToV2(wh.exitPosition);
        const speed = magnitude(newRocket.velocity) * wh.speedMultiplier;
        newRocket = {
          ...newRocket,
          position: copy(exitPos),
          velocity: fromAngle(wh.exitAngle, speed),
        };
        wormholeCd = PHYSICS.WORMHOLE_COOLDOWN_FRAMES;
        collisionEvent = 'wormhole';
        break;
      }
      case 'booster': {
        const b = collision.booster;
        const boostVec = fromAngle(b.direction, b.power * dt);
        newRocket = {
          ...newRocket,
          velocity: add(newRocket.velocity, boostVec),
        };
        newUsedBoosters.add(b.id);
        collisionEvent = 'booster';
        break;
      }
    }

    set({
      phase: newPhase,
      rocket: newRocket,
      elapsedMs: state.elapsedMs + dt * 1000,
      frameCount: newFrameCount,
      usedBoosters: newUsedBoosters,
      wormholeCooldown: wormholeCd,
      lastCollisionEvent: collisionEvent,
      proximity: { closestPlanetDist, closestBlackHoleDist },
    });
  },

  setPaused: (paused) => set({ isPaused: paused }),
}));
