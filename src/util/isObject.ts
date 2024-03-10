export default function isObject(v: unknown) {
  return typeof v === 'object' && !Array.isArray(v);
}
