export default function isArray(v: unknown): boolean {
  return typeof v === 'object' && Array.isArray(v);
}
