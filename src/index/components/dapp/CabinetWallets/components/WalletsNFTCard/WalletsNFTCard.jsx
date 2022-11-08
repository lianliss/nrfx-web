import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

import './WalletsNFTCard.less';

function WalletsNFTCard({ title, src }) {
  return (
    <div className={cn({ WalletsNFTCard: true, empty: !src })}>
      {src ? (
        <>
          <img src={require(`./assets/${src}.svg`).default} />
          <span className="WalletsNFTCard__title">{title}</span>
        </>
      ) : (
        <SVG src={require('src/asset/icons/status/empty-image.svg')} />
      )}
    </div>
  );
}

WalletsNFTCard.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

export default WalletsNFTCard;
