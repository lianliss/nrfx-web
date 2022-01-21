const getFinePrice = (number, options = {}) => {
  const minPrice = typeof options.minPrice === 'undefined'
    ? 0.000001
    : options.minPrice;
  let price = Math.abs(number);
  let digits = 0;
  const minDigits = price < 10 ? 3 : 2;
  if (!price || price < minPrice) return '0.00';
  while (price < 100) {
    digits++;
    price *= 10;
  }
  return number.toFixed(Math.max(minDigits, digits));
};

export default getFinePrice;
