import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './Message.less';

function Message({ children, type, width, onClose }) {
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
        maxWidth: width,
        transition: `opacity ${animationDuration}s`,
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

export default Message;
