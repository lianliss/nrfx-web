import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './Message.less';

function Message({ children, type, maxWidth, onClose }) {
  const [opacity, setOpacity] = React.useState(1);
  const animationDuration = 0.3;

  const handleClose = () => {
    setOpacity(0);
    setTimeout(onClose, animationDuration * 1000);
  };

  return (
    <div
      className={cn({ DappMessage: true, [type]: type })}
      style={{
        transition: `opacity ${animationDuration}s`,
        maxWidth,
        opacity,
      }}
    >
      {children}
      <div className="close" onClick={handleClose}>
        <SVG src={require('src/asset/icons/close/default.svg')} />
      </div>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.oneOf(['warning']),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
};

Message.defaultProps = {
  type: 'warning',
  maxWidth: null,
  onClose: () => {},
};

export default Message;
