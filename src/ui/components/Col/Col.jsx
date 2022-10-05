import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'src/utils';

// Styles
import './Col.less';

function Col({ children, className, alignItems, justifyContent, style }) {
  return (
    <div
      className={cn('Col', { [className]: className })}
      style={{ alignItems, justifyContent, ...style }}
    >
      {children}
    </div>
  );
}

Col.propTypes = {
  className: PropTypes.string,
  alignItems: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'stretch']),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'stretch'
  ]),
  style: PropTypes.object,
};

Col.defaultProps = {
  className: '',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  style: {},
};

export default Col;
