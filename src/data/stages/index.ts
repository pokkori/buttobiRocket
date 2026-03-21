import { StageData } from '../../types';
import { WORLD1_STAGES } from './world1';
import { WORLD2_STAGES } from './world2';
import { WORLD3_STAGES } from './world3';
import { WORLD4_STAGES } from './world4';
import { WORLD5_STAGES } from './world5';

export const ALL_STAGES: StageData[] = [
  ...WORLD1_STAGES,
  ...WORLD2_STAGES,
  ...WORLD3_STAGES,
  ...WORLD4_STAGES,
  ...WORLD5_STAGES,
];

export function getStageById(id: number): StageData | undefined {
  return ALL_STAGES.find(s => s.id === id);
}

export function getStagesByWorldId(worldId: number): StageData[] {
  return ALL_STAGES.filter(s => s.worldId === worldId);
}
