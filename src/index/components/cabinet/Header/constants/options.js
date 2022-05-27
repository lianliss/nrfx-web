import React from 'react';
import SVG from 'utils/svg-wrap';
import { option } from '../../Select/Select';

export const cryptoOptions = [
  option('Solana', 'solana', require('src/asset/icons/wallets/solana.svg')),
  option('NRFX', 'nrfx', require('src/asset/icons/wallets/nrfx.svg')),
  option('BitCoin', 'btc', require('src/asset/icons/wallets/btc.svg')),
];

const wallets = [
  'bc1uf5tdn87k2uz7r2kl5zrfww362ch3746lq57',
  'dasdasdtdn87k2uz7r2kl5zrfww362ch3746se7',
  'dasdasdtdn87k2uz7r2kl5zrfww3626lq5vs',
];

export const walletsOptions = wallets.map((address, index) => {
  const finallyAddress = address.slice(0, 5);
  const lastNumbers = address.slice(-4);

  return option(
    `${finallyAddress}...${lastNumbers}`,
    index + 1, // 0 is false thats index + 1
    require('src/asset/icons/cabinet/connect-wallet.svg')
  );
});
