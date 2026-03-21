import { RocketState, StageData, Vector2D, NormalizedPosition } from '../types';
import { PHYSICS } from '../constants/physics';
import { add, sub, scale, magnitude, normalize, copy, toAngle, clamp } from '../utils/vector';

function npToV2(np: NormalizedPosition): Vector2D {
  return { x: np.nx, y: np.ny };
}

export function updatePhysics(
  rocket: RocketState,
  stage: StageData,
  dt: number,
  frameCount: number
): RocketState {
  const subDt = dt / PHYSICS.SUB_STEPS;
  let pos = copy(rocket.position);
  let vel = copy(rocket.velocity);
  let rotation = rocket.rotation;

  for (let i = 0; i < PHYSICS.SUB_STEPS; i++) {
    let totalForce: Vector2D = { x: 0, y: 0 };

    // Gravity from planets
    for (const planet of stage.planets) {
      const planetPos = npToV2(planet.position);
      const direction = sub(planetPos, pos);
      let dist = magnitude(direction);
      dist = Math.max(dist, 0.02);
      const forceMag = PHYSICS.GRAVITY_CONSTANT * planet.mass / (dist * dist);
      const forceVec = scale(normalize(direction), forceMag);
      totalForce = add(totalForce, forceVec);
    }

    // Gravity from black holes
    for (const obj of stage.specialObjects) {
      if (obj.type === 'blackhole') {
        const bhPos = npToV2(obj.data.position);
        const direction = sub(bhPos, pos);
        let dist = magnitude(direction);
        dist = Math.max(dist, 0.01);
        const forceMag = PHYSICS.GRAVITY_CONSTANT * obj.data.mass * PHYSICS.BLACKHOLE_PULL_MULTIPLIER / (dist * dist);
        const forceVec = scale(normalize(direction), forceMag);
        totalForce = add(totalForce, forceVec);
      }
    }

    // Update velocity
    vel = add(vel, scale(totalForce, subDt));

    // Clamp velocity
    const speed = magnitude(vel);
    if (speed > PHYSICS.MAX_VELOCITY) {
      vel = scale(normalize(vel), PHYSICS.MAX_VELOCITY);
    }

    // Update position
    pos = add(pos, scale(vel, subDt));

    // Update rotation to face movement direction
    if (magnitude(vel) > PHYSICS.MIN_VELOCITY) {
      rotation = toAngle(vel);
    }
  }

  // Fuel consumption
  const fuel = Math.max(0, rocket.fuel - PHYSICS.FUEL_CONSUMPTION_RATE * dt);

  // Trail recording
  const trail = [...rocket.trail];
  if (frameCount % PHYSICS.TRAIL_SAVE_INTERVAL === 0) {
    trail.push(copy(pos));
    if (trail.length > PHYSICS.MAX_TRAIL_POINTS) {
      trail.shift();
    }
  }

  return {
    ...rocket,
    position: pos,
    velocity: vel,
    rotation,
    fuel,
    trail,
  };
}
