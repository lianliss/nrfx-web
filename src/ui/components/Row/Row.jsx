import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'src/utils';

// Styles
import './Row.less';

function Row({ children, className, alignItems, justifyContent, wrap }) {
  return (
    <div
      className={cn('Row', { [className]: className })}
      style={{ alignItems, justifyContent, flexWrap: wrap ? 'wrap' : 'nowrap' }}
    >
      {children}
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  alignItems: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  wrap: PropTypes.bool,
};

Row.defaultProps = {
  className: '',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  wrap: false,
};

export default Row;
