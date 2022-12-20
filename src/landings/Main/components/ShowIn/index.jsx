import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';

// Styles
import './index.less';

function ShowIn({ children, type, animation, className }) {
  const showInRef = React.useRef(null);
  const { visible, rect } = useIsInViewport(showInRef);

  return (
    <div
      className={cn('MainLanding-ShowIn', className, animation, {
        visible,
      })}
      ref={showInRef}
      style={
        animation === 'swipeHorizontal'
          ? {
              transform: `translateX(-${rect.top}px)`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
}

ShowIn.propTypes = {
  type: PropTypes.oneOf(['scroll']),
  animation: PropTypes.oneOf(['opacity', 'swipeHorizontal']),
  className: PropTypes.string,
};

ShowIn.defaultProps = {
  type: 'scroll',
  animation: 'opacity',
  className: '',
};

export default ShowIn;
