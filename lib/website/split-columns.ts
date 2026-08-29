export function splitIntoHalves<T>(items: T[]): [T[], T[]] {
  if (items.length === 0) return [[], []];
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
