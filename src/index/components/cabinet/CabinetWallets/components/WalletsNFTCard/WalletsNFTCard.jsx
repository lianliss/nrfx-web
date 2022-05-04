import React from 'react';
import PropTypes from 'prop-types';

import './WalletsNFTCard.less';

function WalletsNFTCard({ title, src }) {
  return (
    <div className="WalletsNFTCard">
      <img src={require(`./assets/${src}.svg`).default} />
      <span className="WalletsNFTCard__title">{title}</span>
    </div>
  );
}

WalletsNFTCard.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

export default WalletsNFTCard;
