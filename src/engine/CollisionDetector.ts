import { RocketState, StageData, CollisionResult, NormalizedPosition, Vector2D } from '../types';
import { PHYSICS } from '../constants/physics';
import { distance, distanceToLineSegment } from '../utils/vector';

function npToV2(np: NormalizedPosition): Vector2D {
  return { x: np.nx, y: np.ny };
}

export function checkCollisions(
  rocket: RocketState,
  stage: StageData,
  usedBoosters: Set<string>,
  wormholeCooldown: number
): CollisionResult {
  const rocketPos = rocket.position;

  // 1. Goal check
  const goalPos = npToV2(stage.goalStar.position);
  const goalDist = distance(rocketPos, goalPos);
  if (goalDist < stage.goalStar.radius) {
    return { type: 'goal' };
  }

  // 2. Planet collision
  for (const planet of stage.planets) {
    const planetPos = npToV2(planet.position);
    const planetDist = distance(rocketPos, planetPos);
    if (planetDist < planet.radius) {
      return { type: 'planet' };
    }
  }

  // 3. Special objects
  for (const obj of stage.specialObjects) {
    if (obj.type === 'blackhole') {
      const bhPos = npToV2(obj.data.position);
      const bhDist = distance(rocketPos, bhPos);
      if (bhDist < obj.data.eventHorizonRadius) {
        return { type: 'blackhole' };
      }
    }

    if (obj.type === 'wormhole' && wormholeCooldown <= 0) {
      const entryPos = npToV2(obj.data.entryPosition);
      const entryDist = distance(rocketPos, entryPos);
      if (entryDist < obj.data.entryRadius) {
        return { type: 'wormhole', wormhole: obj.data };
      }
    }

    if (obj.type === 'asteroidBelt') {
      const points = obj.data.points.map(npToV2);
      for (let i = 0; i < points.length - 1; i++) {
        const segDist = distanceToLineSegment(rocketPos, points[i], points[i + 1]);
        if (segDist < obj.data.width / 2) {
          return { type: 'planet' };
        }
      }
    }

    if (obj.type === 'booster' && !usedBoosters.has(obj.data.id)) {
      const boostPos = npToV2(obj.data.position);
      const boostDist = distance(rocketPos, boostPos);
      if (boostDist < obj.data.radius) {
        return { type: 'booster', booster: obj.data };
      }
    }
  }

  // 4. Out of bounds
  const margin = PHYSICS.OUT_OF_BOUNDS_MARGIN;
  if (
    rocketPos.x < -margin ||
    rocketPos.x > 1.0 + margin ||
    rocketPos.y < -margin ||
    rocketPos.y > 1.0 + margin
  ) {
    return { type: 'outOfBounds' };
  }

  return { type: 'none' };
}
