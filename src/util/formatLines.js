export const formatLines = (values, perLine = 16) => values.reduce((acc, v, i) => {
    if (i === 0 || (i+1) % perLine === 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(v);
    return acc;
}, []).map(values => values.join(', ')).join(',\n  ');
