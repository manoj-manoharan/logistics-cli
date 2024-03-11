export default function isObject(v: unknown): boolean {
  return typeof v === 'object' && !Array.isArray(v);
}
