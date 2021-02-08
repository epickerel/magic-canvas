export const clearValuesBetween = (values, lower, upper) => {
  const mid = upper - lower;
  return values.map((v) => {
    if (v >= upper || v <= lower) {
      return v;
    }
    return v < mid ? lower : upper;
  });
};
