import { Vector2D } from '../types';

export function add(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function scale(v: Vector2D, s: number): Vector2D {
  return { x: v.x * s, y: v.y * s };
}

export function magnitude(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vector2D): Vector2D {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

export function distance(a: Vector2D, b: Vector2D): number {
  return magnitude(sub(b, a));
}

export function fromAngle(radians: number, length: number): Vector2D {
  return { x: Math.cos(radians) * length, y: Math.sin(radians) * length };
}

export function toAngle(v: Vector2D): number {
  return Math.atan2(v.y, v.x);
}

export function copy(v: Vector2D): Vector2D {
  return { x: v.x, y: v.y };
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function distanceToLineSegment(
  point: Vector2D,
  a: Vector2D,
  b: Vector2D
): number {
  const ab = sub(b, a);
  const ap = sub(point, a);
  const abLenSq = ab.x * ab.x + ab.y * ab.y;
  if (abLenSq === 0) return distance(point, a);
  let t = (ap.x * ab.x + ap.y * ab.y) / abLenSq;
  t = clamp(t, 0, 1);
  const closest = add(a, scale(ab, t));
  return distance(point, closest);
}

export function normalizedToScreen(
  nx: number,
  ny: number,
  width: number,
  height: number
): Vector2D {
  return { x: nx * width, y: ny * height };
}

export function screenToNormalized(
  x: number,
  y: number,
  width: number,
  height: number
): Vector2D {
  return { x: x / width, y: y / height };
}
