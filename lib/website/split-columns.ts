export function splitIntoHalves<T>(items: T[]): [T[], T[]] {
  if (items.length === 0) return [[], []];
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

/** Split items into two columns with at most `perColumn` items in the first column. */
export function splitIntoColumns<T>(items: T[], perColumn = 5): [T[], T[]] {
  if (items.length === 0) return [[], []];
  return [items.slice(0, perColumn), items.slice(perColumn)];
}

/** Split items into three columns with up to `perColumn` items each. */
export function splitIntoThreeColumns<T>(items: T[], perColumn = 5): [T[], T[], T[]] {
  if (items.length === 0) return [[], [], []];
  return [
    items.slice(0, perColumn),
    items.slice(perColumn, perColumn * 2),
    items.slice(perColumn * 2, perColumn * 3),
  ];
}
