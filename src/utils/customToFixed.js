export const customToFixed = (number, x) => {
  // 1222032.1322222 > 1222032.12322
  return parseFloat(number.toFixed(x + 1).slice(0, -1));
};
