export const to2D = (values) =>
  values.reduce((acc, v) => {
    const x = acc.length
      ? Math.abs(acc[acc.length - 1][1] - v) + acc[acc.length - 1][0]
      : 0;
    acc.push([x, v]);
    return acc;
  }, []);
