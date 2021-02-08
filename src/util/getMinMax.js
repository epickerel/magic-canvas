export const getMinMax = arr => arr.reduce((acc, v) => {
    acc.min = acc.min < v ? acc.min : v;
    acc.max = acc.max > v ? acc.max : v;
    return acc;
  }, {max: -10000, min: 10000});
