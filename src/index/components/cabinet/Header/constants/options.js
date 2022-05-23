import React from 'react';
import SVG from 'utils/svg-wrap';
import { option } from '../../Select/Select';

export const cryptoOptions = [
  option('Solana', 'solana', require('src/asset/icons/wallets/solana.svg')),
  option('NRFX', 'nrfx', require('src/asset/icons/wallets/nrfx.svg')),
  option('BitCoin', 'btc', require('src/asset/icons/wallets/btc.svg')),
];

export const walletsOptions = [
  option(
    'bc1uf5tdn87k2uz7r2kl5zrfww362ch3746lq5vse7',
    1,
    require('src/asset/icons/cabinet/connect-wallet.svg')
  ),
  option(
    'dasdasdtdn87k2uz7r2kl5zrfww362ch3746lq5vse7',
    2,
    require('src/asset/icons/cabinet/connect-wallet.svg')
  ),
];
