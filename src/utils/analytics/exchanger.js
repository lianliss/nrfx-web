import { NETWORKS_DATA } from '../../services/multichain/chains';

export const addExchange = ({
  tx,
  price,
  fromToken,
  toToken,
  chainId,
  toTokensAmount,
}) => {
  const chainTitle = NETWORKS_DATA[chainId].title;
  const priceOfCoinAmount = toTokensAmount * price;

  dataLayer.push({
    ecommerce: {
      purchase: {
        actionField: {
          id: tx,
          affiliation: 'narfex.com',
          revenue: priceOfCoinAmount,
        },
        products: [
          {
            name: fromToken.symbol,
            brand: toToken.symbol,
            id: `${fromToken.address}-${toToken.address}`,
            price: price,
            category: chainTitle,
            quantity: toTokensAmount,
          },
        ],
      },
    },
    event: 'ecommerce-event',
    eventCategory: 'Ecommerce',
    eventAction: 'Purchase',
    nonInteraction: false,
  });
};
