import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';

function ShowIn({ children, type, animation, className, delay }) {
  const [styles, setStyles] = React.useState({
    opacity: 0,
    transition: `all ${delay}s`,
    pointerEvents: 'none',
  });
  const showInRef = React.useRef(null);
  const isInViewport = useIsInViewport(showInRef);

  React.useEffect(() => {
    if (!isInViewport) return;

    const activeStyles = {
      pointerEvents: 'all',
    };

    if (animation === 'opacity') {
      setStyles((prev) => ({ ...prev, ...activeStyles, opacity: 1 }));
    }
  }, [isInViewport]);

  return (
    <div
      className={cn('MainLanding-ShowIn', className)}
      ref={showInRef}
      style={styles}
    >
      {children}
    </div>
  );
}

ShowIn.propTypes = {
  type: PropTypes.oneOf(['scroll']),
  animation: PropTypes.oneOf(['opacity']),
  delay: PropTypes.number,
  className: PropTypes.string,
};

ShowIn.defaultProps = {
  type: 'scroll',
  animation: 'opacity',
  delay: 1,
  className: '',
};

export default ShowIn;
