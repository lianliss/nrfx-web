import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'src/utils';

// Styles
import './Row.less';

function Row({
  children,
  className,
  alignItems,
  justifyContent,
  wrap,
  wrapAnyway,
  onClick,
  gap,
}) {
  return (
    <div
      className={cn('Row', { [className]: className, wrapAnyway })}
      style={{
        alignItems,
        justifyContent,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  alignItems: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'stretch']),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'stretch',
  ]),
  wrap: PropTypes.bool,
  onClick: PropTypes.func,
  gap: PropTypes.string,
};

Row.defaultProps = {
  className: '',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  wrap: false,
  onClick: () => {},
  gap: '',
};

export default Row;
