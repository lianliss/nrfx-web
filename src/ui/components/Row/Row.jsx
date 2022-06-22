import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'src/utils';

// Styles
import './Row.less';

function Row({ children, className, alignItems, justifyContent }) {
  return (
    <div
      className={cn('Row', { [className]: className })}
      style={{ alignItems, justifyContent }}
    >
      {children}
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  alignItems: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
  ]),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
};

Row.defaultProps = {
  className: '',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export default Row;
