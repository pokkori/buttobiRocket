import { Vector2D, StageData, NormalizedPosition } from '../types';
import { PHYSICS } from '../constants/physics';
import { add, sub, scale, magnitude, normalize, copy } from '../utils/vector';

function npToV2(np: NormalizedPosition): Vector2D {
  return { x: np.nx, y: np.ny };
}

export function predictTrajectory(
  rocketPos: Vector2D,
  launchVelocity: Vector2D,
  stage: StageData,
  steps: number = PHYSICS.PREDICTION_STEPS
): Vector2D[] {
  const points: Vector2D[] = [];
  let simPos = copy(rocketPos);
  let simVel = copy(launchVelocity);
  const simDt = PHYSICS.TIME_STEP * 2;
  const interval = Math.max(1, Math.floor(steps / PHYSICS.PREDICTION_DISPLAY_POINTS));

  for (let i = 0; i < steps; i++) {
    let totalForce: Vector2D = { x: 0, y: 0 };

    for (const planet of stage.planets) {
      const planetPos = npToV2(planet.position);
      const direction = sub(planetPos, simPos);
      const dist = Math.max(magnitude(direction), 0.02);
      const forceMag = PHYSICS.GRAVITY_CONSTANT * planet.mass / (dist * dist);
      totalForce = add(totalForce, scale(normalize(direction), forceMag));
    }

    for (const obj of stage.specialObjects) {
      if (obj.type === 'blackhole') {
        const bhPos = npToV2(obj.data.position);
        const direction = sub(bhPos, simPos);
        const dist = Math.max(magnitude(direction), 0.01);
        const forceMag = PHYSICS.GRAVITY_CONSTANT * obj.data.mass * PHYSICS.BLACKHOLE_PULL_MULTIPLIER / (dist * dist);
        totalForce = add(totalForce, scale(normalize(direction), forceMag));
      }
    }

    simVel = add(simVel, scale(totalForce, simDt));
    simPos = add(simPos, scale(simVel, simDt));

    if (i % interval === 0) {
      points.push(copy(simPos));
    }

    // Check collisions (simplified)
    const margin = PHYSICS.OUT_OF_BOUNDS_MARGIN;
    if (simPos.x < -margin || simPos.x > 1 + margin || simPos.y < -margin || simPos.y > 1 + margin) {
      break;
    }

    for (const planet of stage.planets) {
      const pPos = npToV2(planet.position);
      const d = magnitude(sub(simPos, pPos));
      if (d < planet.radius) {
        points.push(copy(simPos));
        return points;
      }
    }
  }

  return points;
}
