import smoothPolyline from 'smooth-polyline';
import { stretchTo } from './util/stretchTo';
import { moveZeroTo } from './util/moveZeroTo';
import { removeRepeatedValues } from './util/removeRepeatedValues';
import { to2D } from './util/to2D';
import { clearValuesBetween } from './util/clearValuesBetween';

export const forTable = (values) => {
  const limitPN = stretchTo(values, 11).map((v) => Math.round(v));
  const deduped = removeRepeatedValues(limitPN);
  const zigzag = deduped.map((v, i) => (i % 2 ? -v : v));
  const positions = moveZeroTo(zigzag, 87).map((v) => v + 5);
  const points2D = to2D(positions);
  const smoothed = smoothPolyline(points2D).map((point) =>
    Math.round(point[1]),
  );
  const cleared = clearValuesBetween(smoothed, 88, 96);
  return cleared;
};
