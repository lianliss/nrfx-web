import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from 'src/selectors';

// Styles
import './index.less';

function ShowIn({
  children,
  animation,
  className,
  inputVisibleStatus,
  scrollRemainderPercent,
  tag: Tag = 'div',
}) {
  const showInRef = React.useRef(null);
  const visible =
    inputVisibleStatus || useIsInViewport(showInRef, scrollRemainderPercent);

  return (
    <Tag
      className={cn('MainLanding-ShowIn', className, animation, {
        visible,
      })}
      ref={showInRef}
    >
      {children}
    </Tag>
  );
}

ShowIn.propTypes = {
  animation: PropTypes.oneOf([
    'opacity',
    'swipeHorizontal',
    'slideTop',
    'slideRight',
    'slideBottom',
    'slideLeft',
  ]),
  inputVisibleStatus: PropTypes.bool,
  className: PropTypes.string,
  scrollRemainderPercent: PropTypes.number,
};

ShowIn.defaultProps = {
  animation: 'opacity',
  inputVisibleStatust: false,
  className: '',
  scrollRemainderPercent: 70,
};

function ShowInWrapper({ children, ...props }) {
  const adaptive = useSelector(adaptiveSelector);
  const Tag = props.tag || 'div';

  if (adaptive) {
    return <Tag className={props.className}>{children}</Tag>;
  }

  return <ShowIn {...props}>{children}</ShowIn>;
}

export default React.memo(ShowInWrapper);
