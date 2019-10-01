export const getGradientByCurrency = (currency) => {
  switch (currency.toLowerCase()) {
    case 'btc':
      return 'linear-gradient(45deg,  #f8a15d 0%,#f7b73b 100%)';

    case 'ltc':
      return 'linear-gradient(45deg,  #619abe 0%,#7ac4f2 100%)';

    case 'eth':
      return 'linear-gradient(45deg,  #896adf 0%,#98b1f1 100%)';
  
    default:
      return 'linear-gradient(45deg,  #838383 0%,#b5b5b5 100%)';
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