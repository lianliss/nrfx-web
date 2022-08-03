import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'utils/svg-wrap';

import './RateIndicator.less';

function RateIndicator({ number, type, procent, icon }) {
  return (
    <span className={'RateIndicator ' + type}>
      <span className="RateIndicator-container">
        {type === 'noActive' || type === 'other' ? (
          <span className="isvg" />
        ) : (
          <SVG src={icon ? icon : require('src/asset/icons/total-arrow.svg')} />
        )}
        {!number ? 0 : number}
        {procent && '%'}
      </span>
    </span>
  );
}

RateIndicator.getType = (number = null) => {
  if (number === null) return 'noActive';
  if (number === 0) return 'other';
  if (number > 0) return 'up';
  if (number < 0) return 'down';
};

RateIndicator.propTypes = {
  number: PropTypes.number,
  type: PropTypes.oneOf(['down', 'up', 'noActive', 'other']),
  procent: PropTypes.bool,
  icon: PropTypes.string,
};

RateIndicator.defaultProps = {
  number: 0,
  type: 'noActive',
  procent: false,
  icon: null,
};

export default RateIndicator;
