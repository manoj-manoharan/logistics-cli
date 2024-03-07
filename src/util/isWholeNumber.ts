import isNumber from './isNumber.js';

export default function isWholeNumber(val: unknown): boolean {
  return isNumber(val) && val > 0;
}
