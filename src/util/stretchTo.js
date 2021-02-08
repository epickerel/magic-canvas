import { getMinMax } from './getMinMax';

export const stretchTo = (arr, limit = 1) => {
  const { max, min } = getMinMax(arr);
  const multiplier = limit / Math.max(max, Math.abs(min));
  return arr.map(v => v * multiplier);
}
