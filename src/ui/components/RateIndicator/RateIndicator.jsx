import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'utils/svg-wrap';

import './RateIndicator.less';

function RateIndicator({ number, type, procent, icon }) {
  return (
    <span className={'RateIndicator ' + type}>
      <span className="RateIndicator-container">
        {type === 'noActive' ? (
          <span className="isvg" />
        ) : (
          <SVG src={icon ? icon : require('src/asset/icons/total-arrow.svg')} />
        )}
        {number}
        {procent && '%'}
      </span>
    </span>
  );
}

RateIndicator.propTypes = {
  number: PropTypes.number,
  type: PropTypes.oneOf(['down', 'up', 'noActive']),
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
