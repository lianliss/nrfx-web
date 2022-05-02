import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'utils/svg-wrap';

import './RateIndicator.less';

function RateIndicator({ number, type, procent }) {
  return (
    <span className={'RateIndicator ' + type}>
      <span className="RateIndicator-container">
        <SVG src={require('src/asset/icons/total-arrow.svg')} />
        {number}
        {procent && '%'}
      </span>
    </span>
  );
}

RateIndicator.propTypes = {
  number: PropTypes.number,
  type: PropTypes.oneOf(['down', 'up']),
  procent: PropTypes.bool,
};

RateIndicator.defaultProps = {
  number: 0,
  type: 'up',
  procent: false,
};

export default RateIndicator;
