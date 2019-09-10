export const getGradientByCurrency = (currency) => {
  switch (currency.toLowerCase()) {
    case 'btc':
      return 'linear-gradient(225deg, #F7B73B 0%, #F8A15D 100%)';

    case 'ltc':
      return 'linear-gradient(225deg, #7AC4F2 0%, #619ABE 100%)';

    case 'eth':
      return 'linear-gradient(225deg, #98B1F1 0%, #896ADF 100%)';
  
    default:
      return 'linear-gradient(225deg, #B5B5B5 0%, #838383 100%)';
  }
};

export const getColorByCurrency = (currency) => {
  switch (currency) {
    case 'btc':
      return '#F8AC4D';

    case 'ltc':
      return '#75BBE7';

    case 'eth':
      return '#908EE8';
  
    default:
      return '#9B9B9B';
  }
};