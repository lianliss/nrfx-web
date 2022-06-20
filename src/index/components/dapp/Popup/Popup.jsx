import React from 'react';
import { classNames as cn } from 'src/utils/index';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';

// Styles
import './Popup.less';

function Popup({ children, className, onClose, ...props }) {
  const [isActive, setIsActive] = React.useState(false);

  // Smooth display
  React.useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    });
  }, []);

  // Smooth close
  const handleClose = () => {
    setIsActive(false);

    setTimeout(() => {
      onClose();
    }, 200); // Transition time in Popup.less
  };

  return (
    <CabinetBlock
      className={cn('Popup', className, { active: isActive })}
      {...props}
    >
      {children}
      <div className="close" onClick={handleClose}>
        <SVG src={require('src/asset/icons/close-popup.svg')} />
      </div>
    </CabinetBlock>
  );
}

export default Popup;
