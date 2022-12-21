import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';

// Styles
import './index.less';

function ShowIn({
  children,
  type,
  animation,
  className,
  viewport,
  tag: Tag = 'div',
}) {
  const showInRef = React.useRef(null);
  const { visible, rect } = viewport || useIsInViewport(showInRef);
  let transform = 'null';

  switch (animation) {
    case 'swipeHorizontal':
      transform = `translateX(-${rect.top}px)`;
      break;
    default:
      break;
  }

  return (
    <Tag
      className={cn('MainLanding-ShowIn', className, animation, {
        visible,
      })}
      ref={showInRef}
      style={{ transform }}
    >
      {children}
    </Tag>
  );
}

ShowIn.propTypes = {
  type: PropTypes.oneOf(['scroll']),
  animation: PropTypes.oneOf(['opacity', 'swipeHorizontal']),
  viewport: PropTypes.shape({
    visible: PropTypes.bool,
    rect: PropTypes.object,
  }),
  className: PropTypes.string,
};

ShowIn.defaultProps = {
  type: 'scroll',
  animation: 'opacity',
  viewport: null,
  className: '',
};

export default React.memo(ShowIn);
