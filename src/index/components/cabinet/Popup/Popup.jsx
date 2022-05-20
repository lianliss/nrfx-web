import React from 'react';
import { classNames as cn } from 'src/utils/index';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';

// Styles
import './Popup.less';

function Popup({ children, className, onClose }) {
  const [isActive, setIsActive] = React.useState(true);

  const handleClose = () => {
    setIsActive(false);

    setTimeout(() => {
      onClose();
    }, 200); // Transition time in Popup.less
  };

  return (
    <CabinetBlock className={cn('Popup', className, { active: isActive })}>
      {children}
      <div className="close" onClick={handleClose}>
        <SVG src={require('src/asset/icons/close-popup.svg')} />
      </div>
    </CabinetBlock>
  );
}

export default Popup;
