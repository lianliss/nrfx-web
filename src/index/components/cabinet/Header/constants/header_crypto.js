import React from 'react';
import SVG from 'utils/svg-wrap';

// Return object for options constant
const option = (title, value, icon) => {
  return {
    label: (
      <>
        <SVG src={icon} />
        <span>{title}</span>
      </>
    ),
    value,
  };
};

export const options = [
  option('Solana', 'solana', require('src/asset/icons/wallets/solana.svg')),
  option('NRFX', 'nrfx', require('src/asset/icons/wallets/solana.svg')),
  option('BitCoin', 'btc', require('src/asset/icons/wallets/solana.svg')),
];
