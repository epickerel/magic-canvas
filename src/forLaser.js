import smoothPolyline from 'smooth-polyline';
import { stretchTo } from './util/stretchTo';
import { moveZeroTo } from './util/moveZeroTo';
import { removeRepeatedValues } from './util/removeRepeatedValues';
import { to2D } from './util/to2D';

const MAX = 34;
const CENTRE = 99;

export const forLaser = (values) => {
  let vProgress;
  vProgress = stretchTo(values, MAX).map((v) => Math.round(v));
  vProgress = removeRepeatedValues(vProgress);
  vProgress = vProgress.map((v, i) => (i % 2 ? -v : v));
  vProgress = moveZeroTo(vProgress, CENTRE).map((v) => v + 5);
  const points2D = to2D(vProgress);
  const smoothed = smoothPolyline(smoothPolyline(points2D)).map((point) =>
    Math.round(point[1]),
  );
  return vProgress;
};
