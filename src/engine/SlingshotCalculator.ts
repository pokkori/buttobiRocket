import { Vector2D } from '../types';
import { PHYSICS } from '../constants/physics';
import { sub, magnitude, normalize, scale, toAngle, clamp } from '../utils/vector';

export interface SlingshotResult {
  angle: number;
  power: number;
  launchVelocity: Vector2D;
}

export function calculateSlingshot(
  rocketPos: Vector2D,
  dragCurrent: Vector2D
): SlingshotResult {
  const dragVector = sub(dragCurrent, rocketPos);
  const dragDistance = magnitude(dragVector);
  const launchDirection = scale(normalize(dragVector), -1);
  const power = clamp(dragDistance / PHYSICS.MAX_DRAG_DISTANCE, 0, 1);
  const angle = toAngle(launchDirection);
  const launchVelocity = scale(launchDirection, power * PHYSICS.MAX_LAUNCH_SPEED);

  return { angle, power, launchVelocity };
}
