export default function isWholeNumber(val: unknown): boolean {
  try {
    return typeof val === 'number' && !Number.isNaN(val) && val > 0;
  } catch (e) {
    console.error(e);
  }

  return false;
}
