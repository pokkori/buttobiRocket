import { create } from 'zustand';
import { GameState, GamePhase, RocketState, SlingshotState, StageData, Vector2D, Wormhole, Booster, NormalizedPosition } from '../types';
import { PHYSICS } from '../constants/physics';
import { updatePhysics } from '../engine/PhysicsEngine';
import { checkCollisions } from '../engine/CollisionDetector';
import { calculateSlingshot } from '../engine/SlingshotCalculator';
import { predictTrajectory } from '../engine/TrajectoryCalculator';
import { add, fromAngle, copy, magnitude } from '../utils/vector';

interface GameStore extends GameState {
  frameCount: number;
  usedBoosters: Set<string>;
  wormholeCooldown: number;
  failCount: number;
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
    if (state.phase !== 'flying' || state.isPaused || !state.currentStage) return;

    const dt = PHYSICS.TIME_STEP;
    const newFrameCount = state.frameCount + 1;

    // Update physics
    let newRocket = updatePhysics(state.rocket, state.currentStage, dt, newFrameCount);

    // Decrease wormhole cooldown
    const newCooldown = Math.max(0, state.wormholeCooldown - 1);

    // Check collisions
    const collision = checkCollisions(newRocket, state.currentStage, state.usedBoosters, newCooldown);

    let newPhase: GamePhase = 'flying';
    const newUsedBoosters = new Set(state.usedBoosters);
    let wormholeCd = newCooldown;

    switch (collision.type) {
      case 'goal':
        newPhase = 'goal';
        break;
      case 'planet':
        newPhase = 'crashed';
        newRocket = { ...newRocket, isAlive: false };
        break;
      case 'blackhole':
        newPhase = 'absorbed';
        newRocket = { ...newRocket, isAlive: false };
        break;
      case 'outOfBounds':
        newPhase = 'crashed';
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
    });
  },

  setPaused: (paused) => set({ isPaused: paused }),
}));
