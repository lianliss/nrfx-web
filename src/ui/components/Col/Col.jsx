import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'src/utils';

// Styles
import './Col.less';

function Col({ children, className, alignItems, justifyContent }) {
  return (
    <div
      className={cn('Col', { [className]: className })}
      style={{ alignItems, justifyContent }}
    >
      {children}
    </div>
  );
}

Col.propTypes = {
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

Col.defaultProps = {
  className: '',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export default Col;
