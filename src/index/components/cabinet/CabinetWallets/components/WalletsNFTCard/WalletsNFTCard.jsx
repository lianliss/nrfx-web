import React from 'react';

import SVG from 'utils/svg-wrap';

import './WalletsNFTCard.less';

function WalletsNFTCard({ title, src }) {
  console.log(require(`./assets/${src}.svg`));
  return (
    <div className="WalletsNFTCard">
      <img src={require(`./assets/${src}.svg`).default} />
      <span className="WalletsNFTCard__title">{title}</span>
    </div>
  );
}

export default WalletsNFTCard;
