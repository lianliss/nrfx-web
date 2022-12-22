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
  type,
  animation,
  className,
  viewport,
  scrollRemainderPercent = 70,
  tag: Tag = 'div',
}) {
  const showInRef = React.useRef(null);
  const { visible, rect } =
    viewport || useIsInViewport(showInRef, scrollRemainderPercent);
  const [transform, setTransform] = React.useState('');

  React.useEffect(() => {
    setDynamicStep();
  }, [rect, visible]);

  const setDynamicStep = () => {
    switch (animation) {
      case 'swipeHorizontal': {
        setTransform(`translateX(-${rect.top}px)`);
        break;
      }
      default:
        break;
    }
  };

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
  animation: PropTypes.oneOf([
    'opacity',
    'swipeHorizontal',
    'slideTop',
    'slideRight',
    'slideBottom',
    'slideLeft',
  ]),
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

function ShowInWrapper({ children, ...props }) {
  const adaptive = useSelector(adaptiveSelector);
  const Tag = props.tag || 'div';

  if (adaptive) {
    return <Tag className={props.className}>{children}</Tag>;
  }

  return <ShowIn {...props}>{children}</ShowIn>;
}

export default React.memo(ShowInWrapper);
