export default function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val);
}
