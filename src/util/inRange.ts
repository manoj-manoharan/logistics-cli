import isNumber from './isNumber.js';

export function inRange({
  min,
  max,
  val,
}: {
  min: number;
  max: number;
  val: number;
}): boolean {
  // validating if numbers
  if ([min, max, val].some((v) => !isNumber(v))) return false;

  return min <= val && val <= max;
}
