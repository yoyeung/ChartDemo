export function maxValue(records) {
  return records.reduce(
    (init, record) => Math.max(init, record.AdjClose || record.sma),
    Number.MIN_SAFE_INTEGER
  );
}
export function minValue(records) {
  return records.reduce(
    (init, record) => Math.min(init, record.AdjClose || record.sma),
    Number.MAX_SAFE_INTEGER
  );
}
