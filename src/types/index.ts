// ========================================
// Vector / Coordinates
// ========================================

export interface Vector2D {
  x: number;
  y: number;
}

export interface NormalizedPosition {
  nx: number;
  ny: number;
}

// ========================================
// Game Objects
// ========================================

export interface RocketState {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;
  fuel: number;
  isLaunched: boolean;
  isAlive: boolean;
  skinId: string;
  trail: Vector2D[];
}

export interface Planet {
  id: string;
  position: NormalizedPosition;
  mass: number;
  radius: number;
  color: string;
  hasRing: boolean;
  type: 'rocky' | 'gas' | 'ice' | 'lava';
}

export interface GoalStar {
  position: NormalizedPosition;
  radius: number;
  pulseSpeed: number;
}

export interface BlackHole {
  id: string;
  position: NormalizedPosition;
  mass: number;
  eventHorizonRadius: number;
  visualRadius: number;
}

export interface Wormhole {
  id: string;
  entryPosition: NormalizedPosition;
  exitPosition: NormalizedPosition;
  entryRadius: number;
  exitRadius: number;
  exitAngle: number;
  speedMultiplier: number;
}

export interface AsteroidBelt {
  id: string;
  points: NormalizedPosition[];
  width: number;
  density: number;
  speed: number;
}

export interface Booster {
  id: string;
  position: NormalizedPosition;
  radius: number;
  direction: number;
  power: number;
}

export type SpecialObject =
  | { type: 'blackhole'; data: BlackHole }
  | { type: 'wormhole'; data: Wormhole }
  | { type: 'asteroidBelt'; data: AsteroidBelt }
  | { type: 'booster'; data: Booster };

// ========================================
// Stages
// ========================================

export interface StageData {
  id: number;
  worldId: number;
  name: string;
  rocketStart: NormalizedPosition;
  rocketAngle: number;
  goalStar: GoalStar;
  planets: Planet[];
  specialObjects: SpecialObject[];
  initialFuel: number;
  starThresholds: StarThresholds;
  maxTrailLength: number;
  bgColor: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface StarThresholds {
  star3: number;
  star2: number;
  star1: number;
}

export interface WorldData {
  id: number;
  name: string;
  description: string;
  themeColor: string;
  bgGradient: [string, string];
  requiredStars: number;
  stageIds: number[];
  icon: string;
}

// ========================================
// Player Data
// ========================================

export interface StageResult {
  stageId: number;
  stars: 0 | 1 | 2 | 3;
  bestFuelRemaining: number;
  clearCount: number;
  bestTrajectory: Vector2D[] | null;
}

export interface PlayerProgress {
  totalStars: number;
  clearedStages: Record<number, StageResult>;
  unlockedWorlds: number[];
  coins: number;
  unlockedSkins: string[];
  equippedSkinId: string;
  achievements: Record<string, AchievementProgress>;
  dailyChallenge: DailyChallengeProgress;
  totalLaunches: number;
  totalPlayTimeMs: number;
}

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  isUnlocked: boolean;
  unlockedAt: number | null;
}

export interface DailyChallengeProgress {
  lastPlayedDate: string;
  streak: number;
  todayCleared: boolean;
  todayStars: 0 | 1 | 2 | 3;
}

// ========================================
// Skins
// ========================================

export interface RocketSkin {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  trailColor: string;
  trailWidth: number;
  glowColor: string;
  unlockCondition: 'default' | 'purchase' | 'achievement' | 'daily';
  achievementId?: string;
}

// ========================================
// Achievements
// ========================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  targetValue: number;
  rewardCoins: number;
  rewardSkinId?: string;
  category: 'launch' | 'clear' | 'star' | 'special' | 'daily';
}

// ========================================
// Daily Challenge
// ========================================

export interface DailyChallenge {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  description: string;
  stageConfig: Omit<StageData, 'id' | 'worldId' | 'name' | 'difficulty'>;
  bonusCoins: number;
}

// ========================================
// Game State
// ========================================

export interface GameState {
  phase: GamePhase;
  rocket: RocketState;
  currentStage: StageData | null;
  slingshotState: SlingshotState;
  elapsedMs: number;
  isPaused: boolean;
}

export type GamePhase =
  | 'aiming'
  | 'flying'
  | 'goal'
  | 'crashed'
  | 'absorbed';

export interface SlingshotState {
  isDragging: boolean;
  dragStart: Vector2D | null;
  dragCurrent: Vector2D | null;
  angle: number;
  power: number;
  predictedTrajectory: Vector2D[];
}

// ========================================
// Settings
// ========================================

export interface AppSettings {
  bgmVolume: number;
  sfxVolume: number;
  hapticsEnabled: boolean;
  showTrajectoryPreview: boolean;
  language: 'ja' | 'en';
}

// ========================================
// Collision
// ========================================

export type CollisionResult =
  | { type: 'none' }
  | { type: 'goal' }
  | { type: 'planet' }
  | { type: 'blackhole' }
  | { type: 'outOfBounds' }
  | { type: 'wormhole'; wormhole: Wormhole }
  | { type: 'booster'; booster: Booster };
