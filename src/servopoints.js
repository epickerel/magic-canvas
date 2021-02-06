import fs from 'fs';
import smoothPolyline from 'smooth-polyline';
import { getMinMax } from './getMinMax';
import { stretchTo } from './stretchTo';
import { moveZeroTo } from './moveZeroTo';
import {formatLines} from './formatLines';

const json = require('../MRSAA1.json');
const zeroCenteredJson = json.map(v => v - 0.25);

const noSubsequentDupes = arr => arr.reduce((acc, v, i) => {
  if (i === 0 || acc[acc.length - 1] !== v) {    
    acc.push(v);
  }
  return acc;
}, []);

// only for 0-255
const toHexChar = arr => arr.map(v => '0x' + v.toString(16).padStart(2, '0'));

function bzCurve(points) {
  const afterPoints = []
  return afterPoints;
}

const to2D = values => values.reduce((acc, v) => {
  const x = acc.length ? Math.abs(acc[acc.length - 1][1] - v) + acc[acc.length - 1][0] : 0;
  acc.push([
    x, v,
  ]);
  return acc;
}, []);

const clearValuesBetween = (values, lower, upper) => {
  const mid = upper - lower;
  return values.map(v => {
    if (v >= upper || v <= lower) {
      return v;
    }
    return v < mid ? lower : upper;
  });
}

const forLaser = values => {
  const limitPN = stretchTo(values, 60).map(v => Math.round(v));
  const deduped = noSubsequentDupes(limitPN);
  const zigzag = deduped.map((v, i) => i % 2 ? -v : v);
  const positions = moveZeroTo(zigzag, 90).map(v => v + 5);  
  const points2D = to2D(positions);
  const smoothed = smoothPolyline(smoothPolyline(points2D)).map(point => Math.round(point[1]));
  return smoothed;
}

const forTable = values => {
  const limitPN = stretchTo(values, 12).map(v => Math.round(v));
  const deduped = noSubsequentDupes(limitPN);
  const zigzag = deduped.map((v, i) => i % 2 ? -v : v);
  const positions = moveZeroTo(zigzag, 87).map(v => v + 5);  
  const points2D = to2D(positions);
  const smoothed = smoothPolyline(points2D).map(point => Math.round(point[1]));
  const cleared = clearValuesBetween(smoothed , 88, 96);
  return cleared;
}

export const servoPoints = () => {
  const limitPN1 = stretchTo(zeroCenteredJson);

  const laser = forLaser(limitPN1);
  const table = forTable(limitPN1);

  const formattedLaser = formatLines(laser);
  const formattedTable = formatLines(table);

  const code = `const uint8_t laser_positions [] PROGMEM = {
  ${formattedLaser}
};

const uint8_t table_positions [] PROGMEM = {
  ${formattedTable}
};
`;

  console.log(code);
  fs.writeFileSync('./arduino/magic-canvas-1/wave.h', code, {encoding: 'utf8'});
}