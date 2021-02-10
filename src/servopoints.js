import fs from 'fs';
import { stretchTo } from './util/stretchTo';
import { formatLines } from './util/formatLines';
import { forLaser } from './forLaser';
import { forTable } from './forTable';

const json = require('../MRSAA1.json');
const zeroCenteredJson = json.map((v) => v - 0.25);

// only for 0-255
const toHexChar = (arr) =>
  arr.map((v) => '0x' + v.toString(16).padStart(2, '0'));

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
  fs.writeFileSync('./arduino/magic-canvas-2/wave.h', code, {
    encoding: 'utf8',
  });
};
