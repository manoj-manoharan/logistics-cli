import isNumber from './isNumber.js';

export default function isNumberAndEqOrGtThanZero(val: unknown): boolean {
  return isNumber(val) && val > 0;
}
