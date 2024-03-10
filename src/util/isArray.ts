export default function isArray(v: unknown) {
  return typeof v === 'object' && Array.isArray(v);
}
